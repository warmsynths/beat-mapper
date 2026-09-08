import type { TransientFrame } from './types.ts';

export type DrumClass = 'kick' | 'snare' | 'hat';

export interface HitFeatures {
  /** 0 (all energy in the low band) .. 2 (all energy in the high band). */
  brightness: number;
  /** Measure of noise-likeness vs tonality: 0 (pure tone) .. 1 (white noise). */
  flatness: number;
  /** Proportion of total energy in the low band (< 250 Hz). */
  lowBandEnergy: number;
  /** Proportion of total energy in the mid band (250 Hz .. 2500 Hz). */
  midBandEnergy: number;
  /** Proportion of total energy in the high band (> 2500 Hz). */
  highBandEnergy: number;
  /** Energy-weighted normalized zero-crossing rate (crossings / bufferSize in 0..1). */
  zcr: number;
  /** Duration in milliseconds of the transient hold window. */
  durationMs: number;
}

export interface ClassificationResult {
  class: DrumClass;
  confidence: number;
  features: HitFeatures;
}

export interface ClassifierThresholds {
  /** Upper bound (Hz) of the "low band" used for energy bucketing. */
  lowBandHz: number;
  /** Upper bound (Hz) of the "mid band" used for energy bucketing; above this is "high band". */
  midBandHz: number;
}

export const DEFAULT_CLASSIFIER_THRESHOLDS: ClassifierThresholds = {
  lowBandHz: 250,
  midBandHz: 2500,
};

export const CLASSES_LOW_TO_HIGH: DrumClass[] = ['kick', 'snare', 'hat'];

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

/**
 * Energy-weighted average: frames are weighted by their own rms so the loud,
 * characteristic body of a hit dominates the result instead of being diluted
 * by quiet attack or decay frames.
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

/**
 * Extracts a 5-dimensional acoustic feature vector from an aggregated transient
 * hold window. Energy-weighted averaging yields stable values for low/mid/high band
 * energy, spectral flatness, and zero-crossing rate.
 */
export function extractHitFeatures(
  frames: TransientFrame[],
  sampleRate: number,
  fftSize: number,
  thresholds: ClassifierThresholds = DEFAULT_CLASSIFIER_THRESHOLDS
): HitFeatures {
  if (frames.length === 0) {
    return {
      brightness: 0,
      flatness: 0,
      lowBandEnergy: 0,
      midBandEnergy: 0,
      highBandEnergy: 0,
      zcr: 0,
      durationMs: 0,
    };
  }

  const weights = frames.map((f) => f.rms);
  const flatness = weightedAverage(frames.map((f) => f.spectralFlatness), weights);
  const zcr = weightedAverage(frames.map((f) => f.zcr / fftSize), weights);
  const durationMs =
    frames.length > 1
      ? (frames.at(-1)!.timestamp - frames[0].timestamp) * 1000
      : (fftSize / sampleRate) * 1000;

  const bandSums = frames.map((f) => bandEnergy(f.powerSpectrum, sampleRate, fftSize, thresholds));
  const lowBandEnergy = weightedAverage(bandSums.map((b) => b.low), weights);
  const midBandEnergy = weightedAverage(bandSums.map((b) => b.mid), weights);
  const highBandEnergy = weightedAverage(bandSums.map((b) => b.high), weights);
  const brightness = midBandEnergy + 2 * highBandEnergy;

  return { brightness, flatness, lowBandEnergy, midBandEnergy, highBandEnergy, zcr, durationMs };
}

/**
 * Computes unnormalized acoustic likelihood scores for Kick, Snare, and Hat
 * based on physical acoustic principles of human vocal percussion.
 */
export function scoreHit(features: HitFeatures): Record<DrumClass, number> {
  const { lowBandEnergy, highBandEnergy, flatness, zcr, durationMs } = features;

  let kick = 0;
  let snare = 0;
  let hat = 0;

  // 1. Low-Band (< 250 Hz): Kick fundamental
  kick += ramp(lowBandEnergy, 0.20, 0.65) * 4.0;
  if (lowBandEnergy > 0.25) {
    hat -= ramp(lowBandEnergy, 0.20, 0.50) * 5.0;
    snare -= ramp(lowBandEnergy, 0.35, 0.65) * 2.5;
  }

  // 2. High-Band (> 2500 Hz): Hat & Snare sizzle
  hat += ramp(highBandEnergy, 0.25, 0.70) * 4.0;
  snare += ramp(highBandEnergy, 0.15, 0.50) * 1.5;
  if (highBandEnergy > 0.25) {
    kick -= ramp(highBandEnergy, 0.20, 0.50) * 4.0;
  }

  // 3. Spectral Flatness: Turbulent unvoiced friction (Snare & Hat)
  snare += ramp(flatness, 0.25, 0.65) * 3.5;
  hat += ramp(flatness, 0.20, 0.55) * 1.5;
  if (flatness > 0.35) {
    kick -= ramp(flatness, 0.30, 0.60) * 3.0;
  }

  // 4. Zero-Crossing Rate: High-frequency frication
  hat += ramp(zcr, 0.20, 0.60) * 4.0;
  snare += ramp(zcr, 0.12, 0.40) * 2.0;
  if (zcr > 0.25) {
    kick -= ramp(zcr, 0.20, 0.45) * 3.5;
  }

  // 5. Transient Duration
  if (durationMs < 50) {
    hat += ramp(50 - durationMs, 0, 30) * 1.5;
  }
  if (durationMs > 70) {
    kick += ramp(durationMs, 70, 120) * 1.5;
    snare += ramp(durationMs, 60, 110) * 1.0;
    hat -= ramp(durationMs, 70, 120) * 2.0;
  }

  return { kick, snare, hat };
}

/**
 * Classifies an individual hit in real time against active drum classes.
 */
export function classifySingleHit(
  features: HitFeatures,
  activeClasses: DrumClass[] = CLASSES_LOW_TO_HIGH
): ClassificationResult {
  const allowed = CLASSES_LOW_TO_HIGH.filter((c) => activeClasses.includes(c));
  if (allowed.length === 0) {
    return { class: 'kick', confidence: 0, features };
  }
  if (allowed.length === 1) {
    return { class: allowed[0], confidence: 1, features };
  }

  const scores = scoreHit(features);
  const ranked = [...allowed].sort((a, b) => scores[b] - scores[a]);
  const bestClass = ranked[0];
  const secondClass = ranked[1];

  const margin = scores[bestClass] - scores[secondClass];
  const confidence = clamp01(ramp(margin, 0.5, 4.0));

  return { class: bestClass, confidence, features };
}

/**
 * Classifies every hit in a take using hybrid classification:
 * Tier 1 evaluates each hit against absolute physical acoustic boundaries.
 * Tier 2 resolves borderline cases using relative take distribution without rigid first-hit assumptions.
 */
export function classifyTakeHits(
  featuresList: HitFeatures[],
  activeClasses: DrumClass[] = CLASSES_LOW_TO_HIGH
): ClassificationResult[] {
  if (featuresList.length === 0) return [];

  const allowed = CLASSES_LOW_TO_HIGH.filter((c) => activeClasses.includes(c));
  if (allowed.length === 1) {
    return featuresList.map((f) => ({ class: allowed[0], confidence: 1, features: f }));
  }

  // Tier 1: Independent per-hit acoustic vector classification
  const singleResults = featuresList.map((f) => classifySingleHit(f, allowed));

  // If all hits have clear confidence or there are too few hits to build a take distribution, keep Tier 1
  const hasLowConfidence = singleResults.some((r) => r.confidence < 0.4);
  if (!hasLowConfidence || featuresList.length < 3) {
    return singleResults;
  }

  // Tier 2: Take-level relative distribution for borderline hits
  const lowEnergies = featuresList.map((f) => f.lowBandEnergy);
  const zcrs = featuresList.map((f) => f.zcr);
  const maxLow = Math.max(...lowEnergies);
  const maxZcr = Math.max(...zcrs);

  return singleResults.map((result, i) => {
    if (result.confidence >= 0.4) return result;

    const f = featuresList[i];
    if (allowed.includes('kick') && f.lowBandEnergy === maxLow && f.lowBandEnergy > 0.25) {
      return { class: 'kick', confidence: 0.6, features: f };
    }
    if (allowed.includes('hat') && f.zcr === maxZcr && f.highBandEnergy > 0.35) {
      return { class: 'hat', confidence: 0.6, features: f };
    }
    if (allowed.includes('snare') && f.flatness > 0.35) {
      return { class: 'snare', confidence: 0.5, features: f };
    }
    return result;
  });
}
