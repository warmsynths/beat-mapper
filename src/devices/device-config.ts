import type { DrumClass } from '../audio/classifier.ts';

export type ControlShape = 'pad' | 'key' | 'button';

export interface ControlPosition {
  row: number;
  col: number;
}

export interface DeviceControl {
  /** Stable logical id, e.g. "pad-1". Used for classMapping and DOM keys. */
  id: string;
  /** What's printed on the hardware, e.g. "A1". */
  label: string;
  shape: ControlShape;
  position: ControlPosition;
  midi: {
    note?: number;
    cc?: number;
    channel: number;
  };
}

export interface DeviceConfig {
  id: string;
  name: string;
  /** Grid dimensions for layout purposes; null for non-grid devices (flex/list layout). */
  gridDimensions: { rows: number; cols: number } | null;
  /** Named banks, e.g. SP-404's A/B/C/D. Omit for single-bank devices. */
  banks?: string[];
  controls: DeviceControl[];
  /** Default routing from a classifier result to a control id. User-remappable. */
  classMapping: Record<DrumClass, string>;
  /**
   * Non-interactive accessory controls rendered alongside the main grid for
   * hardware fidelity (e.g. the SP-404's BUS FX/HOLD/EXT SOURCE/SUB PAD
   * column). Purely visual — never triggered by the classifier.
   */
  decorative?: string[];
}

export function getControl(config: DeviceConfig, controlId: string): DeviceControl | undefined {
  return config.controls.find((c) => c.id === controlId);
}
