import type { DeviceConfig, DeviceControl } from './device-config.ts';

// PO-33 has 16 step/sample keys laid out in a single row, not a pad grid —
// gridDimensions is null so the UI falls back to a flex/list layout instead
// of assuming rows/cols like the SP-404.
function buildKeys(): DeviceControl[] {
  const keys: DeviceControl[] = [];
  let note = 60;
  for (let i = 1; i <= 16; i++) {
    keys.push({
      id: `key-${i}`,
      label: String(i),
      shape: 'key',
      position: { row: 0, col: i - 1 },
      midi: { note: note++, channel: 1 },
    });
  }
  return keys;
}

export const po33Config: DeviceConfig = {
  id: 'po33',
  name: 'Pocket Operator PO-33 K.O!',
  gridDimensions: null,
  controls: buildKeys(),
  classMapping: {
    kick: 'key-1',
    snare: 'key-2',
    hat: 'key-3',
  },
};
