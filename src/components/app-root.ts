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
import { DRUM_CLASS_LANES } from '../ui/theme.ts';
import './app-header.ts';
import './recording-panel.ts';
import './hardware-panel.ts';

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

  private onDeviceChange = (id: string): void => {
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

    const padLabels: Partial<Record<DrumClass, string[]>> = {};
    for (const lane of DRUM_CLASS_LANES) {
      const controls = getControls(this.deviceConfig, this.deviceConfig.classMapping[lane]);
      if (controls.length) padLabels[lane] = controls.map((c) => c.label);
    }

    return html`
      <div class="panel">
        <span class="screw tl"></span>
        <span class="screw tr"></span>
        <span class="screw bl"></span>
        <span class="screw br"></span>

        <app-header
          .sensMin=${SENS_MIN}
          .sensMax=${SENS_MAX}
          .sensitivity=${this.sensitivity}
          .toneMin=${TONE_MIN}
          .toneMax=${TONE_MAX}
          .tone=${this.tone}
          @sensitivity-change=${this.onSensitivityChange}
          @tone-change=${this.onToneChange}
        ></app-header>

        <div class="workspace">
          <recording-panel
            .sessionPhase=${this.sessionPhase}
            .engineState=${this.engineState}
            .lastResult=${this.lastResult}
            .level=${this.level}
            .levelThreshold=${this.levelThreshold}
            .errorMessage=${this.errorMessage}
            .infoMessage=${this.infoMessage}
            .recordedHits=${this.recordedHits}
            .bpm=${this.bpm}
            .pattern=${this.pattern}
            .padLabels=${padLabels}
            .selectedClass=${this.selectedClass}
            @record-toggle=${() => this.handleRecordButton()}
            @bpm-adjust=${(event: CustomEvent<number>) => this.adjustBpm(event.detail)}
            @lane-select=${this.onLaneSelect}
          ></recording-panel>

          <hardware-panel
            .deviceConfig=${this.deviceConfig}
            .devices=${DEVICES}
            .activeBank=${this.activeBank}
            .sessionPhase=${this.sessionPhase}
            .selectedClass=${this.selectedClass}
            .viewBar=${this.viewBar}
            .pattern=${this.pattern}
            .hitCounts=${this.hitCounts}
            .isRecording=${isRecording}
            @bank-change=${this.onBankChange}
            @class-toggle=${(event: CustomEvent<DrumClass>) => this.toggleSelectedClass(event.detail)}
            @bar-change=${(event: CustomEvent<number>) => this.setViewBar(event.detail)}
            @pad-toggle=${this.onPadStepToggle}
            @device-change=${(event: CustomEvent<string>) => this.onDeviceChange(event.detail)}
          ></hardware-panel>
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
      padding: var(--space-10) var(--space-7);
      font: var(--text-2xl) / 1.5 var(--font-sans);
      color: var(--color-text-bright);
    }

    .panel {
      position: relative;
      padding: var(--space-9) var(--space-9) var(--space-8);
      border-radius: var(--radius-panel);
      background:
        radial-gradient(circle at 15% -10%, rgba(255, 255, 255, 0.05), transparent 40%),
        linear-gradient(180deg, var(--color-surface-4) 0%, var(--color-surface-1) 100%);
      border: 1px solid var(--color-border-panel);
      box-shadow: var(--shadow-lg), var(--shadow-inset-highlight);
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
      border-radius: var(--radius-full);
      background: radial-gradient(circle at 35% 30%, var(--color-metal), var(--color-surface-1) 70%);
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

    app-header {
      display: block;
      margin-bottom: var(--space-7);
    }

    .workspace {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: var(--space-9);
      align-items: start;
    }

    @media (max-width: 720px) {
      .workspace {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
