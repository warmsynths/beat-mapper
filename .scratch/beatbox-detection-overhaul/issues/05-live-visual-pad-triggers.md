# 05 Real-Time Live Visual Pad Trigger Integration

Type: task
Status: resolved
Blocked by: 03, 04

## Question

How should the per-hit classifier and onset detector be integrated into `app-root.ts` so that hardware drum pads flash in real-time (~10ms latency) as the beatboxer performs, providing instant visual confirmation of sound detection without blocking audio analysis or corrupting take aggregation?

## Resolution

1. **Hit Feature Extraction & Real-Time Classification**:
   In `src/components/app-root.ts`, when `onTransient` fires from the engine's onset detector, the hit's acoustic features are extracted immediately via `extractHitFeatures(event.detail, sampleRate, fftSize)`.
   A single-hit classification is computed instantaneously via `classifySingleHit(features, this.activeClasses)`.

2. **Decoupled Visual Pulse State**:
   `app-root.ts` manages a `@state() private liveDetectedClass: DrumClass | null = null`. On each transient, `liveDetectedClass` is set to the detected class and a 140ms debounce pulse timer (`this.liveFlashTimer`) is scheduled to reset it back to null, providing crisp visual feedback without blocking audio processing or interfering with take aggregation.

3. **Reactive UI Propagation**:
   - In `hardware-panel.ts`, `.liveClass=${this.liveDetectedClass}` is passed to `<device-atlas>`. The status header updates to `REC · KICK / REC · SNARE / REC · HAT`.
   - In `device-atlas.ts`, both grid-based devices (e.g. SP-404) and pocket-operator devices (e.g. PO-33) identify the corresponding pads via `deviceConfig.classMapping[this.liveClass]`. The triggered pads are highlighted with `CLASS_COLORS[liveClass].fg`, increased stroke-width, and render the sound's geometric mark, accompanied by CSS pulse animation classes (`live-hit`, `live-lane`).

4. **Preserved Take Aggregation**:
   Visual triggers do not mutate `pendingHits`. When the recording finishes, the complete set of `pendingHits` is processed via `classifyTakeHits()` for global relative normalization and transcribed onto the step grid.

