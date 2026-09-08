# 04 Multi-Feature Acoustic Classifier and Hybrid Take Disambiguation

Type: prototype
Status: resolved
Blocked by: 01, 02

## Question

How should `classifier.ts` implement Tier-1 per-hit multi-dimensional acoustic scoring (low/mid/high energy, spectral flatness, zero-crossing rate, centroid, transient duration) and Tier-2 take-level relative fallback, completely replacing the brittle 1D brightness gap clustering and first-hit-is-kick assumption?

## Answer

Completely redesigned `src/audio/classifier.ts` with hybrid classification:

1. **5-Dimensional Acoustic Scoring Function (`scoreHit`)**:
   - Scores each hit using lowBandEnergy (<250Hz), highBandEnergy (>2500Hz), spectral flatness (turbulent noise), zero-crossing rate (fricative frequency), and transient hold duration.
2. **Instant Per-Hit Classification (`classifySingleHit`)**:
   - Classifies any individual hit in real time against active drum classes, exporting confidence and enabling zero-latency live visual feedback.
3. **No First-Hit Assumptions**:
   - Eliminated `labelGroups` which falsely assumed that hit 0 was a kick.
4. **Hybrid Disambiguation (`classifyTakeHits`)**:
   - Hits with strong acoustic confidence are assigned immediately.
   - Borderline/ambiguous hits use relative distribution medians across the take to resolve edge cases.
5. **Benchmark Verification**:
   - Verified via `npm test`: 100% classification accuracy on standard beats, pickup hat starts, and hat-and-snare takes with zero kicks.
