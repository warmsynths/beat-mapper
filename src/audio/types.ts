export const EngineState = {
  IDLE: 'idle',
  LISTENING: 'listening',
  ONSET_HOLD: 'onset_hold',
  COOLDOWN: 'cooldown',
} as const;

export type EngineState = (typeof EngineState)[keyof typeof EngineState];

export interface TransientFrame {
  timestamp: number;
  rms: number;
  spectralFlatness: number;
  powerSpectrum: Float32Array;
  zcr: number;
}

export interface AudioEngineConfig {
  fftSize: number;
  /**
   * How many times louder than the rolling ambient noise floor a frame's rms
   * must be to count as an onset. A ratio (not an absolute rms delta) so the
   * gate self-calibrates to however loud/quiet a given mic + room happens to
   * be — including when autoGainControl has already boosted the ambient
   * floor itself, which an absolute margin can't track.
   */
  onsetRatio: number;
  /**
   * Fraction of the onset gate a hit's rms must decay below before it's
   * considered over (hysteresis, so tail ringing right at the gate doesn't
   * chatter). A hit is held — and its frames captured — for as long as its
   * level stays above this, rather than for one fixed duration; real hits
   * vary a lot in how long they take to decay.
   */
  releaseRatio: number;
  /** Safety cap on how long a single hit can be held before it's force-ended
   * regardless of level, so sustained non-percussive input can't hang the
   * detector indefinitely. */
  maxHoldMs: number;
  /** Minimum dead time after a hit ends before a new one can begin. */
  cooldownMs: number;
  /**
   * Shortest hold that counts as a real hit. A single loud sample (a mic
   * bump, a click, a stray spike right as the noise floor is still settling)
   * can cross the onset gate and immediately fall back below the release
   * gate within one or two frames — nowhere near long enough to be an actual
   * percussive sound, but long enough to get captured and classified as a
   * (spurious, usually silent-sounding) hit. Anything held for less than
   * this is dropped rather than emitted.
   */
  minHoldMs: number;
}

export interface EngineStateChangeDetail {
  state: EngineState;
}

export type TransientDetectedDetail = TransientFrame[];

export interface LevelDetail {
  /** Current frame's rms. */
  level: number;
  /** Current absolute onset gate (rolling noise floor × onsetRatio), same units as level. */
  threshold: number;
}
