// Self-hosted so the printed-manual look doesn't depend on system fonts or a
// runtime webfont request — only the families/weights the UI actually uses.
// Fraunces = serif display (masthead, figure headings, italic captions),
// Inter = grotesk labels, JetBrains Mono = data/readouts.
import fraunces600 from '@fontsource/fraunces/600.css?inline';
import fraunces900 from '@fontsource/fraunces/900.css?inline';
import fraunces400i from '@fontsource/fraunces/400-italic.css?inline';
import inter500 from '@fontsource/inter/500.css?inline';
import inter700 from '@fontsource/inter/700.css?inline';
import mono500 from '@fontsource/jetbrains-mono/500.css?inline';
import mono700 from '@fontsource/jetbrains-mono/700.css?inline';
import indexCss from './index.css?inline';

if (typeof document !== 'undefined' && !document.getElementById('beat-mapper-global-styles')) {
  const style = document.createElement('style');
  style.id = 'beat-mapper-global-styles';
  style.textContent = [
    fraunces600,
    fraunces900,
    fraunces400i,
    inter500,
    inter700,
    mono500,
    mono700,
    indexCss,
  ].join('\n');
  document.head.appendChild(style);
}

import './components/app-root.ts';
