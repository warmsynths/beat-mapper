import type { DrumClass } from './classifier.ts';

export interface RecordedHit {
  class: DrumClass;
  controlId: string;
  controlLabel: string;
  confidence: number;
  /** Milliseconds since the recording started. */
  timeMs: number;
}

export interface QuantizedHit {
  step: number;
  class: DrumClass;
  controlLabel: string;
}

export interface QuantizedPattern {
  steps: QuantizedHit[];
  totalSteps: number;
}

const STEPS_PER_BAR = 16; // standard 16th-note grid, matches the SP-404's own pattern sequencer
const DEFAULT_BPM = 100;
const MIN_BPM = 60;
const MAX_BPM = 180;

/**
 * Best-effort tempo estimate from the gaps between consecutive hits.
 * Treats the median inter-onset interval as one 16th-note step, then folds
 * the result into a sane BPM range by doubling/halving — a common trick for
 * correcting octave errors (e.g. mistaking an 8th-note gap for a 16th).
 * This is a starting point, not a guarantee — the UI lets the user nudge it.
 */
export function estimateBpm(hits: RecordedHit[]): number {
  if (hits.length < 2) return DEFAULT_BPM;

  const times = hits.map((h) => h.timeMs).sort((a, b) => a - b);
  const iois: number[] = [];
  for (let i = 1; i < times.length; i++) {
    const gap = times[i] - times[i - 1];
    if (gap > 60) iois.push(gap); // ignore near-duplicate onsets from quantization jitter
  }
  if (iois.length === 0) return DEFAULT_BPM;

  iois.sort((a, b) => a - b);
  const median = iois[Math.floor(iois.length / 2)];

  let bpm = 60000 / (median * 4);
  while (bpm < MIN_BPM) bpm *= 2;
  while (bpm > MAX_BPM) bpm /= 2;

  return Math.round(bpm);
}

/** Snaps each hit onto the nearest 16th-note step at the given tempo. */
export function quantizeHits(hits: RecordedHit[], bpm: number): QuantizedPattern {
  if (hits.length === 0) {
    return { steps: [], totalSteps: STEPS_PER_BAR };
  }

  const stepDurationMs = 60000 / bpm / 4;
  const maxTimeMs = Math.max(...hits.map((h) => h.timeMs));
  const rawTotalSteps = Math.round(maxTimeMs / stepDurationMs) + 1;
  const totalSteps = Math.max(STEPS_PER_BAR, Math.ceil(rawTotalSteps / STEPS_PER_BAR) * STEPS_PER_BAR);

  const steps: QuantizedHit[] = hits.map((h) => ({
    step: Math.min(totalSteps - 1, Math.round(h.timeMs / stepDurationMs)),
    class: h.class,
    controlLabel: h.controlLabel,
  }));

  return { steps, totalSteps };
}

export { STEPS_PER_BAR, MIN_BPM, MAX_BPM };
