import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { beatBusContext, deviceConfigContext } from '../state/contexts.ts';
import type { BeatBus, ClassifiedBeatEvent } from '../state/beat-bus.ts';
import type { DeviceConfig } from '../devices/device-config.ts';
import type { DrumClass } from '../audio/classifier.ts';
import './pad-control.ts';

const FLASH_DURATION_MS = 220;

@customElement('pad-grid')
export class PadGrid extends LitElement {
  @consume({ context: beatBusContext })
  private bus!: BeatBus;

  @consume({ context: deviceConfigContext, subscribe: true })
  private deviceConfig!: DeviceConfig;

  /** Cumulative hit counts per control id for the current recording session, owned by app-root. */
  @property({ attribute: false })
  hitCounts: Record<string, number> = {};

  /**
   * Step mode: non-null turns the pads into a step display — pad N stands
   * for step N of the current bar (the way the real hardware's pattern
   * entry works), and the set holds the step indices (0-15) where the
   * selected sound hits. Null = normal sound-mapping view.
   */
  @property({ attribute: false })
  stepHighlights: Set<number> | null = null;

  /** Which sound the step highlights belong to — drives their color. */
  @property({ attribute: false })
  stepClass: DrumClass | null = null;

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
    for (const [drumClass, controlIds] of Object.entries(classMapping) as [DrumClass, string[]][]) {
      for (const controlId of controlIds) controlIdToClass.set(controlId, drumClass);
    }

    // In step mode every trace of the sound-mapping view (LEDs, hit
    // counts, live flash) is suppressed: the pads mean "steps of the bar"
    // now, and stale sound markers on them read as wrong hits.
    const stepMode = this.stepHighlights !== null;

    // minmax(0, 1fr), not bare 1fr — grid tracks otherwise refuse to shrink
    // below their content's min-content size, which is exactly what forces
    // the whole page wider than the viewport on narrow phones.
    const gridStyle = gridDimensions
      ? `grid-template-columns: repeat(${gridDimensions.cols}, minmax(0, 1fr)); grid-template-rows: repeat(${gridDimensions.rows}, 1fr);`
      : `grid-template-columns: repeat(auto-fill, minmax(48px, 1fr)); grid-auto-rows: 48px;`;

    return html`
      <div class="unit">
        <div class="unit-head">
          <div class="unit-knobs">
            <span class="unit-knob"></span>
            <span class="unit-knob"></span>
            <span class="unit-knob"></span>
            <span class="unit-knob"></span>
          </div>
          <div class="unit-screen">${this.deviceConfig.name}</div>
        </div>
        <div class="layout">
          <div class="grid" style=${gridStyle}>
            ${controls.map(
              (control, index) => html`
                <pad-control
                  .control=${control}
                  .assignedClass=${stepMode
                    ? this.stepHighlights!.has(index)
                      ? this.stepClass
                      : null
                    : controlIdToClass.get(control.id) ?? null}
                  ?active=${!stepMode && this.activeControlId === control.id}
                  .hitCount=${stepMode ? 0 : this.hitCounts[control.id] ?? 0}
                  .selected=${stepMode && this.stepHighlights!.has(index)}
                  .editable=${stepMode}
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
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .unit {
      padding: 14px;
      border-radius: 14px;
      background: linear-gradient(180deg, #2a2a30 0%, #1c1c21 100%);
      border: 1px solid #38383f;
      box-shadow:
        0 12px 28px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .unit-head {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }

    .unit-knobs {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .unit-knob {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #55555f, #1a1a1e 75%);
      border: 1px solid #3a3a44;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .unit-screen {
      flex: 1;
      padding: 6px 10px;
      border-radius: 4px;
      background: #0a0f0a;
      border: 1px solid #1e2a1e;
      color: #7fffb0;
      font: 700 10px/1 ui-monospace, monospace;
      letter-spacing: 0.06em;
      text-shadow: 0 0 6px rgba(127, 255, 176, 0.5);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .layout {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .grid {
      display: grid;
      gap: 10px;
      flex: 1;
      min-width: 220px;
      max-width: 420px;
    }

    .accessory-column {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: 10px;
      width: 84px;
      flex-shrink: 0;
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
