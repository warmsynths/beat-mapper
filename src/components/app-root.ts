import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { AudioEngine, DEFAULT_AUDIO_ENGINE_CONFIG, MIN_NOISE_FLOOR } from '../audio/audio-engine.ts';
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
import { audioEngineContext, beatBusContext, deviceConfigContext } from '../state/contexts.ts';
import './app-header.ts';
import './recording-panel.ts';
import './hardware-panel.ts';

const DEVICES: DeviceConfig[] = [sp404mkiiConfig, po33Config, po32Config];

// onsetRatio bounds: at SENS_MAX the knob is maximally sensitive (a hit only
// needs to be 10% above the ambient floor); at SENS_MIN it needs to be 3x
// the floor.
const SENS_MIN = 1.1;
const SENS_MAX = 3.0;
const TONE_MIN = 0.5;
const TONE_MAX = 2.0;

type SessionPhase = 'idle' | 'recording' | 'reviewing';

/** Everything about one bank's transcribed take — persisted per SET so
 * switching banks recalls that bank's work (per-bank memory). */
interface BankSlice {
  recordedHits: RecordedHit[];
  bpm: number;
  pattern: QuantizedPattern;
  selectedClass: DrumClass | null;
  viewBar: number;
  sessionPhase: SessionPhase;
}

const emptySlice = (): BankSlice => ({
  recordedHits: [],
  bpm: 100,
  pattern: { steps: [], totalSteps: 16 },
  selectedClass: null,
  viewBar: 0,
  sessionPhase: 'idle',
});

@customElement('app-root')
export class AppRoot extends LitElement {
  @provide({ context: audioEngineContext })
  private engine = new AudioEngine();

  @provide({ context: beatBusContext })
  private bus = new BeatBus();

  @provide({ context: deviceConfigContext })
  @state()
  private deviceConfig: DeviceConfig = DEVICES[0];

  @state() private errorMessage: string | null = null;
  @state() private infoMessage: string | null = null;
  @state() private activeBank = this.deviceConfig.banks?.[0] ?? '';
  @state() private level = 0;
  @state() private levelThreshold = MIN_NOISE_FLOOR * DEFAULT_AUDIO_ENGINE_CONFIG.onsetRatio;
  @state() private sensitivity = SENS_MIN + SENS_MAX - DEFAULT_AUDIO_ENGINE_CONFIG.onsetRatio;
  @state() private tone = 1.0;

  // Working take for the active bank.
  @state() private sessionPhase: SessionPhase = 'idle';
  @state() private recordedHits: RecordedHit[] = [];
  @state() private bpm = 100;
  @state() private pattern: QuantizedPattern = { steps: [], totalSteps: 16 };
  @state() private selectedClass: DrumClass | null = null;
  @state() private viewBar = 0;

  /** Per-bank saved takes (per-bank memory). The active bank lives in the
   * working @state above; other banks are parked here until re-selected. */
  @state() private bankStore: Record<string, BankSlice> = {};

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

    this.recordedHits = [
      ...this.recordedHits,
      {
        class: result.class,
        controlId: control.id,
        controlLabel: control.label,
        confidence: result.confidence,
        timeMs: performance.now() - this.recordingStartedAt,
      },
    ];
    this.bus.emit({ class: result.class, confidence: result.confidence, controlId: control.id, timestamp: performance.now() });
  };

  private async handleRecordButton(): Promise<void> {
    this.errorMessage = null;
    this.infoMessage = null;

    if (this.sessionPhase === 'recording') {
      this.engine.stop();
      this.finishRecording();
      return;
    }

    this.recordedHits = [];
    this.pattern = { steps: [], totalSteps: 16 };
    this.selectedClass = null;
    this.viewBar = 0;
    this.sessionPhase = 'recording';
    this.recordingStartedAt = performance.now();
    await this.engine.start();
  }

  private finishRecording(): void {
    if (this.recordedHits.length === 0) {
      this.sessionPhase = 'idle';
      this.infoMessage = 'No hits detected — raise SENS (or beatbox louder/closer to the mic) and record again.';
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

  // --- per-bank memory ---------------------------------------------------

  private saveActiveBank(): void {
    if (!this.activeBank) return;
    this.bankStore = {
      ...this.bankStore,
      [this.activeBank]: {
        recordedHits: this.recordedHits,
        bpm: this.bpm,
        pattern: this.pattern,
        selectedClass: this.selectedClass,
        viewBar: this.viewBar,
        sessionPhase: this.sessionPhase === 'recording' ? 'reviewing' : this.sessionPhase,
      },
    };
  }

  private loadBank(bank: string): void {
    const s = this.bankStore[bank] ?? emptySlice();
    this.recordedHits = s.recordedHits;
    this.bpm = s.bpm;
    this.pattern = s.pattern;
    this.selectedClass = s.selectedClass;
    this.viewBar = s.viewBar;
    this.sessionPhase = s.sessionPhase;
    this.errorMessage = null;
    this.infoMessage = null;
  }

  private get usedBanks(): string[] {
    const used = Object.entries(this.bankStore)
      .filter(([, s]) => s.recordedHits.length > 0)
      .map(([b]) => b);
    if (this.recordedHits.length > 0 && !used.includes(this.activeBank)) used.push(this.activeBank);
    return used;
  }

  private onBankChange = (event: CustomEvent<string>): void => {
    const next = event.detail;
    if (next === this.activeBank) return;
    if (this.sessionPhase === 'recording') {
      this.engine.stop();
      this.finishRecording();
    }
    this.saveActiveBank();
    this.activeBank = next;
    this.loadBank(next);
  };

  private onDeviceChange = (id: string): void => {
    const next = DEVICES.find((d) => d.id === id);
    if (!next) return;
    if (this.sessionPhase === 'recording') this.engine.stop();
    this.deviceConfig = next;
    this.bankStore = {};
    this.activeBank = next.banks?.[0] ?? '';
    this.recordedHits = [];
    this.pattern = { steps: [], totalSteps: 16 };
    this.selectedClass = null;
    this.viewBar = 0;
    this.sessionPhase = 'idle';
  };

  private toggleSelectedClass(lane: DrumClass): void {
    this.selectedClass = this.selectedClass === lane ? null : lane;
  }

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
    this.engine.updateConfig({ onsetRatio: SENS_MIN + SENS_MAX - this.sensitivity });
  };
  private onToneChange = (event: CustomEvent<number>): void => {
    this.tone = event.detail;
    this.thresholds = {
      ...this.thresholds,
      kickCentroidHz: DEFAULT_CLASSIFIER_THRESHOLDS.kickCentroidHz * this.tone,
      snareCentroidHz: DEFAULT_CLASSIFIER_THRESHOLDS.snareCentroidHz * this.tone,
      hatCentroidHz: DEFAULT_CLASSIFIER_THRESHOLDS.hatCentroidHz * this.tone,
    };
  };

  render() {
    const isRecording = this.sessionPhase === 'recording';
    const status = isRecording ? 'recording' : this.sessionPhase === 'reviewing' ? 'review' : 'standby';

    return html`
      <div class="sheet">
        <span class="crop tl"></span><span class="crop tr"></span>
        <span class="crop bl"></span><span class="crop br"></span>

        <app-header .status=${status}></app-header>

        <div class="spread">
          <div class="leaf leaf-left">
            <recording-panel
              .sessionPhase=${this.sessionPhase}
              .level=${this.level}
              .levelThreshold=${this.levelThreshold}
              .errorMessage=${this.errorMessage}
              .infoMessage=${this.infoMessage}
              .recordedHits=${this.recordedHits}
              .bpm=${this.bpm}
              .pattern=${this.pattern}
              .selectedClass=${this.selectedClass}
              @record-toggle=${() => this.handleRecordButton()}
              @bpm-adjust=${(e: CustomEvent<number>) => this.adjustBpm(e.detail)}
              @lane-select=${(e: CustomEvent<DrumClass>) => this.toggleSelectedClass(e.detail)}
            ></recording-panel>
          </div>

          <div class="leaf leaf-right">
            <hardware-panel
              .deviceConfig=${this.deviceConfig}
              .devices=${DEVICES}
              .activeBank=${this.activeBank}
              .usedBanks=${this.usedBanks}
              .sessionPhase=${this.sessionPhase}
              .selectedClass=${this.selectedClass}
              .viewBar=${this.viewBar}
              .pattern=${this.pattern}
              .isRecording=${isRecording}
              .sensMin=${SENS_MIN}
              .sensMax=${SENS_MAX}
              .sensitivity=${this.sensitivity}
              .toneMin=${TONE_MIN}
              .toneMax=${TONE_MAX}
              .tone=${this.tone}
              @bank-change=${this.onBankChange}
              @class-toggle=${(e: CustomEvent<DrumClass>) => this.toggleSelectedClass(e.detail)}
              @bar-change=${(e: CustomEvent<number>) => this.setViewBar(e.detail)}
              @pad-toggle=${this.onPadStepToggle}
              @device-change=${(e: CustomEvent<string>) => this.onDeviceChange(e.detail)}
              @sensitivity-change=${this.onSensitivityChange}
              @tone-change=${this.onToneChange}
            ></hardware-panel>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: var(--space-8) 0;
    }

    .sheet {
      position: relative;
      max-width: 1080px;
      margin: 0 auto;
      background: var(--paper);
      padding: var(--space-9) var(--space-10) var(--space-10);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.06), 0 30px 70px -30px rgba(0, 0, 0, 0.35);
    }
    /* paper grain */
    .sheet::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.32;
      mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
    }

    .crop {
      position: absolute;
      width: 15px;
      height: 15px;
      z-index: 1;
    }
    .crop::before,
    .crop::after {
      content: '';
      position: absolute;
      background: var(--ink);
    }
    .crop::before {
      width: 15px;
      height: 1px;
    }
    .crop::after {
      width: 1px;
      height: 15px;
    }
    .crop.tl {
      top: 18px;
      left: 22px;
    }
    .crop.tr {
      top: 18px;
      right: 22px;
    }
    .crop.tr::before,
    .crop.tr::after {
      right: 0;
    }
    .crop.bl {
      bottom: 18px;
      left: 22px;
    }
    .crop.bl::before,
    .crop.bl::after {
      bottom: 0;
    }
    .crop.br {
      bottom: 18px;
      right: 22px;
    }
    .crop.br::before,
    .crop.br::after {
      bottom: 0;
      right: 0;
    }

    .spread {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: var(--space-7);
    }
    .leaf {
      min-width: 0;
      padding: var(--space-7) 0;
    }
    .leaf-left {
      padding-right: var(--space-8);
      border-right: 1px solid var(--hair);
    }
    .leaf-right {
      padding-left: var(--space-8);
    }

    /* tablet + mobile: manual collapses to a single column */
    @media (max-width: 820px) {
      .sheet {
        padding: var(--space-8) var(--space-7) var(--space-8);
      }
      .spread {
        grid-template-columns: 1fr;
      }
      .leaf-left {
        padding-right: 0;
        border-right: 0;
        border-bottom: 1px solid var(--hair);
      }
      .leaf-right {
        padding-left: 0;
      }
    }

    @media (max-width: 560px) {
      :host {
        padding: 0;
      }
      .sheet {
        max-width: none;
        min-height: 100svh;
        padding: var(--space-7) var(--space-5) var(--space-8);
        box-shadow: none;
      }
      .crop {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
