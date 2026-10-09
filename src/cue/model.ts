import { chainOf, DEVS, INST, LIB, partData, type Device, type Inst, type LaneKey, type Lanes, type PartId, type Pattern } from './data/library.ts';

export type Mode = 'program' | 'play';

export interface State {
  selectedId: string; query: string; genre: string;
  search: boolean; rack: boolean; rackQ: string; themes: boolean; theme: string;
  info: boolean;
  device: string; mode: Mode; layer: LaneKey;
  /** Beats (0–3) being practised in Play; all four = the whole bar. */
  beats: number[];
  /** Lanes ticked off in Program. */
  done: Partial<Record<LaneKey, boolean>>;
  part: PartId; chain: boolean; perc: boolean; bar: number;
  playing: boolean; step: number; tempo: number | null;
  /** Program: true = big key grid, false = whole machine drawing. */
  zoom: boolean;
}

const DEVICE_KEY = 'beatmapper.device';
const ls = (k: string, d: string) => { try { return localStorage.getItem(k) || d; } catch { return d; } };

export const initState = (theme: string): State => ({
  selectedId: 'apache', query: '', genre: 'ALL', search: false, rack: false, rackQ: '', themes: false, theme,
  info: false,
  device: ls(DEVICE_KEY, DEVS[0].id), mode: 'program', layer: 'k', beats: [0, 1, 2, 3], done: {},
  part: 'MAIN', chain: false, perc: false, bar: 0, playing: false, step: -1, tempo: null, zoom: true
});

export const saveDevice = (id: string) => { try { localStorage.setItem(DEVICE_KEY, id); } catch { /* storage unavailable */ } };

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export const selected = (s: State): Pattern => LIB.find(p => p.id === s.selectedId) || LIB[0];
export const bpmOf = (s: State) => s.tempo ?? selected(s).bpm;

/** Everything the views need that follows from state alone. */
export interface Derived {
  base: Pattern; sel: Lanes; dev: Device;
  lanes: Inst[]; layer: Inst; li: number; last: boolean;
  extraN: number; parts: PartId[];
  list: Pattern[]; genres: string[]; makers: { maker: string; items: Device[] }[];
  step: number; bpm: number; allBeats: boolean;
  hits: (k: LaneKey) => number[];
}

export function derive(s: State): Derived {
  const base = selected(s), sel = partData(base, s.part), dev = DEVS.find(d => d.id === s.device) || DEVS[0];
  const hasHits = (str: string) => /[xXg]/.test(str);
  const lanes = INST.filter(i => hasHits(sel[i.key]) && (i.core || s.perc));
  const extraN = INST.filter(i => !i.core && hasHits(sel[i.key])).length;
  const parts: PartId[] = (['MAIN', 'VAR', 'FILL'] as PartId[]).filter(id => id !== 'VAR' || !!base.var);
  const layer = lanes.find(i => i.key === s.layer) || lanes[0] || INST[0], li = lanes.indexOf(layer);
  const q = s.query.trim().toLowerCase();
  let list = LIB.filter(p => s.genre === 'ALL' || p.genre === s.genre);
  if (q) {
    list = list.filter(p => {
      const fullText = [
        p.name,
        p.artist,
        p.genre,
        p.difficulty || '',
        p.gear || '',
        p.tip || '',
        ...(p.tags || [])
      ].join(' ').toLowerCase();
      return fullText.includes(q);
    });
  }
  list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
  const rq = s.rackQ.trim().toLowerCase(), dl = DEVS.filter(d => !rq || (d.maker + ' ' + d.id).toLowerCase().includes(rq));
  return {
    base, sel, dev, lanes, layer, li, last: li >= lanes.length - 1, extraN, parts, list,
    genres: [...new Set(LIB.map(p => p.genre))].sort(),
    makers: [...new Set(dl.map(d => d.maker))].map(m => ({ maker: m, items: dl.filter(d => d.maker === m) })),
    step: s.playing ? s.step : -1, bpm: bpmOf(s), allBeats: s.beats.length === 4,
    hits: k => sel[k].split('').flatMap((x, i) => /[xXg]/.test(x) ? [i] : [])
  };
}

/** State for a freshly picked pattern: main part, first lane that has hits, whole bar. */
export function selectPattern(id: string): Partial<State> {
  const p = LIB.find(x => x.id === id) || LIB[0];
  const first = INST.find(i => /[xXg]/.test(p[i.key]));
  return { selectedId: p.id, part: 'MAIN', bar: 0, perc: false, tempo: null, step: -1, search: false, info: false, beats: [0, 1, 2, 3], done: {}, layer: first ? first.key : 'k' };
}

/**
 * Focus toggling: from the whole bar, tapping a beat isolates it; further taps
 * add/remove beats; removing the last one returns to the whole bar.
 */
export function toggleBeat(cur: number[], b: number): number[] {
  const has = cur.includes(b);
  if (cur.length === 4) return [b];
  if (has && cur.length === 1) return [0, 1, 2, 3];
  return has ? cur.filter(x => x !== b) : cur.concat(b).sort((x, y) => x - y);
}

/** Advances the playhead one 16th. Play mode loops only the focused beats; chain steps bars main, main, var, fill. */
export function tick(s: State): { step: number; part: PartId; bar: number } {
  const B = s.mode === 'play' ? s.beats : [0, 1, 2, 3];
  const allow = B.flatMap(b => [b * 4, b * 4 + 1, b * 4 + 2, b * 4 + 3]);
  const step = allow[(allow.indexOf(s.step) + 1) % allow.length];
  let part = s.part, bar = s.bar;
  if (s.chain && s.step >= 0 && step === allow[0]) { bar = (bar + 1) % 4; part = chainOf(selected(s))[bar]; }
  return { step, part, bar };
}
