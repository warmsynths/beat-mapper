import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// RMS value that visually maps to a "full" meter — tuned for typical
// beatboxed transients with AGC on, not a hard ceiling on the raw signal.
const VISUAL_MAX = 0.3;

/**
 * Live mic-level bar with a threshold marker, so "is my mic even being
 * picked up" and "why isn't it triggering" are answerable at a glance
 * instead of being a black box behind the classifier.
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
      height: 6px;
      border-radius: var(--radius-2xs);
      background: var(--color-well-soft);
      border: 1px solid var(--color-border-subtle);
      overflow: hidden;
    }

    .fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-snare), var(--color-accent));
      transition: width 40ms var(--ease-linear);
    }

    .track[data-hot] .fill {
      background: linear-gradient(90deg, var(--color-accent), var(--color-kick));
    }

    .marker {
      position: absolute;
      top: -2px;
      bottom: -2px;
      width: 2px;
      background: rgba(255, 255, 255, 0.65);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'level-meter': LevelMeter;
  }
}
