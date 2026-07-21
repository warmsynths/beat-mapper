import { LitElement, css, html, svg, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { deviceConfigContext } from '../state/contexts.ts';
import type { DeviceConfig } from '../devices/device-config.ts';
import type { DrumClass } from '../audio/classifier.ts';
import { CLASS_COLORS } from '../ui/theme.ts';

// Grid-device (SP-404-style) pad geometry, in that illustration's own
// 300×384 coordinate space.
const COLS = [44, 87, 130, 173];
const ROWS = [196, 239, 282, 325];
const PAD = 36;
const FIFTH_X = 220;

// Pocket-style (PO-33/PO-32) pad geometry, in that illustration's own
// 220×390 coordinate space — 16 round pads in a plain 4×4 grid, no fifth
// utility column. These devices have no on-device sound selector to draw;
// the pattern grid's lane labels (Fig. 02) already select the class being
// step-edited regardless of which device is pictured here.
const POCKET_COLS = [20, 67, 114, 161];
const POCKET_ROWS = [176, 223, 270, 317];
const POCKET_PAD_R = 18;

// kick/snare/hat occupy the top three cells of the fifth (utilities) column
// on grid-style devices.
const SELECTOR_LANES: DrumClass[] = ['kick', 'snare', 'hat'];

/**
 * Fig. 03 — the Device Atlas. The selected hardware is drawn as a single ink
 * line-art SVG on paper. Grid-style devices (the SP-404) get chrome (knobs,
 * jog wheel, function rows), a 4×4 grid of 16 performance pads, and a fifth
 * utilities column holding the kick/snare/hat selectors. Pocket-style
 * devices (the Teenage Engineering PO line — PO-33, PO-32 — identified by
 * having no gridDimensions, since they're a single row of keys rather than
 * a pad grid) get their own rounded-shell illustration with a plain 4×4
 * pad grid and no fifth column. Either way, the pads double as the 16-step
 * entry surface for the selected sound (tap to place/remove a hit).
 */
@customElement('device-atlas')
export class DeviceAtlas extends LitElement {
  @consume({ context: deviceConfigContext, subscribe: true })
  private deviceConfig!: DeviceConfig;

  /** Which sound is selected for step editing (drives lit pads). */
  @property({ attribute: false }) selectedClass: DrumClass | null = null;

  /** Step indices (0–15) lit for the selected sound in the current bar,
   * or null when not in step-editing mode. */
  @property({ attribute: false }) stepHighlights: Set<number> | null = null;

  /** A transcribed take exists — enables selector + pad interaction. */
  @property({ type: Boolean }) reviewing = false;

  private togglePad(index: number): void {
    if (!this.stepHighlights) return;
    const control = this.deviceConfig.controls[index];
    if (!control) return;
    this.dispatchEvent(new CustomEvent<string>('pad-toggle', { detail: control.id, bubbles: true, composed: true }));
  }

  private toggleClass(lane: DrumClass): void {
    if (!this.reviewing) return;
    this.dispatchEvent(new CustomEvent<DrumClass>('class-toggle', { detail: lane, bubbles: true, composed: true }));
  }

  /** Notation primitive centred in a pad, drawn in the class colour. */
  private mark(cx: number, cy: number, cls: DrumClass): TemplateResult {
    const c = CLASS_COLORS[cls].fg;
    const r = 11;
    switch (CLASS_COLORS[cls].shape) {
      case 'circle':
        return svg`<circle cx=${cx} cy=${cy} r=${r} fill=${c} stroke="var(--ink)" stroke-width="1"/>`;
      case 'square':
        return svg`<rect x=${cx - r} y=${cy - r} width=${r * 2} height=${r * 2} fill=${c} stroke="var(--ink)" stroke-width="1"/>`;
      case 'triangle':
        return svg`<path d=${`M${cx} ${cy - r - 1} L${cx + r + 1} ${cy + r} L${cx - r - 1} ${cy + r} Z`} fill=${c} stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"/>`;
    }
  }

  render() {
    return this.deviceConfig?.gridDimensions === null ? this.renderPocketDevice() : this.renderGridDevice();
  }

  private renderGridDevice() {
    const stepMode = this.stepHighlights !== null && this.selectedClass !== null;

    const perfPads = Array.from({ length: 16 }, (_, i) => {
      const x = COLS[i % 4];
      const y = ROWS[Math.floor(i / 4)];
      const lit = stepMode && this.stepHighlights!.has(i);
      return svg`
        <g class=${`pad ${stepMode ? 'live' : ''}`} @click=${() => this.togglePad(i)}>
          <rect x=${x} y=${y} width=${PAD} height=${PAD} rx="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/>
          ${lit ? this.mark(x + PAD / 2, y + PAD / 2, this.selectedClass!) : nothing}
        </g>`;
    });

    const selectors = SELECTOR_LANES.map((lane, row) => {
      const y = ROWS[row];
      const sel = this.selectedClass === lane;
      return svg`
        <g class=${`sel ${this.reviewing ? 'active' : ''}`} @click=${() => this.toggleClass(lane)}>
          <rect x=${FIFTH_X} y=${y} width=${PAD} height=${PAD} rx="5"
                fill=${CLASS_COLORS[lane].fg} stroke="var(--ink)" stroke-width=${sel ? 2.6 : 1.2}/>
          ${sel ? svg`<rect x=${FIFTH_X - 3} y=${y - 3} width=${PAD + 6} height=${PAD + 6} rx="7" fill="none" stroke="var(--ink)" stroke-width="1"/>` : nothing}
        </g>`;
    });

    return html`
      <svg viewBox="0 0 300 404" fill="none" stroke="var(--ink)" role="img" aria-label=${`${this.deviceLabel} device atlas`}>
        <rect x="6" y="6" width="288" height="392" rx="14" stroke-width="1.4"/>
        <rect x="20" y="20" width="260" height="364" rx="8" stroke-width="1"/>
        <rect x="34" y="30" width="34" height="9" rx="2" stroke-width="1"/>
        <text x="266" y="40" text-anchor="end" font-family="var(--mono)" font-size="13" font-weight="700" fill="var(--ink)" stroke="none" letter-spacing="1">${this.deviceLabel}</text>

        <!-- knobs -->
        <g stroke-width="1.2">
          <circle cx="46" cy="64" r="11"/><line x1="46" y1="64" x2="46" y2="55"/>
          <circle cx="82" cy="64" r="11"/><line x1="82" y1="64" x2="89" y2="58"/>
          <circle cx="118" cy="64" r="11"/><line x1="118" y1="64" x2="125" y2="59"/>
          <circle cx="154" cy="64" r="11"/><line x1="154" y1="64" x2="161" y2="61"/>
        </g>
        <!-- jog wheel -->
        <circle cx="150" cy="118" r="34" stroke-width="1.2"/><circle cx="150" cy="118" r="21" stroke-width="1"/>
        <!-- side buttons -->
        <g stroke-width="1">
          <rect x="34" y="96" width="30" height="12" rx="3"/><rect x="34" y="112" width="30" height="12" rx="3"/><rect x="34" y="128" width="30" height="12" rx="3"/>
          <rect x="236" y="96" width="30" height="12" rx="3"/><rect x="236" y="112" width="30" height="12" rx="3"/><rect x="236" y="128" width="30" height="12" rx="3"/>
        </g>
        <!-- function row -->
        <g stroke-width="1">
          <rect x="34" y="164" width="26" height="12" rx="3"/><rect x="66" y="164" width="26" height="12" rx="3"/>
          <rect x="140" y="164" width="20" height="12" rx="3" fill="var(--hat)"/><rect x="166" y="164" width="20" height="12" rx="3" fill="var(--hat)"/>
          <circle cx="252" cy="170" r="8"/>
        </g>

        <!-- 16 performance pads -->
        ${perfPads}

        <!-- fifth column: utilities. kick/snare/hat selectors + one spare. -->
        ${selectors}
        <g stroke-width="1.2">
          <rect x=${FIFTH_X} y=${ROWS[3]} width=${PAD} height=${PAD} rx="5"/>
          <line x1=${FIFTH_X + 10} y1=${ROWS[3] + 18} x2=${FIFTH_X + 26} y2=${ROWS[3] + 18}/>
        </g>
      </svg>
    `;
  }

  private renderPocketDevice() {
    const stepMode = this.stepHighlights !== null && this.selectedClass !== null;

    const pads = Array.from({ length: 16 }, (_, i) => {
      const x = POCKET_COLS[i % 4];
      const y = POCKET_ROWS[Math.floor(i / 4)];
      const cx = x + POCKET_PAD_R;
      const cy = y + POCKET_PAD_R;
      const lit = stepMode && this.stepHighlights!.has(i);
      return svg`
        <g class=${`pad ${stepMode ? 'live' : ''}`} @click=${() => this.togglePad(i)}>
          <circle cx=${cx} cy=${cy} r=${POCKET_PAD_R} fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/>
          ${lit ? this.mark(cx, cy, this.selectedClass!) : nothing}
        </g>`;
    });

    return html`
      <svg viewBox="0 0 220 390" fill="none" stroke="var(--ink)" role="img" aria-label=${`${this.deviceLabel} device atlas`}>
        <rect x="6" y="6" width="208" height="378" rx="20" stroke-width="1.4"/>

        <!-- speaker/mic notch, flush with the top edge -->
        <path d="M55 6 L165 6 L165 30 Q165 46 149 46 L71 46 Q55 46 55 30 Z" stroke-width="1.2"/>
        <ellipse cx="110" cy="26" rx="24" ry="8" stroke-width="1"/>

        <text x="110" y="70" text-anchor="middle" font-family="var(--mono)" font-size="13" font-weight="700" fill="var(--ink)" stroke="none" letter-spacing="1">${this.deviceLabel}</text>

        <!-- mini display -->
        <rect x="30" y="82" width="160" height="36" rx="4" stroke-width="1"/>
        <line x1="50" y1="100" x2="190" y2="100" stroke-width="1.5"/>

        <!-- knobs -->
        <g stroke-width="1.2">
          <circle cx="33" cy="148" r="13"/>
          <circle cx="187" cy="148" r="13"/>
        </g>

        <!-- 16 pads -->
        ${pads}
      </svg>
    `;
  }

  private get deviceLabel(): string {
    // short label for the panel (drop the manufacturer for the printed tag)
    const n = this.deviceConfig?.name ?? '';
    return n.replace(/^Roland\s+/i, '').replace(/^Pocket Operator\s+/i, '');
  }

  static styles = css`
    :host {
      display: block;
    }
    svg {
      width: 100%;
      max-width: 320px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    text {
      font-family: var(--mono);
    }
    .pad.live {
      cursor: pointer;
    }
    .pad.live:hover rect,
    .pad.live:hover circle {
      fill: var(--hair-soft);
    }
    .sel.active {
      cursor: pointer;
    }
    .sel.active:hover rect:first-of-type {
      stroke-width: 2;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'device-atlas': DeviceAtlas;
  }
}
