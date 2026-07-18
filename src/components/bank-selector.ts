import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bank-selector')
export class BankSelector extends LitElement {
  @property({ attribute: false })
  banks: string[] = [];

  @property({ type: String })
  active = '';

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
              class=${bank === this.active ? 'active' : ''}
              @click=${() => this.select(bank)}
            >
              ${bank}
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
      gap: 6px;
    }

    button {
      flex: 1;
      padding: 7px 4px;
      font: 700 12px/1 ui-monospace, monospace;
      letter-spacing: 0.05em;
      border-radius: 5px;
      border: 1px solid #3a3a44;
      background: linear-gradient(#232329, #16161a);
      color: #9ca3af;
      cursor: pointer;
      transition:
        border-color 100ms,
        color 100ms,
        box-shadow 100ms;
    }

    button.active {
      border-color: var(--accent, #ffb020);
      color: var(--accent, #ffb020);
      box-shadow: 0 0 8px rgba(255, 176, 32, 0.4);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'bank-selector': BankSelector;
  }
}
