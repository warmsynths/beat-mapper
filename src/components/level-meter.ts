import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// RMS value that visually maps to a "full" meter — tuned for typical
// beatboxed transients with AGC on, not a hard ceiling on the raw signal.
const VISUAL_MAX = 0.3;

/**
 * Printed MIC level meter: an ink-ruled bar that fills with tick hatching,
 * plus a threshold caret showing the current onset gate. Reads like a gauge
 * inked onto the page rather than a glowing VU meter.
 */
@customElement('level-meter')
export class LevelMeter extends LitElement {
  @property({ type: Number }) level = 0;
  @property({ type: Number }) threshold = 0;

  render() {
    const fillPct = Math.min(100, (this.level / VISUAL_MAX) * 100);
    const markerPct = Math.min(100, (this.threshold / VISUAL_MAX) * 100);
    const crossing = this.level >= this.threshold;

    return html`
      <div class="track" ?data-hot=${crossing}>
        <div class="fill" style="width: ${fillPct}%"></div>
        <div class="marker" style="left: ${markerPct}%"></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .track {
      position: relative;
      height: 12px;
      border: 1px solid var(--ink);
      background: var(--paper);
      overflow: hidden;
    }

    .fill {
      height: 100%;
      /* tick hatching, like a printed fill pattern */
      background: repeating-linear-gradient(
        90deg,
        var(--ink) 0 1px,
        transparent 1px 4px
      );
      transition: width 60ms var(--ease-linear);
    }

    .track[data-hot] .fill {
      background: repeating-linear-gradient(
        90deg,
        var(--kick) 0 1.5px,
        transparent 1.5px 4px
      );
    }

    .marker {
      position: absolute;
      top: -2px;
      bottom: -2px;
      width: 1px;
      background: var(--ink);
    }
    .marker::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -2.5px;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 4px solid var(--ink);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'level-meter': LevelMeter;
  }
}
