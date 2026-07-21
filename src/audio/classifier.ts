import type { TransientFrame } from './types.ts';

export type DrumClass = 'kick' | 'snare' | 'hat';

export interface ClassificationResult {
  class: DrumClass;
  confidence: number;
  features: {
    centroid: number;
    flatness: number;
    lowBandEnergy: number;
    midBandEnergy: number;
    highBandEnergy: number;
  };
}

export interface ClassifierThresholds {
  /** Reference spectral centroid (Hz) for a typical kick. */
  kickCentroidHz: number;
  /** Reference spectral centroid (Hz) for a typical snare. */
  snareCentroidHz: number;
  /** Reference spectral centroid (Hz) for a typical hat/cymbal. */
  hatCentroidHz: number;
  /** Above this spectral flatness (0-1), a hit is noise-like rather than tonal. */
  flatnessNoiseMin: number;
  /** Upper bound (Hz) of the "low band" used for energy bucketing (informational only). */
  lowBandHz: number;
  /** Upper bound (Hz) of the "mid band" used for energy bucketing; above this is "high band" (informational only). */
  midBandHz: number;
}

export const DEFAULT_CLASSIFIER_THRESHOLDS: ClassifierThresholds = {
  // These are deliberately vocal-beatbox reference points, not acoustic-kit
  // ones: a lip-popped/hummed "kick" centers noticeably higher than a real
  // drum's sub-bass, and a sibilant "snare" (a "ts"/"ka" burst) commonly
  // reaches 3-4kHz, well above where a real snare's crack would sit.
  kickCentroidHz: 300,
  snareCentroidHz: 2800,
  hatCentroidHz: 8000,
  flatnessNoiseMin: 0.35,
  lowBandHz: 200,
  midBandHz: 2000,
};

/**
 * Sums powerSpectrum energy into low/mid/high bands given the bin frequency
 * spacing implied by sampleRate and fftSize (bin width = sampleRate / fftSize).
 * Informational only (surfaced via `features`) — see classifyTransient's
 * doc comment for why band energy isn't used to drive the classification
 * itself.
 */
function bandEnergy(
  powerSpectrum: Float32Array,
  sampleRate: number,
  fftSize: number,
  thresholds: ClassifierThresholds
): { low: number; mid: number; high: number } {
  const binWidth = sampleRate / fftSize;
  let low = 0;
  let mid = 0;
  let high = 0;

  for (let i = 0; i < powerSpectrum.length; i++) {
    const freq = i * binWidth;
    const energy = powerSpectrum[i];
    if (freq <= thresholds.lowBandHz) low += energy;
    else if (freq <= thresholds.midBandHz) mid += energy;
    else high += energy;
  }

  const total = low + mid + high || 1;
  return { low: low / total, mid: mid / total, high: high / total };
}

/**
 * Energy-weighted average: frames are weighted by their own rms so the loud,
 * characteristic body of a hit dominates the result instead of being diluted
 * by the many quiet, spectrally-unrepresentative frames in its rising attack
 * and decaying tail (which, since onset holding now rides a hit's whole
 * envelope rather than one fixed-length window, can otherwise be half the
 * frames in the buffer).
 */
function weightedAverage(values: number[], weights: number[]): number {
  let sum = 0;
  let weightSum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i] * weights[i];
    weightSum += weights[i];
  }
  if (weightSum === 0) return values.length === 0 ? 0 : values.reduce((s, v) => s + v, 0) / values.length;
  return sum / weightSum;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Linear ramp: 0 at/before `from`, 1 at/after `to` (or the mirrored ramp if `to < from`). */
function ramp(value: number, from: number, to: number): number {
  if (from === to) return value >= from ? 1 : 0;
  return clamp01((value - from) / (to - from));
}

// How many octaves away from a class's reference centroid before that class
// scores zero. Centroid perception/separation is roughly logarithmic (a
// 200Hz gap matters a lot down at kick range, is nothing up at hat range),
// so distance is measured in log2(Hz), not raw Hz.
const OCTAVE_FALLOFF = 4;

function centroidCloseness(centroidHz: number, referenceHz: number): number {
  const distanceOctaves = Math.abs(Math.log2(Math.max(centroidHz, 1)) - Math.log2(Math.max(referenceHz, 1)));
  return clamp01(1 - distanceOctaves / OCTAVE_FALLOFF);
}

/**
 * Rule-based classification over an aggregated onset window (the frames
 * captured while AudioEngine held a hit above its onset gate — see
 * audio-engine.ts). Energy-weighted averaging gives a stable read on the
 * hit's characteristic body rather than its attack transient.
 *
 * Classification is centroid-first: each class scores by how close (in
 * octaves) the hit's centroid sits to that class's reference pitch, plus a
 * tonal/noisy bonus for kick. Earlier versions gave spectral flatness and
 * per-band energy equal weight alongside centroid for all three classes —
 * that consistently misfired on real recordings because a vocalized snare's
 * high-band energy (a sibilant "ts"/"ka" burst) is often just as dominant as
 * a real hat's, and its flatness just as low (tonal, not noisy) as a kick's,
 * so those extra terms could out-vote a centroid that was already
 * unambiguous. Band energy is still computed and returned in `features` for
 * visibility, but no longer drives the decision.
 */
export function classifyTransient(
  frames: TransientFrame[],
  sampleRate: number,
  fftSize: number,
  thresholds: ClassifierThresholds = DEFAULT_CLASSIFIER_THRESHOLDS
): ClassificationResult {
  if (frames.length === 0) {
    return {
      class: 'snare',
      confidence: 0,
      features: { centroid: 0, flatness: 0, lowBandEnergy: 0, midBandEnergy: 0, highBandEnergy: 0 },
    };
  }

  // Meyda's spectralCentroid is a raw FFT bin index (0..fftSize/2), not Hz —
  // it's the amplitude-weighted mean of the bin index k, with no sampleRate
  // scaling applied internally. Convert to Hz using the bin width so it's
  // comparable to the Hz-based reference points below.
  const binWidth = sampleRate / fftSize;
  const weights = frames.map((f) => f.rms);
  const centroid = weightedAverage(frames.map((f) => f.spectralCentroid), weights) * binWidth;
  const flatness = weightedAverage(frames.map((f) => f.spectralFlatness), weights);

  const bandSums = frames.map((f) => bandEnergy(f.powerSpectrum, sampleRate, fftSize, thresholds));
  const lowBandEnergy = weightedAverage(bandSums.map((b) => b.low), weights);
  const midBandEnergy = weightedAverage(bandSums.map((b) => b.mid), weights);
  const highBandEnergy = weightedAverage(bandSums.map((b) => b.high), weights);

  const features = { centroid, flatness, lowBandEnergy, midBandEnergy, highBandEnergy };

  // 1 = tonal (kick-like hum), 0 = noisy. Only kick's score uses this —
  // real snare/hat vocalizations can be just as tonal as a kick (see above),
  // so it's not a reliable snare/hat discriminator, but a low-centroid hit
  // that's also clearly tonal is a strong extra signal for "kick".
  const tonal = ramp(flatness, thresholds.flatnessNoiseMin, 0);

  const kickScore = 0.75 * centroidCloseness(centroid, thresholds.kickCentroidHz) + 0.25 * tonal;
  const snareScore = centroidCloseness(centroid, thresholds.snareCentroidHz);
  const hatScore = centroidCloseness(centroid, thresholds.hatCentroidHz);

  const scores: Record<DrumClass, number> = { kick: kickScore, snare: snareScore, hat: hatScore };
  const cls = (Object.keys(scores) as DrumClass[]).reduce((best, c) => (scores[c] > scores[best] ? c : best), 'snare' as DrumClass);

  return { class: cls, confidence: clamp01(scores[cls]), features };
}
