import type { DrumClass } from '../audio/classifier.ts';
import type { QuantizedPattern } from '../audio/quantize.ts';
import { STEPS_PER_BAR } from '../audio/quantize.ts';
import { getControls, type DeviceConfig } from '../devices/device-config.ts';

export const GENRES = [
  'house',
  'techno',
  'electro',
  'hip-hop',
  'trap',
  'drum & bass',
  'dubstep',
  'garage',
  'breakbeat',
  'funk',
  'disco',
  'rock',
  'reggae',
  'reggaeton',
] as const;
export type Genre = (typeof GENRES)[number];

export const FEELS = ['straight', 'swung', 'half-time', 'broken'] as const;
export type Feel = (typeof FEELS)[number];

export const DENSITIES = ['sparse', 'medium', 'busy'] as const;
export type Density = (typeof DENSITIES)[number];

/** One lane per drum class, written as a step string: `x` is a hit, `-` a
 * rest, whitespace is ignored (use it to separate bars for readability). */
export type LaneNotation = Record<DrumClass, string>;

export interface LibraryPattern {
  /** Stable slug. */
  id: string;
  name: string;
  genre: Genre;
  feel: Feel;
  /** Default tempo, and the range the groove sits well in. */
  bpm: number;
  bpmRange: [number, number];
  tags: string[];
  lanes: LaneNotation;
}

/** Lane strings with the bar-separating whitespace stripped. */
export function normalizeLane(lane: string): string {
  return lane.replace(/\s+/g, '');
}

export function patternSteps(pattern: LibraryPattern): number {
  return normalizeLane(pattern.lanes.kick).length;
}

export function patternBars(pattern: LibraryPattern): number {
  return patternSteps(pattern) / STEPS_PER_BAR;
}

/** Hits per bar across every lane — what the density filter buckets. */
export function hitsPerBar(pattern: LibraryPattern): number {
  let hits = 0;
  for (const lane of Object.values(pattern.lanes)) {
    for (const ch of normalizeLane(lane)) if (ch === 'x') hits++;
  }
  return hits / patternBars(pattern);
}

export function densityOf(pattern: LibraryPattern): Density {
  const h = hitsPerBar(pattern);
  if (h <= 10) return 'sparse';
  if (h <= 17) return 'medium';
  return 'busy';
}

/**
 * Lays a library pattern out for a device: each hit is routed through the
 * device's classMapping (first mapped control), exactly as a step edited by
 * hand on the pattern grid would be.
 */
export function toQuantizedPattern(pattern: LibraryPattern, device: DeviceConfig): QuantizedPattern {
  const steps: QuantizedPattern['steps'] = [];
  for (const cls of Object.keys(pattern.lanes) as DrumClass[]) {
    const controlLabel = getControls(device, device.classMapping[cls])[0]?.label ?? '';
    [...normalizeLane(pattern.lanes[cls])].forEach((ch, step) => {
      if (ch === 'x') steps.push({ step, class: cls, controlLabel });
    });
  }
  steps.sort((a, b) => a.step - b.step);
  return { steps, totalSteps: patternSteps(pattern) };
}

export interface LibraryFilter {
  genre: Genre | null;
  feel: Feel | null;
  density: Density | null;
  /** Case-insensitive match against name, genre and tags. */
  query: string;
}

export const EMPTY_FILTER: LibraryFilter = { genre: null, feel: null, density: null, query: '' };

export function filterPatterns(patterns: LibraryPattern[], filter: LibraryFilter): LibraryPattern[] {
  const q = filter.query.trim().toLowerCase();
  return patterns.filter((p) => {
    if (filter.genre && p.genre !== filter.genre) return false;
    if (filter.feel && p.feel !== filter.feel) return false;
    if (filter.density && densityOf(p) !== filter.density) return false;
    if (q && ![p.name, p.genre, ...p.tags].some((s) => s.toLowerCase().includes(q))) return false;
    return true;
  });
}
