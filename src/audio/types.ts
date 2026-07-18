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
  spectralCentroid: number;
  spectralFlatness: number;
  powerSpectrum: Float32Array;
  zcr: number;
}

export interface AudioEngineConfig {
  fftSize: number;
  /**
   * How far above the rolling ambient noise floor a frame's rms must rise to
   * count as an onset. A margin (not an absolute rms floor) so the gate
   * self-calibrates to however loud/quiet a given mic + room happens to be,
   * instead of relying on one fixed number to work for everyone.
   */
  onsetMargin: number;
  onsetHoldMs: number;
  cooldownMs: number;
}

export interface EngineStateChangeDetail {
  state: EngineState;
}

export type TransientDetectedDetail = TransientFrame[];

export interface LevelDetail {
  /** Current frame's rms. */
  level: number;
  /** Current absolute onset gate (rolling noise floor + onsetMargin), same units as level. */
  threshold: number;
}
