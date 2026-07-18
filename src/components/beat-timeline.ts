import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { beatBusContext } from '../state/contexts.ts';
import type { BeatBus, ClassifiedBeatEvent } from '../state/beat-bus.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES, resolveThemeColor } from '../ui/theme.ts';
import type { DrumClass } from '../audio/classifier.ts';

const WINDOW_MS = 6000;
const LANES = DRUM_CLASS_LANES;
const PLAYHEAD_RATIO = 0.88;

/**
 * Scrolling visualization of recent classified hits, oscilloscope-style —
 * shows the overall pattern of what's been beatboxed, not just the last hit.
 * Newest events enter at the playhead line and scroll left as they age.
 */
@customElement('beat-timeline')
export class BeatTimeline extends LitElement {
  @consume({ context: beatBusContext })
  private bus!: BeatBus;

  private canvas: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private events: ClassifiedBeatEvent[] = [];
  private rafId = 0;
  private dpr = Math.min(window.devicePixelRatio || 1, 2);
  private resizeObserver: ResizeObserver | null = null;

  /** CLASS_COLORS holds CSS var() references for use in styled markup;
   * canvas needs concrete colors, so resolve them once against this host. */
  private resolvedLaneColors = new Map<DrumClass, string>();

  connectedCallback(): void {
    super.connectedCallback();
    this.bus.addEventListener('beat', this.onBeat as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.bus.removeEventListener('beat', this.onBeat as EventListener);
    this.resizeObserver?.disconnect();
    cancelAnimationFrame(this.rafId);
  }

  firstUpdated(): void {
    this.canvas = this.renderRoot.querySelector('canvas');
    this.ctx2d = this.canvas?.getContext('2d') ?? null;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    if (this.canvas) this.resizeObserver.observe(this.canvas);
    this.resize();
    for (const lane of LANES) {
      this.resolvedLaneColors.set(lane, resolveThemeColor(this, CLASS_COLORS[lane].fg));
    }
    this.rafId = requestAnimationFrame(this.draw);
  }

  private resize(): void {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, rect.width * this.dpr);
    this.canvas.height = Math.max(1, rect.height * this.dpr);
  }

  private onBeat = (event: CustomEvent<ClassifiedBeatEvent>): void => {
    this.events.push(event.detail);
  };

  private draw = (): void => {
    this.rafId = requestAnimationFrame(this.draw);
    const ctx = this.ctx2d;
    const canvas = this.canvas;
    if (!ctx || !canvas || canvas.width === 0) return;

    const now = performance.now();
    this.events = this.events.filter((ev) => now - ev.timestamp < WINDOW_MS);

    const w = canvas.width;
    const h = canvas.height;
    const laneHeight = h / LANES.length;
    const playheadX = w * PLAYHEAD_RATIO;

    // Trail fade instead of a hard clear, so recent marks leave a faint streak.
    ctx.fillStyle = 'rgba(8, 8, 11, 0.32)';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = this.dpr;
    for (let i = 1; i < LANES.length; i++) {
      const y = i * laneHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 176, 32, 0.45)';
    ctx.lineWidth = 2 * this.dpr;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, h);
    ctx.stroke();

    for (const ev of this.events) {
      const age = now - ev.timestamp;
      const progress = age / WINDOW_MS;
      const x = playheadX * (1 - progress);
      const laneIndex = LANES.indexOf(ev.class);
      if (laneIndex === -1) continue;
      const y = laneIndex * laneHeight + laneHeight / 2;
      const color = this.resolvedLaneColors.get(ev.class) ?? CLASS_COLORS[ev.class].fg;
      const radius = (4 + ev.confidence * 6) * this.dpr;

      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - progress);
      ctx.shadowColor = color;
      ctx.shadowBlur = 14 * this.dpr;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  render() {
    return html`
      <div class="wrap">
        <div class="lane-labels">
          ${LANES.map((c) => html`<span style="color:${CLASS_COLORS[c].fg}">${CLASS_COLORS[c].label}</span>`)}
        </div>
        <canvas></canvas>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .wrap {
      position: relative;
    }

    canvas {
      width: 100%;
      height: 120px;
      display: block;
      border-radius: var(--radius-lg);
      background: var(--color-well);
      border: 1px solid var(--border, var(--color-border-subtle));
    }

    .lane-labels {
      position: absolute;
      left: var(--space-3);
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      pointer-events: none;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'beat-timeline': BeatTimeline;
  }
}
