import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceControl } from '../devices/device-config.ts';
import type { DrumClass } from '../audio/classifier.ts';
import { CLASS_COLORS } from '../ui/theme.ts';

@customElement('pad-control')
export class PadControl extends LitElement {
  @property({ attribute: false })
  control!: DeviceControl;

  /** Which classifier bucket this pad is currently mapped to, if any. */
  @property({ attribute: false })
  assignedClass: DrumClass | null = null;

  /** Momentary flash — this pad was *just* triggered. */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * How many times this pad has been triggered during the current
   * recording session. Persists after the momentary flash fades, so a hit
   * is never only visible for the instant it happens — you can look at the
   * grid after the fact and see exactly which pads got hit and how often.
   */
  @property({ type: Number })
  hitCount = 0;

  /** This pad is currently assigned to the class selected in the pattern grid. */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /** A class is selected for mapping — clicking this pad toggles its assignment to it. */
  @property({ type: Boolean })
  editable = false;

  private onClick = (): void => {
    if (!this.editable) return;
    this.dispatchEvent(
      new CustomEvent<string>('pad-toggle', { detail: this.control.id, bubbles: true, composed: true })
    );
  };

  render() {
    const style = this.assignedClass ? CLASS_COLORS[this.assignedClass] : null;

    return html`
      <button
        type="button"
        class="pad"
        part="pad"
        ?data-hit=${this.hitCount > 0}
        ?data-editable=${this.editable}
        style=${style ? `--class-fg: ${style.fg}; --class-glow: ${style.glow};` : ''}
        @click=${this.onClick}
      >
        ${style ? html`<span class="led"></span>` : nothing}
        ${this.hitCount > 0 ? html`<span class="count">×${this.hitCount}</span>` : nothing}
        <span class="label">${this.control.label}</span>
        <span class="sub">${style?.label ?? ''}</span>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .pad {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      position: relative;
      border-radius: 9px;
      border: 1px solid var(--pad-border, #34343c);
      background: linear-gradient(180deg, #232329 0%, #17171b 100%);
      color: var(--pad-fg, #8b8f9a);
      font: 600 15px/1 ui-monospace, monospace;
      cursor: default;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 1px 2px rgba(0, 0, 0, 0.4);
      transition:
        background-color 80ms ease-out,
        border-color 80ms ease-out,
        transform 80ms ease-out,
        box-shadow 80ms ease-out;
    }

    /* Persists for the rest of the session once a pad has been hit at
       least once — the "was this kick actually detected" answer, without
       needing to catch the instant it happened. */
    .pad[data-hit] {
      border-color: var(--class-fg, var(--accent, #ffb020));
      box-shadow: 0 0 10px var(--class-glow, rgba(255, 176, 32, 0.35));
    }

    .led {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--class-fg);
      opacity: 0.55;
      box-shadow: 0 0 4px var(--class-fg);
    }

    .pad[data-hit] .led {
      opacity: 1;
    }

    .count {
      position: absolute;
      bottom: 5px;
      right: 6px;
      font: 700 8px/1 ui-monospace, monospace;
      color: var(--class-fg, #ffb020);
      opacity: 0.9;
    }

    .label {
      font-size: 16px;
    }

    .sub {
      font-size: 8px;
      letter-spacing: 0.08em;
      color: var(--class-fg, transparent);
      opacity: 0.75;
      min-height: 8px;
    }

    :host([active]) .pad {
      background: color-mix(in srgb, var(--class-fg, #ffb020) 22%, #1c1c22);
      border-color: var(--class-fg, #ffb020);
      box-shadow:
        0 0 16px var(--class-glow, rgba(255, 176, 32, 0.6)),
        inset 0 0 12px var(--class-glow, rgba(255, 176, 32, 0.4));
      transform: scale(0.96);
      color: #fff;
    }

    :host([active]) .led {
      opacity: 1;
    }

    .pad[data-editable] {
      cursor: pointer;
    }

    .pad[data-editable]:hover {
      border-color: #55555f;
    }

    /* Currently assigned to the class selected in the pattern grid — the
       "hit exactly this pad on the real device" signal, distinct from the
       momentary [active] flash and the persistent [data-hit] count marker. */
    :host([selected]) .pad {
      border-color: var(--class-fg, #ffb020);
      box-shadow: 0 0 0 2px var(--class-fg, #ffb020), 0 0 14px var(--class-glow, rgba(255, 176, 32, 0.6));
      animation: select-pulse 1.1s ease-in-out infinite;
    }

    @keyframes select-pulse {
      0%,
      100% {
        box-shadow: 0 0 0 2px var(--class-fg, #ffb020), 0 0 10px var(--class-glow, rgba(255, 176, 32, 0.5));
      }
      50% {
        box-shadow: 0 0 0 2px var(--class-fg, #ffb020), 0 0 18px var(--class-glow, rgba(255, 176, 32, 0.8));
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pad-control': PadControl;
  }
}
