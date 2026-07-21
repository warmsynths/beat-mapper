import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { audioEngineContext } from '../state/contexts.ts';
import type { AudioEngine } from '../audio/audio-engine.ts';
import { resolveThemeColor } from '../ui/theme.ts';

const SCROLL_SAMPLES = 900; // width of the rolling window, in retained columns

// Visual metronome: a row of 4 beat dots (a bar's worth), the current beat
// flashing then fading out over the first BEAT_PULSE_FADE fraction of its
// length — this is the count a performer follows when there's no audible
// click (see Metronome.audible in audio-engine.ts).
const BEAT_DOT_COUNT = 4;
const BEAT_PULSE_FADE = 0.35;

/**
 * Fig. 01 — the live seismograph. A single ink line traced from the mic's
 * time-domain waveform while recording, scrolling right-to-left like a
 * strip-chart recorder; a flat baseline when idle. Deliberately unstyled,
 * no colour or glow — it reads as a signal printed on paper.
 */
@customElement('beat-timeline')
export class BeatTimeline extends LitElement {
  @consume({ context: audioEngineContext })
  private engine!: AudioEngine;

  /** True while a take is being recorded — drives live tracing vs. flat line. */
  @property({ type: Boolean }) recording = false;

  private canvas: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private rafId = 0;
  private dpr = Math.min(window.devicePixelRatio || 1, 2);
  private resizeObserver: ResizeObserver | null = null;

  private waveBuf = new Float32Array(2048);
  /** Rolling per-column peak amplitude (0..1), newest at the end. */
  private history: number[] = [];
  private inkColor = '#201e19';

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    cancelAnimationFrame(this.rafId);
  }

  firstUpdated(): void {
    this.canvas = this.renderRoot.querySelector('canvas');
    this.ctx2d = this.canvas?.getContext('2d') ?? null;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    if (this.canvas) this.resizeObserver.observe(this.canvas);
    this.resize();
    this.inkColor = resolveThemeColor(this, 'var(--ink)');
    this.history = new Array(SCROLL_SAMPLES).fill(0);
    if (this.engine) this.waveBuf = new Float32Array(this.engine.getWaveformSize());
    this.rafId = requestAnimationFrame(this.draw);
  }

  private resize(): void {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.round(rect.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(rect.height * this.dpr));
  }

  /** Push the current frame's peak amplitude, advancing the strip chart. */
  private sample(): void {
    let peak = 0;
    if (this.recording && this.engine?.getWaveform(this.waveBuf)) {
      for (let i = 0; i < this.waveBuf.length; i++) {
        const a = Math.abs(this.waveBuf[i]);
        if (a > peak) peak = a;
      }
      peak = Math.min(1, peak * 1.6);
    }
    this.history.push(peak);
    if (this.history.length > SCROLL_SAMPLES) this.history.shift();
  }

  private draw = (): void => {
    this.rafId = requestAnimationFrame(this.draw);
    const ctx = this.ctx2d;
    const canvas = this.canvas;
    if (!ctx || !canvas || canvas.width === 0) return;

    this.sample();

    const w = canvas.width;
    const h = canvas.height;
    const mid = h / 2;
    ctx.clearRect(0, 0, w, h);

    // baseline
    ctx.strokeStyle = 'rgba(154, 147, 132, 0.55)';
    ctx.lineWidth = this.dpr;
    ctx.beginPath();
    ctx.moveTo(0, mid);
    ctx.lineTo(w, mid);
    ctx.stroke();

    // mirrored seismograph trace: newest history at the right edge
    const n = this.history.length;
    const step = w / (n - 1);
    ctx.strokeStyle = this.inkColor;
    ctx.lineWidth = 1.1 * this.dpr;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = i * step;
      const amp = this.history[i] * (h * 0.46);
      // a touch of texture on the baseline so a quiet signal still reads as "live"
      const jitter = amp > 1 ? 0 : (Math.sin(i * 0.7) * 0.6);
      const y = mid - amp - jitter;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    for (let i = n - 1; i >= 0; i--) {
      const x = i * step;
      const amp = this.history[i] * (h * 0.46);
      const jitter = amp > 1 ? 0 : (Math.sin(i * 0.7) * 0.6);
      const y = mid + amp + jitter;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (this.recording) {
      const beat = this.engine?.getBeatPhase();
      if (beat && beat.beatIndex >= 0) this.drawBeatPulse(ctx, w, beat);
    }
  };

  /** Row of beat dots along the top edge; the current beat flashes bright
   * on the tick and fades out, the downbeat drawn slightly larger. */
  private drawBeatPulse(ctx: CanvasRenderingContext2D, w: number, beat: { phase: number; beatIndex: number }): void {
    const activeDot = ((beat.beatIndex % BEAT_DOT_COUNT) + BEAT_DOT_COUNT) % BEAT_DOT_COUNT;
    const intensity = Math.max(0, 1 - beat.phase / BEAT_PULSE_FADE);
    const y = 8 * this.dpr;
    const margin = w * 0.06;
    const spacing = (w - margin * 2) / (BEAT_DOT_COUNT - 1);
    const baseRadius = 2.2 * this.dpr;

    for (let i = 0; i < BEAT_DOT_COUNT; i++) {
      const x = margin + spacing * i;
      const isActive = i === activeDot;
      const radius = baseRadius * (i === 0 ? 1.4 : 1);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? this.inkColor : 'rgba(154, 147, 132, 0.55)';
      ctx.globalAlpha = isActive ? 0.35 + 0.65 * intensity : 1;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  render() {
    return html`<canvas></canvas>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    canvas {
      width: 100%;
      height: 116px;
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'beat-timeline': BeatTimeline;
  }
}
