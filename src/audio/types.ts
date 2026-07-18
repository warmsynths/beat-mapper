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
  rmsThreshold: number;
  onsetHoldMs: number;
  cooldownMs: number;
}

export interface EngineStateChangeDetail {
  state: EngineState;
}

export type TransientDetectedDetail = TransientFrame[];
