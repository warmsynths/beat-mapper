import type { DeviceConfig, DeviceControl } from './device-config.ts';

// Same single-row, 16-key layout as the rest of the Pocket Operator line —
// gridDimensions is null so the UI falls back to a flex/list layout.
function buildKeys(): DeviceControl[] {
  const keys: DeviceControl[] = [];
  let note = 48;
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

export const po32Config: DeviceConfig = {
  id: 'po32',
  name: 'Pocket Operator PO-32 Tonic',
  gridDimensions: null,
  controls: buildKeys(),
  classMapping: {
    kick: ['key-1'],
    snare: ['key-2'],
    hat: ['key-3'],
  },
};
