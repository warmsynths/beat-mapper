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

  @property({ type: Boolean, reflect: true })
  active = false;

  render() {
    const style = this.assignedClass ? CLASS_COLORS[this.assignedClass] : null;

    return html`
      <button
        type="button"
        class="pad"
        part="pad"
        style=${style ? `--class-fg: ${style.fg}; --class-glow: ${style.glow};` : ''}
      >
        ${style ? html`<span class="led"></span>` : nothing}
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pad-control': PadControl;
  }
}
