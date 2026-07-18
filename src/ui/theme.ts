import type { DrumClass } from '../audio/classifier.ts';

export interface ClassStyle {
  fg: string;
  glow: string;
  label: string;
}

/** Single source of truth for per-class color coding across pads, the
 * beat timeline, and the LCD readout — keeps "kick is always this red"
 * consistent everywhere instead of re-picking colors per component.
 * Values point at the CSS custom properties defined in src/index.css
 * rather than raw hex, so the palette lives in exactly one place. */
export const CLASS_COLORS: Record<DrumClass, ClassStyle> = {
  kick: { fg: 'var(--color-kick)', glow: 'var(--color-kick-glow)', label: 'KICK' },
  snare: { fg: 'var(--color-snare)', glow: 'var(--color-snare-glow)', label: 'SNARE' },
  hat: { fg: 'var(--color-hat)', glow: 'var(--color-hat-glow)', label: 'HAT' },
};

export const ACCENT = 'var(--color-accent)';

/** Shared top-to-bottom lane order for anywhere hits are shown by class
 * (beat timeline, pattern grid) — keeps the visual layout consistent. */
export const DRUM_CLASS_LANES: DrumClass[] = ['hat', 'snare', 'kick'];

const CSS_VAR_REFERENCE = /^var\((--[\w-]+)\)$/;

/**
 * Canvas 2D APIs (fillStyle, shadowColor, ...) don't resolve CSS custom
 * properties — assigning `'var(--color-kick)'` to ctx.fillStyle is silently
 * ignored. Use this to read the concrete color a CLASS_COLORS/ACCENT value
 * points at when feeding it to canvas instead of a styled element.
 */
export function resolveThemeColor(host: Element, value: string): string {
  const match = CSS_VAR_REFERENCE.exec(value);
  if (!match) return value;
  const resolved = getComputedStyle(host).getPropertyValue(match[1]).trim();
  return resolved || value;
}
