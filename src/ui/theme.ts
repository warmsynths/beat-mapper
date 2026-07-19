import type { DrumClass } from '../audio/classifier.ts';

/** The notation primitive a class is drawn as throughout the manual — the
 * legend key, the transcribed sequence, and the device-atlas selectors all
 * use the same shape so "kick is always the circle" reads consistently. */
export type ClassShape = 'circle' | 'square' | 'triangle';

export interface ClassStyle {
  /** CSS colour reference (points at the token in index.css). */
  fg: string;
  shape: ClassShape;
  /** Short display label, e.g. "KICK". */
  label: string;
  /** The manual's descriptive gloss, e.g. "sub-bass". */
  gloss: string;
}

/** Single source of truth for per-class colour + shape coding across the
 * legend, transcribed sequence, and device atlas. Colours point at the CSS
 * custom properties in src/index.css rather than raw hex, so the palette
 * lives in exactly one place. */
export const CLASS_COLORS: Record<DrumClass, ClassStyle> = {
  kick: { fg: 'var(--kick)', shape: 'circle', label: 'KICK', gloss: 'sub-bass' },
  snare: { fg: 'var(--snare)', shape: 'square', label: 'SNARE', gloss: 'mid-transient' },
  hat: { fg: 'var(--hat)', shape: 'triangle', label: 'HAT', gloss: 'high-freq' },
};

export const ACCENT = 'var(--ink)';

/** Shared top-to-bottom lane order for anywhere hits are shown by class
 * (seismograph, transcribed sequence) — keeps the visual layout consistent. */
export const DRUM_CLASS_LANES: DrumClass[] = ['hat', 'snare', 'kick'];

const CSS_VAR_REFERENCE = /^var\((--[\w-]+)\)$/;

/**
 * Canvas 2D APIs (fillStyle, strokeStyle, ...) don't resolve CSS custom
 * properties. Use this to read the concrete colour a CLASS_COLORS/ACCENT
 * value points at when feeding it to canvas instead of a styled element.
 */
export function resolveThemeColor(host: Element, value: string): string {
  const match = CSS_VAR_REFERENCE.exec(value);
  if (!match) return value;
  const resolved = getComputedStyle(host).getPropertyValue(match[1]).trim();
  return resolved || value;
}

/**
 * Inline SVG markup for a class's notation primitive, sized to fill a
 * viewBox-less parent via width/height 100%. `filled` paints it in the class
 * colour with an ink outline (a placed mark); otherwise it's an ink outline
 * only (an empty slot is never drawn — callers omit it).
 */
export function classShapeSvg(shape: ClassShape, color: string): string {
  const common = `fill="${color}" stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"`;
  switch (shape) {
    case 'circle':
      return `<svg viewBox="0 0 20 20" width="100%" height="100%"><circle cx="10" cy="10" r="8" ${common}/></svg>`;
    case 'square':
      return `<svg viewBox="0 0 20 20" width="100%" height="100%"><rect x="2.5" y="2.5" width="15" height="15" ${common}/></svg>`;
    case 'triangle':
      return `<svg viewBox="0 0 20 20" width="100%" height="100%"><path d="M10 2.5 L17.5 17 L2.5 17 Z" ${common}/></svg>`;
  }
}
