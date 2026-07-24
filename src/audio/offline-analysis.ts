import Meyda, { type MeydaFeaturesObject } from 'meyda';
import { DEFAULT_AUDIO_ENGINE_CONFIG, FEATURES, MIN_NOISE_FLOOR, NOISE_FLOOR_ALPHA } from './audio-engine.ts';
import type { AudioEngineConfig, TransientFrame } from './types.ts';

export interface OfflineHit {
  frames: TransientFrame[];
  /** Milliseconds from the start of the buffer, matching RecordedHit.timeMs
   * for a live take so both feed the same quantizeHits(). */
  timeMs: number;
}

/** Average of all channels down to one, so stereo files feed the same mono
 * onset detector a live take's single mic channel does. */
function downmixToMono(buffer: AudioBuffer): Float32Array {
  if (buffer.numberOfChannels === 1) return buffer.getChannelData(0);

  const channels = Array.from({ length: buffer.numberOfChannels }, (_, i) => buffer.getChannelData(i));
  const mono = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    let sum = 0;
    for (const channel of channels) sum += channel[i];
    mono[i] = sum / channels.length;
  }
  return mono;
}

/**
 * Runs the same onset-hold state machine AudioEngine runs live (see
 * audio-engine.ts's onFeatures), but over a fully-decoded buffer processed
 * in one pass instead of a real-time mic callback. No metronome/click
 * suppression here — an uploaded file was never played back through
 * speakers into a mic, so there's no click bleed to guard against.
 */
function detectHits(samples: Float32Array, sampleRate: number, config: AudioEngineConfig): OfflineHit[] {
  const fftSize = config.fftSize;
  const numBuffers = Math.floor(samples.length / fftSize);

  let state: 'listening' | 'hold' | 'cooldown' = 'listening';
  let noiseFloor = 0;
  let holdBuffer: TransientFrame[] = [];
  let holdStartedAt = 0;
  let releaseGate = 0;
  let cooldownUntil = 0;
  const hits: OfflineHit[] = [];

  for (let b = 0; b < numBuffers; b++) {
    const chunk = samples.subarray(b * fftSize, (b + 1) * fftSize);
    const timestamp = (b * fftSize) / sampleRate;
    const raw = Meyda.extract([...FEATURES], chunk) as Partial<MeydaFeaturesObject> | null;
    if (!raw) continue;

    const frame: TransientFrame = {
      timestamp,
      rms: raw.rms ?? 0,
      spectralFlatness: raw.spectralFlatness ?? 0,
      powerSpectrum: raw.powerSpectrum ?? new Float32Array(0),
      zcr: raw.zcr ?? 0,
    };

    if (state === 'listening') noiseFloor += (frame.rms - noiseFloor) * NOISE_FLOOR_ALPHA;
    const gate = Math.max(noiseFloor, MIN_NOISE_FLOOR) * config.onsetRatio;

    if (state === 'listening') {
      if (frame.rms >= gate) {
        holdBuffer = [frame];
        releaseGate = gate * config.releaseRatio;
        holdStartedAt = frame.timestamp;
        state = 'hold';
      }
    } else if (state === 'hold') {
      holdBuffer.push(frame);
      const elapsedMs = (frame.timestamp - holdStartedAt) * 1000;
      if (frame.rms <= releaseGate || elapsedMs >= config.maxHoldMs) {
        // A hold this short was never a percussive hit — see
        // AudioEngineConfig.minHoldMs — so it's dropped instead of kept.
        if (elapsedMs >= config.minHoldMs) {
          hits.push({ frames: holdBuffer, timeMs: holdStartedAt * 1000 });
        }
        holdBuffer = [];
        state = 'cooldown';
        cooldownUntil = frame.timestamp + config.cooldownMs / 1000;
      }
    } else if (frame.timestamp >= cooldownUntil) {
      state = 'listening';
    }
  }

  return hits;
}

/**
 * decodeAudioData's DOMException.message ("Unable to decode audio data") is
 * accurate but not actionable — it doesn't tell someone what to try instead.
 * Mirrors describeMicError in audio-engine.ts.
 */
function describeDecodeError(err: unknown): string {
  if (err instanceof DOMException && err.name === 'EncodingError') {
    return "This browser couldn't decode that audio file's format. Try exporting it as WAV or MP3 and uploading again.";
  }
  return err instanceof Error ? `Couldn't read that file: ${err.message}` : "Couldn't read that file.";
}

/**
 * Decodes an uploaded audio file and runs it through the same onset
 * detection a live take uses, for people who can't record through the app
 * directly (mic issues, browser permissions, etc.) but have a recording of
 * their beatbox from elsewhere.
 */
export async function analyzeAudioFile(
  file: File,
  config: AudioEngineConfig = DEFAULT_AUDIO_ENGINE_CONFIG
): Promise<{ hits: OfflineHit[]; sampleRate: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const ctx = new AudioContext();
  try {
    let audioBuffer: AudioBuffer;
    try {
      audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      throw new Error(describeDecodeError(err));
    }
    const samples = downmixToMono(audioBuffer);
    return { hits: detectHits(samples, audioBuffer.sampleRate, config), sampleRate: audioBuffer.sampleRate };
  } finally {
    void ctx.close();
  }
}
