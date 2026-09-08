# 02 Audio Fixture Test Runner and Benchmark Suite

Type: task
Status: resolved
Blocked by: 01

## Question

How should we construct a headless Node/Vite test runner that feeds ground-truth annotated synthetic and recorded beatbox waveforms through Meyda feature extraction and evaluates onset detection precision/recall and drum classification accuracy against a >= 95% target threshold?

## Answer

Constructed a headless, zero-dependency test runner via Node's native test runner (`npm test` -> `node --experimental-strip-types --test test/*.test.ts`).

1. **Acoustic Synthesizer Fixtures**: `test/fixtures/synth-beatbox.ts` physically models:
   - Kick: 160Hz -> 48Hz exponential pitch sweep with initial 6ms plosive puff and low ZCR.
   - Snare: 900Hz - 4500Hz bandpass turbulent noise with 180Hz tonal resonance and high spectral flatness.
   - Hi-Hat: >4500Hz highpass noise with ultra-fast 25-45ms decay and high ZCR.
   - Full take synthesis with realistic mic noise floor and ground-truth timestamps.
2. **Benchmark Verification**: `test/benchmark.test.ts` proved two critical flaws in the current codebase:
   - **Classification Flaw**: In hat-and-snare takes, 100% of hi-hats are misclassified as kicks because the classifier anchors on the first hit being a kick.
   - **Onset Detection Flaw**: Under realistic dynamic ranges (loud kicks alongside quiet hi-hats), onset recall plummets to 12.5% because the single RMS gate is overwhelmed by kick energy, swallowing hi-hat onsets.

This benchmark provides the objective verification harness for Ticket 03 (Dual-band onset detection) and Ticket 04 (Multi-feature classifier).
