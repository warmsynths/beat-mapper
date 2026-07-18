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
  centroidKickMax: 400,
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

/**
 * Rule-based classification over an aggregated onset window. Averaging
 * across the ONSET_HOLD frames (rather than classifying a single frame)
 * smooths out attack-transient noise and gives a more stable read on
 * voiced ("boo"/kick) vs noisy (hat/snare) content.
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

  const isNoisy = flatness >= thresholds.flatnessNoiseMin;

  // Kick: low centroid, tonal (not noisy), energy concentrated in the low band.
  if (centroid <= thresholds.centroidKickMax && !isNoisy && lowBandEnergy >= midBandEnergy) {
    const confidence = clamp01(1 - centroid / thresholds.centroidKickMax);
    return { class: 'kick', confidence, features };
  }

  // Hat: high centroid, energy concentrated in the high band.
  if (centroid >= thresholds.centroidHatMin && highBandEnergy >= midBandEnergy) {
    const confidence = clamp01((centroid - thresholds.centroidHatMin) / thresholds.centroidHatMin);
    return { class: 'hat', confidence, features };
  }

  // Everything else: mid-centroid, broadband/noisy content.
  const confidence = clamp01(flatness);
  return { class: 'snare', confidence, features };
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
