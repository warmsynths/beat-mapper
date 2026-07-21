import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DrumClass } from '../audio/classifier.ts';
import type { QuantizedPattern } from '../audio/quantize.ts';
import { STEPS_PER_BAR } from '../audio/quantize.ts';
import type { DeviceConfig } from '../devices/device-config.ts';
import { CLASS_COLORS } from '../ui/theme.ts';
import './device-atlas.ts';
import './bank-selector.ts';
import './knob-control.ts';

type SessionPhase = 'idle' | 'recording' | 'reviewing';
const CLASSES: DrumClass[] = ['kick', 'snare', 'hat'];

/**
 * Fig. 03 — Device Atlas panel: the line-art device, a monospace readout of
 * the current assignment, an optional bar pager, and the controls row
 * (SET banks + SENS dial + device select). Presentation over
 * app-root's session/device state; intents bubble up as events.
 */
@customElement('hardware-panel')
export class HardwarePanel extends LitElement {
  @property({ attribute: false }) deviceConfig!: DeviceConfig;
  @property({ attribute: false }) devices: DeviceConfig[] = [];
  @property({ type: String }) activeBank = '';
  @property({ attribute: false }) usedBanks: string[] = [];
  @property({ attribute: false }) sessionPhase: SessionPhase = 'idle';
  @property({ attribute: false }) selectedClass: DrumClass | null = null;
  @property({ type: Number }) viewBar = 0;
  @property({ attribute: false }) pattern: QuantizedPattern = { steps: [], totalSteps: 16 };
  @property({ type: Boolean }) isRecording = false;

  @property({ type: Number }) sensMin = 0;
  @property({ type: Number }) sensMax = 1;
  @property({ type: Number }) sensitivity = 0;

  private goToBar(bar: number): void {
    this.dispatchEvent(new CustomEvent<number>('bar-change', { detail: bar, bubbles: true, composed: true }));
  }
  private onDeviceChange = (event: Event): void => {
    const id = (event.target as HTMLSelectElement).value;
    this.dispatchEvent(new CustomEvent<string>('device-change', { detail: id, bubbles: true, composed: true }));
  };
  private onSens = (e: CustomEvent<number>): void => {
    this.dispatchEvent(new CustomEvent<number>('sensitivity-change', { detail: e.detail, bubbles: true, composed: true }));
  };

  render() {
    const reviewing = this.sessionPhase === 'reviewing';
    const stepMode = reviewing && this.selectedClass !== null;
    const barCount = Math.max(1, Math.ceil(this.pattern.totalSteps / STEPS_PER_BAR));
    const stepHighlights = stepMode
      ? new Set(
          this.pattern.steps
            .filter((s) => s.class === this.selectedClass && Math.floor(s.step / STEPS_PER_BAR) === this.viewBar)
            .map((s) => s.step % STEPS_PER_BAR)
        )
      : null;
    const count = (lane: DrumClass): number => this.pattern.steps.filter((s) => s.class === lane).length;
    const status = this.isRecording ? 'RECORDING' : reviewing ? 'REVIEW' : 'LIVE INPUT';
    const bankTag = this.deviceConfig.banks ? ` · BANK ${this.activeBank}` : '';

    return html`
      <div class="fig">Fig. 03 — Device Atlas<span class="line"></span></div>

      <device-atlas
        .selectedClass=${this.selectedClass}
        .stepHighlights=${stepHighlights}
        .reviewing=${reviewing}
      ></device-atlas>

      <div class="data">
        <div><b>TARGET</b> : ${this.deviceConfig.name}${bankTag}</div>
        <div><b>ASSIGN</b> : ${CLASSES.map((c) => `${CLASS_COLORS[c].label}·${count(c)}`).join(' ')}</div>
        <div><b>PADS</b>&nbsp;&nbsp; : 1–16 PERFORMANCE · COL 5 UTIL</div>
        <div><b>STATUS</b> : ${status}</div>
      </div>

      ${reviewing
        ? html`
            <p class="hint">
              ${stepMode
                ? `Bar ${this.viewBar + 1}/${barCount}. Lit pads are ${CLASS_COLORS[this.selectedClass!].label} steps — press these on the device. Tap to fix.`
                : 'Tap a sound in column 5, then tap pads to place its steps.'}
            </p>
            ${stepMode && barCount > 1
              ? html`
                  <div class="pager">
                    <button ?disabled=${this.viewBar === 0} @click=${() => this.goToBar(this.viewBar - 1)}>‹ prev bar</button>
                    <span>bar ${this.viewBar + 1} / ${barCount}</span>
                    <button ?disabled=${this.viewBar === barCount - 1} @click=${() => this.goToBar(this.viewBar + 1)}>next bar ›</button>
                  </div>
                `
              : nothing}
          `
        : nothing}

      <hr class="rule" />

      <div class="controls">
        ${this.deviceConfig.banks
          ? html`
              <div class="ctl set">
                <span class="ctl-lbl">Set</span>
                <bank-selector .banks=${this.deviceConfig.banks} .active=${this.activeBank} .used=${this.usedBanks}></bank-selector>
              </div>
            `
          : nothing}
        <div class="dials">
          <knob-control label="Sens" .min=${this.sensMin} .max=${this.sensMax} .value=${this.sensitivity} @value-change=${this.onSens}></knob-control>
        </div>
      </div>

      <label class="device-pick">
        <span class="ctl-lbl">Device</span>
        <select @change=${this.onDeviceChange} ?disabled=${this.isRecording}>
          ${this.devices.map((d) => html`<option value=${d.id} ?selected=${d.id === this.deviceConfig.id}>${d.name}</option>`)}
        </select>
      </label>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }

    .fig {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-fig);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink);
      margin-bottom: var(--space-6);
    }
    .fig .line {
      flex: 1;
      height: 1px;
      background: var(--hair);
    }

    device-atlas {
      margin-bottom: var(--space-6);
    }

    .data {
      font-family: var(--mono);
      font-size: var(--text-md);
      line-height: 2;
      letter-spacing: var(--track-normal);
      color: var(--ink);
    }
    .data b {
      color: var(--ink-soft);
      font-weight: var(--w-bold);
    }

    .hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      margin: var(--space-4) 0 0;
      line-height: 1.5;
    }

    .pager {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      margin-top: var(--space-3);
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
    }
    .pager button {
      border: 1px solid var(--ink);
      background: var(--paper);
      color: var(--ink);
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      padding: var(--space-1-5) var(--space-2);
      cursor: pointer;
    }
    .pager button:disabled {
      opacity: 0.3;
      cursor: default;
    }

    .rule {
      border: 0;
      border-top: 1px solid var(--hair);
      margin: var(--space-6) 0 var(--space-5);
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-6);
    }
    .ctl {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .ctl.set {
      flex: 1;
      min-width: 180px;
    }
    .ctl.set bank-selector {
      flex: 1;
    }
    .ctl-lbl {
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink-soft);
    }
    .dials {
      display: flex;
      gap: var(--space-5);
    }

    .device-pick {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-top: var(--space-5);
    }
    select {
      flex: 1;
      font-family: var(--mono);
      font-size: var(--text-base);
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--ink);
      border-radius: 0;
      padding: var(--space-2) var(--space-7) var(--space-2) var(--space-3);
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23201e19' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right var(--space-3) center;
    }
    select:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'hardware-panel': HardwarePanel;
  }
}
