import type { DrumClass } from '../audio/classifier.ts';

export interface ClassStyle {
  fg: string;
  glow: string;
  label: string;
}

/** Single source of truth for per-class color coding across pads, the
 * beat timeline, and the LCD readout — keeps "kick is always this red"
 * consistent everywhere instead of re-picking colors per component. */
export const CLASS_COLORS: Record<DrumClass, ClassStyle> = {
  kick: { fg: '#ff5a3c', glow: 'rgba(255, 90, 60, 0.6)', label: 'KICK' },
  snare: { fg: '#38e1ff', glow: 'rgba(56, 225, 255, 0.6)', label: 'SNARE' },
  hat: { fg: '#ffd23a', glow: 'rgba(255, 210, 58, 0.6)', label: 'HAT' },
};

export const ACCENT = '#ffb020';
