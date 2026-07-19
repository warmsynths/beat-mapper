import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * SET / bank selector, drawn as printed tabs. The active bank is inked in
 * solid; banks that already hold a transcribed take get a small filled
 * corner tick so you can see which pages of the archive are written.
 */
@customElement('bank-selector')
export class BankSelector extends LitElement {
  @property({ attribute: false })
  banks: string[] = [];

  @property({ type: String })
  active = '';

  /** Banks that currently hold a recorded pattern. */
  @property({ attribute: false })
  used: string[] = [];

  private select(bank: string): void {
    this.dispatchEvent(new CustomEvent<string>('bank-change', { detail: bank, bubbles: true, composed: true }));
  }

  render() {
    if (this.banks.length === 0) return nothing;
    return html`
      <div class="row">
        ${this.banks.map(
          (bank) => html`
            <button
              type="button"
              class=${bank === this.active ? 'on' : ''}
              @click=${() => this.select(bank)}
            >
              ${bank}
              ${this.used.includes(bank) && bank !== this.active ? html`<i class="tick"></i>` : nothing}
            </button>
          `
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .row {
      display: flex;
      gap: var(--space-2);
    }

    button {
      position: relative;
      flex: 1;
      min-width: 34px;
      height: 32px;
      font-family: var(--mono);
      font-weight: var(--w-bold);
      font-size: var(--text-base);
      border: 1px solid var(--ink);
      background: var(--paper);
      color: var(--ink);
      cursor: pointer;
      transition: background-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
    }

    button:hover:not(.on) {
      background: var(--hair-soft);
    }

    button.on {
      background: var(--ink);
      color: var(--paper);
    }

    .tick {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--kick);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'bank-selector': BankSelector;
  }
}
