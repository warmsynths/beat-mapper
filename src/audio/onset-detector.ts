import type { TransientFrame } from './types.ts';

export interface OnsetDetectorConfig {
  fftSize: number;
  sampleRate: number;
  /** Upper bound (Hz) for low-frequency flux (kick transients). Default: 300 Hz. */
  lowCutoffHz: number;
  /** Lower bound (Hz) for high-frequency flux (hi-hat transients). Default: 2500 Hz. */
  highCutoffHz: number;
  /** Positive flux threshold in low band to trigger a kick onset. Default: 35. */
  lowFluxThreshold: number;
  /** Positive flux threshold in high band to trigger a hi-hat onset. Default: 12. */
  highFluxThreshold: number;
  /** Minimum RMS ratio above noise floor for broadband onset. Default: 2.5. */
  rmsRatioThreshold: number;
  /** Minimum absolute RMS to trigger any onset, preventing mic hiss false triggers. Default: 0.012. */
  minAbsoluteRms: number;
  /** Minimum hold duration in ms for a percussive hit. Default: 10ms. */
  minHoldMs: number;
  /** Maximum hold duration in ms before forcing a release. Default: 90ms. */
  maxHoldMs: number;
  /** Cooldown in ms after release before next onset can trigger. Default: 20ms. */
  cooldownMs: number;
  /** Ratio of peak hit RMS to release against. Default: 0.35. */
  releasePeakRatio: number;
  /** Exponential moving average alpha for noise floor tracking. Default: 0.05. */
  noiseFloorAlpha: number;
}

export const DEFAULT_ONSET_CONFIG: OnsetDetectorConfig = {
  fftSize: 512,
  sampleRate: 48000,
  lowCutoffHz: 300,
  highCutoffHz: 2500,
  lowFluxThreshold: 35,
  highFluxThreshold: 15,
  rmsRatioThreshold: 2.5,
  minAbsoluteRms: 0.012,
  minHoldMs: 10,
  maxHoldMs: 120,
  cooldownMs: 25,
  releasePeakRatio: 0.20,
  noiseFloorAlpha: 0.05,
};

export class OnsetDetector {
  private config: OnsetDetectorConfig;
  private state: 'listening' | 'hold' | 'cooldown' = 'listening';
  private noiseFloor = 0.002;
  private prevPowerSpectrum: Float32Array = new Float32Array(0);
  private prevRms = 0;
  private holdBuffer: TransientFrame[] = [];
  private holdStartedAt = 0;
  private peakRms = 0;
  private cooldownUntil = 0;
  private framesSeen = 0;

  constructor(config: Partial<OnsetDetectorConfig> = {}) {
    this.config = { ...DEFAULT_ONSET_CONFIG, ...config };
  }

  getNoiseFloor(): number {
    return this.noiseFloor;
  }

  getState(): 'listening' | 'hold' | 'cooldown' {
    return this.state;
  }

  reset(): void {
    this.state = 'listening';
    this.noiseFloor = 0.002;
    this.prevPowerSpectrum = new Float32Array(0);
    this.prevRms = 0;
    this.holdBuffer = [];
    this.holdStartedAt = 0;
    this.peakRms = 0;
    this.cooldownUntil = 0;
    this.framesSeen = 0;
  }

  /**
   * Processes an incoming audio frame.
   * Returns a complete TransientFrame[] when a hit completes its hold, or null otherwise.
   */
  processFrame(frame: TransientFrame, suppressingClick = false): TransientFrame[] | null {
    const {
      fftSize,
      sampleRate,
      lowCutoffHz,
      highCutoffHz,
      lowFluxThreshold,
      highFluxThreshold,
      rmsRatioThreshold,
      minAbsoluteRms,
      minHoldMs,
      maxHoldMs,
      cooldownMs,
      releasePeakRatio,
      noiseFloorAlpha,
    } = this.config;

    this.framesSeen++;
    const binWidth = sampleRate / fftSize;
    const spec = frame.powerSpectrum;

    // Calculate dual-band spectral flux (positive difference from previous frame)
    let lowFlux = 0;
    let highFlux = 0;

    if (this.prevPowerSpectrum.length === spec.length) {
      for (let i = 0; i < spec.length; i++) {
        const diff = Math.max(0, spec[i] - this.prevPowerSpectrum[i]);
        const freq = i * binWidth;
        if (freq <= lowCutoffHz) {
          lowFlux += diff;
        } else if (freq >= highCutoffHz) {
          highFlux += diff;
        }
      }
    }
    this.prevPowerSpectrum = Float32Array.from(spec);

    // Warm-up initial noise floor on the very first few frames
    if (this.framesSeen <= 3) {
      this.noiseFloor = Math.max(this.noiseFloor, frame.rms);
      this.prevRms = frame.rms;
      return null;
    }

    // While listening and not suppressing metronome click, update ambient noise floor
    if (this.state === 'listening' && !suppressingClick) {
      this.noiseFloor += (frame.rms - this.noiseFloor) * noiseFloorAlpha;
    }

    // A true percussive onset requires either a sudden jump in low-band flux (kick),
    // a sudden jump in high-band flux (hat), or an abrupt positive attack rise in broadband RMS.
    // Requiring a rise (frame.rms > prevRms * 1.5) prevents the decaying tail of a loud kick/snare
    // from re-triggering as a new hit when cooldown finishes.
    const isRmsRise = frame.rms > this.prevRms * 1.4 && frame.rms > this.noiseFloor * rmsRatioThreshold && frame.rms > minAbsoluteRms;
    const isOnset =
      !suppressingClick &&
      (lowFlux > lowFluxThreshold ||
        highFlux > highFluxThreshold ||
        isRmsRise);

    this.prevRms = frame.rms;

    switch (this.state) {
      case 'listening': {
        if (isOnset) {
          this.state = 'hold';
          this.holdStartedAt = frame.timestamp;
          this.peakRms = frame.rms;
          this.holdBuffer = [frame];
        }
        return null;
      }

      case 'hold': {
        if (suppressingClick) return null;

        this.holdBuffer.push(frame);
        this.peakRms = Math.max(this.peakRms, frame.rms);
        const elapsedMs = (frame.timestamp - this.holdStartedAt) * 1000;
        const releaseThreshold = Math.max(this.noiseFloor * 1.3, this.peakRms * releasePeakRatio);

        if (frame.rms <= releaseThreshold || elapsedMs >= maxHoldMs) {
          const finishedFrames = this.holdBuffer;
          this.holdBuffer = [];
          this.state = 'cooldown';
          this.cooldownUntil = frame.timestamp + cooldownMs / 1000;

          if (elapsedMs >= minHoldMs || finishedFrames.length >= 2) {
            return finishedFrames;
          }
        }
        return null;
      }

      case 'cooldown': {
        if (frame.timestamp >= this.cooldownUntil) {
          this.state = 'listening';
        }
        return null;
      }
    }
  }

  /**
   * Flushes any hit currently held at the end of recording.
   */
  flush(endTimestamp: number): TransientFrame[] | null {
    if (this.state === 'hold' && this.holdBuffer.length > 0) {
      const elapsedMs = (endTimestamp - this.holdStartedAt) * 1000;
      const finishedFrames = this.holdBuffer;
      this.holdBuffer = [];
      this.state = 'listening';
      if (elapsedMs >= this.config.minHoldMs || finishedFrames.length >= 2) {
        return finishedFrames;
      }
    }
    return null;
  }
}
