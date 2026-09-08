# 06 Quantization Syncopation Tolerance and Grid Transcription Alignment

Type: task
Status: resolved
Blocked by: 04

## Question

How should `quantize.ts` and `app-root.ts` handle vocal timing variation and syncopation around 16th-note boundaries so that human beatboxed timing translates cleanly into tight step patterns on the target BPM?

## Resolution

1. **Downbeat & Pickup Beat Anchoring (`detectPickupAnchor`)**:
   - Detects whether a take begins with an upbeat count-in or pickup beat (e.g. initial `hat` followed 1 or 2 16th notes later by a primary `kick` downbeat).
   - Anchors the grid to the true downbeat kick at Step 0, wrapping the pickup beat to Step 15 (or 14) so the loop cycles seamlessly into the downbeat.
   - Preserves non-pickup takes (e.g. hat-and-snare takes with no kicks) starting at Step 0.

2. **Global Phase Offset Optimization (`computeGlobalPhaseOffsetMs`)**:
   - Calculates the median microtiming residual across all detected hits relative to the nominal 16th-note grid.
   - Adjusts the global anchor time $t_{\text{anchor}} = t_{\text{ref}} + \phi$, eliminating systemic DC bias caused by a performer rushing (-35ms) or dragging their initial hit.

3. **Swing & Syncopation Tolerance (`snapToStep`)**:
   - Incorporates human swing tolerance by expanding the 16th-note off-beat capture window up to 1.65 steps (65% swing).
   - Prevents delayed or swung off-beat 16th-note hi-hats ("e" and "a" steps) from erroneously rolling over into adjacent 8th-note downbeats.

4. **Confidence-Weighted Collision Deduplication**:
   - When vocal flutter or rapid double-tongue transients produce multiple hits of the same drum class mapping to the same step index, deduplicates by retaining the hit with higher classification confidence and lower grid residual.
   - Allows multi-class layering on the same step (e.g. simultaneous Kick + Hat on Step 0).

5. **Terminal Resolution Handling (Loop Length Snapping)**:
   - Recognizes when a performer ends recording on the boundary downbeat of the next bar (e.g. Step 16 of a 16-step bar).
   - Folds the terminal resolving hit into Step 0 and prevents inflating the loop to 32 steps with an empty bar of silence.

