import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { QuantizedPattern } from '../audio/quantize.ts';
import type { DrumClass } from '../audio/classifier.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES } from '../ui/theme.ts';

const CELL_WIDTH = 26;
const STEPS_PER_BAR = 16;

/**
 * Static, non-fading step-sequencer view of a finished take — the actual
 * deliverable: read this grid and play the same pads back on the hardware's
 * own pattern sequencer. Unlike the live beat-timeline, nothing here scrolls
 * or disappears; it stays on screen until you record again.
 */
@customElement('pattern-grid')
export class PatternGrid extends LitElement {
  @property({ attribute: false })
  pattern: QuantizedPattern = { steps: [], totalSteps: STEPS_PER_BAR };

  /** Pad label(s) to show next to each lane, e.g. { kick: ['1'], snare: ['2', '9'], hat: ['3'] }. */
  @property({ attribute: false })
  padLabels: Partial<Record<DrumClass, string[]>> = {};

  /** Class selected for pad-mapping — lights it up here and its pad(s) in the pad grid above. */
  @property({ attribute: false })
  selectedClass: DrumClass | null = null;

  private onLaneClick(lane: DrumClass): void {
    this.dispatchEvent(new CustomEvent<DrumClass>('lane-select', { detail: lane, bubbles: true, composed: true }));
  }

  render() {
    const hitsByLane = new Map<DrumClass, Set<number>>();
    for (const lane of DRUM_CLASS_LANES) hitsByLane.set(lane, new Set());
    for (const hit of this.pattern.steps) {
      hitsByLane.get(hit.class)?.add(hit.step);
    }

    const steps = Array.from({ length: this.pattern.totalSteps }, (_, i) => i);

    return html`
      <div class="pattern">
        <div class="lane-labels">
          ${DRUM_CLASS_LANES.map(
            (lane) => html`
              <button
                type="button"
                class="lane-label"
                ?data-selected=${this.selectedClass === lane}
                style="color: ${CLASS_COLORS[lane].fg}"
                @click=${() => this.onLaneClick(lane)}
              >
                <span>${CLASS_COLORS[lane].label}</span>
                ${this.padLabels[lane]?.length
                  ? html`<b>${this.padLabels[lane]!.map((label) => `P${label}`).join(' ')}</b>`
                  : ''}
              </button>
            `
          )}
        </div>
        <div class="scroll">
          <div class="lanes-steps" style="width: ${steps.length * CELL_WIDTH}px">
            ${DRUM_CLASS_LANES.map((lane) => {
              const hitSteps = hitsByLane.get(lane)!;
              return html`
                <div class="step-row">
                  ${steps.map(
                    (i) => html`
                      <div
                        class="step"
                        ?data-bar-start=${i % STEPS_PER_BAR === 0}
                        ?data-beat-start=${i % 4 === 0}
                        ?data-hit=${hitSteps.has(i)}
                        style="--class-fg: ${CLASS_COLORS[lane].fg}; --class-glow: ${CLASS_COLORS[lane].glow}"
                      ></div>
                    `
                  )}
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .pattern {
      display: flex;
      border: 1px solid var(--border, var(--color-border-subtle));
      border-radius: var(--radius-lg);
      background: var(--color-well);
      overflow: hidden;
    }

    .lane-labels {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-right: 1px solid var(--border, var(--color-border-subtle));
    }

    .lane-label {
      height: 32px;
      display: flex;
      align-items: center;
      gap: var(--space-1-5);
      padding: 0 var(--space-3);
      font: var(--weight-bold) var(--text-sm) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      white-space: nowrap;
      background: none;
      border: none;
      border-left: 2px solid transparent;
      cursor: pointer;
      text-align: left;
    }

    .lane-label:hover {
      background: rgba(255, 255, 255, 0.03);
    }

    .lane-label[data-selected] {
      background: rgba(255, 255, 255, 0.06);
      border-left-color: currentColor;
    }

    .lane-label b {
      opacity: 0.7;
      font-weight: 700;
    }

    .scroll {
      overflow-x: auto;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      min-width: 0;
    }

    .lanes-steps {
      display: flex;
      flex-direction: column;
    }

    .step-row {
      display: flex;
      height: 32px;
    }

    .step {
      width: ${CELL_WIDTH}px;
      flex-shrink: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.03);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .step::after {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: var(--radius-xs);
      background: rgba(255, 255, 255, 0.04);
      transition:
        background-color var(--duration-fast),
        box-shadow var(--duration-fast);
    }

    .step[data-beat-start] {
      border-right-color: rgba(255, 255, 255, 0.08);
    }

    .step[data-bar-start] {
      border-right-color: rgba(255, 255, 255, 0.18);
    }

    .step[data-hit]::after {
      background: var(--class-fg);
      box-shadow: 0 0 8px var(--class-glow);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pattern-grid': PatternGrid;
  }
}
