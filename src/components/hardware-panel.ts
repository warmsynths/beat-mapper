import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DrumClass } from '../audio/classifier.ts';
import type { QuantizedPattern } from '../audio/quantize.ts';
import { STEPS_PER_BAR } from '../audio/quantize.ts';
import type { DeviceConfig } from '../devices/device-config.ts';
import { CLASS_COLORS } from '../ui/theme.ts';
import './bank-selector.ts';
import './pad-grid.ts';

type SessionPhase = 'idle' | 'recording' | 'reviewing';

const CLASSES: DrumClass[] = ['kick', 'snare', 'hat'];

/**
 * Right column: which device/bank the pattern maps to, the sound picker
 * that lights up pads as steps once a take exists, and the pad grid
 * itself. Pure presentation over app-root's session + device state.
 */
@customElement('hardware-panel')
export class HardwarePanel extends LitElement {
  @property({ attribute: false }) deviceConfig!: DeviceConfig;
  @property({ attribute: false }) devices: DeviceConfig[] = [];
  @property({ type: String }) activeBank = '';
  @property({ attribute: false }) sessionPhase: SessionPhase = 'idle';
  @property({ attribute: false }) selectedClass: DrumClass | null = null;
  @property({ type: Number }) viewBar = 0;
  @property({ attribute: false }) pattern: QuantizedPattern = { steps: [], totalSteps: 16 };
  @property({ attribute: false }) hitCounts: Record<string, number> = {};
  @property({ type: Boolean }) isRecording = false;

  private toggleClass(lane: DrumClass): void {
    this.dispatchEvent(new CustomEvent<DrumClass>('class-toggle', { detail: lane, bubbles: true, composed: true }));
  }

  private goToBar(bar: number): void {
    this.dispatchEvent(new CustomEvent<number>('bar-change', { detail: bar, bubbles: true, composed: true }));
  }

  private onDeviceChange = (event: Event): void => {
    const id = (event.target as HTMLSelectElement).value;
    this.dispatchEvent(new CustomEvent<string>('device-change', { detail: id, bubbles: true, composed: true }));
  };

  render() {
    const stepMode = this.sessionPhase === 'reviewing' && this.selectedClass !== null;
    const barCount = Math.max(1, Math.ceil(this.pattern.totalSteps / STEPS_PER_BAR));
    const stepHighlights = stepMode
      ? new Set(
          this.pattern.steps
            .filter((s) => s.class === this.selectedClass && Math.floor(s.step / STEPS_PER_BAR) === this.viewBar)
            .map((s) => s.step % STEPS_PER_BAR)
        )
      : null;
    const hitCountFor = (lane: DrumClass): number => this.pattern.steps.filter((s) => s.class === lane).length;

    return html`
      <section class="col col-hardware">
        <div class="hardware-head">
          <h2 class="col-title">Hardware Mapping</h2>
          <div class="device-status">
            <span class="device-status-label">Mapping target</span>
            <strong>${this.deviceConfig.name}</strong>
          </div>
        </div>

        ${this.deviceConfig.banks
          ? html`
              <div class="bank-row">
                <span class="bank-label">SET</span>
                <bank-selector .banks=${this.deviceConfig.banks} .active=${this.activeBank}></bank-selector>
              </div>
            `
          : ''}
        ${this.sessionPhase === 'reviewing'
          ? html`
              <div class="mapping-content">
                <div class="class-select-row">
                  ${CLASSES.map(
                    (lane) => html`
                      <button
                        type="button"
                        class="class-select"
                        ?data-selected=${this.selectedClass === lane}
                        style="--class-fg: ${CLASS_COLORS[lane].fg}; --class-glow: ${CLASS_COLORS[lane].glow}"
                        @click=${() => this.toggleClass(lane)}
                      >
                        <span class="class-select-name">${CLASS_COLORS[lane].label}</span>
                        <span class="class-select-pads">${hitCountFor(lane)} steps</span>
                      </button>
                    `
                  )}
                </div>
                <div class="hint-row">
                  <p class="mapping-hint">
                    ${stepMode
                      ? `Pads = steps ${this.viewBar * STEPS_PER_BAR + 1}–${(this.viewBar + 1) * STEPS_PER_BAR}. Lit pads are ${CLASS_COLORS[this.selectedClass!].label} hits — press these on the device. Tap to fix.`
                      : 'Tap a sound to light up the steps to press on the device.'}
                  </p>
                  ${stepMode && barCount > 1
                    ? html`
                        <div class="bar-pager">
                          <button type="button" ?disabled=${this.viewBar === 0} @click=${() => this.goToBar(this.viewBar - 1)}>‹</button>
                          <span>BAR ${this.viewBar + 1}/${barCount}</span>
                          <button type="button" ?disabled=${this.viewBar === barCount - 1} @click=${() => this.goToBar(this.viewBar + 1)}>›</button>
                        </div>
                      `
                    : ''}
                </div>
              </div>
            `
          : ''}

        <pad-grid .hitCounts=${this.hitCounts} .stepHighlights=${stepHighlights} .stepClass=${this.selectedClass}></pad-grid>

        <select class="device-select" @change=${this.onDeviceChange} ?disabled=${this.isRecording}>
          ${this.devices.map((d) => html`<option value=${d.id}>${d.name}</option>`)}
        </select>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }

    .col-title {
      margin: 0 0 var(--space-5);
      font: var(--weight-bold) var(--text-base) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .hardware-head {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-3);
      margin-bottom: var(--space-5);
    }

    .hardware-head .col-title {
      margin-bottom: 0;
    }

    .device-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-0-5);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-subtle);
      background: var(--color-surface-0);
      font: var(--weight-bold) var(--text-xs) / 1.3 var(--font-mono);
      max-width: 100%;
      min-width: 0;
    }

    .device-status-label {
      color: var(--color-text-dim);
      letter-spacing: var(--tracking-wide);
      text-transform: uppercase;
    }

    .device-status strong {
      color: var(--color-accent);
      font-size: var(--text-sm);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .device-select {
      margin-top: var(--space-4);
      width: 100%;
      font: var(--weight-semibold) var(--text-lg) var(--font-mono);
      padding: var(--space-2) var(--space-8) var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
          no-repeat right var(--space-3) center,
        var(--color-surface-2);
      color: var(--color-text);
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      transition: border-color var(--duration-base);
    }

    .device-select:hover:not(:disabled) {
      border-color: var(--color-border-strong);
    }

    .device-select:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 1px;
    }

    .device-select:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .bank-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-7);
    }

    .bank-label {
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      color: var(--color-text-dim);
      flex-shrink: 0;
    }

    .mapping-content {
      animation: content-enter 320ms var(--ease-standard) both;
    }

    @keyframes content-enter {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .class-select-row {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-1);
    }

    .class-select {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: var(--space-3) var(--space-1-5);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      background: linear-gradient(var(--color-surface-3), var(--color-surface-0));
      cursor: pointer;
      transition:
        border-color var(--duration-instant),
        box-shadow var(--duration-instant),
        background-color var(--duration-instant),
        transform var(--duration-fast) var(--ease-standard);
    }

    .class-select:hover:not([data-selected]) {
      border-color: var(--color-border-strong);
      transform: translateY(-1px);
    }

    .class-select-name {
      font: var(--weight-extrabold) var(--text-md) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      color: var(--class-fg);
    }

    .class-select-pads {
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-normal);
      color: var(--color-text-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .class-select[data-selected] {
      border-color: var(--class-fg);
      box-shadow:
        0 0 12px var(--class-glow),
        inset 0 0 10px color-mix(in srgb, var(--class-fg) 12%, transparent);
    }

    .class-select[data-selected] .class-select-pads {
      color: var(--class-fg);
    }

    .hint-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      margin: var(--space-1-5) 0 var(--space-4);
    }

    .mapping-hint {
      margin: 0;
      flex: 1;
      min-width: 180px;
      font: var(--weight-semibold) var(--text-base) / 1.4 var(--font-mono);
      color: var(--color-text-dim);
    }

    .bar-pager {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      color: var(--color-accent);
      white-space: nowrap;
    }

    .bar-pager button {
      width: 24px;
      height: 24px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      font: var(--weight-bold) var(--text-lg) / 1 var(--font-mono);
      cursor: pointer;
      transition: border-color var(--duration-base), color var(--duration-base);
    }

    .bar-pager button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .bar-pager button:disabled {
      opacity: 0.35;
      cursor: default;
    }

    @media (prefers-reduced-motion: reduce) {
      .mapping-content {
        animation: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'hardware-panel': HardwarePanel;
  }
}
