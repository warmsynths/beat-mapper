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
      gap: var(--space-1-5);
    }

    button {
      flex: 1;
      padding: 7px var(--space-1);
      font: var(--weight-bold) var(--text-md) / 1 var(--font-mono);
      letter-spacing: var(--tracking-normal);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-border);
      background: linear-gradient(var(--color-surface-3), var(--color-surface-0));
      color: var(--color-text-muted);
      cursor: pointer;
      transition:
        border-color var(--duration-base),
        color var(--duration-base),
        box-shadow var(--duration-base);
    }

    button:hover:not(.active) {
      border-color: var(--color-border-strong);
      color: var(--color-text);
    }

    button.active {
      border-color: var(--color-accent);
      color: var(--color-accent);
      box-shadow: 0 0 8px var(--color-accent-glow);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'bank-selector': BankSelector;
  }
}
