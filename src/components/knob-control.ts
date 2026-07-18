import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const DRAG_RANGE_PX = 140; // vertical pixels to sweep min -> max, like a hardware knob

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
    const angle = -135 + this.ratio * 270;
    return html`
      <div class="wrap">
        <div
          class="knob"
          style="--angle: ${angle}deg"
          @pointerdown=${this.onPointerDown}
          @pointermove=${this.onPointerMove}
          @pointerup=${this.onPointerUp}
        >
          <div class="indicator"></div>
        </div>
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
      flex-direction: column;
      align-items: center;
      gap: var(--space-1-5);
      user-select: none;
      touch-action: none;
    }

    .knob {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-full);
      background: radial-gradient(circle at 35% 30%, #4a4a54, var(--color-surface-1) 72%);
      border: 1px solid var(--color-border);
      box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.5),
        inset 0 1px 1px rgba(255, 255, 255, 0.1);
      position: relative;
      cursor: ns-resize;
    }

    .knob:active {
      cursor: grabbing;
    }

    .indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      background: var(--color-accent);
      transform-origin: 50% 100%;
      transform: translate(-50%, -100%) rotate(var(--angle));
      border-radius: 1px;
      box-shadow: 0 0 5px var(--color-accent);
      pointer-events: none;
    }

    .label {
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      color: var(--color-text-dim);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'knob-control': KnobControl;
  }
}
