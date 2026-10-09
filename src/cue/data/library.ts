// Pattern library and machine mappings. Each lane is a 16-step string: 'x' = hit, '.' = rest.

export type LaneKey = 'k' | 's' | 'h' | 'o' | 'c' | 'r' | 't' | 'b' | 'w' | 'z' | 'y';
export type PartId = 'MAIN' | 'VAR' | 'FILL';
export type Lanes = Record<LaneKey, string>;

export interface Inst { key: LaneKey; label: string; core: boolean }

export interface Pattern extends Lanes {
  id: string; name: string; artist: string; genre: string; bpm: number;
  var?: Lanes; fill?: Lanes;
}

export type Family = 'sp' | 'po' | 'ct' | 'tr' | 'dt';

export interface Device {
  id: string; maker: string; short: string; fam: Family; method: string; guess?: boolean;
  map: Partial<Record<LaneKey, string>>;
  inst?: string[]; rec?: string;
  slot?: Partial<Record<LaneKey, number>>; tracks?: string[]; trackIdx?: Partial<Record<LaneKey, number>>; dim?: number;
  track?: Partial<Record<LaneKey, number>>;
}

export const INST: Inst[] = (
  [['k', 'KICK'], ['s', 'SNARE'], ['h', 'HAT'], ['o', 'OPEN'], ['c', 'CLAP'], ['r', 'RIM'], ['t', 'TOM'], ['b', 'BONGO'],
    ['w', 'COWBELL'], ['z', 'SHAKER'], ['y', 'CRASH']] as [LaneKey, string][]
).map(([key, label], n) => ({ key, label, core: n < 4 }));

const XK = INST.filter(i => !i.core).map(i => i.key);
export const E = '................';

type RawPattern = Omit<Pattern, LaneKey | 'var' | 'fill'> & Partial<Lanes> & { var?: Partial<Lanes>; fill?: Partial<Lanes> };

const RAW: RawPattern[] = [
  { id: 'billie', name: 'Billie Jean', artist: 'Michael Jackson', genre: 'Pop', bpm: 117, k: 'x.......x.......', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'amen', name: 'Amen Break', artist: 'The Winstons', genre: 'Breakbeat', bpm: 136, k: 'x.x.......xx....', s: '....x..x.x..x..x', h: 'x.x.x.x.x.x.x.x.', o: E,
    var: { k: 'x.x.......x.....', s: '....x..x.x....x.', h: 'x.x.x.x.x.x.x.x.', o: '..........x.....' },
    fill: { k: '..xx......x.....', s: '.x..x..x.x....x.', h: 'x.x.x.x.x...x.x.', o: '..........x.....' } },
  { id: 'funky', name: 'Funky Drummer', artist: 'James Brown', genre: 'Funk', bpm: 100, k: 'x.x.......x..x..', s: '....x..x.x.xx..x', h: 'xxxxxxx.xxxxxxxx', o: '.......x........',
    var: { k: 'x.x.......x..x..', s: '....x..x.x.x.x.x', h: 'xxxxxxx.xxxxxxx.', o: '.......x.......x' } },
  { id: 'levee', name: 'When the Levee Breaks', artist: 'Led Zeppelin', genre: 'Rock', bpm: 72, k: 'xx.....x..xx....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'impeach', name: 'Impeach the President', artist: 'The Honey Drippers', genre: 'Hip-Hop', bpm: 96, k: 'x......x..x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x...', o: '..............x.' },
  { id: 'apache', name: 'Apache', artist: 'Incredible Bongo Band', genre: 'Breakbeat', bpm: 118, k: 'x......xx.x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'boombap', name: 'Boom Bap', artist: 'Golden-era standard', genre: 'Hip-Hop', bpm: 90, k: 'x.....x...x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'four', name: 'Four on the Floor', artist: 'Disco / Chicago house', genre: 'House', bpm: 124, k: 'x...x...x...x...', s: '....x.......x...', h: 'x...x...x...x...', o: '..x...x...x...x.' },
  { id: 'dembow', name: 'Dem Bow', artist: 'Shabba Ranks', genre: 'Reggaeton', bpm: 95, k: 'x...x...x...x...', s: '...x..x....x..x.', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'trap', name: 'Half-Time Trap', artist: 'Atlanta standard', genre: 'Trap', bpm: 140, k: 'x......x..x.....', s: '........x.......', h: 'x.x.x.x.xxx.x.xx', o: E },
  { id: 'motorik', name: 'Motorik', artist: 'NEU!', genre: 'Krautrock', bpm: 130, k: 'x.x...x.x.x...x.', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'onedrop', name: 'One Drop', artist: 'Bob Marley & The Wailers', genre: 'Reggae', bpm: 76, k: '........x.......', s: '........x.......', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'twostep', name: 'Two-Step', artist: 'UK garage standard', genre: 'UK Garage', bpm: 132, k: 'x.........x.....', s: '....x.......x...', h: '..x...x...x...x.', o: E },
  { id: 'bossa', name: 'Bossa Nova', artist: 'Rio de Janeiro', genre: 'Latin', bpm: 140, k: 'x..xx..xx..xx..x', s: 'x..x..x...x..x..', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'rock', name: 'Straight Eighths', artist: 'Rock standard', genre: 'Rock', bpm: 120, k: 'x.......x.x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'coldsweat', name: 'Cold Sweat', artist: 'James Brown', genre: 'Funk', bpm: 112, k: 'x.......x.x.....', s: '....x..x.x..x..x', h: 'x.x.x.x.x.x.x.x.', o: '......x.........',
    var: { k: 'x.x.......x..x..', s: '....x..x.x..x.x.', h: 'x.x.x.x.x.x.x.x.', o: '......x.........' } },
  { id: 'think', name: 'Think (About It)', artist: 'Lyn Collins', genre: 'Funk', bpm: 112, k: 'x......x..x.x...', s: '....x..x.x..x..x', h: 'x.x.x.x.x.x.x...', o: '..............x.' },
  { id: 'cissy', name: 'Cissy Strut', artist: 'The Meters', genre: 'Funk', bpm: 88, k: 'x..x..x...x..x..', s: '....x..x.x..x...', h: 'x.x.x.x.x.x.x.x.', o: E,
    var: { k: 'x..x..x...x.....', s: '....x..x.x..x.xx', h: 'x.x.x.x.x.x.x...', o: '..............x.' } },
  { id: 'afrobeat', name: 'Afrobeat', artist: 'Tony Allen', genre: 'Afrobeat', bpm: 110, k: 'x.....x...x.x...', s: '..x..x.x..x..x.x', h: 'x.xxx.xxx.xxx.xx', o: '..........x.....' },
  { id: 'jungle', name: 'Chopped Amen', artist: 'Jungle standard', genre: 'Jungle', bpm: 170, k: 'x.x.......x.....', s: '....x..x.x.xx.x.', h: 'x.x.x.x.x.x.x.x.', o: E,
    var: { k: 'x.x...x...x..x..', s: '.x..x..x.x..x.xx', h: 'x.x.x.x.x.x.x.x.', o: E } },
  { id: 'dnb', name: 'Two-Step D&B', artist: 'Drum & bass standard', genre: 'Drum & Bass', bpm: 174, k: 'x.........x.....', s: '....x..x....x..x', h: 'x.x.x.x.x.x.x.x.', o: E,
    var: { k: 'x.........xx....', s: '....x..x.x..x...', h: 'x.x.x.x.x.x.x.x.', o: '..............x.' } },
  { id: 'jersey', name: 'Jersey Club', artist: 'Newark standard', genre: 'Club', bpm: 140, k: 'x...x...x.x...x.', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'footwork', name: 'Footwork', artist: 'Chicago juke', genre: 'Club', bpm: 160, k: 'x..x..x...x..x..', s: '....x.......x...', h: '..x...x...x...x.', o: E },
  { id: 'tambor', name: 'Tamborzão', artist: 'Baile funk', genre: 'Latin', bpm: 130, k: 'x..x...x..x.x...', s: '...x..x...x...x.', h: 'x.x.x.x.x.x.x.x.', o: E },
  { id: 'drill', name: 'UK Drill', artist: 'London standard', genre: 'Trap', bpm: 142, k: 'x.........x..x..', s: '........x....x..', h: 'x..x..x.x..x..x.', o: E },
  { id: 'songo', name: 'Songo', artist: 'Changuito', genre: 'Latin', bpm: 120, k: '...x......x..x..', s: '..x..x.x..xx...x', h: 'x...x...x...x...', o: E }
];

// Extra percussion per pattern (approximations, not transcriptions).
const PERC: Record<string, Partial<Lanes>> = {
  billie: { z: '.x.x.x.x.x.x.x.x' }, apache: { b: 'x..x..x.x..x.x..', t: '..............xx' },
  four: { c: '....x.......x...', z: '.x.x.x.x.x.x.x.x' }, trap: { c: '........x.......' }, jersey: { c: '....x.......x...' },
  songo: { w: 'x.x.x.x.x.x.x.x.', b: '..xx...x..xx...x' }, afrobeat: { w: 'x.x.xx.x.x.xx.x.', z: 'xxxxxxxxxxxxxxxx' },
  tambor: { b: 'x..x..x...x..x..' }, onedrop: { s: E, r: '........x.......' }, rock: { y: 'x...............' },
  dnb: { y: 'x...............' }, footwork: { c: '....x.......x...' }, levee: { y: 'x...............' }
};

const norm = (o: Partial<Lanes>): Lanes => { INST.forEach(i => { if (!o[i.key]) o[i.key] = E; }); return o as Lanes; };
// Variation/fill bars inherit the main bar's extra percussion unless they define their own.
const inherit = (part: Partial<Lanes>, main: Partial<Lanes>): Lanes =>
  norm(Object.assign(part, Object.fromEntries(XK.map(k => [k, part[k] || main[k]]))));

export const LIB: Pattern[] = RAW.map(r => {
  const p = Object.assign(r, PERC[r.id] || {});
  norm(p);
  if (p.var) inherit(p.var, p);
  if (p.fill) inherit(p.fill, p);
  return p as Pattern;
});

// Generated fills, styled per genre, for patterns without a known fill bar.
const FILL_STYLE: Record<string, string> = { Trap: 'trap', House: 'house', Club: 'house', 'UK Garage': 'house', Rock: 'build', Funk: 'build', Breakbeat: 'build', Jungle: 'build', 'Drum & Bass': 'build', Krautrock: 'build' };
const setAt = (str: string, idx: number[], ch: string) => { const a = str.split(''); idx.forEach(i => { a[i] = ch; }); return a.join(''); };
const R8 = [8, 9, 10, 11, 12, 13, 14, 15], R4 = [12, 13, 14, 15];
function makeFillCore(p: Pattern): Pick<Lanes, 'k' | 's' | 'h' | 'o'> {
  const st = FILL_STYLE[p.genre] || 'roll';
  if (st === 'trap') return { k: setAt(p.k, [14], 'x'), s: setAt(p.s, [13, 15], 'x'), h: setAt(p.h, R8, 'x'), o: setAt(p.o, R8, '.') };
  if (st === 'house') return { k: p.k, s: setAt(p.s, [8, 10, 12, 13, 14, 15], 'x'), h: p.h, o: setAt(p.o, R4, '.') };
  if (st === 'build') return { k: setAt(p.k, [9, 11, 13, 14, 15], '.'), s: setAt(setAt(p.s, [8, 10], 'x'), R4, 'x'), h: setAt(p.h, R8, '.'), o: setAt(p.o, R8, '.') };
  return { k: setAt(p.k, [13, 14, 15], '.'), s: setAt(p.s, R4, 'x'), h: setAt(p.h, R4, '.'), o: setAt(p.o, R4, '.') };
}
const fillCache = new Map<string, Lanes>();
function makeFill(p: Pattern): Lanes {
  let f = fillCache.get(p.id);
  if (!f) {
    f = Object.assign(Object.fromEntries(XK.map(k => [k, p[k] || E])), { y: setAt(p.y || E, [0], p.y.includes('x') ? 'x' : '.') }, makeFillCore(p)) as Lanes;
    fillCache.set(p.id, f);
  }
  return f;
}

export function partData(p: Pattern, id: PartId): Lanes {
  if (id === 'VAR' && p.var) return p.var;
  if (id === 'FILL') return p.fill || makeFill(p);
  return p;
}
export const chainOf = (p: Pattern): PartId[] => ['MAIN', 'MAIN', p.var ? 'VAR' : 'MAIN', 'FILL'];

export const DEVS: Device[] = [
  { id: 'SP-404MKII', maker: 'Roland', short: 'SP-404', fam: 'sp', map: { k: 'A1', s: 'A2', h: 'A3', o: 'A4' }, method: 'TR-REC · PADS = STEPS 1–16' },
  { id: 'TR-8S', maker: 'Roland', short: 'TR-8S', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'HC', 'CH', 'OH', 'CC', 'RC'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'TR-REC · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'TR-6S', maker: 'Roland', short: 'TR-6S', fam: 'tr', inst: ['BD', 'SD', 'LT', 'HT', 'CH', 'OH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'TR-REC · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'TR-08', maker: 'Roland', short: 'TR-08', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CB', 'CY', 'OH', 'CH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'PO-33', maker: 'Teenage Eng.', short: 'PO-33', fam: 'po', map: { k: '9', s: '10', h: '11', o: '12' }, method: 'WRITE MODE · ONE SOUND PER PASS' },
  { id: 'PO-32', maker: 'Teenage Eng.', short: 'PO-32', fam: 'po', map: { k: '1', s: '2', h: '7', o: '7+B' }, method: 'WRITE · OPEN HAT = HOLD STEP + TURN B', guess: true },
  { id: 'PO-12', maker: 'Teenage Eng.', short: 'PO-12', fam: 'po', map: { k: '1', s: '2', h: '9', o: '10' }, method: 'WRITE MODE · ONE SOUND PER PASS', guess: true },
  { id: 'CIRCUIT TRACKS', maker: 'Novation', short: 'CIRCUIT T', fam: 'ct', map: { k: 'D1', s: 'D2', h: 'D3', o: 'D4' }, slot: { k: 1, s: 3, h: 5, o: 7 }, tracks: ['SYN 1', 'SYN 2', 'MIDI 1', 'MIDI 2', 'DRUM 1', 'DRUM 2', 'DRUM 3', 'DRUM 4'], trackIdx: { k: 4, s: 5, h: 6, o: 7 }, dim: 4, method: 'DRUM 1–4 · TOP 16 PADS = STEPS · BOTTOM 16 = SAMPLE' },
  { id: 'CIRCUIT RHYTHM', maker: 'Novation', short: 'CIRCUIT R', fam: 'ct', map: { k: 'T1', s: 'T2', h: 'T3', o: 'T4' }, slot: { k: 1, s: 2, h: 3, o: 4 }, tracks: ['TRK 1', 'TRK 2', 'TRK 3', 'TRK 4', 'TRK 5', 'TRK 6', 'TRK 7', 'TRK 8'], trackIdx: { k: 0, s: 1, h: 2, o: 3 }, dim: 0, method: 'TRACKS 1–4 · TOP 16 PADS = STEPS', guess: true },
  { id: 'DIGITAKT II', maker: 'Elektron', short: 'DIGITAKT', fam: 'dt', map: { k: 'T1', s: 'T2', h: 'T3', o: 'T4' }, track: { k: 1, s: 2, h: 3, o: 4 }, method: 'GRID REC · [TRK] + TRIG PICKS TRACK · TRIGS 1–16', guess: true },
  { id: 'SYNTAKT', maker: 'Elektron', short: 'SYNTAKT', fam: 'dt', map: { k: 'T1', s: 'T2', h: 'T3', o: 'T4' }, track: { k: 1, s: 2, h: 3, o: 4 }, method: 'GRID REC · [TRK] + TRIG PICKS TRACK · TRIGS 1–16', guess: true },
  { id: 'ANALOG RYTM MKII', maker: 'Elektron', short: 'RYTM', fam: 'dt', map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, track: { k: 1, s: 2, h: 9, o: 10 }, method: 'GRID REC · [TRK] + PAD PICKS TRACK · TRIGS 1–16' },
  { id: 'MPC ONE+', maker: 'Akai', short: 'MPC ONE+', fam: 'sp', map: { k: 'A01', s: 'A02', h: 'A03', o: 'A04' }, method: 'STEP SEQ · PADS = STEPS 1–16', guess: true },
  { id: 'MPC LIVE II', maker: 'Akai', short: 'MPC LIVE', fam: 'sp', map: { k: 'A01', s: 'A02', h: 'A03', o: 'A04' }, method: 'STEP SEQ · PADS = STEPS 1–16', guess: true },
  { id: 'MASCHINE MK3', maker: 'Native Instr.', short: 'MASCHINE', fam: 'sp', map: { k: '1', s: '2', h: '3', o: '4' }, method: 'STEP MODE · PADS = STEPS 1–16', guess: true },
  { id: 'VOLCA BEATS', maker: 'Korg', short: 'VOLCA', fam: 'tr', inst: ['KICK', 'SNR', 'LTOM', 'HTOM', 'CHAT', 'OHAT', 'CLAP', 'CLAV', 'AGO', 'CRSH'], map: { k: 'KICK', s: 'SNR', h: 'CHAT', o: 'OHAT' }, rec: 'STEP', method: 'STEP MODE · PICK PART · TOUCH KEYS 1–16' },
  { id: 'DRUMLOGUE', maker: 'Korg', short: 'DRUMLOGUE', fam: 'tr', inst: ['BD', 'SD', 'LT', 'HT', 'CH', 'OH', 'RS', 'CP', 'MULTI'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, rec: 'STEP', method: 'STEP EDIT · PICK PART · STEP KEYS 1–16' },
  { id: 'DRUMBRUTE IMPACT', maker: 'Arturia', short: 'IMPACT', fam: 'tr', inst: ['KCK1', 'KCK2', 'SNR', 'TOMH', 'TOML', 'CYM', 'COW', 'CHH', 'OHH', 'FM'], map: { k: 'KCK1', s: 'SNR', h: 'CHH', o: 'OHH' }, rec: 'STEP', method: 'STEP MODE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'RD-8', maker: 'Behringer', short: 'RD-8', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CB', 'CY', 'OH', 'CH'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · PICK INSTRUMENT · STEP KEYS 1–16' },
  { id: 'RD-9', maker: 'Behringer', short: 'RD-9', fam: 'tr', inst: ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CH', 'OH', 'CR', 'RD'], map: { k: 'BD', s: 'SD', h: 'CH', o: 'OH' }, method: 'STEP WRITE · PICK INSTRUMENT · STEP KEYS 1–16' }
];

// Map the extra percussion onto each machine. Sounds a machine has no slot for stay unmapped.
const SYN: Record<string, string[]> = { c: ['CP', 'CLAP', 'HC'], r: ['RS', 'RIM'], t: ['LT', 'MT', 'HT', 'LTOM', 'HTOM', 'TOML', 'TOMH'], b: ['CONGA', 'BONGO'], w: ['CB', 'COW', 'AGO'], z: ['SHKR', 'MA'], y: ['CC', 'CY', 'CR', 'CRSH', 'CYM', 'RC', 'RD'] };
const PO_X: Record<string, Partial<Record<LaneKey, string>>> = { 'PO-33': { c: '13', r: '14', z: '15', y: '16' }, 'PO-32': { c: '3', r: '4', t: '5', w: '6', b: '8', z: '9', y: '10' }, 'PO-12': { t: '3', r: '5', c: '6', w: '7', z: '11', y: '12' } };
const RYTM = ['BD', 'SD', 'RS', 'CP', 'BT', 'LT', 'MT', 'HT', 'CH', 'OH', 'CY', 'CB'];
DEVS.forEach(dv => {
  const set = (k: LaneKey, v: string, n?: number) => { dv.map[k] = v; if (dv.track && n) dv.track[k] = n; };
  XK.forEach((k, j) => {
    if (dv.fam === 'sp') { const m = /^([A-Z]?)(0?)(\d+)$/.exec(dv.map.k!)!, n = j + 5; set(k, m[1] + (m[2] && n < 10 ? '0' : '') + n); }
    else if (dv.fam === 'tr') { const hit = SYN[k].find(x => dv.inst!.includes(x)); if (hit) set(k, hit); }
    else if (dv.fam === 'po') { const v = (PO_X[dv.id] || {})[k]; if (v) set(k, v); }
    else if (dv.id === 'CIRCUIT RHYTHM') { const n = ({ c: 5, r: 6, t: 7, y: 8 } as Partial<Record<LaneKey, number>>)[k]; if (n) { set(k, 'T' + n); dv.slot![k] = n; dv.trackIdx![k] = n - 1; } }
    else if (dv.id === 'ANALOG RYTM MKII') { const hit = SYN[k].find(x => RYTM.includes(x)); if (hit) set(k, hit, RYTM.indexOf(hit) + 1); }
    else if (dv.fam === 'dt') set(k, 'T' + (j + 5), j + 5);
  });
});

export const FAM: Record<Family, string> = { sp: 'PAD GRID', po: 'POCKET', ct: 'GRID 8×4', tr: 'STEP ROW', dt: 'TRIG ROW' };
