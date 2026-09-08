# Beat Mapper Domain Model

## Core Domain Terms

### Drum Class
The three canonical drum sound categories recognized by the beatbox detection engine:
- **Kick**: Low-frequency, heavy plosive sound typically voiced as 'b', 'p', or a throat/chest thump. Characterized by dominant energy below 200 Hz, high transient attack, and low zero-crossing rate.
- **Snare**: Sharp, mid-to-high broadband sound typically voiced as 'k' (inward or outward), 'pff', or 'psh'. Characterized by high spectral flatness (turbulent noise), balanced mid/high energy, and medium decay duration.
- **Hat (Hi-Hat)**: Ultra-short, high-frequency fricative transient typically voiced as closed 't' or open 'ts'. Characterized by high zero-crossing rate, minimal low-band energy, and high spectral centroid.

### Onset Detection
The process of detecting the precise start of a percussive transient in the audio stream. Uses dual-band or spectral flux monitoring so that low-energy high-frequency transients (hi-hats) are captured reliably without being masked by loud low-frequency plosives (kicks).

### Acoustic Feature Vector
A multi-dimensional collection of spectral and temporal metrics extracted across an onset transient window:
- `lowBandEnergy`: Normalized power ratio below ~200 Hz.
- `midBandEnergy`: Normalized power ratio between ~200 Hz and ~2000 Hz.
- `highBandEnergy`: Normalized power ratio above ~2000 Hz.
- `spectralFlatness`: Measure of noise-likeness vs. tonality (0 = pure tone, 1 = white noise).
- `zcr`: Zero-crossing rate, indicative of high-frequency fricative noise.
- `spectralCentroid`: Power-weighted frequency center.
- `durationMs`: Transient hold duration from attack to release gate.

### Hybrid Classification
A two-tier classification pipeline:
1. **Tier 1 (Per-Hit Acoustic Scoring)**: Computes likelihood scores against absolute physical acoustic boundaries for Kick, Snare, and Hat.
2. **Tier 2 (Take-Level Relative Fallback)**: For borderline hits, uses relative feature distribution across the take to resolve ambiguity without rigid assumptions.

### Live Visual Feedback
Real-time triggering of UI drum pad animations during live recording: as soon as a transient is detected and classified via the Tier 1 acoustic vector (~10ms latency), the corresponding hardware pad illuminates to provide immediate feedback to the beatboxer.

### Acoustic Benchmark Fixtures
Automated test suite executing feature extraction and classification against a corpus of synthetic and recorded beatbox waveforms (kicks, snares, hats) to assert >= 95% classification accuracy across varying gain and microphone characteristics.

### Zero-Configuration Auto-Thresholding
Self-calibrating energy and spectral flux floors adapted from the ambient noise floor and spectral balance, avoiding manual threshold configuration knobs in the UI.

### Quantization & Transcription
The mapping of detected hits onto a musical timeline:
- Snapping hit timestamps to a 16th-note grid at the target BPM.
- Onset tolerance windows allowing human vocal syncopation to resolve to intended beat subdivisions.
- Device pad mapping routing each classified hit to its corresponding hardware drum pad.
