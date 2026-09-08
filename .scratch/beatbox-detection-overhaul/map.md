# Wayfinder Map: Beatbox Detection & Transcription Overhaul

## Destination

A zero-configuration hybrid acoustic engine and dual-band onset detector that reliably distinguishes beatboxed kicks (`b`/`p`), snares (`k`/`pff`), and hi-hats (`t`/`ts`) from microphone input or audio files, transcribing them accurately onto the quantized 16th-note grid.

## Notes

- Domain: Beatboxing vocal percussion acoustics (sub-bass plosives, turbulent noise snares, high-frequency fricative hats).
- Skills: `/domain-modeling`, `/tdd`, `/diagnosing-bugs`.
- Constraints: Zero-configuration client-side WebAudio/Meyda, >= 95% benchmark accuracy, real-time live visual pad response.
- Issue Tracker: Local Markdown (`.scratch/beatbox-detection-overhaul/`).

## Decisions so far

- [01 Acoustic Feature Profiles of Beatbox Phonemes](issues/01-acoustic-feature-profiles.md) — Multi-dimensional acoustic feature vector (Low-Band <250Hz, High-Band >3kHz, ZCR, Flatness, Duration) replaces 1D brightness clustering.
- [02 Audio Fixture Test Runner and Benchmark Suite](issues/02-audio-fixture-test-runner.md) — Node native test runner (`npm test`) with synthesized beatbox fixtures, reproducing the exact 100% hat-to-kick misclassification and onset drop bugs.
- [03 Dual-Band and Spectral Flux Onset Detection Engine](issues/03-dual-band-onset-detection.md) — Unified OnsetDetector using dual-band flux (<300Hz and >2500Hz) and peak-relative release, boosting onset recall from 12.5% to 100% and precision to 100%.
- [04 Multi-Feature Acoustic Classifier and Hybrid Disambiguation](issues/04-multi-feature-hybrid-classifier.md) — 5D acoustic vector scoring and relative fallback, delivering 100% classification accuracy on kicks, snares, and hats without first-hit assumptions.
- [05 Real-Time Live Visual Pad Trigger Integration](issues/05-live-visual-pad-triggers.md) — Instant single-hit classification on transient onset driving ~10ms visual pad and lane flashes across SP-404 and PO devices without blocking audio or corrupting take aggregation.
- [06 Quantization Syncopation Tolerance and Grid Transcription Alignment](issues/06-quantization-syncopation-tolerance.md) — Downbeat/pickup anchoring, global phase offset optimization eliminating first-hit microtiming bias, swing tolerance up to 65%, and collision deduplication.

## Not yet specified

<!-- see "Fog of war": in-scope fog you can't ticket yet; graduates as the frontier advances -->

- **Voice Profile Calibration Extension**: If extreme vocal registers, unusual mic frequency responses, or heavy room reverb degrade zero-config accuracy, how to add an optional, seamless 3-sound calibration profile in `localStorage` without violating the zero-config default. (Depends on empirical benchmark results from Tickets 01-04).
- **Expanded Sound Vocabulary**: Distinguishing open vs closed hi-hats, rimshots, 808 sub-bass, and throat bass once Big Three detection reaches >= 95% accuracy.
- **Freeform BPM & Downbeat Induction**: Automatically inferring tempo, bar length, and downbeat from un-metronomed freestyle beatbox takes.

## Out of scope

- **Live Audio Auditioning Without Headphones**: Playing synthesized drum samples through speakers while recording via live microphone (causes immediate acoustic feedback loops).
- **Heavyweight Deep-Learning Models**: Multi-megabyte TensorFlow.js / ONNX weights requiring network bundles, high memory overhead, and CPU inference latency when lightweight acoustic feature extraction solves the problem deterministically.
