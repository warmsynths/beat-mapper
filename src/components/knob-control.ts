import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const DRAG_RANGE_PX = 140; // vertical pixels to sweep min -> max, like a hardware knob

/**
 * Line-art dial (SENS / TONE). Drawn as an ink circle with a pointer tick,
 * consistent with the device-atlas illustration. Drag vertically to adjust.
 */
@customElement('knob-control')
export class KnobControl extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 1;
  @property({ type: Number }) value = 0;
  @property({ type: String }) label = '';

  private dragStartY = 0;
  private dragStartValue = 0;
  private dragging = false;

  private get ratio(): number {
    return (this.value - this.min) / (this.max - this.min);
  }

  private onPointerDown = (e: PointerEvent): void => {
    this.dragging = true;
    this.dragStartY = e.clientY;
    this.dragStartValue = this.value;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.dragging) return;
    const deltaY = this.dragStartY - e.clientY; // dragging up increases value
    const range = this.max - this.min;
    const next = this.dragStartValue + (deltaY / DRAG_RANGE_PX) * range;
    this.value = Math.min(this.max, Math.max(this.min, next));
    this.dispatchEvent(new CustomEvent<number>('value-change', { detail: this.value, bubbles: true, composed: true }));
  };

  private onPointerUp = (e: PointerEvent): void => {
    this.dragging = false;
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
  };

  render() {
    // pointer sweeps -135deg..+135deg over the value range
    const angle = -135 + this.ratio * 270;
    const rad = (angle - 90) * (Math.PI / 180);
    const cx = 15;
    const cy = 15;
    const x2 = cx + Math.cos(rad) * 10;
    const y2 = cy + Math.sin(rad) * 10;
    return html`
      <div class="wrap">
        <svg
          viewBox="0 0 30 30"
          class="dial"
          @pointerdown=${this.onPointerDown}
          @pointermove=${this.onPointerMove}
          @pointerup=${this.onPointerUp}
        >
          <circle cx="15" cy="15" r="12" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2" />
          <line x1="15" y1="15" x2=${x2.toFixed(1)} y2=${y2.toFixed(1)} stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round" />
        </svg>
        <span class="label">${this.label}</span>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    .wrap {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      user-select: none;
      touch-action: none;
    }

    .dial {
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      cursor: ns-resize;
      display: block;
    }

    .label {
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink-soft);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'knob-control': KnobControl;
  }
}
