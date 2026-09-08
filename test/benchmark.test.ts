import { describe, it } from 'node:test';
import assert from 'node:assert';
import Meyda, { type MeydaFeaturesObject } from 'meyda';
import {
  synthesizeKick,
  synthesizeSnare,
  synthesizeHat,
  synthesizeBeatboxTake,
} from './fixtures/synth-beatbox.ts';
import {
  extractHitFeatures,
  classifyTakeHits,
  type HitFeatures,
} from '../src/audio/classifier.ts';
import type { TransientFrame } from '../src/audio/types.ts';
import { detectHits } from '../src/audio/offline-analysis.ts';
import { DEFAULT_AUDIO_ENGINE_CONFIG } from '../src/audio/audio-engine.ts';

const FFT_SIZE = 512;
const SAMPLE_RATE = 48000;
const FEATURES = ['rms', 'spectralFlatness', 'powerSpectrum', 'zcr'] as const;

/** Helper: extracts frames from an audio buffer using Meyda */
function extractFrames(samples: Float32Array, sampleRate = SAMPLE_RATE, fftSize = FFT_SIZE): TransientFrame[] {
  const numBuffers = Math.floor(samples.length / fftSize);
  const frames: TransientFrame[] = [];

  for (let b = 0; b < numBuffers; b++) {
    const chunk = samples.subarray(b * fftSize, (b + 1) * fftSize);
    const timestamp = (b * fftSize) / sampleRate;
    const raw = Meyda.extract([...FEATURES], chunk) as Partial<MeydaFeaturesObject> | null;
    if (!raw) continue;

    frames.push({
      timestamp,
      rms: raw.rms ?? 0,
      spectralFlatness: raw.spectralFlatness ?? 0,
      powerSpectrum: raw.powerSpectrum ?? new Float32Array(0),
      zcr: raw.zcr ?? 0,
    });
  }

  return frames;
}

describe('Beatbox Acoustic Benchmark Fixtures', () => {
  it('extracts distinct acoustic features matching physical models', () => {
    const kickSamples = synthesizeKick(SAMPLE_RATE, 120, 0.8);
    const snareSamples = synthesizeSnare(SAMPLE_RATE, 110, 0.75);
    const hatSamples = synthesizeHat(SAMPLE_RATE, 35, 0.6);

    const kickFeatures = extractHitFeatures(extractFrames(kickSamples), SAMPLE_RATE, FFT_SIZE);
    const snareFeatures = extractHitFeatures(extractFrames(snareSamples), SAMPLE_RATE, FFT_SIZE);
    const hatFeatures = extractHitFeatures(extractFrames(hatSamples), SAMPLE_RATE, FFT_SIZE);

    // Kicks must have high low-band energy and low high-band energy
    assert(
      kickFeatures.lowBandEnergy > 0.35,
      `Expected kick lowBandEnergy > 0.35, got ${kickFeatures.lowBandEnergy}`
    );
    assert(
      kickFeatures.highBandEnergy < 0.20,
      `Expected kick highBandEnergy < 0.20, got ${kickFeatures.highBandEnergy}`
    );

    // Hi-Hats must have high high-band energy and minimal low-band energy
    assert(
      hatFeatures.highBandEnergy > 0.40,
      `Expected hat highBandEnergy > 0.40, got ${hatFeatures.highBandEnergy}`
    );
    assert(
      hatFeatures.lowBandEnergy < 0.15,
      `Expected hat lowBandEnergy < 0.15, got ${hatFeatures.lowBandEnergy}`
    );

    // Snares must exhibit high spectral flatness (turbulent noise) compared to kicks
    assert(
      snareFeatures.flatness > kickFeatures.flatness,
      `Expected snare flatness (${snareFeatures.flatness}) > kick flatness (${kickFeatures.flatness})`
    );
  });

  it('measures classification performance on multi-hit beatbox sequence', () => {
    // 2-bar typical standard beatbox sequence:
    // Bar 1: Kick, Hat, Snare, Hat, Kick, Kick, Snare, Hat
    // Bar 2: Kick, Hat, Snare, Hat, Kick, Hat, Snare, Hat
    const pattern = [
      { class: 'kick' as const, step: 0 },
      { class: 'hat' as const, step: 2 },
      { class: 'snare' as const, step: 4 },
      { class: 'hat' as const, step: 6 },
      { class: 'kick' as const, step: 8 },
      { class: 'kick' as const, step: 10 },
      { class: 'snare' as const, step: 12 },
      { class: 'hat' as const, step: 14 },
      { class: 'kick' as const, step: 16 },
      { class: 'hat' as const, step: 18 },
      { class: 'snare' as const, step: 20 },
      { class: 'hat' as const, step: 22 },
      { class: 'kick' as const, step: 24 },
      { class: 'hat' as const, step: 26 },
      { class: 'snare' as const, step: 28 },
      { class: 'hat' as const, step: 30 },
    ];

    const take = synthesizeBeatboxTake(pattern, 120, SAMPLE_RATE);

    // Extract features for each ground truth hit window
    const hitFeaturesList: HitFeatures[] = [];

    for (const gt of take.groundTruth) {
      const startSample = Math.floor((gt.timeMs / 1000) * SAMPLE_RATE);
      const endSample = startSample + Math.floor((gt.durationMs / 1000) * SAMPLE_RATE);
      const hitSlice = take.samples.subarray(startSample, endSample);
      const frames = extractFrames(hitSlice, SAMPLE_RATE, FFT_SIZE);
      hitFeaturesList.push(extractHitFeatures(frames, SAMPLE_RATE, FFT_SIZE));
    }

    const results = classifyTakeHits(hitFeaturesList, ['kick', 'snare', 'hat']);

    let correct = 0;
    for (let i = 0; i < pattern.length; i++) {
      const expected = pattern[i].class;
      const predicted = results[i]?.class;
      if (predicted === expected) {
        correct++;
      } else {
        console.log(`[Diagnostic] Hit ${i} (${expected}): predicted ${predicted}, brightness=${hitFeaturesList[i].brightness.toFixed(3)}, low=${hitFeaturesList[i].lowBandEnergy.toFixed(3)}, mid=${hitFeaturesList[i].midBandEnergy.toFixed(3)}, high=${hitFeaturesList[i].highBandEnergy.toFixed(3)}`);
      }
    }

    const accuracy = (correct / pattern.length) * 100;
    console.log(`\nStandard Take Accuracy: ${accuracy.toFixed(1)}% (${correct}/${pattern.length})`);
    assert(accuracy >= 95, `Expected >= 95% accuracy on standard take, got ${accuracy}%`);
  });

  it('accurately classifies sequence starting with a Hi-Hat (pick-up beat)', () => {
    // A beatboxer counts in or plays a pickup: Hat, Hat, Kick, Snare
    const pickupPattern = [
      { class: 'hat' as const, step: 0 },
      { class: 'hat' as const, step: 1 },
      { class: 'kick' as const, step: 2 },
      { class: 'snare' as const, step: 4 },
      { class: 'hat' as const, step: 6 },
      { class: 'kick' as const, step: 8 },
      { class: 'snare' as const, step: 12 },
    ];

    const take = synthesizeBeatboxTake(pickupPattern, 120, SAMPLE_RATE);
    const hitFeaturesList: HitFeatures[] = [];

    for (const gt of take.groundTruth) {
      const startSample = Math.floor((gt.timeMs / 1000) * SAMPLE_RATE);
      const endSample = startSample + Math.floor((gt.durationMs / 1000) * SAMPLE_RATE);
      const hitSlice = take.samples.subarray(startSample, endSample);
      const frames = extractFrames(hitSlice, SAMPLE_RATE, FFT_SIZE);
      hitFeaturesList.push(extractHitFeatures(frames, SAMPLE_RATE, FFT_SIZE));
    }

    const results = classifyTakeHits(hitFeaturesList, ['kick', 'snare', 'hat']);
    let correct = 0;
    for (let i = 0; i < pickupPattern.length; i++) {
      if (results[i]?.class === pickupPattern[i].class) correct++;
      assert.strictEqual(results[i]?.class, pickupPattern[i].class, `Pickup hit ${i} mismatch`);
    }
    const accuracy = (correct / pickupPattern.length) * 100;
    console.log(`Pickup Hat Start Take Accuracy: ${accuracy.toFixed(1)}% (${correct}/${pickupPattern.length})`);
    assert.strictEqual(accuracy, 100);
  });

  it('accurately classifies take with only Hats and Snares (no kicks)', () => {
    // Pattern: Hat, Hat, Snare, Hat, Hat, Snare (typical top-end groove)
    const hatSnarePattern = [
      { class: 'hat' as const, step: 0 },
      { class: 'hat' as const, step: 2 },
      { class: 'snare' as const, step: 4 },
      { class: 'hat' as const, step: 6 },
      { class: 'hat' as const, step: 8 },
      { class: 'snare' as const, step: 12 },
    ];

    const take = synthesizeBeatboxTake(hatSnarePattern, 120, SAMPLE_RATE);
    const hitFeaturesList: HitFeatures[] = [];

    for (const gt of take.groundTruth) {
      const startSample = Math.floor((gt.timeMs / 1000) * SAMPLE_RATE);
      const endSample = startSample + Math.floor((gt.durationMs / 1000) * SAMPLE_RATE);
      const hitSlice = take.samples.subarray(startSample, endSample);
      const frames = extractFrames(hitSlice, SAMPLE_RATE, FFT_SIZE);
      hitFeaturesList.push(extractHitFeatures(frames, SAMPLE_RATE, FFT_SIZE));
    }

    // Default activeClasses includes kick, snare, hat
    const results = classifyTakeHits(hitFeaturesList, ['kick', 'snare', 'hat']);
    console.log(`\nHat-Snare Take (no kicks) classifications:`);
    for (let i = 0; i < hatSnarePattern.length; i++) {
      console.log(`  Hit ${i} (expected ${hatSnarePattern[i].class}): classified as ${results[i]?.class}`);
      assert.strictEqual(results[i]?.class, hatSnarePattern[i].class, `Hit ${i} mismatch`);
    }
  });

  it('measures end-to-end onset detection recall and precision on realistic take', () => {
    const pattern = [
      { class: 'kick' as const, step: 0, velocity: 0.9 },
      { class: 'hat' as const, step: 2, velocity: 0.25 }, // Quiet hi-hat after loud kick
      { class: 'snare' as const, step: 4, velocity: 0.8 },
      { class: 'hat' as const, step: 6, velocity: 0.25 },
      { class: 'kick' as const, step: 8, velocity: 0.85 },
      { class: 'hat' as const, step: 10, velocity: 0.3 },
      { class: 'snare' as const, step: 12, velocity: 0.8 },
      { class: 'hat' as const, step: 14, velocity: 0.25 },
    ];

    const take = synthesizeBeatboxTake(pattern, 120, SAMPLE_RATE, 0.005);
    const detected = detectHits(take.samples, take.sampleRate, DEFAULT_AUDIO_ENGINE_CONFIG);

    console.log(`\nOnset Detection Performance:`);
    console.log(`  Ground truth hits: ${pattern.length}`);
    console.log(`  Detected hits: ${detected.length}`);

    // Check hit matching within 60ms window
    let matched = 0;
    for (const gt of take.groundTruth) {
      const match = detected.find((d) => Math.abs(d.timeMs - gt.timeMs) < 60);
      if (match) {
        matched++;
      } else {
        console.log(`  [MISSED ONSET] ${gt.class} at ${gt.timeMs.toFixed(1)}ms`);
      }
    }

    const recall = (matched / pattern.length) * 100;
    const precision = detected.length > 0 ? (matched / detected.length) * 100 : 0;
    console.log(`  Onset Recall: ${recall.toFixed(1)}% (${matched}/${pattern.length})`);
    console.log(`  Onset Precision: ${precision.toFixed(1)}% (${matched}/${detected.length})`);
    assert(recall >= 95, `Expected onset recall >= 95%, got ${recall}%`);
    assert(precision >= 95, `Expected onset precision >= 95%, got ${precision}%`);
  });
});



