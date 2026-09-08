# 01 Acoustic Feature Profiles of Beatbox Phonemes

Type: research
Status: resolved
Blocked by: none

## Question

What are the empirical acoustic boundaries (frequency band splits, spectral flatness, zero-crossing rate, energy distribution, and transient decay envelopes) that reliably separate vocal percussion phonemes—specifically the universal beatbox triad of kicks ('b'/'p' plosive), snares ('k'/'pff'/'psh' turbulent noise), and hi-hats ('t'/'ts' fricative)—across varying microphones (built-in laptop mics, dynamic mics, headset mics) and sample rates (44.1kHz / 48kHz)?

## Answer

Resolved by research into primary acoustic literature (UPF MTG, QMUL C4DM) documented in [01-acoustic-feature-profiles.md](../research/01-acoustic-feature-profiles.md).

Key empirical boundaries established:
- **Kick**: Low-Band (<250Hz) energy > 0.35, High-Band (<3000Hz) < 0.15, ZCR normalized < 0.12, Flatness < 0.30, Duration 70-250ms.
- **Snare**: Mid-Band (250-3000Hz) energy 0.40-0.70, High Spectral Flatness > 0.35 (turbulent noise), ZCR 0.20-0.50, Duration 50-180ms.
- **Hi-Hat**: High-Band (>3000Hz) energy > 0.50, Negligible Low-Band (<0.08), High ZCR > 0.40, Ultra-short duration 20-60ms.

Scoring matrix and relative disambiguation rules defined in the research doc unblock Tickets 02, 03, and 04.
