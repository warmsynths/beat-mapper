import Meyda, { type MeydaFeaturesObject } from 'meyda';
import { Metronome } from './metronome.ts';
import { OnsetDetector } from './onset-detector.ts';
import {
  EngineState,
  type AudioEngineConfig,
  type LevelDetail,
  type TransientFrame,
} from './types.ts';

// Shared with offline-analysis.ts, so a file upload is analyzed with exactly
// the same feature set as a live take.
export const FEATURES = ['rms', 'spectralFlatness', 'powerSpectrum', 'zcr'] as const;

export const DEFAULT_AUDIO_ENGINE_CONFIG: AudioEngineConfig = {
  fftSize: 512,
  onsetRatio: 1.3,
  releaseRatio: 0.7,
  maxHoldMs: 120,
  cooldownMs: 25,
  minHoldMs: 10,
};

// Exponential-moving-average smoothing for the ambient noise floor: small
// enough that a loud hit (which stops updating the floor the instant it
// crosses the gate) can't itself drag the floor up, but fast enough to track
// a room/mic's real ambient level within a few hundred ms. Shared with
// offline-analysis.ts for the same reason as FEATURES above.
export const NOISE_FLOOR_ALPHA = 0.05;

// Floor used in place of a near-zero tracked noise floor (e.g. right after
// start(), before the EMA has caught up) so the ratio test has something
// meaningful to multiply — otherwise "3x of ~0" is still ~0 and the gate
// never rises above true silence.
export const MIN_NOISE_FLOOR = 0.001;

// How long after each scheduled metronome click to ignore new onsets and
// pause noise-floor tracking, covering the click's own ~20ms envelope plus
// slack for room reverb and the mic's AGC settling. Short enough to leave
// most of a beat free for real hits (even a fast 180bpm beat is 333ms) while
// covering the click's acoustic bleed into the mic, which reads as a short,
// bright transient — exactly what the classifier calls a hat.
const METRONOME_SUPPRESS_S = 0.07;

// getUserMedia's DOMException.message is technically accurate but not
// actionable ("Requested device not found" tells you nothing about what to
// check). Map the handful of names that actually occur in practice to
// something a user can act on.
function describeMicError(err: unknown): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case 'NotFoundError':
        return 'No microphone was found. Check that a mic is connected, enabled, and set as the default input device in your OS sound settings.';
      case 'NotAllowedError':
        return 'Microphone access was denied. Check your browser\'s site permissions (the padlock icon in the address bar) and allow microphone access.';
      case 'NotReadableError':
        return 'The microphone is in use by another application, or the OS couldn\'t access it.';
      case 'OverconstrainedError':
        return 'No microphone on this system supports the requested audio settings.';
      case 'SecurityError':
        return 'Microphone access is blocked — this page must be served over HTTPS or from localhost.';
      default:
        return `Microphone error: ${err.message}`;
    }
  }
  return err instanceof Error ? err.message : 'Unknown microphone error.';
}

/**
 * Owns the AudioContext + Meyda analyzer and runs a small onset state
 * machine on top of the raw feature stream. Framework-agnostic: no DOM/Lit
 * imports, communicates only via CustomEvents so it can be unit tested and
 * reused outside the UI layer.
 *
 * Events:
 *   - 'state-change'        detail: EngineState
 *   - 'transient-detected'  detail: TransientFrame[]  (frames captured during ONSET_HOLD)
 *   - 'level'                detail: LevelDetail  (throttled rms + current gate, for live VU-style UI)
 *   - 'error'                detail: Error
 */
export class AudioEngine extends EventTarget {
  private ctx: AudioContext | null = null;
  private analyzer: ReturnType<typeof Meyda.createMeydaAnalyzer> | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  /** Time-domain analyser purely for the live seismograph — separate from
   * Meyda's feature extraction, which drives onset detection/classification. */
  private waveNode: AnalyserNode | null = null;

  private state: EngineState = EngineState.IDLE;
  private onsetDetector: OnsetDetector = new OnsetDetector();
  private config: AudioEngineConfig;
  private lastLevelEmitAt = 0;
  private metronome: Metronome | null = null;
  /** Raw mic audio for the current/last take, captured in parallel with
   * analysis purely so a performer can download exactly what the engine
   * heard (see getRecordingBlob) — analysis itself never touches this. */
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private lastRecordingBlob: Blob | null = null;
  /** Resolves once the current/most recent take's MediaRecorder has actually
   * flushed its final chunk — set by teardown() when it stops the recorder,
   * since that's async even though stop() itself is synchronous. */
  private recordingStoppedPromise: Promise<Blob | null> | null = null;

  constructor(config: AudioEngineConfig = DEFAULT_AUDIO_ENGINE_CONFIG) {
    super();
    this.config = config;
  }

  getState(): EngineState {
    return this.state;
  }

  getSampleRate(): number | null {
    return this.ctx?.sampleRate ?? null;
  }

  getFftSize(): number {
    return this.config.fftSize;
  }

  /** Current config (including any sensitivity adjustment from updateConfig),
   * for offline-analysis.ts to reuse so an uploaded file is detected with the
   * same sensitivity as a live take. */
  getConfig(): AudioEngineConfig {
    return this.config;
  }

  /**
   * Fills `out` with the current time-domain waveform (samples in [-1, 1])
   * for the live seismograph, and returns true if real audio was written.
   * Returns false when not running, so the UI can hold a flat baseline.
   */
  getWaveform(out: Float32Array): boolean {
    if (!this.waveNode) return false;
    // lib.dom types the buffer as Float32Array<ArrayBuffer>; our plain
    // Float32Array is structurally identical for this write-into use.
    this.waveNode.getFloatTimeDomainData(out as unknown as Float32Array<ArrayBuffer>);
    return true;
  }

  getWaveformSize(): number {
    return this.waveNode?.fftSize ?? 2048;
  }

  /** Current position within the beat, for a visual metronome pulse — see
   * Metronome.getBeatPhase(). Null when not running. */
  getBeatPhase(): { phase: number; beatIndex: number } | null {
    if (!this.ctx || !this.metronome) return null;
    return this.metronome.getBeatPhase(this.ctx.currentTime);
  }

  updateConfig(patch: Partial<AudioEngineConfig>): void {
    this.config = { ...this.config, ...patch };
  }

  /**
   * The just-finished take's raw mic audio, for a performer to download and
   * send along when a transcription looks wrong — the literal bytes the
   * engine analyzed, rather than a separate phone recording of the same
   * performance (which can differ enough in mic/room to make debugging
   * misleading). Call after stop(); resolves null if the browser doesn't
   * support MediaRecorder or nothing was captured.
   */
  async getRecordingBlob(): Promise<Blob | null> {
    if (this.recordingStoppedPromise) return this.recordingStoppedPromise;
    return this.lastRecordingBlob;
  }

  /**
   * @param metronomeBpm Tempo for the reference click/pulse that runs for
   * the duration of the take, to help the performer stay on grid. Shares
   * this engine's AudioContext (rather than a separate one) so it needs no
   * extra user-gesture unlock and tears down in lockstep with the mic.
   * @param metronomeAudible Whether the click actually plays through the
   * speakers. Only safe with headphones — on speakers the mic picks up the
   * bleed, which the classifier reads as a bright, broadband hit. When
   * false, the beat is tracked silently so a visual metronome (see
   * getBeatPhase()) can still follow it.
   */
  async start(metronomeBpm: number, metronomeAudible: boolean): Promise<void> {
    if (this.state !== EngineState.IDLE) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          // Noise suppression tends to smear/attenuate short percussive
          // transients, which is exactly what onset detection depends on.
          noiseSuppression: false,
          // Without this, raw mic input on many laptops never gets loud
          // enough to cross any reasonable rmsThreshold — onsets simply
          // never fire, with no visible error. AGC's automatic leveling is
          // worth more here than perfectly uncolored input.
          autoGainControl: true,
        },
      });
      this.ctx = new AudioContext();
      this.source = this.ctx.createMediaStreamSource(this.stream);

      this.waveNode = this.ctx.createAnalyser();
      this.waveNode.fftSize = 2048;
      this.source.connect(this.waveNode);

      this.onsetDetector = new OnsetDetector({
        fftSize: this.config.fftSize,
        sampleRate: this.ctx.sampleRate,
        minHoldMs: this.config.minHoldMs,
        maxHoldMs: this.config.maxHoldMs,
        cooldownMs: this.config.cooldownMs,
      });

      this.analyzer = Meyda.createMeydaAnalyzer({
        audioContext: this.ctx,
        source: this.source,
        bufferSize: this.config.fftSize,
        featureExtractors: FEATURES,
        callback: (features: Partial<MeydaFeaturesObject>) => this.onFeatures(features),
      });

      this.analyzer.start();
      this.metronome = new Metronome(this.ctx, metronomeBpm, metronomeAudible);
      this.metronome.start();

      this.recordedChunks = [];
      this.lastRecordingBlob = null;
      this.recordingStoppedPromise = null;
      if (typeof MediaRecorder !== 'undefined') {
        try {
          this.mediaRecorder = new MediaRecorder(this.stream);
          this.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) this.recordedChunks.push(e.data);
          };
          this.mediaRecorder.start();
        } catch {
          // Recording capture is a nice-to-have for later download/debugging;
          // analysis itself never depends on it, so a failure here (an
          // unsupported mime type, e.g.) shouldn't block the take.
          this.mediaRecorder = null;
        }
      }

      this.setState(EngineState.LISTENING);
    } catch (err) {
      this.dispatchEvent(new CustomEvent<Error>('error', { detail: new Error(describeMicError(err)) }));
      this.teardown();
    }
  }

  stop(): void {
    this.teardown();
    this.setState(EngineState.IDLE);
  }

  private teardown(): void {
    this.metronome?.stop();
    this.metronome = null;
    this.analyzer?.stop();
    this.analyzer = null;
    this.waveNode?.disconnect();
    this.waveNode = null;

    const flushed = this.onsetDetector.flush(this.ctx?.currentTime ?? 0);
    if (flushed) {
      this.dispatchEvent(new CustomEvent<TransientFrame[]>('transient-detected', { detail: flushed }));
    }
    this.onsetDetector.reset();

    // Stopped before the stream's tracks are, so the recorder gets a clean
    // final chunk rather than racing a track that's already gone dead.
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      const mr = this.mediaRecorder;
      const chunks = this.recordedChunks;
      this.recordingStoppedPromise = new Promise((resolve) => {
        mr.addEventListener(
          'stop',
          () => {
            const blob = chunks.length ? new Blob(chunks, { type: mr.mimeType || 'audio/webm' }) : null;
            this.lastRecordingBlob = blob;
            resolve(blob);
          },
          { once: true }
        );
      });
      mr.stop();
    }
    this.mediaRecorder = null;

    this.source?.disconnect();
    this.source = null;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    void this.ctx?.close();
    this.ctx = null;
  }

  private onFeatures(raw: Partial<MeydaFeaturesObject>): void {
    if (!this.ctx) return;

    const frame: TransientFrame = {
      timestamp: this.ctx.currentTime,
      rms: raw.rms ?? 0,
      spectralFlatness: raw.spectralFlatness ?? 0,
      powerSpectrum: raw.powerSpectrum ?? new Float32Array(0),
      zcr: raw.zcr ?? 0,
    };

    const suppressingClick = this.metronome?.isJustAfterClick(frame.timestamp, METRONOME_SUPPRESS_S) ?? false;
    const gate = this.onsetDetector.getNoiseFloor() * 1.5;
    this.maybeEmitLevel(frame.rms, gate);

    const hit = this.onsetDetector.processFrame(frame, suppressingClick);
    if (hit) {
      this.dispatchEvent(new CustomEvent<TransientFrame[]>('transient-detected', { detail: hit }));
    }

    const detState = this.onsetDetector.getState();
    const mappedState =
      detState === 'hold'
        ? EngineState.ONSET_HOLD
        : detState === 'cooldown'
        ? EngineState.COOLDOWN
        : EngineState.LISTENING;
    if (this.state !== mappedState) {
      this.setState(mappedState);
    }
  }

  private maybeEmitLevel(level: number, threshold: number): void {
    const now = performance.now();
    if (now - this.lastLevelEmitAt < 33) return; // ~30fps, cheap enough for a UI meter
    this.lastLevelEmitAt = now;
    this.dispatchEvent(new CustomEvent<LevelDetail>('level', { detail: { level, threshold } }));
  }

  private setState(next: EngineState): void {
    this.state = next;
    this.dispatchEvent(new CustomEvent<EngineState>('state-change', { detail: next }));
  }
}
