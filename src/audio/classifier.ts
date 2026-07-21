import type { TransientFrame } from './types.ts';

export type DrumClass = 'kick' | 'snare' | 'hat';

export interface HitFeatures {
  centroid: number;
  flatness: number;
  lowBandEnergy: number;
  midBandEnergy: number;
  highBandEnergy: number;
}

export interface ClassificationResult {
  class: DrumClass;
  confidence: number;
  features: HitFeatures;
}

export interface ClassifierThresholds {
  /** Reference spectral centroid (Hz) for a typical kick. */
  kickCentroidHz: number;
  /** Reference spectral centroid (Hz) for a typical snare. */
  snareCentroidHz: number;
  /** Reference spectral centroid (Hz) for a typical hat/cymbal. */
  hatCentroidHz: number;
  /** Upper bound (Hz) of the "low band" used for energy bucketing (informational only). */
  lowBandHz: number;
  /** Upper bound (Hz) of the "mid band" used for energy bucketing; above this is "high band" (informational only). */
  midBandHz: number;
}

export const DEFAULT_CLASSIFIER_THRESHOLDS: ClassifierThresholds = {
  // Used only as a coarse tie-breaker when a take doesn't give classifyTakeHits
  // enough of its own variety to tell classes apart by relative pitch alone
  // (see classifyTakeHits) — never as a hard per-hit boundary. Deliberately
  // vocal-beatbox-ish reference points, since that's a reasonable "typical
  // register" prior when there's nothing else to go on.
  kickCentroidHz: 300,
  snareCentroidHz: 2800,
  hatCentroidHz: 8000,
  lowBandHz: 200,
  midBandHz: 2000,
};

/**
 * Sums powerSpectrum energy into low/mid/high bands given the bin frequency
 * spacing implied by sampleRate and fftSize (bin width = sampleRate / fftSize).
 * Informational only (surfaced via `features`) — classification is driven by
 * centroid alone, see classifyTakeHits.
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
 * and decaying tail (which, since onset holding rides a hit's whole envelope
 * rather than one fixed-length window, can otherwise be half the frames in
 * the buffer).
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
// scores zero, for the small-take fallback in classifyTakeHits. Centroid
// perception/separation is roughly logarithmic (a 200Hz gap matters a lot
// down at kick range, is nothing up at hat range), so distance is measured
// in log2(Hz), not raw Hz.
const OCTAVE_FALLOFF = 4;

function centroidCloseness(centroidHz: number, referenceHz: number): number {
  const distanceOctaves = Math.abs(Math.log2(Math.max(centroidHz, 1)) - Math.log2(Math.max(referenceHz, 1)));
  return clamp01(1 - distanceOctaves / OCTAVE_FALLOFF);
}

// Power-weighted mean bin index of a frame's power spectrum. Used for
// `centroid` instead of Meyda's spectralCentroid (which weights by raw
// amplitude): amplitude weighting gives outsized pull to the many
// small-amplitude high-frequency bins in mic self-noise/breath hiss riding on
// top of an otherwise bass-heavy hit, so a hit whose *energy* is genuinely
// concentrated low can still average out to a bright centroid. Power
// weighting matches how bandEnergy already buckets this same powerSpectrum,
// so the two features agree on what "bass-heavy" means — verified against a
// real take where a hit with 80%+ of its energy in the low band was, under
// amplitude weighting, coming out indistinguishable from bright hits.
function powerWeightedCentroidBin(powerSpectrum: Float32Array): number {
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < powerSpectrum.length; i++) {
    numerator += i * powerSpectrum[i];
    denominator += powerSpectrum[i];
  }
  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Extracts the classification-relevant features from an aggregated onset
 * window (the frames captured while AudioEngine held a hit above its onset
 * gate — see audio-engine.ts). Energy-weighted averaging gives a stable read
 * on the hit's characteristic body rather than its attack transient. Pure
 * feature extraction — see classifyTakeHits for how a whole take's worth of
 * these gets turned into kick/snare/hat labels.
 */
export function extractHitFeatures(
  frames: TransientFrame[],
  sampleRate: number,
  fftSize: number,
  thresholds: ClassifierThresholds = DEFAULT_CLASSIFIER_THRESHOLDS
): HitFeatures {
  if (frames.length === 0) {
    return { centroid: 0, flatness: 0, lowBandEnergy: 0, midBandEnergy: 0, highBandEnergy: 0 };
  }

  // Bin index -> Hz using the bin width, so it's comparable to the Hz-based
  // reference points below.
  const binWidth = sampleRate / fftSize;
  const weights = frames.map((f) => f.rms);
  const centroid = weightedAverage(frames.map((f) => powerWeightedCentroidBin(f.powerSpectrum)), weights) * binWidth;
  const flatness = weightedAverage(frames.map((f) => f.spectralFlatness), weights);

  const bandSums = frames.map((f) => bandEnergy(f.powerSpectrum, sampleRate, fftSize, thresholds));
  const lowBandEnergy = weightedAverage(bandSums.map((b) => b.low), weights);
  const midBandEnergy = weightedAverage(bandSums.map((b) => b.mid), weights);
  const highBandEnergy = weightedAverage(bandSums.map((b) => b.high), weights);

  return { centroid, flatness, lowBandEnergy, midBandEnergy, highBandEnergy };
}

// Two hits' centroids only count as different *classes* — not just two
// different-sounding hits of the same class — if they're at least this many
// octaves apart. Real kick/snare/hat registers are typically several octaves
// apart (a kick around a few hundred Hz vs. a snare's crack in the low
// kHz is already 2-3 octaves); hit-to-hit variation within one class from
// velocity/mic movement is real but much smaller than that.
const MIN_CLASS_SEPARATION_OCTAVES = 0.5;

const CLASSES_LOW_TO_HIGH: DrumClass[] = ['kick', 'snare', 'hat'];

/** Ascending-centroid groups of original indices, split at the largest gaps
 * in log-frequency — at most 2 splits (3 groups), and only where a gap is
 * wide enough to plausibly be a different sound rather than the same sound
 * played a bit differently. */
function groupByCentroid(logCentroids: number[]): number[][] {
  const order = logCentroids.map((_, i) => i).sort((a, b) => logCentroids[a] - logCentroids[b]);
  const gaps = order
    .slice(0, -1)
    .map((_, i) => ({ afterPos: i, size: logCentroids[order[i + 1]] - logCentroids[order[i]] }))
    .filter((g) => g.size >= MIN_CLASS_SEPARATION_OCTAVES)
    .sort((a, b) => b.size - a.size)
    .slice(0, 2)
    .map((g) => g.afterPos)
    .sort((a, b) => a - b);

  const groups: number[][] = [];
  let start = 0;
  for (const afterPos of gaps) {
    groups.push(order.slice(start, afterPos + 1));
    start = afterPos + 1;
  }
  groups.push(order.slice(start));
  return groups;
}

/**
 * Which class name goes with each group, low-to-high. With all 3 groups
 * present there's only one order-preserving way to do it (kick < snare <
 * hat). With fewer, relative pitch alone can't say e.g. whether a single,
 * uniform take is all kicks or all hats — so as a last resort, each
 * possible low-to-high labelling is scored against the fixed reference
 * points (DEFAULT_CLASSIFIER_THRESHOLDS) and the closest match wins. This is
 * the only place those fixed points still matter, and only when the take
 * itself doesn't have enough variety to self-calibrate.
 */
function labelGroups(groups: number[][], logCentroids: number[], thresholds: ClassifierThresholds): DrumClass[] {
  if (groups.length === 3) return CLASSES_LOW_TO_HIGH;

  const groupMeanLog = groups.map((idxs) => idxs.reduce((sum, i) => sum + logCentroids[i], 0) / idxs.length);
  const refLog: Record<DrumClass, number> = {
    kick: Math.log2(thresholds.kickCentroidHz),
    snare: Math.log2(thresholds.snareCentroidHz),
    hat: Math.log2(thresholds.hatCentroidHz),
  };
  // Every increasing (low-to-high) way to pick `groups.length` names out of
  // CLASSES_LOW_TO_HIGH — with 3 classes that's only 3 choices for 1 group,
  // or 3 choices for 2 groups.
  const candidates: DrumClass[][] =
    groups.length === 1
      ? CLASSES_LOW_TO_HIGH.map((c) => [c])
      : [
          ['kick', 'snare'],
          ['kick', 'hat'],
          ['snare', 'hat'],
        ];

  let best = candidates[0];
  let bestCost = Infinity;
  for (const candidate of candidates) {
    const cost = candidate.reduce((sum, cls, i) => sum + Math.abs(groupMeanLog[i] - refLog[cls]), 0);
    if (cost < bestCost) {
      bestCost = cost;
      best = candidate;
    }
  }
  return best;
}

/**
 * Classifies every hit in a take *relative to the others in that same
 * take*, instead of against fixed absolute pitch targets: a performer's own
 * kick, snare and hat sit wherever their voice/kit/mic put them, but within
 * one take a kick is reliably the lowest-pitched of the three, snare in the
 * middle, hat highest. So this sorts all the take's hits by spectral
 * centroid and splits them at the largest gaps (see groupByCentroid) —
 * whatever comes out low is "kick", middle is "snare", high is "hat"
 * (labelGroups). A take with fewer than 3 real sounds naturally collapses
 * to fewer groups rather than being forced into 3.
 *
 * Confidence reflects how well the take separated: for a group formed by an
 * actual gap in the data, it's how wide that gap was relative to
 * MIN_CLASS_SEPARATION_OCTAVES; for a group whose label came from the
 * fixed-point fallback (too little variety to self-calibrate), it's how
 * close that group's average centroid was to the reference pitch it matched.
 */
export function classifyTakeHits(
  featuresList: HitFeatures[],
  thresholds: ClassifierThresholds = DEFAULT_CLASSIFIER_THRESHOLDS
): ClassificationResult[] {
  if (featuresList.length === 0) return [];

  const logCentroids = featuresList.map((f) => Math.log2(Math.max(f.centroid, 1)));
  const groups = groupByCentroid(logCentroids);
  const labels = labelGroups(groups, logCentroids, thresholds);
  const refLog: Record<DrumClass, number> = {
    kick: Math.log2(thresholds.kickCentroidHz),
    snare: Math.log2(thresholds.snareCentroidHz),
    hat: Math.log2(thresholds.hatCentroidHz),
  };

  const results: ClassificationResult[] = new Array(featuresList.length);
  groups.forEach((idxs, groupIndex) => {
    const cls = labels[groupIndex];
    const confidence =
      groups.length === 3
        ? Math.min(
            groupIndex > 0 ? ramp(logCentroids[idxs[0]] - logCentroids[groups[groupIndex - 1].at(-1)!], 0, MIN_CLASS_SEPARATION_OCTAVES * 2) : 1,
            groupIndex < groups.length - 1 ? ramp(logCentroids[groups[groupIndex + 1][0]] - logCentroids[idxs.at(-1)!], 0, MIN_CLASS_SEPARATION_OCTAVES * 2) : 1
          )
        : centroidCloseness(2 ** (idxs.reduce((sum, i) => sum + logCentroids[i], 0) / idxs.length), 2 ** refLog[cls]);

    for (const i of idxs) {
      results[i] = { class: cls, confidence: clamp01(confidence), features: featuresList[i] };
    }
  });

  return results;
}
