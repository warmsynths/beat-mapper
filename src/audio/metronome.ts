// A quiet reference click, purely to help the performer stay in time while
// recording — it's never read back into onset detection or timing anywhere.
// Scheduled against the AudioContext's own clock rather than setInterval
// (which drifts under JS event-loop jitter), using the standard lookahead
// pattern: a cheap timer wakes up often and schedules any clicks due in the
// next short window using precise ctx.currentTime targets.
export class Metronome {
  private static readonly LOOKAHEAD_MS = 25;
  private static readonly SCHEDULE_AHEAD_S = 0.1;
  private static readonly CLICK_GAIN = 0.05;
  private static readonly ACCENT_GAIN = 0.09;
  private static readonly CLICK_DURATION_S = 0.02;

  private readonly ctx: AudioContext;
  private bpm: number;
  private nextClickTime = 0;
  /** ctx.currentTime of the very first scheduled click — the phase
   * reference isJustAfterClick() measures against. */
  private firstClickTime = 0;
  private beatIndex = 0;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;

  constructor(ctx: AudioContext, bpm: number) {
    this.ctx = ctx;
    this.bpm = bpm;
  }

  start(): void {
    this.beatIndex = 0;
    this.firstClickTime = this.ctx.currentTime + 0.05;
    this.nextClickTime = this.firstClickTime;
    this.schedulerTimer = setInterval(() => this.scheduler(), Metronome.LOOKAHEAD_MS);
  }

  stop(): void {
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = null;
  }

  /**
   * True if `ctxTime` falls within `windowS` seconds after the most recent
   * scheduled click. AudioEngine uses this to ignore the click's own
   * acoustic bleed (speaker → mic, unavoidable without headphones) instead
   * of misreading it as a performed hit — a short sharp click is exactly
   * the kind of bright, broadband transient the classifier reads as a hat.
   */
  isJustAfterClick(ctxTime: number, windowS: number): boolean {
    if (ctxTime < this.firstClickTime) return false;
    const beatDurationS = 60 / this.bpm;
    const phase = (ctxTime - this.firstClickTime) % beatDurationS;
    return phase <= windowS;
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
