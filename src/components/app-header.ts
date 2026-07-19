import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * The manual's masthead: eyebrow, serif title, italic tagline, a rule, and
 * a monospace meta line. Purely presentational — the live status text is
 * passed in so it can echo the engine/session state.
 */
@customElement('app-header')
export class AppHeader extends LitElement {
  /** Short status word shown in the meta line, e.g. "live input", "idle". */
  @property({ type: String }) status = 'idle';

  render() {
    return html`
      <div class="eyebrow">Field Manual №01 · Vocal Percussion</div>
      <h1>Beat Mapper</h1>
      <p class="tag">Translating human beatbox to silicon memory.</p>
      <hr class="rule" />
      <div class="meta">
        <span>Edition 2026</span>
        <span class="status">${this.status}</span>
        <span>16-Step · 4/4</span>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      text-align: center;
    }

    .eyebrow {
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-mega);
      text-transform: uppercase;
      color: var(--ink-soft);
      margin-bottom: var(--space-4);
    }

    h1 {
      font-family: var(--serif);
      font-weight: var(--w-black);
      font-size: clamp(40px, 9vw, 68px);
      line-height: 0.94;
      letter-spacing: var(--track-tight);
      text-transform: uppercase;
      margin: 0;
      color: var(--ink);
    }

    .tag {
      font-family: var(--serif);
      font-style: italic;
      font-weight: var(--w-book);
      font-size: clamp(15px, 2.6vw, 19px);
      color: var(--ink);
      margin: var(--space-2) 0 0;
    }

    .rule {
      border: 0;
      border-top: 1px solid var(--ink);
      margin: var(--space-6) 0 var(--space-3);
    }

    .meta {
      display: flex;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wider);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .meta .status {
      color: var(--ink);
    }

    @media (max-width: 560px) {
      .meta {
        font-size: var(--text-2xs);
        letter-spacing: var(--track-wide);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
