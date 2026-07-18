import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './knob-control.ts';

/**
 * Wordmark + the two hardware-style knobs (SENS/TONE). Purely
 * presentational — app-root owns the actual sensitivity/tone state and
 * what turning the knobs does to the audio engine's config.
 */
@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: Number }) sensMin = 0;
  @property({ type: Number }) sensMax = 1;
  @property({ type: Number }) sensitivity = 0;

  @property({ type: Number }) toneMin = 0;
  @property({ type: Number }) toneMax = 1;
  @property({ type: Number }) tone = 1;

  private onSensitivityChange = (event: CustomEvent<number>): void => {
    this.dispatchEvent(new CustomEvent<number>('sensitivity-change', { detail: event.detail, bubbles: true, composed: true }));
  };

  private onToneChange = (event: CustomEvent<number>): void => {
    this.dispatchEvent(new CustomEvent<number>('tone-change', { detail: event.detail, bubbles: true, composed: true }));
  };

  render() {
    return html`
      <header>
        <div class="wordmark">
          <h1>BEAT // MAPPER</h1>
          <p class="subtitle">voice-to-pattern transcription</p>
        </div>

        <div class="knobs">
          <knob-control
            label="SENS"
            .min=${this.sensMin}
            .max=${this.sensMax}
            .value=${this.sensitivity}
            @value-change=${this.onSensitivityChange}
          ></knob-control>
          <knob-control
            label="TONE"
            .min=${this.toneMin}
            .max=${this.toneMax}
            .value=${this.tone}
            @value-change=${this.onToneChange}
          ></knob-control>
        </div>
      </header>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
    }

    .wordmark h1 {
      font: var(--weight-extrabold) var(--text-3xl) / 1 var(--font-mono);
      letter-spacing: var(--tracking-wide);
      margin: 0;
      color: var(--color-text-bright);
    }

    .subtitle {
      margin: var(--space-1) 0 0;
      font-size: var(--text-base);
      color: var(--color-text-dim);
      letter-spacing: var(--tracking-snug);
    }

    .knobs {
      display: flex;
      gap: var(--space-6);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
