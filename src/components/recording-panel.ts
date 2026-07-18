import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EngineState } from '../audio/types.ts';
import type { DrumClass } from '../audio/classifier.ts';
import type { QuantizedPattern, RecordedHit } from '../audio/quantize.ts';
import { ACCENT, CLASS_COLORS } from '../ui/theme.ts';
import './beat-timeline.ts';
import './pattern-grid.ts';
import './level-meter.ts';

type SessionPhase = 'idle' | 'recording' | 'reviewing';

/**
 * Left column: the live LCD readout + transport, the scrolling input
 * stream, and the reviewed take's step sequence once one exists. Pure
 * presentation over app-root's session state — record/bpm intents go back
 * up as events rather than being handled here.
 */
@customElement('recording-panel')
export class RecordingPanel extends LitElement {
  @property({ attribute: false }) sessionPhase: SessionPhase = 'idle';
  @property({ attribute: false }) engineState: EngineState = EngineState.IDLE;
  @property({ attribute: false }) lastResult: { class: DrumClass; confidence: number } | null = null;
  @property({ type: Number }) level = 0;
  @property({ type: Number }) levelThreshold = 0;
  @property({ attribute: false }) errorMessage: string | null = null;
  @property({ attribute: false }) infoMessage: string | null = null;
  @property({ attribute: false }) recordedHits: RecordedHit[] = [];
  @property({ type: Number }) bpm = 100;
  @property({ attribute: false }) pattern: QuantizedPattern = { steps: [], totalSteps: 16 };
  @property({ attribute: false }) padLabels: Partial<Record<DrumClass, string[]>> = {};
  @property({ attribute: false }) selectedClass: DrumClass | null = null;

  private onRecordClick = (): void => {
    this.dispatchEvent(new CustomEvent('record-toggle', { bubbles: true, composed: true }));
  };

  private adjustBpm(delta: number): void {
    this.dispatchEvent(new CustomEvent<number>('bpm-adjust', { detail: delta, bubbles: true, composed: true }));
  }

  render() {
    const isRecording = this.sessionPhase === 'recording';
    const readoutColor = this.lastResult ? CLASS_COLORS[this.lastResult.class].fg : ACCENT;
    const readoutState =
      this.sessionPhase === 'recording' ? 'recording' : this.sessionPhase === 'reviewing' ? 'complete' : this.engineState.replace('_', ' ');
    const recordLabel = this.sessionPhase === 'recording' ? 'STOP' : this.sessionPhase === 'reviewing' ? 'RECORD AGAIN' : 'RECORD';

    return html`
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
            <button type="button" class="rec-button" ?data-active=${isRecording} @click=${this.onRecordClick}>
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
                <pattern-grid .pattern=${this.pattern} .padLabels=${this.padLabels} .selectedClass=${this.selectedClass}></pattern-grid>
              `
            : html`<p class="placeholder">Record a take to see the transcribed sequence here.</p>`}
        </div>
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

    .block-label {
      margin: 0 0 var(--space-2);
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      color: var(--color-text-dim);
    }

    .stream-block {
      margin-top: var(--space-7);
    }

    .sequence-block {
      margin-top: var(--space-7);
    }

    .placeholder {
      margin: 0;
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      border: 1px dashed var(--color-border-panel);
      color: var(--color-border-strong);
      font: var(--weight-semibold) var(--text-base) / 1.4 var(--font-mono);
      text-align: center;
    }

    .record-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-7);
      position: relative;
    }

    .readout {
      --level: 0;
      width: 96px;
      height: 96px;
      flex-shrink: 0;
      border-radius: var(--radius-full);
      background: radial-gradient(circle at 40% 30%, var(--color-surface-2), var(--color-canvas) 75%);
      border: 3px solid var(--color-border);
      position: relative;
      display: grid;
      place-items: center;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
    }

    .readout-ring {
      position: absolute;
      inset: -3px;
      border-radius: var(--radius-full);
      border: 2px solid var(--readout-color, var(--color-accent));
      opacity: calc(0.25 + var(--level) * 0.6);
      box-shadow: 0 0 calc(6px + var(--level) * 18px) var(--readout-color, var(--color-accent));
      transition: opacity var(--duration-instant) var(--ease-linear);
    }

    .readout-ring[data-phase-recording] {
      animation: rec-pulse var(--duration-slower) var(--ease-in-out) infinite;
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
      gap: var(--space-0-5);
    }

    .readout-state {
      font: var(--weight-bold) var(--text-2xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      color: var(--color-text-dim);
      text-transform: uppercase;
      transition: color var(--duration-base);
    }

    .readout-state[data-phase='recording'] {
      color: var(--color-record);
    }

    .readout-state[data-phase='reviewing'] {
      color: var(--color-success);
    }

    .readout-class {
      font: var(--weight-extrabold) var(--text-xl) / 1 var(--font-mono);
      letter-spacing: var(--tracking-normal);
      color: var(--readout-color, var(--color-accent));
      text-shadow: 0 0 10px var(--readout-color, var(--color-accent));
    }

    .transport {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      flex: 1;
      min-width: 160px;
    }

    .rec-button {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      width: fit-content;
      font: var(--weight-bold) var(--text-md) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      padding: var(--space-2-5) var(--space-5);
      border-radius: var(--radius-pill);
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      cursor: pointer;
      transition:
        background-color var(--duration-base),
        border-color var(--duration-base);
    }

    .rec-button .dot {
      width: var(--space-2-5);
      height: var(--space-2-5);
      border-radius: var(--radius-full);
      background: var(--color-record-dim);
    }

    .rec-button[data-active] {
      background: var(--color-record-bg);
      border-color: var(--color-record);
      color: var(--color-record-fg);
    }

    .rec-button[data-active] .dot {
      background: var(--color-record);
      box-shadow: 0 0 8px var(--color-record);
      animation: pulse var(--duration-slow) var(--ease-in-out) infinite;
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
      color: var(--color-error);
      font-size: var(--text-md);
      margin: 0;
    }

    .info {
      color: var(--color-accent);
      font-size: var(--text-md);
      margin: 0;
    }

    .level-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .level-label {
      font: var(--weight-bold) var(--text-xs) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wider);
      color: var(--color-text-dim);
      flex-shrink: 0;
    }

    .level-row level-meter {
      flex: 1;
    }

    .pattern-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
    }

    .pattern-meta {
      font: var(--weight-semibold) var(--text-base) / 1 var(--font-mono);
      color: var(--color-text-muted);
      display: flex;
      gap: var(--space-1-5);
    }

    .pattern-meta .dim {
      color: var(--color-text-faint);
    }

    .bpm-control {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .bpm-control button {
      width: 22px;
      height: 22px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      font: var(--weight-bold) var(--text-lg) / 1 var(--font-mono);
      cursor: pointer;
    }

    .bpm-value {
      font: var(--weight-bold) var(--text-base) / 1 var(--font-mono);
      color: var(--color-accent);
      min-width: 56px;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'recording-panel': RecordingPanel;
  }
}
