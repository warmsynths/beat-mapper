import Meyda, { type MeydaFeaturesObject } from 'meyda';
import {
  EngineState,
  type AudioEngineConfig,
  type LevelDetail,
  type TransientFrame,
} from './types.ts';

const FEATURES = ['rms', 'spectralCentroid', 'spectralFlatness', 'powerSpectrum', 'zcr'] as const;

export const DEFAULT_AUDIO_ENGINE_CONFIG: AudioEngineConfig = {
  fftSize: 512,
  onsetMargin: 0.025,
  onsetHoldMs: 30,
  cooldownMs: 120,
};

// Exponential-moving-average smoothing for the ambient noise floor: small
// enough that a loud hit (which stops updating the floor the instant it
// crosses the gate) can't itself drag the floor up, but fast enough to track
// a room/mic's real ambient level within a few hundred ms.
const NOISE_FLOOR_ALPHA = 0.05;

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

  private state: EngineState = EngineState.IDLE;
  private holdBuffer: TransientFrame[] = [];
  private cooldownTimer: ReturnType<typeof setTimeout> | null = null;
  private holdTimer: ReturnType<typeof setTimeout> | null = null;
  private config: AudioEngineConfig;
  private lastLevelEmitAt = 0;
  /** Rolling ambient rms level, updated only while LISTENING (see NOISE_FLOOR_ALPHA). */
  private noiseFloor = 0;

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

  updateConfig(patch: Partial<AudioEngineConfig>): void {
    this.config = { ...this.config, ...patch };
  }

  async start(): Promise<void> {
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

      this.analyzer = Meyda.createMeydaAnalyzer({
        audioContext: this.ctx,
        source: this.source,
        bufferSize: this.config.fftSize,
        featureExtractors: FEATURES,
        callback: (features: Partial<MeydaFeaturesObject>) => this.onFeatures(features),
      });

      this.analyzer.start();
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
    this.analyzer?.stop();
    this.analyzer = null;
    this.source?.disconnect();
    this.source = null;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    void this.ctx?.close();
    this.ctx = null;

    if (this.holdTimer) clearTimeout(this.holdTimer);
    if (this.cooldownTimer) clearTimeout(this.cooldownTimer);
    this.holdTimer = null;
    this.cooldownTimer = null;
    this.holdBuffer = [];
    this.noiseFloor = 0;
  }

  private onFeatures(raw: Partial<MeydaFeaturesObject>): void {
    if (!this.ctx) return;

    const frame: TransientFrame = {
      timestamp: this.ctx.currentTime,
      rms: raw.rms ?? 0,
      spectralCentroid: raw.spectralCentroid ?? 0,
      spectralFlatness: raw.spectralFlatness ?? 0,
      powerSpectrum: raw.powerSpectrum ?? new Float32Array(0),
      zcr: raw.zcr ?? 0,
    };

    // Only LISTENING updates the floor — the onset itself and its decay
    // tail (ONSET_HOLD/COOLDOWN) must never feed back into what counts as
    // "ambient", or the gate would chase the hit it's supposed to catch.
    if (this.state === EngineState.LISTENING) {
      this.noiseFloor += (frame.rms - this.noiseFloor) * NOISE_FLOOR_ALPHA;
    }
    const gate = this.noiseFloor + this.config.onsetMargin;
    this.maybeEmitLevel(frame.rms, gate);

    switch (this.state) {
      case EngineState.LISTENING:
        if (frame.rms >= gate) this.beginOnsetHold(frame);
        break;

      case EngineState.ONSET_HOLD:
        this.holdBuffer.push(frame);
        break;

      // IDLE / COOLDOWN: ignore incoming frames entirely.
      default:
        break;
    }
  }

  private beginOnsetHold(firstFrame: TransientFrame): void {
    this.holdBuffer = [firstFrame];
    this.setState(EngineState.ONSET_HOLD);

    this.holdTimer = setTimeout(() => {
      const frames = this.holdBuffer;
      this.holdBuffer = [];
      this.dispatchEvent(new CustomEvent<TransientFrame[]>('transient-detected', { detail: frames }));
      this.enterCooldown();
    }, this.config.onsetHoldMs);
  }

  private enterCooldown(): void {
    this.setState(EngineState.COOLDOWN);
    this.cooldownTimer = setTimeout(() => {
      this.setState(EngineState.LISTENING);
    }, this.config.cooldownMs);
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
