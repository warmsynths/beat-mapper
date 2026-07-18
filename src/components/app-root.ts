import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { AudioEngine, DEFAULT_AUDIO_ENGINE_CONFIG } from '../audio/audio-engine.ts';
import { EngineState, type TransientFrame } from '../audio/types.ts';
import {
  classifyTransient,
  DEFAULT_CLASSIFIER_THRESHOLDS,
  type ClassifierThresholds,
  type DrumClass,
} from '../audio/classifier.ts';
import {
  estimateBpm,
  quantizeHits,
  MIN_BPM,
  MAX_BPM,
  type RecordedHit,
  type QuantizedPattern,
} from '../audio/quantize.ts';
import { getControl, type DeviceConfig } from '../devices/device-config.ts';
import { sp404mkiiConfig } from '../devices/sp404mkii.ts';
import { po33Config } from '../devices/po33.ts';
import { BeatBus } from '../state/beat-bus.ts';
import { beatBusContext, deviceConfigContext } from '../state/contexts.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES } from '../ui/theme.ts';
import './pad-grid.ts';
import './beat-timeline.ts';
import './pattern-grid.ts';
import './bank-selector.ts';
import './knob-control.ts';
import './level-meter.ts';

const DEVICES: DeviceConfig[] = [sp404mkiiConfig, po33Config];

// SENS knob: raises/lowers the onset gate — quieter beatboxing needs it lower.
const SENS_MIN = 0.02;
const SENS_MAX = 0.2;

// TONE knob: scales the kick/hat centroid split thresholds together so the
// classifier can be biased for a lower or higher-pitched voice.
const TONE_MIN = 0.5;
const TONE_MAX = 2.0;

type SessionPhase = 'idle' | 'recording' | 'reviewing';

@customElement('app-root')
export class AppRoot extends LitElement {
  private engine = new AudioEngine();

  @provide({ context: beatBusContext })
  private bus = new BeatBus();

  @provide({ context: deviceConfigContext })
  @state()
  private deviceConfig: DeviceConfig = DEVICES[0];

  @state()
  private engineState: EngineState = EngineState.IDLE;

  @state()
  private errorMessage: string | null = null;

  @state()
  private infoMessage: string | null = null;

  @state()
  private activeBank = this.deviceConfig.banks?.[0] ?? '';

  @state()
  private lastResult: { class: DrumClass; confidence: number } | null = null;

  @state()
  private level = 0;

  @state()
  private sensitivity = DEFAULT_AUDIO_ENGINE_CONFIG.rmsThreshold;

  @state()
  private tone = 1.0;

  @state()
  private sessionPhase: SessionPhase = 'idle';

  @state()
  private recordedHits: RecordedHit[] = [];

  @state()
  private hitCounts: Record<string, number> = {};

  @state()
  private bpm = 100;

  @state()
  private pattern: QuantizedPattern = { steps: [], totalSteps: 16 };

  private thresholds: ClassifierThresholds = { ...DEFAULT_CLASSIFIER_THRESHOLDS };
  private recordingStartedAt = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.engine.addEventListener('state-change', this.onEngineStateChange as EventListener);
    this.engine.addEventListener('transient-detected', this.onTransient as EventListener);
    this.engine.addEventListener('error', this.onEngineError as EventListener);
    this.engine.addEventListener('level', this.onLevel as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.engine.removeEventListener('state-change', this.onEngineStateChange as EventListener);
    this.engine.removeEventListener('transient-detected', this.onTransient as EventListener);
    this.engine.removeEventListener('error', this.onEngineError as EventListener);
    this.engine.removeEventListener('level', this.onLevel as EventListener);
    this.engine.stop();
  }

  private onEngineStateChange = (event: CustomEvent<EngineState>): void => {
    this.engineState = event.detail;
    if (event.detail === EngineState.IDLE) this.level = 0;
  };

  private onEngineError = (event: CustomEvent<Error>): void => {
    this.errorMessage = event.detail.message;
    this.sessionPhase = 'idle';
  };

  private onLevel = (event: CustomEvent<number>): void => {
    this.level = event.detail;
  };

  private onTransient = (event: CustomEvent<TransientFrame[]>): void => {
    const sampleRate = this.engine.getSampleRate();
    if (!sampleRate || this.sessionPhase !== 'recording') return;

    const result = classifyTransient(event.detail, sampleRate, this.engine.getFftSize(), this.thresholds);
    const control = getControl(this.deviceConfig, this.deviceConfig.classMapping[result.class]);
    if (!control) return;

    this.lastResult = { class: result.class, confidence: result.confidence };

    const hit: RecordedHit = {
      class: result.class,
      controlId: control.id,
      controlLabel: control.label,
      confidence: result.confidence,
      timeMs: performance.now() - this.recordingStartedAt,
    };
    this.recordedHits = [...this.recordedHits, hit];
    this.hitCounts = { ...this.hitCounts, [control.id]: (this.hitCounts[control.id] ?? 0) + 1 };

    // Live flash + rolling timeline, purely as "it's hearing you" feedback
    // during recording — the persistent record is recordedHits above.
    this.bus.emit({
      class: result.class,
      confidence: result.confidence,
      controlId: control.id,
      timestamp: performance.now(),
    });
  };

  private async handleRecordButton(): Promise<void> {
    this.errorMessage = null;
    this.infoMessage = null;

    if (this.sessionPhase === 'recording') {
      this.engine.stop();
      this.finishRecording();
      return;
    }

    // Starting fresh, whether from idle or "record again" out of reviewing.
    this.recordedHits = [];
    this.hitCounts = {};
    this.pattern = { steps: [], totalSteps: 16 };
    this.lastResult = null;
    this.sessionPhase = 'recording';
    this.recordingStartedAt = performance.now();
    await this.engine.start();
  }

  private finishRecording(): void {
    if (this.recordedHits.length === 0) {
      this.sessionPhase = 'idle';
      this.infoMessage = 'No hits detected — try lowering SENS (or beatboxing louder/closer to the mic) and record again.';
      return;
    }
    this.bpm = estimateBpm(this.recordedHits);
    this.pattern = quantizeHits(this.recordedHits, this.bpm);
    this.sessionPhase = 'reviewing';
  }

  private adjustBpm(delta: number): void {
    this.bpm = Math.min(MAX_BPM, Math.max(MIN_BPM, this.bpm + delta));
    this.pattern = quantizeHits(this.recordedHits, this.bpm);
  }

  private onDeviceChange = (event: Event): void => {
    const id = (event.target as HTMLSelectElement).value;
    const next = DEVICES.find((d) => d.id === id);
    if (!next) return;
    this.deviceConfig = next;
    this.activeBank = next.banks?.[0] ?? '';
    if (this.sessionPhase === 'recording') this.engine.stop();
    this.sessionPhase = 'idle';
    this.recordedHits = [];
    this.hitCounts = {};
  };

  private onBankChange = (event: CustomEvent<string>): void => {
    this.activeBank = event.detail;
  };

  private onSensitivityChange = (event: CustomEvent<number>): void => {
    this.sensitivity = event.detail;
    this.engine.updateConfig({ rmsThreshold: this.sensitivity });
  };

  private onToneChange = (event: CustomEvent<number>): void => {
    this.tone = event.detail;
    this.thresholds = {
      ...this.thresholds,
      centroidKickMax: DEFAULT_CLASSIFIER_THRESHOLDS.centroidKickMax * this.tone,
      centroidHatMin: DEFAULT_CLASSIFIER_THRESHOLDS.centroidHatMin * this.tone,
    };
  };

  render() {
    const isRecording = this.sessionPhase === 'recording';
    const readoutColor = this.lastResult ? CLASS_COLORS[this.lastResult.class].fg : 'var(--accent)';

    const readoutState =
      this.sessionPhase === 'recording' ? 'recording' : this.sessionPhase === 'reviewing' ? 'complete' : this.engineState.replace('_', ' ');

    const recordLabel = this.sessionPhase === 'recording' ? 'STOP' : this.sessionPhase === 'reviewing' ? 'RECORD AGAIN' : 'RECORD';

    const padLabels: Partial<Record<DrumClass, string>> = {};
    for (const lane of DRUM_CLASS_LANES) {
      const control = getControl(this.deviceConfig, this.deviceConfig.classMapping[lane]);
      if (control) padLabels[lane] = control.label;
    }

    return html`
      <div class="panel">
        <span class="screw tl"></span>
        <span class="screw tr"></span>
        <span class="screw bl"></span>
        <span class="screw br"></span>

        <header>
          <div class="wordmark">
            <h1>BEAT // MAPPER</h1>
            <p class="subtitle">voice-to-pattern transcription</p>
          </div>

          <div class="knobs">
            <knob-control
              label="SENS"
              .min=${SENS_MIN}
              .max=${SENS_MAX}
              .value=${this.sensitivity}
              @value-change=${this.onSensitivityChange}
            ></knob-control>
            <knob-control
              label="TONE"
              .min=${TONE_MIN}
              .max=${TONE_MAX}
              .value=${this.tone}
              @value-change=${this.onToneChange}
            ></knob-control>
          </div>
        </header>

        <div class="display-row">
          <div class="readout" style="--readout-color: ${readoutColor}; --level: ${Math.min(1, this.level * 6)}">
            <div class="readout-ring" ?data-phase-recording=${isRecording}></div>
            <div class="readout-inner">
              <span class="readout-state" data-phase=${this.sessionPhase}>${readoutState}</span>
              <span class="readout-class">${this.lastResult ? CLASS_COLORS[this.lastResult.class].label : '--'}</span>
            </div>
          </div>

          <div class="transport">
            <select @change=${this.onDeviceChange} ?disabled=${isRecording}>
              ${DEVICES.map((d) => html`<option value=${d.id}>${d.name}</option>`)}
            </select>
            <button type="button" class="rec-button" ?data-active=${isRecording} @click=${() => this.handleRecordButton()}>
              <span class="dot"></span>
              ${recordLabel}
            </button>
            ${isRecording
              ? html`
                  <div class="level-row">
                    <span class="level-label">MIC</span>
                    <level-meter .level=${this.level} .threshold=${this.sensitivity}></level-meter>
                  </div>
                `
              : ''}
            ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ''}
            ${this.infoMessage ? html`<p class="info">${this.infoMessage}</p>` : ''}
          </div>
        </div>

        ${this.deviceConfig.banks
          ? html`
              <div class="bank-row">
                <span class="bank-label">SET</span>
                <bank-selector
                  .banks=${this.deviceConfig.banks}
                  .active=${this.activeBank}
                  @bank-change=${this.onBankChange}
                ></bank-selector>
              </div>
            `
          : ''}

        <main>
          <pad-grid .hitCounts=${this.hitCounts}></pad-grid>
        </main>

        <footer>
          ${this.sessionPhase === 'reviewing'
            ? html`
                <div class="pattern-header">
                  <div class="pattern-meta">
                    <span>${this.recordedHits.length} hits</span>
                    <span class="dim">·</span>
                    <span>${(Math.max(...this.recordedHits.map((h) => h.timeMs), 0) / 1000).toFixed(1)}s</span>
                  </div>
                  <div class="bpm-control">
                    <button type="button" @click=${() => this.adjustBpm(-1)}>−</button>
                    <span class="bpm-value">${this.bpm} BPM</span>
                    <button type="button" @click=${() => this.adjustBpm(1)}>+</button>
                  </div>
                </div>
                <pattern-grid .pattern=${this.pattern} .padLabels=${padLabels}></pattern-grid>
              `
            : html`<beat-timeline></beat-timeline>`}
        </footer>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      max-width: 640px;
      margin: 0 auto;
      padding: 32px 20px;
      font: 16px/1.5 system-ui, sans-serif;
      color: var(--text, #e5e7eb);
      --accent: #ffb020;
    }

    .panel {
      position: relative;
      padding: 28px 28px 24px;
      border-radius: 22px;
      background:
        radial-gradient(circle at 15% -10%, rgba(255, 255, 255, 0.05), transparent 40%),
        linear-gradient(180deg, #26262c 0%, #1a1a1f 100%);
      border: 1px solid #34343c;
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .panel::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.035) 50%, transparent 60%);
      background-size: 220% 220%;
      animation: sweep 9s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes sweep {
      0% {
        background-position: 120% 0%;
      }
      50% {
        background-position: -20% 100%;
      }
      100% {
        background-position: 120% 0%;
      }
    }

    .screw {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #6a6a72, #1a1a1e 70%);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    }

    .screw.tl {
      top: 12px;
      left: 12px;
    }
    .screw.tr {
      top: 12px;
      right: 12px;
    }
    .screw.bl {
      bottom: 12px;
      left: 12px;
    }
    .screw.br {
      bottom: 12px;
      right: 12px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      position: relative;
    }

    .wordmark h1 {
      font: 800 18px/1 ui-monospace, monospace;
      letter-spacing: 0.06em;
      margin: 0;
      color: #f4f4f6;
    }

    .subtitle {
      margin: 4px 0 0;
      font-size: 11px;
      color: #6b6b78;
      letter-spacing: 0.03em;
    }

    .knobs {
      display: flex;
      gap: 18px;
    }

    .display-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
      position: relative;
    }

    .readout {
      --level: 0;
      width: 96px;
      height: 96px;
      flex-shrink: 0;
      border-radius: 50%;
      background: radial-gradient(circle at 40% 30%, #1c1c22, #0a0a0d 75%);
      border: 3px solid #303038;
      position: relative;
      display: grid;
      place-items: center;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
    }

    .readout-ring {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid var(--readout-color, var(--accent));
      opacity: calc(0.25 + var(--level) * 0.6);
      box-shadow: 0 0 calc(6px + var(--level) * 18px) var(--readout-color, var(--accent));
      transition: opacity 60ms linear;
    }

    .readout-ring[data-phase-recording] {
      animation: rec-pulse 1.4s ease-in-out infinite;
    }

    @keyframes rec-pulse {
      0%,
      100% {
        opacity: 0.4;
      }
      50% {
        opacity: 0.9;
      }
    }

    .readout-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .readout-state {
      font: 700 8px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      color: #6b6b78;
      text-transform: uppercase;
      transition: color 120ms;
    }

    .readout-state[data-phase='recording'] {
      color: #ff4444;
    }

    .readout-state[data-phase='reviewing'] {
      color: #4ade80;
    }

    .readout-class {
      font: 800 15px/1 ui-monospace, monospace;
      letter-spacing: 0.05em;
      color: var(--readout-color, var(--accent));
      text-shadow: 0 0 10px var(--readout-color, var(--accent));
    }

    .transport {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    select {
      font: 600 13px ui-monospace, monospace;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
    }

    select:disabled {
      opacity: 0.5;
    }

    .rec-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      font: 700 12px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      padding: 9px 16px;
      border-radius: 20px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
      cursor: pointer;
      transition:
        background-color 120ms,
        border-color 120ms;
    }

    .rec-button .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #6b2c2c;
    }

    .rec-button[data-active] {
      background: #2a1414;
      border-color: #ff4444;
      color: #ffb4b4;
    }

    .rec-button[data-active] .dot {
      background: #ff3b3b;
      box-shadow: 0 0 8px #ff3b3b;
      animation: pulse 1.1s ease-in-out infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.35;
      }
    }

    .error {
      color: #f87171;
      font-size: 12px;
      margin: 0;
    }

    .info {
      color: var(--accent);
      font-size: 12px;
      margin: 0;
    }

    .level-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .level-label {
      font: 700 9px/1 ui-monospace, monospace;
      letter-spacing: 0.08em;
      color: #6b6b78;
      flex-shrink: 0;
    }

    .level-row level-meter {
      flex: 1;
    }

    .bank-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .bank-label {
      font: 700 10px/1 ui-monospace, monospace;
      letter-spacing: 0.1em;
      color: #6b6b78;
      flex-shrink: 0;
    }

    main {
      margin-bottom: 20px;
    }

    footer {
      display: block;
    }

    .pattern-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .pattern-meta {
      font: 600 11px/1 ui-monospace, monospace;
      color: #9ca3af;
      display: flex;
      gap: 6px;
    }

    .pattern-meta .dim {
      color: #4b4b54;
    }

    .bpm-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bpm-control button {
      width: 22px;
      height: 22px;
      border-radius: 5px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
      font: 700 13px/1 ui-monospace, monospace;
      cursor: pointer;
    }

    .bpm-value {
      font: 700 11px/1 ui-monospace, monospace;
      color: var(--accent);
      min-width: 56px;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
