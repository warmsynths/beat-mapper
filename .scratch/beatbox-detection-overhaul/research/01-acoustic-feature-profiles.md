# Research Findings: Acoustic Feature Profiles of Beatbox Phonemes

## Summary

This research establishes the empirical acoustic boundaries for discriminating between beatboxed kicks, snares, and hi-hats. Primary research in vocal percussion classification (UPF Music Technology Group, QMUL Centre for Digital Music, and Kapur et al.) demonstrates that a 1D brightness score is fundamentally inadequate because vocal snares and kicks both exhibit broadband bursts that confuse simple centroid/brightness measures. 

Reliable classification requires a multi-dimensional feature vector combining:
1. **Low-Band Energy Ratio (< 250 Hz)**
2. **High-Band Energy Ratio (> 3000 Hz)**
3. **Zero-Crossing Rate (ZCR)**
4. **Spectral Flatness (Noise vs. Tonality)**
5. **Transient Duration / Decay Envelope (Hold Time in ms)**

---

## 1. Acoustic Signatures of the Universal Beatbox Triad

### Kick Drum ('b', 'p', Throat Bass)
- **Acoustic Mechanism**: Plosive occlusion followed by sudden release of oral/pharyngeal pressure. Produces low-frequency resonant thump with minimal high-frequency friction.
- **Low-Band Energy Ratio (< 250 Hz)**: High (typically **> 0.35**, often up to 0.75+).
- **High-Band Energy Ratio (> 3000 Hz)**: Low (typically **< 0.15**).
- **Zero-Crossing Rate (ZCR)**: Very Low (normalized ZCR **< 0.12**; typically < 30 crossings per 512-sample frame).
- **Spectral Flatness**: Low-to-moderate (**0.02 to 0.30**); dominated by voiced formant energy and low-frequency resonance.
- **Duration / Envelope**: Punchy attack, sustained decay (**70ms to 250ms**).

### Snare Drum ('k' rim/tongue, 'pff', 'psh')
- **Acoustic Mechanism**: Turbulent airstream passing through a constricted vocal tract (lingual or bilabial frication/affrication).
- **Low-Band Energy Ratio (< 250 Hz)**: Low-to-moderate (**< 0.25**; can have minor low body in heavy 'pff' sounds).
- **Mid-Band Energy Ratio (250 Hz - 3000 Hz)**: High (**0.40 to 0.70**), providing the "crack" and body.
- **Zero-Crossing Rate (ZCR)**: Moderate-to-high (normalized ZCR **0.20 to 0.50**; 40 to 100 crossings per 512 frame).
- **Spectral Flatness**: Very High (**> 0.35**, often 0.50 to 0.85) due to white/pink turbulent noise.
- **Duration / Envelope**: Moderate decay (**50ms to 180ms**).

### Hi-Hat ('t', 'ts')
- **Acoustic Mechanism**: Alveolar or dental fricative release ('t' dental burst, 'ts' frication tail). Extremely short, localized high-frequency burst.
- **Low-Band Energy Ratio (< 250 Hz)**: Negligible (**< 0.08**).
- **High-Band Energy Ratio (> 3000 Hz)**: High (**> 0.50**).
- **Zero-Crossing Rate (ZCR)**: High-to-very-high (normalized ZCR **> 0.40**, often > 0.60; > 90 crossings per 512 frame).
- **Spectral Flatness**: Moderate-to-high (**> 0.30**), dominated by high-frequency noise.
- **Duration / Envelope**: Ultra-short transient (**20ms to 60ms** for closed 't'; up to 100ms for open 'ts').

---

## 2. Recommended Decision Boundaries & Feature Scoring

Instead of sorting by 1D brightness, hits should be classified via a weighted scoring function across the 5 acoustic features:

| Feature | Weight (Kick) | Weight (Snare) | Weight (Hat) |
| :--- | :--- | :--- | :--- |
| **Low-Band (< 250 Hz)** | **+4.0** (if > 0.30) | **-2.0** (if > 0.35) | **-5.0** (if > 0.15) |
| **High-Band (> 3000 Hz)** | **-3.0** (if > 0.25) | **+1.5** (if > 0.25) | **+4.0** (if > 0.45) |
| **Spectral Flatness** | **-2.0** (if > 0.40) | **+3.0** (if > 0.35) | **+1.5** (if > 0.30) |
| **ZCR (Normalized)** | **-3.0** (if > 0.25) | **+1.5** (if 0.18–0.45) | **+4.0** (if > 0.35) |
| **Duration (ms)** | **+1.5** (if > 80ms) | **+1.0** (if > 60ms) | **+2.5** (if < 50ms) |

### Relative Disambiguation Fallback
If a hit scores close between two classes (e.g. margin < 0.15):
- Compare the hit's low-band energy and ZCR against the median of all hits in the take.
- Kicks invariably possess the highest low-band energy and lowest ZCR in the take.
- Hats invariably possess the highest ZCR and lowest low-band energy in the take.
- Snares sit in between with the highest spectral flatness.

---

## 3. Implications for Meyda Feature Extraction & Onset Detection

1. **Additional Meyda Features**:
   - Add `spectralCentroid` and `spectralFlux` to `FEATURES = ['rms', 'spectralFlatness', 'powerSpectrum', 'zcr', 'spectralCentroid']`.
2. **Frequency Bin Spacing**:
   - At 48kHz with `fftSize: 512`, each bin is ~93.75 Hz.
   - Low band: Bins 0–2 (< 281 Hz).
   - Mid band: Bins 3–31 (281 Hz – 2906 Hz).
   - High band: Bins 32+ (> 2906 Hz).
3. **Dual-Band Onset Detection**:
   - Monitoring high-band spectral flux allows catching 't' hi-hats even when overall RMS is low (e.g. 0.01–0.03).
   - Monitoring low-band energy prevents airblast saturation from triggering false re-triggers during kick decay.
