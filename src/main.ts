// Self-hosted so the printed-manual look doesn't depend on system fonts or a
// runtime webfont request — only the families/weights the UI actually uses.
// Fraunces = serif display (masthead, figure headings, italic captions),
// Inter = grotesk labels, JetBrains Mono = data/readouts.
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/900.css';
import '@fontsource/fraunces/400-italic.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import './components/app-root.ts';
