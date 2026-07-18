import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { AudioEngine, DEFAULT_AUDIO_ENGINE_CONFIG } from '../audio/audio-engine.ts';
import { EngineState, type LevelDetail, type TransientFrame } from '../audio/types.ts';
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
  STEPS_PER_BAR,
  type RecordedHit,
  type QuantizedPattern,
} from '../audio/quantize.ts';
import { getControls, type DeviceConfig } from '../devices/device-config.ts';
import { sp404mkiiConfig } from '../devices/sp404mkii.ts';
import { po33Config } from '../devices/po33.ts';
import { po32Config } from '../devices/po32.ts';
import { BeatBus } from '../state/beat-bus.ts';
import { beatBusContext, deviceConfigContext } from '../state/contexts.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES } from '../ui/theme.ts';
import './pad-grid.ts';
import './beat-timeline.ts';
import './pattern-grid.ts';
import './bank-selector.ts';
import './knob-control.ts';
import './level-meter.ts';

const DEVICES: DeviceConfig[] = [sp404mkiiConfig, po33Config, po32Config];

// SENS knob: raises/lowers how far above the ambient noise floor a sound has
// to rise to register as a hit — quieter beatboxing needs a smaller margin.
const SENS_MIN = 0.005;
const SENS_MAX = 0.05;

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

  /** Current absolute onset gate (ambient floor + margin), as reported live by the engine. */
  @state()
  private levelThreshold = DEFAULT_AUDIO_ENGINE_CONFIG.onsetMargin;

  @state()
  private sensitivity = SENS_MIN + SENS_MAX - DEFAULT_AUDIO_ENGINE_CONFIG.onsetMargin;

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

  /** Sound selected for step display: its hits light up the pads as steps of the bar. */
  @state()
  private selectedClass: DrumClass | null = null;

  /** Which 16-step bar of the pattern the pads currently display (0-based). */
  @state()
  private viewBar = 0;

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

  private onLevel = (event: CustomEvent<LevelDetail>): void => {
    this.level = event.detail.level;
    this.levelThreshold = event.detail.threshold;
  };

  private onTransient = (event: CustomEvent<TransientFrame[]>): void => {
    const sampleRate = this.engine.getSampleRate();
    if (!sampleRate || this.sessionPhase !== 'recording') return;

    const result = classifyTransient(event.detail, sampleRate, this.engine.getFftSize(), this.thresholds);
    const [control] = getControls(this.deviceConfig, this.deviceConfig.classMapping[result.class]);
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
    this.selectedClass = null;
    this.viewBar = 0;
    this.sessionPhase = 'recording';
    this.recordingStartedAt = performance.now();
    await this.engine.start();
  }

  private finishRecording(): void {
    if (this.recordedHits.length === 0) {
      this.sessionPhase = 'idle';
      this.infoMessage = 'No hits detected — try raising SENS (or beatboxing louder/closer to the mic) and record again.';
      return;
    }
    this.bpm = estimateBpm(this.recordedHits);
    this.pattern = quantizeHits(this.recordedHits, this.bpm);
    this.viewBar = 0;
    this.sessionPhase = 'reviewing';
  }

  private adjustBpm(delta: number): void {
    this.bpm = Math.min(MAX_BPM, Math.max(MIN_BPM, this.bpm + delta));
    this.pattern = quantizeHits(this.recordedHits, this.bpm);
    this.setViewBar(this.viewBar);
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
    this.selectedClass = null;
    this.viewBar = 0;
  };

  private onBankChange = (event: CustomEvent<string>): void => {
    this.activeBank = event.detail;
  };

  private toggleSelectedClass(lane: DrumClass): void {
    this.selectedClass = this.selectedClass === lane ? null : lane;
  }

  private onLaneSelect = (event: CustomEvent<DrumClass>): void => {
    this.toggleSelectedClass(event.detail);
  };

  /**
   * Step mode: tapping pad N toggles a hit for the selected sound on step N
   * of the currently viewed bar — the same gesture as entering the pattern
   * on the real hardware, and doubles as a way to correct misdetected hits.
   */
  private onPadStepToggle = (event: CustomEvent<string>): void => {
    const cls = this.selectedClass;
    if (!cls || this.sessionPhase !== 'reviewing') return;

    const padIndex = this.deviceConfig.controls.findIndex((c) => c.id === event.detail);
    if (padIndex < 0 || padIndex >= STEPS_PER_BAR) return;
    const globalStep = this.viewBar * STEPS_PER_BAR + padIndex;
    if (globalStep >= this.pattern.totalSteps) return;

    const exists = this.pattern.steps.some((s) => s.class === cls && s.step === globalStep);
    const controlLabel = getControls(this.deviceConfig, this.deviceConfig.classMapping[cls])[0]?.label ?? '';
    const steps = exists
      ? this.pattern.steps.filter((s) => !(s.class === cls && s.step === globalStep))
      : [...this.pattern.steps, { step: globalStep, class: cls, controlLabel }];
    this.pattern = { ...this.pattern, steps };
  };

  private setViewBar(bar: number): void {
    const barCount = Math.max(1, Math.ceil(this.pattern.totalSteps / STEPS_PER_BAR));
    this.viewBar = Math.min(barCount - 1, Math.max(0, bar));
  }

  private onSensitivityChange = (event: CustomEvent<number>): void => {
    this.sensitivity = event.detail;
    // The knob is labeled SENS: cranking it up should make the mic pick up
    // quieter input, i.e. a SMALLER margin above the ambient floor. The
    // knob's own value climbs from SENS_MIN to SENS_MAX as it's turned up,
    // so invert it here rather than making "turn up SENS" require a louder
    // voice to trigger.
    const onsetMargin = SENS_MIN + SENS_MAX - this.sensitivity;
    this.engine.updateConfig({ onsetMargin });
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

    const padLabels: Partial<Record<DrumClass, string[]>> = {};
    for (const lane of DRUM_CLASS_LANES) {
      const controls = getControls(this.deviceConfig, this.deviceConfig.classMapping[lane]);
      if (controls.length) padLabels[lane] = controls.map((c) => c.label);
    }

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

        <div class="workspace">
          <section class="col col-analysis">
            <h2 class="col-title">Analysis &amp; Recording</h2>

            <div class="record-row">
              <div class="readout" style="--readout-color: ${readoutColor}; --level: ${Math.min(1, this.level * 6)}">
                <div class="readout-ring" ?data-phase-recording=${isRecording}></div>
                <div class="readout-inner">
                  <span class="readout-state" data-phase=${this.sessionPhase}>${readoutState}</span>
                  <span class="readout-class">${this.lastResult ? CLASS_COLORS[this.lastResult.class].label : '--'}</span>
                </div>
              </div>

              <div class="transport">
                <button type="button" class="rec-button" ?data-active=${isRecording} @click=${() => this.handleRecordButton()}>
                  <span class="dot"></span>
                  ${recordLabel}
                </button>
                ${isRecording
                  ? html`
                      <div class="level-row">
                        <span class="level-label">MIC</span>
                        <level-meter .level=${this.level} .threshold=${this.levelThreshold}></level-meter>
                      </div>
                    `
                  : ''}
                ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ''}
                ${this.infoMessage ? html`<p class="info">${this.infoMessage}</p>` : ''}
              </div>
            </div>

            <div class="stream-block">
              <h3 class="block-label">Input Stream</h3>
              <beat-timeline></beat-timeline>
            </div>

            <div class="sequence-block">
              <h3 class="block-label">Detected Sequence</h3>
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
                    <pattern-grid
                      .pattern=${this.pattern}
                      .padLabels=${padLabels}
                      .selectedClass=${this.selectedClass}
                      @lane-select=${this.onLaneSelect}
                    ></pattern-grid>
                  `
                : html`<p class="placeholder">Record a take to see the transcribed sequence here.</p>`}
            </div>
          </section>

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
                    <bank-selector
                      .banks=${this.deviceConfig.banks}
                      .active=${this.activeBank}
                      @bank-change=${this.onBankChange}
                    ></bank-selector>
                  </div>
                `
              : ''}
            ${this.sessionPhase === 'reviewing'
              ? html`
                  <div class="class-select-row">
                    ${(['kick', 'snare', 'hat'] as DrumClass[]).map(
                      (lane) => html`
                        <button
                          type="button"
                          class="class-select"
                          ?data-selected=${this.selectedClass === lane}
                          style="--class-fg: ${CLASS_COLORS[lane].fg}; --class-glow: ${CLASS_COLORS[lane].glow}"
                          @click=${() => this.toggleSelectedClass(lane)}
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
                            <button type="button" ?disabled=${this.viewBar === 0} @click=${() => this.setViewBar(this.viewBar - 1)}>‹</button>
                            <span>BAR ${this.viewBar + 1}/${barCount}</span>
                            <button type="button" ?disabled=${this.viewBar === barCount - 1} @click=${() => this.setViewBar(this.viewBar + 1)}>›</button>
                          </div>
                        `
                      : ''}
                  </div>
                `
              : ''}

            <pad-grid
              .hitCounts=${this.hitCounts}
              .stepHighlights=${stepHighlights}
              .stepClass=${this.selectedClass}
              @pad-toggle=${this.onPadStepToggle}
            ></pad-grid>

            <select class="device-select" @change=${this.onDeviceChange} ?disabled=${isRecording}>
              ${DEVICES.map((d) => html`<option value=${d.id}>${d.name}</option>`)}
            </select>
          </section>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      max-width: 960px;
      width: 100%;
      /* body centers app-root with display:flex — without this, a flex item
         defaults to a min-width equal to its content's min-content size, so
         any oversized descendant (long device names, fixed-width pads, etc.)
         forces the whole app wider than the viewport instead of shrinking
         to fit it. */
      min-width: 0;
      box-sizing: border-box;
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

    .workspace {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 28px;
      align-items: start;
    }

    @media (max-width: 720px) {
      .workspace {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    /* Grid items default to a min-width equal to their content's min-content
       size — without this, long unbroken content (a device name, the pad
       unit) stops the column shrinking to fit a narrow viewport at all. */
    .col {
      min-width: 0;
    }

    .col-title {
      margin: 0 0 16px;
      font: 700 11px/1 ui-monospace, monospace;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #9ca3af;
    }

    .block-label {
      margin: 0 0 8px;
      font: 700 9px/1 ui-monospace, monospace;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6b6b78;
    }

    .stream-block {
      margin-top: 20px;
    }

    .sequence-block {
      margin-top: 20px;
    }

    .placeholder {
      margin: 0;
      padding: 14px;
      border-radius: 8px;
      border: 1px dashed #34343c;
      color: #55555f;
      font: 600 11px/1.4 ui-monospace, monospace;
      text-align: center;
    }

    .hardware-head {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 16px;
    }

    .hardware-head .col-title {
      margin-bottom: 0;
    }

    .device-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #2e2e36;
      background: #16161a;
      font: 700 9px/1.3 ui-monospace, monospace;
      max-width: 100%;
      min-width: 0;
    }

    .device-status-label {
      color: #6b6b78;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .device-status strong {
      color: var(--accent);
      font-size: 10px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .device-select {
      margin-top: 14px;
      width: 100%;
    }

    .record-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 20px;
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
      min-width: 160px;
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

    .class-select-row {
      display: flex;
      gap: 8px;
      margin-bottom: 4px;
    }

    .class-select {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 10px 6px;
      border-radius: 8px;
      border: 1px solid #3a3a44;
      background: linear-gradient(#232329, #16161a);
      cursor: pointer;
      transition:
        border-color 100ms,
        box-shadow 100ms,
        background-color 100ms;
    }

    .class-select-name {
      font: 800 12px/1 ui-monospace, monospace;
      letter-spacing: 0.06em;
      color: var(--class-fg);
    }

    .class-select-pads {
      font: 700 9px/1 ui-monospace, monospace;
      letter-spacing: 0.04em;
      color: #6b6b78;
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
      gap: 8px;
      margin: 6px 0 14px;
    }

    .mapping-hint {
      margin: 0;
      flex: 1;
      min-width: 180px;
      font: 600 11px/1.4 ui-monospace, monospace;
      color: #6b6b78;
    }

    .bar-pager {
      display: flex;
      align-items: center;
      gap: 8px;
      font: 700 10px/1 ui-monospace, monospace;
      color: var(--accent);
      white-space: nowrap;
    }

    .bar-pager button {
      width: 24px;
      height: 24px;
      border-radius: 5px;
      border: 1px solid #3a3a44;
      background: #1c1c22;
      color: #d1d5db;
      font: 700 13px/1 ui-monospace, monospace;
      cursor: pointer;
    }

    .bar-pager button:disabled {
      opacity: 0.35;
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
