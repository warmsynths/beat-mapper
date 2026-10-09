// Self-hosted fonts, inlined like the rest of the app's global styles.
// Tilt Warp = display (titles, keys, counts); Host Grotesk = labels and body.
import tiltWarp from '@fontsource/tilt-warp/400.css?inline';
import grot400 from '@fontsource/host-grotesk/400.css?inline';
import grot500 from '@fontsource/host-grotesk/500.css?inline';
import grot500i from '@fontsource/host-grotesk/500-italic.css?inline';
import grot600 from '@fontsource/host-grotesk/600.css?inline';
import grot700 from '@fontsource/host-grotesk/700.css?inline';
import cueCss from './cue.css?inline';

if (!document.getElementById('cue-global-styles')) {
  const style = document.createElement('style');
  style.id = 'cue-global-styles';
  style.textContent = [tiltWarp, grot400, grot500, grot500i, grot600, grot700, cueCss].join('\n');
  document.head.appendChild(style);
}

import './cue-app.ts';
