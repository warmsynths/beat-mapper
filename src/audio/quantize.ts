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
const MIN_BPM = 60;
const MAX_BPM = 180;

/** Snaps each hit onto the nearest 16th-note step at the given tempo. */
export function quantizeHits(hits: RecordedHit[], bpm: number): QuantizedPattern {
  if (hits.length === 0) {
    return { steps: [], totalSteps: STEPS_PER_BAR };
  }

  const stepDurationMs = 60000 / bpm / 4;
  // Anchor the grid to the first detected hit, not to the moment the record
  // button was pressed — otherwise lead-in silence before the first
  // beatboxed hit pushes everything off step 0.
  const startMs = Math.min(...hits.map((h) => h.timeMs));
  const relativeTimesMs = hits.map((h) => h.timeMs - startMs);
  const maxTimeMs = Math.max(...relativeTimesMs);
  const rawTotalSteps = Math.round(maxTimeMs / stepDurationMs) + 1;
  const totalSteps = Math.max(STEPS_PER_BAR, Math.ceil(rawTotalSteps / STEPS_PER_BAR) * STEPS_PER_BAR);

  const steps: QuantizedHit[] = hits.map((h) => ({
    step: Math.min(totalSteps - 1, Math.round((h.timeMs - startMs) / stepDurationMs)),
    class: h.class,
    controlLabel: h.controlLabel,
  }));

  return { steps, totalSteps };
}

export { STEPS_PER_BAR, MIN_BPM, MAX_BPM };
