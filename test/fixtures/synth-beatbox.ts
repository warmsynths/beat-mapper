import type { DrumClass } from '../../src/audio/classifier.ts';

export interface GroundTruthHit {
  class: DrumClass;
  timeMs: number;
  durationMs: number;
}

export interface SyntheticTake {
  samples: Float32Array;
  sampleRate: number;
  groundTruth: GroundTruthHit[];
}

/** Generates pseudo-random white noise in [-1, 1] */
function whiteNoise(): number {
  return Math.random() * 2 - 1;
}

/**
 * Synthesizes a vocal kick sound ('b' / 'p' plosive):
 * - Fast pitch sweep from 150Hz down to 45Hz
 * - Exponential decay envelope (80-160ms)
 * - Initial transient plosive burst (first 5ms)
 */
export function synthesizeKick(
  sampleRate = 48000,
  durationMs = 120,
  velocity = 0.8
): Float32Array {
  const numSamples = Math.floor((durationMs / 1000) * sampleRate);
  const buffer = new Float32Array(numSamples);

  let phase = 0;
  const startFreq = 160;
  const endFreq = 48;
  const sweepRate = 35; // Exponential frequency decay rate

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Frequency sweeps downward rapidly
    const freq = endFreq + (startFreq - endFreq) * Math.exp(-sweepRate * t);
    phase += (2 * Math.PI * freq) / sampleRate;

    // Amplitude envelope
    const env = Math.exp(-15 * t);

    // Initial plosive airburst in the first 6ms
    const plosive = t < 0.006 ? whiteNoise() * (1 - t / 0.006) * 0.35 : 0;

    buffer[i] = (Math.sin(phase) * 0.85 + plosive) * env * velocity;
  }

  return buffer;
}

/**
 * Synthesizes a vocal snare sound ('k' / 'pff' turbulent friction):
 * - Broadband turbulent noise filtered in mid-high range (800Hz - 4000Hz)
 * - Secondary low-mid vocal resonant thump (~180Hz)
 * - Moderate decay envelope (90-150ms)
 */
export function synthesizeSnare(
  sampleRate = 48000,
  durationMs = 110,
  velocity = 0.75
): Float32Array {
  const numSamples = Math.floor((durationMs / 1000) * sampleRate);
  const buffer = new Float32Array(numSamples);

  // Simple bandpass filter for noise: difference of two lowpasses
  let lp1 = 0;
  let lp2 = 0;
  const alphaLow = Math.min(1, (2 * Math.PI * 4500) / sampleRate);
  const alphaHigh = Math.min(1, (2 * Math.PI * 900) / sampleRate);

  let bodyPhase = 0;
  const bodyFreq = 180;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const rawNoise = whiteNoise();

    // Bandpass filter
    lp1 += alphaLow * (rawNoise - lp1);
    lp2 += alphaHigh * (rawNoise - lp2);
    const bandpassedNoise = lp1 - lp2;

    // Snare tonal body resonance
    bodyPhase += (2 * Math.PI * bodyFreq) / sampleRate;
    const body = Math.sin(bodyPhase) * Math.exp(-40 * t) * 0.3;

    // Exponential decay
    const env = Math.exp(-18 * t);

    buffer[i] = (bandpassedNoise * 0.75 + body) * env * velocity;
  }

  return buffer;
}

/**
 * Synthesizes a vocal hi-hat sound ('t' / 'ts' fricative):
 * - High-frequency noise concentrated above 4000Hz
 * - High zero-crossing rate
 * - Ultra-short decay envelope (25-45ms)
 */
export function synthesizeHat(
  sampleRate = 48000,
  durationMs = 35,
  velocity = 0.6
): Float32Array {
  const numSamples = Math.floor((durationMs / 1000) * sampleRate);
  const buffer = new Float32Array(numSamples);

  // Highpass filter for noise
  let lp = 0;
  const alpha = Math.min(1, (2 * Math.PI * 4500) / sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const rawNoise = whiteNoise();

    lp += alpha * (rawNoise - lp);
    const highpassNoise = rawNoise - lp;

    // Sharp attack, very fast decay
    const env = Math.exp(-60 * t);

    buffer[i] = highpassNoise * env * velocity;
  }

  return buffer;
}

/**
 * Synthesizes a full multi-hit beatbox take at a given BPM with background noise.
 */
export function synthesizeBeatboxTake(
  pattern: Array<{ class: DrumClass; step: number; velocity?: number }>,
  bpm = 120,
  sampleRate = 48000,
  noiseFloor = 0.003
): SyntheticTake {
  const stepDurationMs = 60000 / bpm / 4; // 16th note in ms
  const totalSteps = Math.max(...pattern.map((p) => p.step)) + 4;
  const totalDurationMs = totalSteps * stepDurationMs + 300;
  const totalSamples = Math.floor((totalDurationMs / 1000) * sampleRate);
  const samples = new Float32Array(totalSamples);

  // Add ambient room mic noise floor
  for (let i = 0; i < totalSamples; i++) {
    samples[i] = whiteNoise() * noiseFloor;
  }

  const groundTruth: GroundTruthHit[] = [];

  for (const hit of pattern) {
    const timeMs = hit.step * stepDurationMs + 80; // 80ms lead-in
    const sampleOffset = Math.floor((timeMs / 1000) * sampleRate);
    const velocity = hit.velocity ?? 0.8;

    let hitBuffer: Float32Array;
    let durationMs: number;

    switch (hit.class) {
      case 'kick':
        durationMs = 120;
        hitBuffer = synthesizeKick(sampleRate, durationMs, velocity);
        break;
      case 'snare':
        durationMs = 110;
        hitBuffer = synthesizeSnare(sampleRate, durationMs, velocity);
        break;
      case 'hat':
        durationMs = 35;
        hitBuffer = synthesizeHat(sampleRate, durationMs, velocity);
        break;
    }

    groundTruth.push({ class: hit.class, timeMs, durationMs });

    // Mix hit into master buffer
    for (let j = 0; j < hitBuffer.length; j++) {
      if (sampleOffset + j < totalSamples) {
        samples[sampleOffset + j] += hitBuffer[j];
      }
    }
  }

  return { samples, sampleRate, groundTruth };
}
