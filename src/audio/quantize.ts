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

export interface QuantizeOptions {
  /** If true, detects if hit 0 is an upbeat pickup into a downbeat kick. Defaults to true. */
  detectPickup?: boolean;
  /** If true, aligns grid phase to the median microtiming offset across the take. Defaults to true. */
  optimizePhase?: boolean;
  /** If true, allows delayed/swung off-beat 16th notes to avoid collapsing onto 8th notes. Defaults to true. */
  swingTolerance?: boolean;
}

const STEPS_PER_BAR = 16; // standard 16th-note grid, matches the SP-404's own pattern sequencer
const MIN_BPM = 60;
const MAX_BPM = 180;

/**
 * Snap a continuous step position to the nearest discrete 16th note step index,
 * optionally with swing tolerance for off-beat 16th notes.
 */
function snapToStep(continuousStep: number, swingTolerance: boolean): number {
  if (!swingTolerance) {
    return Math.round(continuousStep);
  }

  // An 8th note contains 2 16th notes:
  // Step 2k: on-beat / 8th note
  // Step 2k+1: off-beat 16th note ("e" or "a")
  const e = Math.floor(continuousStep / 2) * 2;
  const pos = continuousStep - e; // pos in [0, 2)

  if (pos < 0.5) {
    return e;
  } else if (pos < 1.65) {
    // Widened window up to 1.65 (65% swing) captures human laid-back / swung 16th notes
    return e + 1;
  } else {
    return e + 2;
  }
}

/**
 * Detect whether the take starts with a pickup beat (e.g. hat before kick downbeat).
 */
function detectPickupAnchor(hits: RecordedHit[], stepDurationMs: number): { anchorIndex: number; isPickup: boolean } {
  if (hits.length < 2) {
    return { anchorIndex: 0, isPickup: false };
  }

  const first = hits[0];
  const second = hits[1];

  // Classic beatbox count-in / pickup: first hit is a hat, second hit is the primary kick
  if (first.class === 'hat' && second.class === 'kick') {
    const deltaMs = second.timeMs - first.timeMs;
    const deltaSteps = Math.round(deltaMs / stepDurationMs);
    // Pickup note usually occurs 1 or 2 16th notes (approx 16th or 8th note) before the kick
    if (deltaSteps === 1 || deltaSteps === 2) {
      const expectedDeltaMs = deltaSteps * stepDurationMs;
      if (Math.abs(deltaMs - expectedDeltaMs) < stepDurationMs * 0.42) {
        return { anchorIndex: 1, isPickup: true };
      }
    }
  }

  return { anchorIndex: 0, isPickup: false };
}

/**
 * Computes the median microtiming offset across all hits relative to the nominal grid.
 * This cancels out any systemic rushing or dragging of the first hit.
 */
function computeGlobalPhaseOffsetMs(hits: RecordedHit[], anchorTimeMs: number, stepDurationMs: number): number {
  if (hits.length <= 1) return 0;

  const residuals: number[] = [];
  for (const h of hits) {
    const relMs = h.timeMs - anchorTimeMs;
    const nominalStep = Math.round(relMs / stepDurationMs);
    const residual = relMs - nominalStep * stepDurationMs;
    // Exclude extreme outliers (e.g. erratic syncopation or triplets)
    if (Math.abs(residual) < stepDurationMs * 0.40) {
      residuals.push(residual);
    }
  }

  if (residuals.length === 0) return 0;
  residuals.sort((a, b) => a - b);
  const mid = Math.floor(residuals.length / 2);
  return residuals.length % 2 === 0
    ? (residuals[mid - 1] + residuals[mid]) / 2
    : residuals[mid];
}

/**
 * Snaps each hit onto the nearest 16th-note step at the given tempo with human
 * syncopation tolerance, global phase correction, and collision deduplication.
 */
export function quantizeHits(hits: RecordedHit[], bpm: number, options: QuantizeOptions = {}): QuantizedPattern {
  if (hits.length === 0) {
    return { steps: [], totalSteps: STEPS_PER_BAR };
  }

  const {
    detectPickup = true,
    optimizePhase = true,
    swingTolerance = true,
  } = options;

  const clampedBpm = Math.min(MAX_BPM, Math.max(MIN_BPM, bpm));
  const stepDurationMs = 60000 / clampedBpm / 4;

  // 1. Identify candidate downbeat anchor
  const { anchorIndex } = detectPickup
    ? detectPickupAnchor(hits, stepDurationMs)
    : { anchorIndex: 0 };

  const refTimeMs = hits[anchorIndex].timeMs;

  // 2. Compute global phase offset to eliminate first-hit microtiming bias
  const phaseOffsetMs = optimizePhase
    ? computeGlobalPhaseOffsetMs(hits, refTimeMs, stepDurationMs)
    : 0;

  const anchorMs = refTimeMs + phaseOffsetMs;

  // 3. Map hits to raw steps relative to anchor
  interface PlacedHit {
    step: number;
    class: DrumClass;
    controlLabel: string;
    confidence: number;
    residualMs: number;
  }

  const rawPlaced: PlacedHit[] = hits.map((h) => {
    const relMs = h.timeMs - anchorMs;
    const continuousStep = relMs / stepDurationMs;
    const step = snapToStep(continuousStep, swingTolerance);
    const residualMs = Math.abs(relMs - step * stepDurationMs);
    return {
      step,
      class: h.class,
      controlLabel: h.controlLabel,
      confidence: h.confidence,
      residualMs,
    };
  });

  // 4. Calculate pattern length and wrap pickup / negative steps
  // Find highest step index among forward hits
  const forwardSteps = rawPlaced.map((h) => h.step).filter((s) => s >= 0);
  const maxForwardStep = forwardSteps.length > 0 ? Math.max(...forwardSteps) : 0;

  // Initial estimate of total steps (multiple of STEPS_PER_BAR)
  let rawTotalSteps = Math.max(STEPS_PER_BAR, Math.ceil((maxForwardStep + 1) / STEPS_PER_BAR) * STEPS_PER_BAR);

  // Terminal resolution handling:
  // If the recording stopped right on the downbeat of the next bar (e.g. step 16 of a 16-step bar),
  // and there are NO other hits in that bar, fold it to the previous bar instead of allocating an empty bar of silence.
  if (rawTotalSteps > STEPS_PER_BAR) {
    const prevBarEnd = rawTotalSteps - STEPS_PER_BAR;
    const hitsInLastBar = rawPlaced.filter((h) => h.step >= prevBarEnd);
    // If the only hits in the last bar are exactly on step prevBarEnd (the boundary downbeat)
    const onlyOnBoundary = hitsInLastBar.length > 0 && hitsInLastBar.every((h) => h.step === prevBarEnd);
    if (onlyOnBoundary || hitsInLastBar.length === 0) {
      rawTotalSteps = prevBarEnd;
    }
  }

  const totalSteps = Math.max(STEPS_PER_BAR, rawTotalSteps);

  // 5. Wrap negative/pickup steps into the loop
  const wrappedPlaced: PlacedHit[] = rawPlaced.map((h) => {
    let s = h.step;
    if (s < 0) {
      s = ((s % totalSteps) + totalSteps) % totalSteps;
    } else if (s >= totalSteps) {
      s = s % totalSteps;
    }
    return { ...h, step: s };
  });

  // 6. Deduplicate collisions: same step + same class -> keep highest confidence
  const stepMap = new Map<string, PlacedHit>();
  for (const h of wrappedPlaced) {
    const key = `${h.step}:${h.class}`;
    const existing = stepMap.get(key);
    if (!existing) {
      stepMap.set(key, h);
    } else {
      if (
        h.confidence > existing.confidence ||
        (h.confidence === existing.confidence && h.residualMs < existing.residualMs)
      ) {
        stepMap.set(key, h);
      }
    }
  }

  // 7. Sort by step ascending, then class (kick, snare, hat)
  const CLASS_ORDER: Record<DrumClass, number> = { kick: 0, snare: 1, hat: 2 };
  const steps: QuantizedHit[] = Array.from(stepMap.values())
    .sort((a, b) => a.step - b.step || CLASS_ORDER[a.class] - CLASS_ORDER[b.class])
    .map(({ step, class: c, controlLabel }) => ({ step, class: c, controlLabel }));

  return { steps, totalSteps };
}

export { STEPS_PER_BAR, MIN_BPM, MAX_BPM };
