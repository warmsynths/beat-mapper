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
  /** Below this spectral centroid (Hz), a hit leans kick. */
  centroidKickMax: number;
  /** Above this spectral centroid (Hz), a hit leans hat. */
  centroidHatMin: number;
  /** Above this spectral flatness (0-1), a hit is noise-like rather than tonal. */
  flatnessNoiseMin: number;
  /** Upper bound (Hz) of the "low band" used for energy bucketing. */
  lowBandHz: number;
  /** Upper bound (Hz) of the "mid band" used for energy bucketing; above this is "high band". */
  midBandHz: number;
}

export const DEFAULT_CLASSIFIER_THRESHOLDS: ClassifierThresholds = {
  // Generous by studio standards: phone/laptop mics attenuate the lows,
  // which drags a real kick's measured centroid well above where a
  // full-range recording would put it.
  centroidKickMax: 600,
  centroidHatMin: 4000,
  flatnessNoiseMin: 0.35,
  lowBandHz: 200,
  midBandHz: 2000,
};

/**
 * Sums powerSpectrum energy into low/mid/high bands given the bin frequency
 * spacing implied by sampleRate and fftSize (bin width = sampleRate / fftSize).
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

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** Linear ramp: 0 at/before `from`, 1 at/after `to` (or the mirrored ramp if `to < from`). */
function ramp(value: number, from: number, to: number): number {
  if (from === to) return value >= from ? 1 : 0;
  return clamp01((value - from) / (to - from));
}

/**
 * Rule-based classification over an aggregated onset window. Averaging
 * across the ONSET_HOLD frames (rather than classifying a single frame)
 * smooths out attack-transient noise and gives a more stable read on
 * voiced ("boo"/kick) vs noisy (hat/snare) content.
 *
 * Each class gets an independent 0-1 score from centroid, flatness, and
 * band energy, and the highest score wins. A sequential AND-gated
 * threshold chain (the previous approach) breaks whenever cues disagree —
 * e.g. a mic's bass rolloff can push a real kick's low/mid band-energy
 * ratio the "wrong" way even though its centroid is unambiguously low, or
 * proximity effect can boost a snare's low end enough to fool a centroid-only
 * gate. Scoring on all cues at once, including spectral flatness (tonal
 * kick vs. noisy snare/hat — previously computed but never actually used),
 * is far more resilient to exactly that kind of disagreement.
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

  const centroid = average(frames.map((f) => f.spectralCentroid));
  const flatness = average(frames.map((f) => f.spectralFlatness));

  const bandSums = frames.map((f) => bandEnergy(f.powerSpectrum, sampleRate, fftSize, thresholds));
  const lowBandEnergy = average(bandSums.map((b) => b.low));
  const midBandEnergy = average(bandSums.map((b) => b.mid));
  const highBandEnergy = average(bandSums.map((b) => b.high));

  const features = { centroid, flatness, lowBandEnergy, midBandEnergy, highBandEnergy };

  // 1 = tonal (kick-like), 0 = noisy (snare/hat-like).
  const tonal = ramp(flatness, thresholds.flatnessNoiseMin, 0);
  const noisy = 1 - tonal;

  const kickScore = average([ramp(centroid, thresholds.centroidKickMax, 0), tonal, lowBandEnergy]);
  const hatScore = average([
    ramp(centroid, thresholds.centroidHatMin, thresholds.centroidHatMin * 2),
    noisy,
    highBandEnergy,
  ]);

  // Snare sits between kick and hat: mid-range centroid, noisy, body in the mid band.
  const midpoint = (thresholds.centroidKickMax + thresholds.centroidHatMin) / 2;
  const centroidMidScore = clamp01(1 - Math.abs(centroid - midpoint) / midpoint);
  const snareScore = average([centroidMidScore, noisy, midBandEnergy]);

  const scores: Record<DrumClass, number> = { kick: kickScore, snare: snareScore, hat: hatScore };
  const cls = (Object.keys(scores) as DrumClass[]).reduce((best, c) => (scores[c] > scores[best] ? c : best), 'snare' as DrumClass);

  return { class: cls, confidence: clamp01(scores[cls]), features };
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
