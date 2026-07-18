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
      padding: var(--space-4);
      border-radius: var(--radius-2xl);
      background: linear-gradient(180deg, var(--color-surface-5) 0%, var(--color-surface-1) 100%);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-md), var(--shadow-inset-highlight);
    }

    .unit-head {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }

    .unit-knobs {
      display: flex;
      gap: var(--space-2);
      flex-shrink: 0;
    }

    .unit-knob {
      width: 20px;
      height: 20px;
      border-radius: var(--radius-full);
      background: radial-gradient(circle at 35% 30%, var(--color-border-strong), var(--color-surface-1) 75%);
      border: 1px solid var(--color-border);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .unit-screen {
      flex: 1;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-xs);
      background: var(--color-lcd);
      border: 1px solid var(--color-lcd-border);
      color: var(--color-lcd-fg);
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      text-shadow: 0 0 6px var(--color-lcd-glow);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .layout {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
    }

    .grid {
      display: grid;
      gap: var(--space-3);
      flex: 1;
      min-width: 220px;
      max-width: 420px;
    }

    .accessory-column {
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      gap: var(--space-3);
      width: 84px;
      flex-shrink: 0;
    }

    .accessory {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--space-1);
      border-radius: var(--radius-xl);
      border: 1px dashed var(--color-border-panel);
      background: repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.015) 0px,
        rgba(255, 255, 255, 0.015) 2px,
        transparent 2px,
        transparent 6px
      );
      color: var(--color-border-strong);
      font: var(--weight-bold) var(--text-2xs) / 1.2 var(--font-mono);
      letter-spacing: var(--tracking-normal);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pad-grid': PadGrid;
  }
}
