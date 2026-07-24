import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { DrumClass } from '../audio/classifier.ts';
import type { QuantizedPattern, RecordedHit } from '../audio/quantize.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES, classShapeSvg } from '../ui/theme.ts';
import './beat-timeline.ts';
import './pattern-grid.ts';
import './level-meter.ts';

type SessionPhase = 'idle' | 'recording' | 'reviewing';

/**
 * The left leaf of the manual: Fig. 01 (voice input — seismograph, transport,
 * legend) and Fig. 02 (the transcribed sequence). Presentation over
 * app-root's session state; record/bpm/lane intents bubble up as events.
 */
@customElement('recording-panel')
export class RecordingPanel extends LitElement {
  @property({ attribute: false }) sessionPhase: SessionPhase = 'idle';
  @property({ type: Number }) level = 0;
  @property({ type: Number }) levelThreshold = 0;
  @property({ attribute: false }) errorMessage: string | null = null;
  @property({ attribute: false }) infoMessage: string | null = null;
  @property({ attribute: false }) recordedHits: RecordedHit[] = [];
  @property({ type: Number }) bpm = 100;
  @property({ type: Number }) targetBpm = 100;
  @property({ attribute: false }) pattern: QuantizedPattern = { steps: [], totalSteps: 16 };
  @property({ attribute: false }) selectedClass: DrumClass | null = null;
  @property({ type: Boolean }) headphonesOn = false;
  @property({ type: Boolean }) isAnalyzingFile = false;
  @property({ type: Boolean }) hasTakeAudio = false;
  @property({ attribute: false }) activeClasses: DrumClass[] = ['kick', 'snare', 'hat'];

  private onRecordClick = (): void => {
    this.dispatchEvent(new CustomEvent('record-toggle', { bubbles: true, composed: true }));
  };
  private onDownloadAudioClick = (): void => {
    this.dispatchEvent(new CustomEvent('download-audio', { bubbles: true, composed: true }));
  };
  private onDownloadDiagnosticsClick = (): void => {
    this.dispatchEvent(new CustomEvent('download-diagnostics', { bubbles: true, composed: true }));
  };
  private adjustBpm(delta: number): void {
    this.dispatchEvent(new CustomEvent<number>('bpm-adjust', { detail: delta, bubbles: true, composed: true }));
  }
  private adjustTargetBpm(delta: number): void {
    this.dispatchEvent(new CustomEvent<number>('target-bpm-adjust', { detail: delta, bubbles: true, composed: true }));
  }
  private onHeadphonesClick = (): void => {
    this.dispatchEvent(new CustomEvent<boolean>('headphones-toggle', { detail: !this.headphonesOn, bubbles: true, composed: true }));
  };
  private onFileInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    // Reset so choosing the same file again still fires 'change'.
    input.value = '';
    if (file) this.dispatchEvent(new CustomEvent<File>('file-upload', { detail: file, bubbles: true, composed: true }));
  };
  private onActiveClassClick = (cls: DrumClass): void => {
    this.dispatchEvent(new CustomEvent<DrumClass>('active-class-toggle', { detail: cls, bubbles: true, composed: true }));
  };

  render() {
    const isRecording = this.sessionPhase === 'recording';
    const reviewing = this.sessionPhase === 'reviewing';
    const recordLabel = isRecording ? 'Stop' : reviewing ? 'Record again' : 'Record';
    const scopeLabel = isRecording
      ? 'RECORDING'
      : this.isAnalyzingFile
        ? 'ANALYZING'
        : reviewing
          ? `${this.bpm} BPM`
          : 'STANDBY';
    const durationS = (Math.max(...this.recordedHits.map((h) => h.timeMs), 0) / 1000).toFixed(1);

    return html`
      <section>
        <div class="fig">Fig. 01 — Voice Input<span class="line"></span></div>

        <div class="scope">
          <span class="scope-tag">${scopeLabel}</span>
          <beat-timeline .recording=${isRecording}></beat-timeline>
        </div>
        <p class="caption">Raw transient signal captured from the microphone.</p>

        <div class="transport">
          <button type="button" class="rec" ?data-on=${isRecording} ?disabled=${this.isAnalyzingFile} @click=${this.onRecordClick}>
            <span class="dot"></span>${recordLabel}
          </button>
          <label class="upload" ?data-disabled=${isRecording || this.isAnalyzingFile}>
            ${this.isAnalyzingFile ? 'Analyzing…' : 'Upload audio'}
            <input
              type="file"
              accept="audio/*"
              ?disabled=${isRecording || this.isAnalyzingFile}
              @change=${this.onFileInputChange}
            />
          </label>
          ${!reviewing
            ? html`
                <div class="metro" aria-label="Metronome tempo">
                  <span class="metro-lbl">BPM</span>
                  <button type="button" ?disabled=${isRecording} @click=${() => this.adjustTargetBpm(-5)}>−</button>
                  <b>${this.targetBpm}</b>
                  <button type="button" ?disabled=${isRecording} @click=${() => this.adjustTargetBpm(5)}>+</button>
                </div>
                <button
                  type="button"
                  class="phones"
                  ?data-on=${this.headphonesOn}
                  ?disabled=${isRecording}
                  aria-pressed=${this.headphonesOn}
                  @click=${this.onHeadphonesClick}
                >
                  Headphones ${this.headphonesOn ? 'On' : 'Off'}
                </button>
              `
            : nothing}
          <div class="meter">
            <div class="meter-scale"><span>MIC</span><span>0dB</span></div>
            <level-meter .level=${this.level} .threshold=${this.levelThreshold}></level-meter>
          </div>
        </div>
        ${!reviewing
          ? html`
              <p class="metro-hint">
                ${this.headphonesOn
                  ? 'Click plays through your headphones, so it never reaches the mic.'
                  : 'No click plays through the speakers — follow the pulse on the waveform above instead.'}
              </p>
            `
          : nothing}

        ${this.errorMessage ? html`<p class="msg err">${this.errorMessage}</p>` : nothing}
        ${this.infoMessage ? html`<p class="msg info">${this.infoMessage}</p>` : nothing}

        <div class="legend">
          ${DRUM_CLASS_LANES.slice().reverse().map((lane) => {
            const s = CLASS_COLORS[lane];
            const active = this.activeClasses.includes(lane);
            return html`
              <button
                type="button"
                class="key"
                ?data-off=${!active}
                ?disabled=${isRecording}
                @click=${() => this.onActiveClassClick(lane)}
              >
                <span class="sym">${unsafeHTML(classShapeSvg(s.shape, s.fg))}</span>
                <span class="ktext"><b>${s.label.charAt(0) + s.label.slice(1).toLowerCase()}</b><em>${s.gloss}</em></span>
              </button>
            `;
          })}
        </div>
        <p class="legend-hint">Tap a sound you never use to turn it off — the transcription will never reach for it.</p>

        <div class="fig fig2">Fig. 02 — Transcribed Sequence<span class="line"></span></div>
        ${reviewing
          ? html`
              <div class="seq-head">
                <span class="meta">${this.recordedHits.length} hits · ${durationS}s</span>
                <span class="bpm">
                  <button type="button" @click=${() => this.adjustBpm(-1)}>−</button>
                  <b>${this.bpm} BPM</b>
                  <button type="button" @click=${() => this.adjustBpm(1)}>+</button>
                </span>
              </div>
              <pattern-grid .pattern=${this.pattern} .selectedClass=${this.selectedClass}></pattern-grid>
              <div class="downloads">
                <button type="button" ?disabled=${!this.hasTakeAudio} @click=${this.onDownloadAudioClick}>Download audio</button>
                <button type="button" @click=${this.onDownloadDiagnosticsClick}>Download diagnostics</button>
                <span class="downloads-hint">For sharing a take that transcribed wrong.</span>
              </div>
            `
          : html`<p class="placeholder">Record a take to see the transcribed sequence here.</p>`}
      </section>
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
      margin-bottom: var(--space-5);
    }
    .fig.fig2 {
      margin-top: var(--space-8);
    }
    .fig .line {
      flex: 1;
      height: 1px;
      background: var(--hair);
    }

    .scope {
      position: relative;
      border: 1px solid var(--ink);
      padding: var(--space-3) var(--space-4);
    }
    .scope-tag {
      position: absolute;
      top: var(--space-2);
      right: var(--space-3);
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      color: var(--ink-soft);
    }
    .caption {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      margin: var(--space-3) 0 0;
    }

    .transport {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-4) var(--space-5);
      margin-top: var(--space-5);
    }
    .rec {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-md);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--ink);
      padding: var(--space-3) var(--space-5);
      cursor: pointer;
      min-height: 44px;
      transition: background-color var(--dur-fast) var(--ease);
    }
    .rec:hover {
      background: var(--hair-soft);
    }
    .rec .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--rec);
    }
    .rec[data-on] {
      background: var(--ink);
      color: var(--paper);
    }
    .rec[data-on] .dot {
      background: var(--paper);
      animation: blink var(--dur-slow) steps(2, start) infinite;
    }
    @keyframes blink {
      50% {
        opacity: 0.25;
      }
    }

    .metro {
      display: flex;
      align-items: center;
      gap: var(--space-1-5);
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      white-space: nowrap;
    }
    .metro b {
      font-size: var(--text-sm);
      color: var(--ink);
      min-width: 26px;
      text-align: center;
    }
    .metro button {
      width: 18px;
      height: 18px;
      border: none;
      background: none;
      color: var(--ink-soft);
      font-family: var(--mono);
      font-size: var(--text-base);
      line-height: 1;
      padding: 0;
      cursor: pointer;
      transition: color var(--dur-fast) var(--ease);
    }
    .metro button:hover:not(:disabled) {
      color: var(--ink);
    }
    .metro button:disabled {
      opacity: 0.35;
      cursor: default;
    }

    .phones {
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1-5) var(--space-3);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
    }
    .phones:hover:not(:disabled) {
      border-color: var(--ink);
      color: var(--ink);
    }
    .phones[data-on] {
      background: var(--ink);
      border-color: var(--ink);
      color: var(--paper);
    }
    .phones:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .upload {
      display: inline-flex;
      align-items: center;
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1-5) var(--space-3);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
    }
    .upload:hover:not([data-disabled]) {
      border-color: var(--ink);
      color: var(--ink);
    }
    .upload[data-disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .upload input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .metro-hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-sm);
      color: var(--ink-soft);
      opacity: 0.75;
      margin: var(--space-2) 0 0;
    }

    .meter {
      flex: 1;
    }
    .meter-scale {
      display: flex;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      color: var(--ink-soft);
      margin-bottom: var(--space-1);
    }

    .msg {
      font-family: var(--mono);
      font-size: var(--text-sm);
      margin: var(--space-3) 0 0;
    }
    .msg.err {
      color: var(--kick);
    }
    .msg.info {
      color: var(--ink-soft);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-6);
      margin-top: var(--space-6);
    }
    .key {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      opacity: 1;
      transition: opacity var(--dur-fast) var(--ease);
    }
    .key[data-off] {
      opacity: 0.35;
    }
    .key:hover:not(:disabled) {
      opacity: 0.7;
    }
    .key[data-off]:hover:not(:disabled) {
      opacity: 0.55;
    }
    .key:disabled {
      cursor: default;
    }
    .legend-hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-sm);
      color: var(--ink-soft);
      opacity: 0.75;
      margin: var(--space-2) 0 0;
    }
    .sym {
      width: 24px;
      height: 24px;
      display: block;
      flex-shrink: 0;
      line-height: 0;
    }
    .ktext {
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }
    .ktext b {
      font-family: var(--grot);
      font-weight: var(--w-bold);
      font-size: var(--text-base);
      color: var(--ink);
    }
    .ktext em {
      font-family: var(--mono);
      font-style: normal;
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .placeholder {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      border: 1px dashed var(--hair);
      padding: var(--space-5);
      text-align: center;
      margin: 0;
    }

    .seq-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-3);
    }
    .meta {
      font-family: var(--mono);
      font-size: var(--text-sm);
      color: var(--ink-soft);
      letter-spacing: var(--track-normal);
    }
    .bpm {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    .bpm b {
      font-family: var(--mono);
      font-size: var(--text-sm);
      color: var(--ink);
      min-width: 62px;
      text-align: center;
    }
    .bpm button {
      width: 26px;
      height: 26px;
      border: 1px solid var(--ink);
      background: var(--paper);
      color: var(--ink);
      font-family: var(--mono);
      font-size: var(--text-base);
      cursor: pointer;
    }
    .bpm button:hover {
      background: var(--hair-soft);
    }

    .downloads {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-3);
      margin-top: var(--space-5);
      padding-top: var(--space-4);
      border-top: 1px dashed var(--hair);
    }
    .downloads button {
      font-family: var(--mono);
      font-size: var(--text-2xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1-5) var(--space-3);
      cursor: pointer;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
    }
    .downloads button:hover:not(:disabled) {
      border-color: var(--ink);
      color: var(--ink);
    }
    .downloads button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .downloads-hint {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-sm);
      color: var(--ink-soft);
      opacity: 0.75;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'recording-panel': RecordingPanel;
  }
}
