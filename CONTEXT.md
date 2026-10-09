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

## Pattern Library

The app's primary mode. Capture (beatbox transcription) remains available as a second mode and shares the same device layer.

### Library Pattern
A curated, device-agnostic groove (`src/library/patterns.ts`): metadata (genre, feel, default BPM + range, tags) plus one lane per drum class. Lanes are 16th-note step strings — `x` is a hit, `-` a rest, whitespace between bars is ignored. Every lane has the same length, a whole number of bars.

### Feel / Density
- **Feel**: `straight`, `swung`, `half-time` or `broken` — descriptive metadata only; steps always sit on the 16th grid.
- **Density**: derived, never stored — hits per bar across all lanes (`sparse` ≤ 10, `medium` ≤ 17, `busy` above).

### Device Mapping
`toQuantizedPattern` lays a Library Pattern out for the selected device by routing each lane through that device's `classMapping` (first mapped control) — the same routing a hand-edited step uses. Switching device re-maps the loaded pattern rather than clearing it. Loaded patterns enter the same review state as a transcribed take, so pads can still be tapped to edit.

## Cue (the app at `index.html`)

The pattern library as a two-job app: **Program** (enter a pattern into your machine, one drum at a time) and **Play** (a score to learn it by hand). Source lives in `src/cue/`; the earlier library + beatbox Capture UI moved to `capture.html` unchanged.

- **Cue pattern**: curated reference grooves and finger drumming drills (`src/cue/data/library.ts`) with 16-step lanes for kick, snare, hat, open hat plus optional percussion (clap, rim, tom, bongo, cowbell, shaker, crash). Lanes use dynamic characters: `X` (accent), `x` (normal hit), `g` (ghost note), `.` (rest).
- **Dynamics**: three distinct velocity and sizing levels (`X` accent = punchy volume & highlighted visual; `x` normal = standard velocity; `g` ghost = feather-light velocity & soft visual).
- **Catalogue & Curriculum**: 135 masterfully transcribed beats spanning holy grail breakbeats, golden era boom bap, lofi/chillhop grooves, machine/electronic classics, house/techno foundations, hip-hop/trap/drill, UK garage/jungle/bass, Latin/Afro/world, reggae/dub, rock/punk/pop, and a 10-beat progressive finger drumming curriculum across Beginner, Intermediate, and Advanced tiers.
- **Rich Metadata & Inspector**: every beat includes Difficulty, historical Gear context, finger drumming & programming Tips, Tags, and recommended Hand assignments (`L` / `R`), accessible via an Inspector modal (`(i)` button).
- **Part**: Main, Var (variation) or Fill (known, or generated per genre). Main can hold several bars (`bars`, rough transcriptions for Amen, Funky Drummer, Billie Jean and others); Var and Fill are one bar each. Program shows one bar at a time via the Bar selector (bar 2 onwards = next page or next pattern on the machine); Play loops every bar of the part.
- **Chain**: one-bar beats loop main, main, var, fill; multi-bar beats play every Main bar, then Var (if any) and Fill.
- **Machine**: one of 23 drum machines (including TR-808, TR-909 and Behringer RD-78); each maps every lane to the pad/track/instrument it goes on (`map`), or leaves it unmapped when the machine has no such sound. Mappings marked `guess` are suggestions.
- **Focus**: in Play, the beats (1–4) being practised; playback loops only those.
- **Kit**: one of five synthesized voicings of the core four (808, 909, Acoustic, Dusty, Dancehall); extra percussion sounds the same in every kit. Each beat starts on the kit that suits its genre (`kitFor`); a picked kit lasts until another beat is chosen.
- **Tempo**: defaults to the beat's BPM; −/+ step by 2, or type a value (clamped to 40–220).
- `?view=mobile` pins the layout to a phone frame for previewing on desktop.
