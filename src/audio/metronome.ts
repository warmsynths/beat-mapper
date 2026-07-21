// A reference click to help the performer stay in time while recording —
// audible only when headphones are on (see `audible`), so its own acoustic
// bleed can never reach the mic; otherwise the same beat is tracked silently
// for a visual pulse to follow instead. Audio playback is scheduled against
// the AudioContext's own clock rather than setInterval (which drifts under
// JS event-loop jitter), using the standard lookahead pattern: a cheap timer
// wakes up often and schedules any clicks due in the next short window using
// precise ctx.currentTime targets.
export class Metronome {
  private static readonly LOOKAHEAD_MS = 25;
  private static readonly SCHEDULE_AHEAD_S = 0.1;
  private static readonly CLICK_GAIN = 0.05;
  private static readonly ACCENT_GAIN = 0.09;
  private static readonly CLICK_DURATION_S = 0.02;

  private readonly ctx: AudioContext;
  private bpm: number;
  /** Whether the click actually plays through the speakers. When false (no
   * headphones), the beat is tracked silently — start()/getBeatPhase() still
   * establish the phase a visual metronome can follow — but no audio node is
   * ever created, so there's no bleed for isJustAfterClick() to guard
   * against in the first place. */
  private readonly audible: boolean;
  private nextClickTime = 0;
  /** ctx.currentTime of the very first (scheduled or silent) beat — the
   * phase reference isJustAfterClick() and getBeatPhase() measure against. */
  private firstClickTime = 0;
  private beatIndex = 0;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;

  constructor(ctx: AudioContext, bpm: number, audible: boolean) {
    this.ctx = ctx;
    this.bpm = bpm;
    this.audible = audible;
  }

  start(): void {
    this.beatIndex = 0;
    this.firstClickTime = this.ctx.currentTime + 0.05;
    this.nextClickTime = this.firstClickTime;
    // Only run the scheduler (which plays audio) when audible — a silent
    // metronome needs no lookahead loop, since getBeatPhase() derives the
    // beat directly from firstClickTime/bpm rather than from scheduled state.
    if (this.audible) {
      this.schedulerTimer = setInterval(() => this.scheduler(), Metronome.LOOKAHEAD_MS);
    }
  }

  stop(): void {
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = null;
  }

  /**
   * True if `ctxTime` falls within `windowS` seconds after the most recent
   * beat, but only when the click is actually audible — a silent metronome
   * never bleeds into the mic, so there's nothing to suppress, and treating
   * a virtual click time as real would just ignore genuine hits landing
   * exactly on the beat (i.e. most of them).
   */
  isJustAfterClick(ctxTime: number, windowS: number): boolean {
    if (!this.audible) return false;
    if (ctxTime < this.firstClickTime) return false;
    const beatDurationS = 60 / this.bpm;
    const phase = (ctxTime - this.firstClickTime) % beatDurationS;
    return phase <= windowS;
  }

  /**
   * Current position within the beat, for a visual metronome pulse: `phase`
   * runs 0 (just on the beat) to 1 (about to tick again), `beatIndex` counts
   * beats since the first one (for a 4-beat accent pattern). Works
   * regardless of `audible`, since it's computed straight from the fixed
   * phase reference rather than from any scheduled audio.
   */
  getBeatPhase(ctxTime: number): { phase: number; beatIndex: number } {
    if (ctxTime < this.firstClickTime) return { phase: 0, beatIndex: -1 };
    const beatDurationS = 60 / this.bpm;
    const elapsed = ctxTime - this.firstClickTime;
    return { phase: (elapsed % beatDurationS) / beatDurationS, beatIndex: Math.floor(elapsed / beatDurationS) };
  }

  private scheduler(): void {
    const beatDurationS = 60 / this.bpm;
    while (this.nextClickTime < this.ctx.currentTime + Metronome.SCHEDULE_AHEAD_S) {
      this.playClick(this.nextClickTime, this.beatIndex % 4 === 0);
      this.nextClickTime += beatDurationS;
      this.beatIndex++;
    }
  }

  /** A short, faint sine blip — a felt reference tick, not a click track. */
  private playClick(time: number, accent: boolean): void {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = accent ? 1500 : 1000;
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const peak = accent ? Metronome.ACCENT_GAIN : Metronome.CLICK_GAIN;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(peak, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + Metronome.CLICK_DURATION_S);

    osc.start(time);
    osc.stop(time + Metronome.CLICK_DURATION_S);
  }
}
