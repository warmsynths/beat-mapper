import type { DeviceConfig, DeviceControl } from './device-config.ts';

// Matches the physical SP-404MKII pad layout: 1-4 top row down to 13-16
// bottom row (see hardware reference photo).
const PAD_LABELS = [
  ['1', '2', '3', '4'],
  ['5', '6', '7', '8'],
  ['9', '10', '11', '12'],
  ['13', '14', '15', '16'],
];

function buildPads(): DeviceControl[] {
  const pads: DeviceControl[] = [];
  let note = 36; // General MIDI-ish base note, adjust to taste/actual SP-404 mapping
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      pads.push({
        id: `pad-${PAD_LABELS[row][col]}`,
        label: PAD_LABELS[row][col],
        shape: 'pad',
        position: { row, col },
        midi: { note: note++, channel: 10 },
      });
    }
  }
  return pads;
}

export const sp404mkiiConfig: DeviceConfig = {
  id: 'sp404mkii',
  name: 'Roland SP-404MKII',
  gridDimensions: { rows: 4, cols: 4 },
  banks: ['A', 'B', 'C', 'D'],
  controls: buildPads(),
  classMapping: {
    kick: 'pad-1',
    snare: 'pad-2',
    hat: 'pad-3',
  },
  decorative: ['BUS FX', 'HOLD', 'EXT SOURCE', 'SUB PAD'],
};
