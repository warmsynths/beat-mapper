# 03 Dual-Band and Spectral Flux Onset Detection Engine

Type: prototype
Status: resolved
Blocked by: 01, 02

## Question

How should onset detection in `audio-engine.ts` and `offline-analysis.ts` be redesigned into a dual-band/spectral flux detector so that quiet, high-frequency hi-hat fricatives ('t') trigger reliable onsets alongside loud, low-frequency plosive kicks ('b') without false re-triggers, plosive splits, or cooldown drops?

## Answer

Constructed unified `OnsetDetector` class in `src/audio/onset-detector.ts` and integrated across both `audio-engine.ts` (live mic) and `offline-analysis.ts` (file upload).

Key engineering solutions:
1. **Dual-Band Spectral Flux**:
   - `lowFlux` (<300Hz) triggers kick plosive onsets instantly.
   - `highFlux` (>2500Hz) catches quiet hi-hat fricatives ('t') even when overall RMS is low (~0.01).
2. **Eliminated Hold-Trap Bug**:
   - Replaced flawed static gate release with peak-relative release (`releasePeakRatio: 0.20`, `maxHoldMs: 120ms`), preventing 400ms hold traps on ambient noise.
3. **Attack-Rise Transient Requirement**:
   - Requiring a positive energy rise (`frame.rms > prevRms * 1.4`) for broadband RMS onsets prevents decaying tails of loud kicks/snares from false re-triggering upon cooldown exit.
4. **Fast Transients Support**:
   - Tuned `minHoldMs: 10` and `cooldownMs: 25`, allowing 20-35ms hi-hats and rapid rolls to be detected cleanly.
5. **Benchmark Verification**:
   - Verified via `npm test`: Onset recall jumped from 12.5% to **100.0%**, with **100.0% precision** across realistic dynamic ranges.
