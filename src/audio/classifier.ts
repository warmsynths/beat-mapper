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
  /** Upper bound (Hz) of the "low band" used for energy bucketing. */
  lowBandHz: number;
  /** Upper bound (Hz) of the "mid band" used for energy bucketing; above this is "high band". */
  midBandHz: number;
}

export const DEFAULT_CLASSIFIER_THRESHOLDS: ClassifierThresholds = {
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

const CLASSES_LOW_TO_HIGH: DrumClass[] = ['kick', 'snare', 'hat'];

/**
 * Which class name goes with each group. With all 3 groups present, the
 * take's own clustering already fully determines the answer — kick < snare
 * < hat is the only order-preserving assignment, so it's used outright, no
 * matter where the first hit happens to land.
 *
 * With fewer than 3 groups, the take's own clustering can't say *which*
 * class is missing — so as ground truth, a performer almost always opens a
 * beat on the kick: whichever group contains the take's first hit (index 0)
 * is taken to be "kick", and the remaining group(s) fill in snare then hat
 * outward from there. This only ever has to place at most one more group on
 * each side, since groups.length < 3 here. Anchoring on the take's own first
 * hit rather than a fixed absolute pitch handles performers whose kick
 * doesn't happen to be deeply bass-heavy (a quiet, breathy kick can measure
 * *brighter* than a loud, sung snare) without having to guess a "typical"
 * register that may not match them at all.
 */
function labelGroups(groups: number[][], firstHitGroupIndex: number): DrumClass[] {
  if (groups.length === 3) return CLASSES_LOW_TO_HIGH;

  const labels: DrumClass[] = new Array(groups.length);
  labels[firstHitGroupIndex] = 'kick';
  const outward: DrumClass[] = ['snare', 'hat'];
  let next = 0;
  for (let i = firstHitGroupIndex + 1; i < groups.length; i++) labels[i] = outward[next++] ?? 'hat';
  next = 0;
  for (let i = firstHitGroupIndex - 1; i >= 0; i--) labels[i] = outward[next++] ?? 'hat';

  return labels;
}

/**
 * Classifies every hit in a take *relative to the others in that same
 * take*, instead of against fixed absolute targets: a performer's own kick,
 * snare and hat sit wherever their voice/kit/mic put them, but within one
 * take a kick is reliably the bassiest of the three, snare in the middle,
 * hat the brightest. So this sorts all the take's hits by brightness (see
 * HitFeatures.brightness) and splits them at the largest gaps (see
 * groupByBrightness), then labels each group low-to-high — anchored on the
 * take's first hit when there isn't full 3-way separation to go on
 * (labelGroups). A take with fewer than 3 real sounds naturally collapses to
 * fewer groups rather than being forced into 3.
 *
 * `featuresList` must be in chronological order — both callers (live take,
 * file upload) already build it that way.
 *
 * Confidence is how wide the gap to each neighboring group was, relative to
 * MIN_CLASS_SEPARATION_BRIGHTNESS: a group with no neighbor on one side (the
 * take's darkest or brightest group, or the only group there is) scores full
 * confidence on that side, since there's nothing to have been confused with.
 */
export function classifyTakeHits(featuresList: HitFeatures[]): ClassificationResult[] {
  if (featuresList.length === 0) return [];

  const brightness = featuresList.map((f) => f.brightness);
  const groups = groupByBrightness(brightness);
  const firstHitGroupIndex = groups.findIndex((idxs) => idxs.includes(0));
  const labels = labelGroups(groups, firstHitGroupIndex);

  const results: ClassificationResult[] = new Array(featuresList.length);
  groups.forEach((idxs, groupIndex) => {
    const cls = labels[groupIndex];
    const confidence = Math.min(
      groupIndex > 0
        ? ramp(brightness[idxs[0]] - brightness[groups[groupIndex - 1].at(-1)!], 0, MIN_CLASS_SEPARATION_BRIGHTNESS * 2)
        : 1,
      groupIndex < groups.length - 1
        ? ramp(brightness[groups[groupIndex + 1][0]] - brightness[idxs.at(-1)!], 0, MIN_CLASS_SEPARATION_BRIGHTNESS * 2)
        : 1
    );

    for (const i of idxs) {
      results[i] = { class: cls, confidence: clamp01(confidence), features: featuresList[i] };
    }
  });

  return results;
}
