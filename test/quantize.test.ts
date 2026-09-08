import { describe, it } from 'node:test';
import assert from 'node:assert';
import { quantizeHits, type RecordedHit, STEPS_PER_BAR } from '../src/audio/quantize.ts';

describe('Quantization & Syncopation Tolerance', () => {
  const bpm = 120; // 125ms per 16th note step

  it('accurately snaps ideal on-grid hits to steps', () => {
    const hits: RecordedHit[] = [
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: 1000 },
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.90, timeMs: 1250 }, // step 2
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.92, timeMs: 1500 }, // step 4
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.88, timeMs: 1750 }, // step 6
    ];

    const pattern = quantizeHits(hits, bpm);
    assert.strictEqual(pattern.totalSteps, STEPS_PER_BAR);
    assert.strictEqual(pattern.steps.length, 4);
    assert.strictEqual(pattern.steps[0].step, 0);
    assert.strictEqual(pattern.steps[0].class, 'kick');
    assert.strictEqual(pattern.steps[1].step, 2);
    assert.strictEqual(pattern.steps[1].class, 'hat');
    assert.strictEqual(pattern.steps[2].step, 4);
    assert.strictEqual(pattern.steps[2].class, 'snare');
    assert.strictEqual(pattern.steps[3].step, 6);
    assert.strictEqual(pattern.steps[3].class, 'hat');
  });

  it('compensates for rushed first hit via global phase offset optimization', () => {
    // Performer hit first kick 35ms early (relative time 0).
    // Ideal 16th-note step is 125ms.
    // If anchored naively to hit 0, subsequent hits (which are on the true grid) have a +35ms error bias!
    // A dragged snare (+25ms) would have +60ms error, rounding into the wrong step.
    const leadIn = 500;
    const hits: RecordedHit[] = [
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: leadIn - 35 }, // rushed -35ms
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.85, timeMs: leadIn + 125 + 5 }, // step 1 (+5ms)
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.85, timeMs: leadIn + 250 - 10 }, // step 2 (-10ms)
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.92, timeMs: leadIn + 500 + 25 }, // step 4 dragged +25ms
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.90, timeMs: leadIn + 1000 }, // step 8
    ];

    const pattern = quantizeHits(hits, bpm);
    assert.strictEqual(pattern.steps.find((s) => s.class === 'kick' && s.step === 0) !== undefined, true, 'Kick on step 0');
    assert.strictEqual(pattern.steps.find((s) => s.class === 'hat' && s.step === 1) !== undefined, true, 'Hat on step 1');
    assert.strictEqual(pattern.steps.find((s) => s.class === 'hat' && s.step === 2) !== undefined, true, 'Hat on step 2');
    assert.strictEqual(pattern.steps.find((s) => s.class === 'snare' && s.step === 4) !== undefined, true, 'Snare on step 4');
    assert.strictEqual(pattern.steps.find((s) => s.class === 'kick' && s.step === 8) !== undefined, true, 'Kick on step 8');
  });

  it('aligns pickup hi-hat so kick downbeat anchors to step 0', () => {
    // Performer plays pickup hat 1 16th note before downbeat kick
    // Step duration = 125ms.
    const hits: RecordedHit[] = [
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.80, timeMs: 1000 }, // pickup at -125ms
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: 1125 }, // downbeat kick (0ms)
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.85, timeMs: 1375 }, // step 2
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.90, timeMs: 1625 }, // step 4
    ];

    const pattern = quantizeHits(hits, bpm);
    assert.strictEqual(pattern.totalSteps, STEPS_PER_BAR);

    // Kick must be at step 0
    const kickHit = pattern.steps.find((s) => s.class === 'kick');
    assert.strictEqual(kickHit?.step, 0, 'Downbeat kick must be on step 0');

    // Pickup hat must wrap to step 15
    const pickupHat = pattern.steps.find((s) => s.class === 'hat' && s.step === 15);
    assert.strictEqual(pickupHat !== undefined, true, 'Pickup hat must be placed on step 15');

    // Subsequent hits must align
    const hatStep2 = pattern.steps.find((s) => s.class === 'hat' && s.step === 2);
    assert.strictEqual(hatStep2 !== undefined, true, 'Hat on step 2');
    const snareStep4 = pattern.steps.find((s) => s.class === 'snare' && s.step === 4);
    assert.strictEqual(snareStep4 !== undefined, true, 'Snare on step 4');
  });

  it('retains delayed/swung 16th notes without collapsing onto 8th notes', () => {
    // Step duration = 125ms.
    // 8th note is step 2 at 250ms.
    // Swung 16th note step 1 delayed to 155ms (62% swing).
    // In naive rounding, 155ms would be dangerously close to the 187.5ms midpoint.
    // If pushed to 170ms (e.g. laid-back groove), naive rounding snaps to step 1 (170 < 187.5).
    // But if delayed to 195ms (heavy triplet swing or drag), naive rounding snaps to step 2!
    const hits: RecordedHit[] = [
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: 0 }, // step 0
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.88, timeMs: 195 }, // step 1 swung/delayed (1.56 steps)
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.90, timeMs: 255 }, // step 2 (8th note)
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.92, timeMs: 500 }, // step 4
    ];

    const pattern = quantizeHits(hits, bpm, { swingTolerance: true });
    const step1 = pattern.steps.find((s) => s.class === 'hat' && s.step === 1);
    const step2 = pattern.steps.find((s) => s.class === 'hat' && s.step === 2);
    assert.strictEqual(step1 !== undefined, true, 'Swung hat must stay on step 1');
    assert.strictEqual(step2 !== undefined, true, '8th note hat must stay on step 2');
  });

  it('deduplicates double-trigger hits of the same class by confidence', () => {
    // Performer double-hits or has rapid vocal transient bounce on step 2
    const hits: RecordedHit[] = [
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: 0 },
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.60, timeMs: 240 }, // lower confidence
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.92, timeMs: 260 }, // higher confidence
    ];

    const pattern = quantizeHits(hits, bpm);
    const hatHits = pattern.steps.filter((s) => s.class === 'hat' && s.step === 2);
    assert.strictEqual(hatHits.length, 1, 'Only one hat on step 2');
  });

  it('allows multi-class layering on the same step', () => {
    // Simultaneous Kick and Hat on step 0
    const hits: RecordedHit[] = [
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: 0 },
      { class: 'hat', controlId: 'p3', controlLabel: 'PAD 3', confidence: 0.88, timeMs: 15 },
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.92, timeMs: 500 },
    ];

    const pattern = quantizeHits(hits, bpm);
    const step0Hits = pattern.steps.filter((s) => s.step === 0);
    assert.strictEqual(step0Hits.length, 2, 'Both Kick and Hat must coexist on step 0');
    assert.strictEqual(step0Hits.some((s) => s.class === 'kick'), true);
    assert.strictEqual(step0Hits.some((s) => s.class === 'hat'), true);
  });

  it('avoids allocating an empty bar when take terminates on the boundary downbeat', () => {
    // 1-bar take where user stopped on the downbeat of bar 2 (step 16)
    const hits: RecordedHit[] = [
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.95, timeMs: 0 },
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.90, timeMs: 500 },
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.92, timeMs: 1000 },
      { class: 'snare', controlId: 'p5', controlLabel: 'PAD 5', confidence: 0.90, timeMs: 1500 },
      { class: 'kick', controlId: 'p1', controlLabel: 'PAD 1', confidence: 0.89, timeMs: 2000 }, // step 16 (terminal downbeat)
    ];

    const pattern = quantizeHits(hits, bpm);
    assert.strictEqual(pattern.totalSteps, STEPS_PER_BAR, 'Must remain a 1-bar loop (16 steps)');
    assert.strictEqual(pattern.steps.find((s) => s.step === 0 && s.class === 'kick') !== undefined, true);
  });
});
