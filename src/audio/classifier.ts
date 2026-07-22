import type { TransientFrame } from './types.ts';

export type DrumClass = 'kick' | 'snare' | 'hat';

export interface HitFeatures {
  /** 0 (all energy in the low band) .. 2 (all energy in the high band) — see extractHitFeatures. */
  brightness: number;
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
  /** Reference brightness (see HitFeatures.brightness) for a typical kick. */
  kickBrightness: number;
  /** Reference brightness for a typical snare. */
  snareBrightness: number;
  /** Reference brightness for a typical hat/cymbal. */
  hatBrightness: number;
  /** Upper bound (Hz) of the "low band" used for energy bucketing. */
  lowBandHz: number;
  /** Upper bound (Hz) of the "mid band" used for energy bucketing; above this is "high band". */
  midBandHz: number;
}

export const DEFAULT_CLASSIFIER_THRESHOLDS: ClassifierThresholds = {
  // Used only as a coarse tie-breaker when a take doesn't give classifyTakeHits
  // enough of its own variety to tell classes apart by relative brightness
  // alone (see classifyTakeHits) — never as a hard per-hit boundary. Evenly
  // spaced across brightness's fixed 0 (all-bass) .. 2 (all-treble) range:
  // unlike a raw Hz centroid, brightness is already a normalized ratio, so it
  // doesn't need a performer-specific "typical register" prior to be
  // meaningful.
  kickBrightness: 0.35,
  snareBrightness: 1.0,
  hatBrightness: 1.65,
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

// How far away (in brightness units) a class's reference point can be before
// that class scores zero, for the small-take fallback in classifyTakeHits.
const BRIGHTNESS_FALLOFF = 1.2;

function brightnessCloseness(brightness: number, reference: number): number {
  return clamp01(1 - Math.abs(brightness - reference) / BRIGHTNESS_FALLOFF);
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
    return { brightness: 0, flatness: 0, lowBandEnergy: 0, midBandEnergy: 0, highBandEnergy: 0 };
  }

  const weights = frames.map((f) => f.rms);
  const flatness = weightedAverage(frames.map((f) => f.spectralFlatness), weights);

  const bandSums = frames.map((f) => bandEnergy(f.powerSpectrum, sampleRate, fftSize, thresholds));
  const lowBandEnergy = weightedAverage(bandSums.map((b) => b.low), weights);
  const midBandEnergy = weightedAverage(bandSums.map((b) => b.mid), weights);
  const highBandEnergy = weightedAverage(bandSums.map((b) => b.high), weights);
  // 0 (all energy in the low band) .. 2 (all energy in the high band) — a
  // coarse, power-weighted "which third of the spectrum" score. Deliberately
  // not a spectral-centroid mean: a mean is pulled by how *far* a bin sits
  // from zero, so a long, thin tail of moderate high-frequency energy (mic
  // self-noise, breath hiss) can drag a hit's average frequency up even when
  // the clear plurality of its *power* sits in the low band — this was
  // verified against a real take, where a hit with 80%+ of its energy under
  // 200Hz still produced a centroid reading indistinguishable from actually
  // bright hits. Scoring by which band already holds the energy sidesteps
  // that.
  const brightness = midBandEnergy + 2 * highBandEnergy;

  return { brightness, flatness, lowBandEnergy, midBandEnergy, highBandEnergy };
}

// Two hits' brightness scores only count as different *classes* — not just
// two different-sounding hits of the same class — if they're at least this
// far apart on the 0 (all-bass) .. 2 (all-treble) scale. Calibrated against a
// real take with a genuine kick/snare/hat spread: the real gaps between
// classes landed at 0.17-0.26, while hit-to-hit variation within one class
// stayed under 0.13.
const MIN_CLASS_SEPARATION_BRIGHTNESS = 0.15;

const CLASSES_LOW_TO_HIGH: DrumClass[] = ['kick', 'snare', 'hat'];

/** Ascending-brightness groups of original indices, split at the largest
 * gaps — at most 2 splits (3 groups), and only where a gap is wide enough to
 * plausibly be a different sound rather than the same sound played a bit
 * differently. */
function groupByBrightness(brightness: number[]): number[][] {
  const order = brightness.map((_, i) => i).sort((a, b) => brightness[a] - brightness[b]);
  const gaps = order
    .slice(0, -1)
    .map((_, i) => ({ afterPos: i, size: brightness[order[i + 1]] - brightness[order[i]] }))
    .filter((g) => g.size >= MIN_CLASS_SEPARATION_BRIGHTNESS)
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
 * hat). With fewer, relative brightness alone can't say e.g. whether a
 * single, uniform take is all kicks or all hats — so as a last resort, each
 * possible low-to-high labelling is scored against the fixed reference
 * points (DEFAULT_CLASSIFIER_THRESHOLDS) and the closest match wins. This is
 * the only place those fixed points still matter, and only when the take
 * itself doesn't have enough variety to self-calibrate.
 */
function labelGroups(groups: number[][], brightness: number[], thresholds: ClassifierThresholds): DrumClass[] {
  if (groups.length === 3) return CLASSES_LOW_TO_HIGH;

  const groupMean = groups.map((idxs) => idxs.reduce((sum, i) => sum + brightness[i], 0) / idxs.length);
  const ref: Record<DrumClass, number> = {
    kick: thresholds.kickBrightness,
    snare: thresholds.snareBrightness,
    hat: thresholds.hatBrightness,
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
    const cost = candidate.reduce((sum, cls, i) => sum + Math.abs(groupMean[i] - ref[cls]), 0);
    if (cost < bestCost) {
      bestCost = cost;
      best = candidate;
    }
  }
  return best;
}

/**
 * Classifies every hit in a take *relative to the others in that same
 * take*, instead of against fixed absolute targets: a performer's own kick,
 * snare and hat sit wherever their voice/kit/mic put them, but within one
 * take a kick is reliably the bassiest of the three, snare in the middle,
 * hat the brightest. So this sorts all the take's hits by brightness (see
 * HitFeatures.brightness) and splits them at the largest gaps (see
 * groupByBrightness) — whatever comes out lowest is "kick", middle is
 * "snare", highest is "hat" (labelGroups). A take with fewer than 3 real
 * sounds naturally collapses to fewer groups rather than being forced into 3.
 *
 * Confidence reflects how well the take separated: for a group formed by an
 * actual gap in the data, it's how wide that gap was relative to
 * MIN_CLASS_SEPARATION_BRIGHTNESS; for a group whose label came from the
 * fixed-point fallback (too little variety to self-calibrate), it's how
 * close that group's average brightness was to the reference it matched.
 */
export function classifyTakeHits(
  featuresList: HitFeatures[],
  thresholds: ClassifierThresholds = DEFAULT_CLASSIFIER_THRESHOLDS
): ClassificationResult[] {
  if (featuresList.length === 0) return [];

  const brightness = featuresList.map((f) => f.brightness);
  const groups = groupByBrightness(brightness);
  const labels = labelGroups(groups, brightness, thresholds);
  const ref: Record<DrumClass, number> = {
    kick: thresholds.kickBrightness,
    snare: thresholds.snareBrightness,
    hat: thresholds.hatBrightness,
  };

  const results: ClassificationResult[] = new Array(featuresList.length);
  groups.forEach((idxs, groupIndex) => {
    const cls = labels[groupIndex];
    const confidence =
      groups.length === 3
        ? Math.min(
            groupIndex > 0
              ? ramp(brightness[idxs[0]] - brightness[groups[groupIndex - 1].at(-1)!], 0, MIN_CLASS_SEPARATION_BRIGHTNESS * 2)
              : 1,
            groupIndex < groups.length - 1
              ? ramp(brightness[groups[groupIndex + 1][0]] - brightness[idxs.at(-1)!], 0, MIN_CLASS_SEPARATION_BRIGHTNESS * 2)
              : 1
          )
        : brightnessCloseness(idxs.reduce((sum, i) => sum + brightness[i], 0) / idxs.length, ref[cls]);

    for (const i of idxs) {
      results[i] = { class: cls, confidence: clamp01(confidence), features: featuresList[i] };
    }
  });

  return results;
}
