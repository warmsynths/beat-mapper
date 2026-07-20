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
   * How many times louder than the rolling ambient noise floor a frame's rms
   * must be to count as an onset. A ratio (not an absolute rms delta) so the
   * gate self-calibrates to however loud/quiet a given mic + room happens to
   * be — including when autoGainControl has already boosted the ambient
   * floor itself, which an absolute margin can't track.
   */
  onsetRatio: number;
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
  /** Current absolute onset gate (rolling noise floor × onsetRatio), same units as level. */
  threshold: number;
}
