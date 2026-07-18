import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { beatBusContext, deviceConfigContext } from '../state/contexts.ts';
import type { BeatBus, ClassifiedBeatEvent } from '../state/beat-bus.ts';
import type { DeviceConfig } from '../devices/device-config.ts';
import type { DrumClass } from '../audio/classifier.ts';
import './pad-control.ts';

const FLASH_DURATION_MS = 120;

@customElement('pad-grid')
export class PadGrid extends LitElement {
  @consume({ context: beatBusContext })
  private bus!: BeatBus;

  @consume({ context: deviceConfigContext, subscribe: true })
  private deviceConfig!: DeviceConfig;

  @state()
  private activeControlId: string | null = null;

  private flashTimer: ReturnType<typeof setTimeout> | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.bus.addEventListener('beat', this.onBeat as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.bus.removeEventListener('beat', this.onBeat as EventListener);
    if (this.flashTimer) clearTimeout(this.flashTimer);
  }

  private onBeat = (event: CustomEvent<ClassifiedBeatEvent>): void => {
    this.activeControlId = event.detail.controlId;
    if (this.flashTimer) clearTimeout(this.flashTimer);
    this.flashTimer = setTimeout(() => {
      this.activeControlId = null;
    }, FLASH_DURATION_MS);
  };

  render() {
    const { gridDimensions, controls, classMapping, decorative } = this.deviceConfig;

    const controlIdToClass = new Map<string, DrumClass>();
    for (const [drumClass, controlId] of Object.entries(classMapping) as [DrumClass, string][]) {
      controlIdToClass.set(controlId, drumClass);
    }

    const gridStyle = gridDimensions
      ? `grid-template-columns: repeat(${gridDimensions.cols}, 1fr); grid-template-rows: repeat(${gridDimensions.rows}, 1fr);`
      : `grid-template-columns: repeat(auto-fill, minmax(48px, 1fr)); grid-auto-rows: 48px;`;

    return html`
      <div class="layout">
        <div class="grid" style=${gridStyle}>
          ${controls.map(
            (control) => html`
              <pad-control
                .control=${control}
                .assignedClass=${controlIdToClass.get(control.id) ?? null}
                ?active=${this.activeControlId === control.id}
                style=${gridDimensions
                  ? `grid-row: ${control.position.row + 1}; grid-column: ${control.position.col + 1};`
                  : ''}
              ></pad-control>
            `
          )}
        </div>
        ${gridDimensions && decorative
          ? html`
              <div class="accessory-column">
                ${decorative.map((label) => html`<div class="accessory">${label}</div>`)}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .layout {
      display: flex;
      gap: 10px;
    }

    .grid {
      display: grid;
      gap: 10px;
      flex: 1;
      max-width: 420px;
    }

    .accessory-column {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: 10px;
      width: 84px;
    }

    .accessory {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4px;
      border-radius: 9px;
      border: 1px dashed #34343c;
      background: repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.015) 0px,
        rgba(255, 255, 255, 0.015) 2px,
        transparent 2px,
        transparent 6px
      );
      color: #55555f;
      font: 700 8px/1.2 ui-monospace, monospace;
      letter-spacing: 0.05em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pad-grid': PadGrid;
  }
}
