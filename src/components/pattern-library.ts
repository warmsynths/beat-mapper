import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DrumClass } from '../audio/classifier.ts';
import { STEPS_PER_BAR } from '../audio/quantize.ts';
import { PATTERNS } from '../library/patterns.ts';
import {
  DENSITIES,
  EMPTY_FILTER,
  FEELS,
  GENRES,
  densityOf,
  filterPatterns,
  normalizeLane,
  patternBars,
  type Density,
  type Feel,
  type Genre,
  type LibraryFilter,
  type LibraryPattern,
} from '../library/pattern.ts';
import { CLASS_COLORS, DRUM_CLASS_LANES } from '../ui/theme.ts';

/**
 * Fig. 01 — the pattern library. Filter by genre / feel / density / search,
 * pick a groove, and the app-root shows it mapped onto the chosen device
 * (Fig. 03). Each row carries a miniature of the groove itself — one lane
 * per sound, in the same circle/square/triangle notation used everywhere
 * else — so patterns can be compared at a glance. Emits `pattern-select`.
 */
@customElement('pattern-library')
export class PatternLibrary extends LitElement {
  @property({ type: String }) selectedId = '';

  @state() private filter: LibraryFilter = { ...EMPTY_FILTER };

  private select(pattern: LibraryPattern): void {
    this.dispatchEvent(new CustomEvent<string>('pattern-select', { detail: pattern.id, bubbles: true, composed: true }));
  }

  private setFilter(patch: Partial<LibraryFilter>): void {
    this.filter = { ...this.filter, ...patch };
  }

  private toggleGenre(genre: Genre): void {
    this.setFilter({ genre: this.filter.genre === genre ? null : genre });
  }

  private mini(pattern: LibraryPattern) {
    const bars = patternBars(pattern);
    return html`
      <div class="mini" style="--steps:${bars * STEPS_PER_BAR}">
        ${DRUM_CLASS_LANES.map((cls: DrumClass) => {
          const lane = normalizeLane(pattern.lanes[cls]);
          return html`
            <div class="lane">
              ${[...lane].map(
                (ch, i) => html`<i
                  class="${ch === 'x' ? `hit ${CLASS_COLORS[cls].shape}` : 'rest'} ${i % 4 === 0 ? 'beat' : ''}"
                  style=${ch === 'x' ? `background:${CLASS_COLORS[cls].fg}` : ''}
                ></i>`
              )}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const results = filterPatterns(PATTERNS, this.filter);
    const f = this.filter;
    return html`
      <div class="fig">Fig. 01 — Pattern Library<span class="line"></span></div>

      <div class="genres" role="group" aria-label="Genre">
        ${GENRES.map(
          (g) => html`<button type="button" class=${f.genre === g ? 'on' : ''} @click=${() => this.toggleGenre(g)}>${g}</button>`
        )}
      </div>

      <div class="filters">
        <input
          type="search"
          placeholder="Search name, genre, tag…"
          .value=${f.query}
          @input=${(e: Event) => this.setFilter({ query: (e.target as HTMLInputElement).value })}
        />
        <select aria-label="Feel" @change=${(e: Event) => this.setFilter({ feel: ((e.target as HTMLSelectElement).value || null) as Feel | null })}>
          <option value="">Any feel</option>
          ${FEELS.map((x) => html`<option value=${x} ?selected=${f.feel === x}>${x}</option>`)}
        </select>
        <select
          aria-label="Density"
          @change=${(e: Event) => this.setFilter({ density: ((e.target as HTMLSelectElement).value || null) as Density | null })}
        >
          <option value="">Any density</option>
          ${DENSITIES.map((x) => html`<option value=${x} ?selected=${f.density === x}>${x}</option>`)}
        </select>
      </div>

      <div class="count">
        ${results.length} of ${PATTERNS.length} patterns
        ${f.genre || f.feel || f.density || f.query
          ? html`<button type="button" class="clear" @click=${() => (this.filter = { ...EMPTY_FILTER })}>clear filters</button>`
          : nothing}
      </div>

      ${results.length === 0
        ? html`<p class="empty">No patterns match — loosen a filter.</p>`
        : html`
            <ul class="list">
              ${results.map(
                (p) => html`
                  <li>
                    <button type="button" class=${p.id === this.selectedId ? 'row on' : 'row'} @click=${() => this.select(p)}>
                      <span class="head">
                        <b class="name">${p.name}</b>
                        <span class="meta">${p.genre} · ${p.feel} · ${densityOf(p)} · ${p.bpm} BPM${patternBars(p) > 1 ? ` · ${patternBars(p)} bars` : ''}</span>
                      </span>
                      ${this.mini(p)}
                    </button>
                  </li>
                `
              )}
            </ul>
          `}
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
    .fig .line {
      flex: 1;
      height: 1px;
      background: var(--hair);
    }

    .genres {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1-5);
      margin-bottom: var(--space-4);
    }
    .genres button {
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--hair);
      padding: var(--space-1) var(--space-2);
      cursor: pointer;
    }
    .genres button:hover {
      border-color: var(--ink);
    }
    .genres button.on {
      background: var(--ink);
      color: var(--paper);
      border-color: var(--ink);
    }

    .filters {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: var(--space-2);
    }
    input,
    select {
      font-family: var(--mono);
      font-size: var(--text-sm);
      color: var(--ink);
      background: var(--paper);
      border: 1px solid var(--ink);
      padding: var(--space-2) var(--space-3);
      min-height: 36px;
      min-width: 0;
      border-radius: 0;
    }

    .count {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
      margin: var(--space-3) 0;
    }
    .clear {
      font: inherit;
      color: var(--ink);
      background: none;
      border: 0;
      border-bottom: 1px solid var(--ink);
      padding: 0;
      cursor: pointer;
    }

    .empty {
      font-family: var(--serif);
      font-style: italic;
      color: var(--ink-soft);
    }

    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 560px;
      overflow-y: auto;
      border-top: 1px solid var(--hair);
    }
    .row {
      display: block;
      width: 100%;
      text-align: left;
      font: inherit;
      color: var(--ink);
      background: transparent;
      border: 0;
      border-bottom: 1px solid var(--hair);
      padding: var(--space-3) var(--space-2);
      cursor: pointer;
    }
    .row:hover {
      background: var(--hair-soft);
    }
    .row.on {
      background: var(--hair-soft);
      box-shadow: inset 3px 0 0 var(--ink);
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--space-1) var(--space-3);
      margin-bottom: var(--space-2);
    }
    .name {
      font-family: var(--serif);
      font-weight: var(--w-bold);
      font-size: var(--text-xl);
    }
    .meta {
      font-family: var(--mono);
      font-size: var(--text-xs);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .mini {
      display: grid;
      gap: 2px;
    }
    .lane {
      display: grid;
      grid-template-columns: repeat(var(--steps), 1fr);
      gap: 1px;
      height: 9px;
    }
    .lane i {
      display: block;
      min-width: 0;
    }
    .lane .rest {
      background: var(--hair-soft);
      height: 3px;
      align-self: center;
    }
    .lane .rest.beat {
      background: var(--hair);
    }
    .lane .hit {
      justify-self: center;
      width: 9px;
      height: 9px;
    }
    .lane .hit.circle {
      border-radius: 50%;
    }
    .lane .hit.triangle {
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }

    @media (max-width: 560px) {
      .filters {
        grid-template-columns: 1fr 1fr;
      }
      input {
        grid-column: 1 / -1;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'pattern-library': PatternLibrary;
  }
}
