import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { QuantizedPattern } from '../audio/quantize.ts';
import type { DrumClass } from '../audio/classifier.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES, classShapeSvg } from '../ui/theme.ts';

const STEPS_PER_BAR = 16;

/** Three-letter lane abbreviations for the notation gutter (KCK/SNR/HAT
 * read as drum shorthand, unlike a raw truncation of the label). */
const LANE_ABBR: Record<DrumClass, string> = { kick: 'KCK', snare: 'SNR', hat: 'HAT' };

/**
 * Fig. 02 — the transcribed sequence, drawn as printed notation. Three lanes
 * (hat / snare / kick), sixteen steps, hairline ruled with heavier bar/beat
 * rules; each placed hit is the class's primitive (circle / square /
 * triangle) inked in its spot colour. Shrinks to fit narrow screens and
 * scrolls horizontally only when it can no longer stay legible.
 */
@customElement('pattern-grid')
export class PatternGrid extends LitElement {
  @property({ attribute: false })
  pattern: QuantizedPattern = { steps: [], totalSteps: STEPS_PER_BAR };

  /** Class selected in the atlas — highlights that lane here. */
  @property({ attribute: false })
  selectedClass: DrumClass | null = null;

  private onLaneClick(lane: DrumClass): void {
    this.dispatchEvent(new CustomEvent<DrumClass>('lane-select', { detail: lane, bubbles: true, composed: true }));
  }

  render() {
    const hitsByLane = new Map<DrumClass, Set<number>>();
    for (const lane of DRUM_CLASS_LANES) hitsByLane.set(lane, new Set());
    for (const hit of this.pattern.steps) hitsByLane.get(hit.class)?.add(hit.step);

    const steps = Array.from({ length: this.pattern.totalSteps }, (_, i) => i);
    const cols = `grid-template-columns: repeat(${this.pattern.totalSteps}, minmax(0, 1fr))`;

    return html`
      <div class="frame">
        ${DRUM_CLASS_LANES.map((lane) => {
          const style = CLASS_COLORS[lane];
          const hitSteps = hitsByLane.get(lane)!;
          const mark = classShapeSvg(style.shape, style.fg);
          return html`
            <div class="lane" ?data-sel=${this.selectedClass === lane}>
              <button type="button" class="label" @click=${() => this.onLaneClick(lane)}>
                <span class="sym">${unsafeHTML(mark)}</span>
                <span>${LANE_ABBR[lane]}</span>
              </button>
              <div class="cells" style=${cols}>
                ${steps.map(
                  (i) => html`
                    <div class="cell" ?data-bar=${i % STEPS_PER_BAR === 0} ?data-beat=${i % 4 === 0}>
                      ${hitSteps.has(i) ? html`<span class="mark">${unsafeHTML(mark)}</span>` : ''}
                    </div>
                  `
                )}
              </div>
            </div>
          `;
        })}
        <div class="ruler">
          <span class="spacer"></span>
          <div class="nums" style=${cols}>
            ${steps.map((i) => html`<span>${i % 4 === 0 ? i / 4 + 1 : '·'}</span>`)}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .frame {
      border-top: 1px solid var(--hair);
      /* shrink-to-fit; only scroll when cells would drop below ~16px */
      overflow-x: auto;
      overscroll-behavior-x: contain;
    }

    .lane {
      display: grid;
      grid-template-columns: 60px 1fr;
      align-items: stretch;
      border-bottom: 1px solid var(--hair);
      min-width: 340px;
    }

    .label {
      display: flex;
      align-items: center;
      gap: var(--space-1-5);
      padding: 0 var(--space-2);
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
      background: none;
      border: none;
      border-left: 2px solid transparent;
      cursor: pointer;
      text-align: left;
      min-height: 34px;
    }
    .label:hover {
      background: rgba(0, 0, 0, 0.03);
    }
    .lane[data-sel] .label {
      border-left-color: var(--ink);
      background: rgba(0, 0, 0, 0.04);
    }

    .sym {
      width: 13px;
      height: 13px;
      display: block;
      flex-shrink: 0;
      line-height: 0;
    }

    .cells {
      display: grid;
    }

    .cell {
      aspect-ratio: 1;
      border-left: 1px solid var(--hair-soft);
      display: grid;
      place-items: center;
      padding: 18%;
    }
    .cell[data-beat] {
      border-left-color: var(--hair);
    }
    .cell[data-bar] {
      border-left-color: var(--ink);
    }

    .mark {
      width: 100%;
      height: 100%;
      display: block;
      line-height: 0;
    }

    .ruler {
      display: grid;
      grid-template-columns: 60px 1fr;
      min-width: 340px;
      padding-top: var(--space-1);
    }
    .nums {
      display: grid;
    }
    .nums span {
      font-family: var(--mono);
      font-size: var(--text-2xs);
      color: var(--ink-faint);
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pattern-grid': PatternGrid;
  }
}
