import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { classShapeSvg } from '../ui/theme.ts';

const GITHUB_URL = 'https://github.com/warmsynths/beat-mapper';
const EMAIL = 'warmsynthsiloveyou@gmail.com';
const KOFI_URL = 'https://ko-fi.com/warmsynths';

/**
 * The manual's colophon: a closing privacy note plus GitHub/email/Ko-fi
 * links. Each is marked with the same kick/snare/hat notation primitives
 * used throughout the manual (legend, device atlas) rather than borrowed
 * brand icons, so the footer reads as part of the same system.
 */
@customElement('app-footer')
export class AppFooter extends LitElement {
  render() {
    return html`
      <p class="note">Nothing is captured until you hit record — every take stays in this browser.</p>
      <div class="links">
        <a class="link" style="--accent: var(--kick)" href=${GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <span class="mark">${unsafeHTML(classShapeSvg('circle', 'var(--kick)'))}</span>GitHub
        </a>
        <span class="sep">·</span>
        <a class="link" style="--accent: var(--snare)" href="mailto:${EMAIL}">
          <span class="mark">${unsafeHTML(classShapeSvg('square', 'var(--snare)'))}</span>Email
        </a>
        <span class="sep">·</span>
        <a class="link" style="--accent: var(--hat)" href=${KOFI_URL} target="_blank" rel="noopener noreferrer">
          <span class="mark">${unsafeHTML(classShapeSvg('triangle', 'var(--hat)'))}</span>Ko-fi
        </a>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      text-align: center;
      border-top: 1px solid var(--hair);
      margin-top: var(--space-7);
      padding-top: var(--space-6);
    }

    .note {
      font-family: var(--serif);
      font-style: italic;
      font-size: var(--text-lg);
      color: var(--ink-soft);
      margin: 0 0 var(--space-4);
    }

    .links {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-3);
      font-family: var(--mono);
      font-size: var(--text-sm);
      letter-spacing: var(--track-wide);
      text-transform: uppercase;
      color: var(--ink-soft);
    }

    .sep {
      color: var(--hair);
    }

    .link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--ink);
      text-decoration: none;
      transition: color var(--dur-fast) var(--ease);
    }
    .link:hover {
      color: var(--accent, var(--ink-soft));
    }

    .mark {
      width: 10px;
      height: 10px;
      display: block;
      flex-shrink: 0;
      line-height: 0;
    }

    @media (max-width: 560px) {
      .links {
        font-size: var(--text-2xs);
        letter-spacing: var(--track-normal);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': AppFooter;
  }
}
