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
      gap: var(--space-0-5);
      position: relative;
      border-radius: var(--radius-xl);
      border: 1px solid var(--pad-border, var(--color-border-panel));
      background: linear-gradient(180deg, var(--color-surface-3) 0%, var(--color-surface-1) 100%);
      color: var(--pad-fg, #8b8f9a);
      font: var(--weight-semibold) var(--text-xl) / 1 var(--font-mono);
      cursor: default;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 1px 2px rgba(0, 0, 0, 0.4);
      transition:
        background-color var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
    }

    /* Persists for the rest of the session once a pad has been hit at
       least once — the "was this kick actually detected" answer, without
       needing to catch the instant it happened. */
    .pad[data-hit] {
      border-color: var(--class-fg, var(--color-accent));
      box-shadow: 0 0 10px var(--class-glow, var(--color-accent-glow));
    }

    .led {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full);
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
      font: var(--weight-bold) var(--text-2xs) / 1 var(--font-mono);
      color: var(--class-fg, var(--color-accent));
      opacity: 0.9;
    }

    .label {
      font-size: var(--text-2xl);
    }

    .sub {
      font-size: var(--text-2xs);
      letter-spacing: var(--tracking-wider);
      color: var(--class-fg, transparent);
      opacity: 0.75;
      min-height: 8px;
    }

    :host([active]) .pad {
      background: color-mix(in srgb, var(--class-fg, var(--color-accent)) 22%, var(--color-surface-2));
      border-color: var(--class-fg, var(--color-accent));
      box-shadow:
        0 0 16px var(--class-glow, var(--color-accent-glow)),
        inset 0 0 12px var(--class-glow, var(--color-accent-glow));
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
      border-color: var(--color-border-strong);
    }

    /* Currently assigned to the class selected in the pattern grid — the
       "hit exactly this pad on the real device" signal, distinct from the
       momentary [active] flash and the persistent [data-hit] count marker. */
    :host([selected]) .pad {
      border-color: var(--class-fg, var(--color-accent));
      box-shadow: 0 0 0 2px var(--class-fg, var(--color-accent)), 0 0 14px var(--class-glow, var(--color-accent-glow));
      animation: select-pulse var(--duration-slow) var(--ease-in-out) infinite;
    }

    @keyframes select-pulse {
      0%,
      100% {
        box-shadow: 0 0 0 2px var(--class-fg, var(--color-accent)), 0 0 10px var(--class-glow, var(--color-accent-glow));
      }
      50% {
        box-shadow: 0 0 0 2px var(--class-fg, var(--color-accent)), 0 0 18px var(--class-glow, var(--color-accent-glow));
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pad-control': PadControl;
  }
}
