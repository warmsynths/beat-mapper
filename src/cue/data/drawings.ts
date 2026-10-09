import type { Device, LaneKey } from './library.ts';

/** One element of a machine's front panel. Units: panel width = 100, height = Drawing.H. */
export interface PanelPart {
  t: 'knob' | 'label' | 'btn' | 'key' | 'screen' | 'grille' | 'fader' | 'inst';
  x: number; y: number; w: number; h: number;
  text?: string; fs?: number; fw?: number; r?: number; step?: number;
  circ?: number; acc?: string; nob?: number; hl?: boolean; hlAll?: boolean | number;
  mute?: number; right?: number; center?: number; scr?: number; scr2?: number; scrS?: number;
  corner?: number; soft?: number; dim?: boolean; grey?: number;
  [extra: string]: unknown;
}

export interface Drawing { P: PanelPart[]; H: number; R: number }

const STRIP = ['#b5533f', '#d4824a', '#c99a3e', '#e6e2d3'];

/** Front-panel geometry for each machine, built from published panel layouts. L = the lane being programmed. */
export function drawDevice(d: Device, L: LaneKey): Drawing {
  const P: PanelPart[] = [], hlOf = (name: string) => name === d.map[L];
  type Opts = Partial<PanelPart>;
  const a = (t: PanelPart['t'], x: number, y: number, w: number, h: number, o?: Opts) => { P.push(Object.assign({ t, x, y, w, h }, o)); };
  const kn = (x: number, y: number, s: number) => a('knob', x, y, s, s);
  const lab = (x: number, y: number, w: number, h: number, text: string, fs: number, o?: Opts) => a('label', x, y, w, h, Object.assign({ text, fs }, o));
  const btn = (x: number, y: number, w: number, h: number, o?: Opts) => a('btn', x, y, w, h, o);
  const keyRow = (x0: number, y: number, pitch: number, w: number, h: number, o?: Opts) => { for (let i = 0; i < 16; i++) a('key', x0 + i * pitch, y, w, h, Object.assign({ step: i }, o)); };
  const strips = (x0: number, y: number, pitch: number, w: number, h: number) => { for (let i = 0; i < 16; i++) btn(x0 + i * pitch, y, w, h, { acc: STRIP[i >> 2], nob: 1 }); };
  const nums = (x0: number, y: number, pitch: number, w: number, fs: number, hlIdx?: number) => { for (let i = 0; i < 16; i++) lab(x0 + i * pitch, y, w, fs * 1.6, String(i + 1), fs, { center: 1, mute: 1, hl: i === hlIdx }); };
  const brand = (maker: string, model: string, fsA: number, fsB: number) => {
    lab(4, 3, 40, fsA * 1.8, maker, fsA, { mute: 1 });
    lab(4, 3 + fsA * 1.9, 40, fsB * 1.6, model, fsB, { fw: 600 });
  };
  let H = 60, R = 2;
  const id = d.id;
  if (id === 'SP-404MKII') {
    H = 172; R = 4;
    lab(8, 5, 40, 6, 'Roland', 3, { mute: 1 }); lab(46, 5, 46, 6, 'SP-404MKII', 3.6, { fw: 600, right: 1 });
    a('screen', 8, 14, 38, 14, { scr: 1, fs: 2.6 }); kn(54, 13, 16); kn(76, 15, 12);
    [8, 23, 38].forEach(x => kn(x, 34, 11));
    for (let i = 0; i < 5; i++) btn(8 + i * 17, 50, 14, 6);
    for (let i = 0; i < 10; i++) btn(8 + i * 8.6, 61, 6.6, 4.5, { r: 2.25 });
    for (let i = 0; i < 5; i++) btn(8 + i * 17, 69, 14, 5, i === 1 || i === 2 ? { acc: '#c99a3e', nob: 1 } : {});
    for (let i = 0; i < 16; i++) a('key', 8 + (i % 4) * 21.75, 80 + Math.floor(i / 4) * 21.75, 18.75, 18.75, { step: i, r: 1.4, fs: 2.4 });
  } else if (id === 'MPC ONE+') {
    H = 105; R = 2.5;
    lab(5, 3, 30, 5, 'AKAI', 2.6, { fw: 600 }); lab(50, 3, 45, 5, 'MPC ONE+', 2.6, { fw: 600, right: 1 });
    a('screen', 5, 10, 54, 32, { scr: 1, fs: 2.4 });
    kn(65, 11, 19);
    for (let i = 0; i < 4; i++) kn(88.5, 10 + i * 8.5, 6.5);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) btn(64 + c * 8, 34 + r * 6, 6, 4);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) btn(5 + c * 11, 47 + r * 8, 9, 5);
    btn(5, 92, 9, 6); btn(16, 92, 9, 6, { acc: '#b5533f', nob: 1 }); btn(27, 92, 9, 6);
    for (let i = 0; i < 16; i++) a('key', 40 + (i % 4) * 14.17, 46 + Math.floor(i / 4) * 14.17, 12.5, 12.5, { step: i, r: 1, fs: 1.8 });
  } else if (id === 'MPC LIVE II') {
    H = 60; R = 2;
    lab(4, 3, 20, 4, 'AKAI', 1.8, { fw: 600 }); lab(60, 3, 37, 4, 'MPC LIVE II', 1.8, { fw: 600, right: 1 });
    a('screen', 4, 9, 40, 26, { scr: 1, fs: 1.6 });
    for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) btn(4 + c * 6.9, 39 + r * 6, 5.5, 4, r === 1 && c === 1 ? { acc: '#b5533f', nob: 1 } : {});
    a('grille', 4, 52, 40, 4.5);
    kn(46.5, 9, 10);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) btn(47 + c * 5, 22 + r * 4.5, 4, 3);
    for (let i = 0; i < 4; i++) kn(60 + i * 10, 8, 5);
    for (let i = 0; i < 16; i++) a('key', 58 + (i % 4) * 10, 17 + Math.floor(i / 4) * 10, 9, 9, { step: i, r: 0.8, fs: 1.3 });
  } else if (id === 'MASCHINE MK3') {
    H = 84; R = 2.5;
    lab(5, 3, 30, 4, 'MASCHINE', 2.2, { fw: 600 }); lab(50, 3, 45, 4, 'NATIVE INSTRUMENTS', 1.6, { mute: 1, right: 1 });
    a('screen', 5, 9, 43, 19, { scr: 1, fs: 1.8 }); a('screen', 52, 9, 43, 19, { scr2: 1, fs: 1.8 });
    for (let i = 0; i < 8; i++) kn(7 + i * 11.4, 32, 6);
    kn(6, 45, 12);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) btn(5 + c * 5.5, 62 + r * 5, 4.5, 3.5);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) btn(24 + c * 8, 45 + r * 6.5, 7, 5);
    btn(24, 60, 31, 2.5, { r: 1.25 });
    for (let i = 0; i < 4; i++) btn(24 + i * 8, 68, 7, 5, i === 2 ? { acc: '#b5533f', nob: 1 } : {});
    for (let i = 0; i < 16; i++) a('key', 58 + (i % 4) * 9.5, 45 + Math.floor(i / 4) * 9.5, 8.5, 8.5, { step: i, r: 0.8, fs: 1.4 });
  } else if (d.fam === 'po') {
    H = 150; R = 5;
    lab(8, 5, 40, 7, id, 4, { fw: 600 }); lab(50, 5, 42, 7, ({ 'PO-12': 'rhythm', 'PO-32': 'tonic', 'PO-33': 'K.O!' } as Record<string, string>)[id] || '', 3.6, { right: 1, mute: 1 });
    a('screen', 8, 15, 54, 20, { scr: 1, fs: 3 });
    kn(68, 15, 10); kn(83, 15, 10);
    lab(68, 26, 10, 4, 'A', 2.6, { center: 1, mute: 1 }); lab(83, 26, 10, 4, 'B', 2.6, { center: 1, mute: 1 });
    if (id === 'PO-33') a('grille', 76, 31.5, 3.5, 3.5, { circ: 1 });
    ['sound', 'pattern'].forEach((n, c) => { btn(11.5 + c * 21, 39, 10, 10, { circ: 1, hlAll: c === 0 }); lab(6 + c * 21, 50, 21, 4, n, 2.4, { center: 1, mute: 1 }); });
    if (id === 'PO-33') { btn(74.5, 39, 10, 10, { circ: 1, acc: '#b5533f', nob: 1 }); lab(69, 50, 21, 4, 'record', 2.4, { center: 1, mute: 1 }); }
    for (let i = 0; i < 16; i++) a('key', 10 + (i % 4) * 21, 58 + Math.floor(i / 4) * 18, 13, 13, { step: i, circ: 1, fs: 2.6 });
    ['special', 'play', 'bpm', 'write'].forEach((n, c) => { btn(11.5 + c * 21, 131, 10, 10, { circ: 1 }); lab(6 + c * 21, 142, 21, 4, n, 2.4, { center: 1, mute: 1 }); });
  } else if (d.fam === 'ct') {
    H = 64; R = 2;
    lab(4, 3, 20, 4, 'novation', 1.6, { mute: 1 }); lab(50, 3, 46, 4, id, 1.8, { fw: 600, right: 1 });
    kn(4, 9, 7); kn(88, 8, 9);
    for (let i = 0; i < 8; i++) kn(17.5 + i * 8.43, 9, 6);
    lab(17, 16.5, 66, 3.6, '', 1.3, { scr: 1, center: 1, mute: 1 });
    for (let i = 0; i < 6; i++) { btn(4, 22 + i * 5.6, 7, 4); btn(89, 22 + i * 5.6, 7, 4, id === 'CIRCUIT RHYTHM' && i === 0 ? { acc: '#b5533f', nob: 1 } : {}); }
    for (let i = 0; i < 32; i++) {
      const x = 17 + (i % 8) * 8.43, y = 22 + Math.floor(i / 8) * 8.43;
      if (i < 16) a('key', x, y, 7.03, 7.03, { step: i, r: 0.6, fs: 1.1 });
      else a('inst', x, y, 7.03, 7.03, { r: 0.6, text: String(i - 15), fs: 1.1, corner: 1, hl: (d.slot || {})[L] === i - 15, soft: 1 });
    }
    (d.tracks || []).forEach((t, i) => a('inst', 17 + i * 8.43, 57, 7.03, 3.6, { text: t, fs: 1.05, hl: i === (d.trackIdx || {})[L], dim: i < (d.dim || 0) }));
  } else if (id === 'TR-8S') {
    H = 44; R = 1.5;
    lab(3, 3, 14, 3, 'Roland', 1.4, { mute: 1 }); lab(3, 6.3, 14, 4, 'TR-8S', 2.6, { fw: 600 });
    a('screen', 3, 12, 14, 6, { scr: 1, fs: 1.05 });
    kn(5, 21, 9); btn(3, 35, 9, 5, { acc: '#b5533f', nob: 1 });
    d.inst!.forEach((n, i) => { const x = 20 + i * 6.2; kn(x + 1.1, 3, 3.2); kn(x + 1.1, 8, 3.2); kn(x + 1.1, 13, 3.2); a('fader', x + 2.1, 18, 1.2, 9, { hl: hlOf(n) }); a('inst', x + 0.3, 28.5, 4.6, 2.8, { text: n, fs: 1, hl: hlOf(n) }); });
    kn(89, 3, 4); kn(94, 3, 4); kn(89, 9, 4); kn(94, 9, 4); a('fader', 92.4, 16, 1.2, 11);
    strips(14, 33.4, 5.1875, 4.5, 0.8); keyRow(14, 35, 5.1875, 4.5, 6, { r: 0.4 });
  } else if (id === 'TR-6S') {
    H = 60; R = 2.5;
    lab(4, 4, 22, 4, 'Roland', 2, { mute: 1 }); lab(4, 8.5, 22, 5, 'TR-6S', 3.4, { fw: 600 });
    a('screen', 4, 16, 20, 8, { scr: 1, fs: 1.5 });
    kn(8, 27, 12); btn(4, 42, 10, 4, { acc: '#b5533f', nob: 1 });
    d.inst!.forEach((n, i) => { const x = 28 + i * 11; kn(x + 2.2, 4, 4.6); kn(x + 2.2, 11, 4.6); a('fader', x + 3.7, 18, 1.6, 14, { hl: hlOf(n) }); a('inst', x, 35, 9, 4, { text: n, fs: 1.5, hl: hlOf(n) }); });
    strips(4, 46.5, 5.75, 4.9, 1); keyRow(4, 48.5, 5.75, 4.9, 7, { r: 0.5 });
  } else if (id === 'TR-08') {
    H = 56; R = 1.5;
    lab(4, 3, 30, 4, 'Roland', 1.8, { mute: 1 }); lab(60, 3, 36, 4, 'TR-08', 2.6, { fw: 600, right: 1 });
    d.inst!.forEach((n, i) => { const x = 6 + i * 8.2; kn(x + 1.6, 9, 4); kn(x + 1.6, 15, 4); a('inst', x, 21, 7.2, 3.4, { text: n, fs: 1.25, hl: hlOf(n) }); });
    kn(5, 29, 11); lab(2, 40.5, 17, 3, 'INST SELECT', 1.1, { center: 1, mute: 1 });
    btn(5, 46, 11, 6, { acc: '#b5533f', nob: 1 });
    strips(20, 43.6, 4.8125, 4, 0.8); keyRow(20, 45.2, 4.8125, 4, 7.5, { r: 0.4 });
  } else if (id === 'RD-8') {
    H = 40; R = 1;
    brand('BEHRINGER', 'RD-8', 1.2, 2.4);
    kn(3, 12, 5); kn(10, 12, 5); kn(4, 19.5, 9);
    d.inst!.forEach((n, i) => { const x = 18 + i * 6.5; kn(x + 1.5, 3, 3); kn(x + 1.5, 7.5, 3); kn(x + 1.5, 12, 3); a('inst', x + 0.4, 17, 5.2, 2.6, { text: n, fs: 0.95, hl: hlOf(n) }); });
    kn(91, 3, 3); kn(94.5, 3, 3); kn(91, 8, 3); kn(94.5, 8, 3); btn(91, 13, 6.5, 2.5);
    btn(3, 31, 9, 4.5, { acc: '#b5533f', nob: 1 });
    strips(18, 25.6, 4.9375, 4.2, 0.7); keyRow(18, 27, 4.9375, 4.2, 7, { r: 0.4 });
  } else if (id === 'RD-9') {
    H = 40; R = 1;
    brand('BEHRINGER', 'RD-9', 1.2, 2.4);
    kn(3, 12, 8); kn(13, 13, 4);
    const cnt = [4, 4, 3, 3, 3, 1, 1, 1, 2, 2, 2];
    d.inst!.forEach((n, i) => { const x = 18 + i * 7.1; a('grille', x, 2.5, 6.4, 12.5); for (let j = 0; j < cnt[i]; j++) kn(x + 0.5 + (j % 2) * 3, 3.4 + Math.floor(j / 2) * 3.6, 2.6); a('inst', x + 0.4, 17.5, 5.6, 2.6, { text: n, fs: 0.95, hl: hlOf(n) }); });
    btn(3, 29, 9, 5, { acc: '#b5533f', nob: 1 });
    keyRow(18, 25, 4.9375, 4.4, 7, { r: 0.3, grey: 1 }); nums(18, 33, 4.9375, 4.4, 0.9);
  } else if (id === 'VOLCA BEATS') {
    H = 64; R = 2.5;
    lab(4, 3, 16, 4, 'KORG', 2.2, { fw: 600 }); lab(4, 7.8, 22, 4, 'volca beats', 2.4);
    a('screen', 4, 14, 16, 7, { scrS: 1, fs: 2.2 });
    a('grille', 5, 25, 14, 14, { circ: 1 });
    for (let i = 0; i < 9; i++) { kn(24 + i * 8.2, 4, 5); kn(24 + i * 8.2, 13, 5); }
    for (let i = 0; i < 9; i++) btn(24 + i * 8.2, 23, 5, 3, i === 1 ? { acc: '#b5533f', nob: 1 } : {});
    keyRow(4, 42, 5.75, 5, 15, { r: 0.4 });
    d.inst!.forEach((n, i) => lab(3.6 + i * 5.75, 58.5, 5.8, 2.6, n, 1.1, { center: 1, hl: hlOf(n) }));
  } else if (id === 'DRUMLOGUE') {
    H = 44; R = 1.5;
    lab(3, 3, 14, 3, 'KORG', 1.6, { fw: 600 }); lab(3, 6.5, 20, 4, 'drumlogue', 2.4);
    [3, 10, 17, 24].forEach(x => kn(x, 13, 5));
    a('screen', 36, 4, 20, 11, { scr: 1, fs: 1.2 });
    for (let i = 0; i < 4; i++) kn(59 + i * 7, 4, 6);
    kn(89, 3, 7); kn(90.2, 12, 4.5);
    for (let i = 0; i < 6; i++) btn(36 + i * 3.5, 17, 2.8, 2);
    const pw = 94 / d.inst!.length;
    d.inst!.forEach((n, i) => a('inst', 3 + i * pw, 23, pw - 1, 4.5, { text: n, fs: 1.2, hl: hlOf(n) }));
    keyRow(3, 32, 5.875, 5.1, 8, { r: 0.5 });
  } else if (id === 'DRUMBRUTE IMPACT') {
    H = 49; R = 2;
    lab(3, 3, 18, 3, 'ARTURIA', 1.3, { mute: 1 }); lab(3, 6.5, 18, 4, 'DrumBrute Impact', 1.8, { fw: 600 });
    kn(3, 13, 6); kn(11, 13, 6); kn(4, 22, 9);
    d.inst!.forEach((n, i) => { const x = 22 + i * 7.6; kn(x + 1.3, 3, 4); kn(x + 1.3, 9, 4); lab(x, 14.3, 6.6, 2.8, n, 1, { center: 1 }); a('inst', x, 18, 6.6, 6.6, { r: 1.2, hl: hlOf(n) }); });
    btn(3, 33, 6, 3.5, { acc: '#b5533f', nob: 1 }); btn(11, 33, 6, 3.5);
    keyRow(3, 39, 5.875, 5, 6, { r: 0.8 });
  } else if (id === 'DIGITAKT II' || id === 'SYNTAKT') {
    // 215 × 176 mm Elektron enclosure. Clockwise from MAIN VOLUME (top-left) to FUNC / LEVEL·DATA (left edge).
    H = 76; R = 1.5;
    const syn = id === 'SYNTAKT', t = (x: number, y: number, w: number, h: number, s: string, o?: Opts) => btn(x, y, w, h, Object.assign({ text: s, fs: 0.85 }, o));
    kn(4, 4, 5); lab(2.5, 9.6, 8, 2, 'VOL', 0.8, { center: 1, mute: 1 });
    lab(12, 3.6, 16, 2.4, 'ELEKTRON', 1.05, { mute: 1 }); lab(12, 6.2, 17, 3.2, id, 1.75, { fw: 600 });
    (syn ? ['KIT', 'SONG', 'KEYB', 'SETUP', 'FX', 'TEMPO'] : ['KIT', 'SONG', 'KEYB', 'SETUP', 'SMPL', 'TEMPO']).forEach((s, i) => t(4 + (i % 3) * 7.8, 14 + Math.floor(i / 3) * 5.4, 6.4, 3.4, s));
    kn(6, 27, 11); lab(2, 39, 19, 2.2, 'LEVEL / DATA', 0.85, { center: 1, mute: 1 });
    a('screen', 30, 4.5, 28.5, 19, { scr: 1, fs: 1.3 });
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { const x = 63 + c * 8.6, y = 4 + r * 10; kn(x, y, 6.4); lab(x, y + 6.7, 6.4, 2, 'ABCDEFGH'[r * 4 + c], 0.8, { center: 1, mute: 1 }); }
    (syn ? ['TRIG', 'SYN', 'FLTR', 'AMP', 'FX', 'MOD'] : ['TRIG', 'SRC', 'FLTR', 'AMP', 'FX', 'MOD']).forEach((s, i) => t(30 + i * 11, 28, 9, 3.6, s));
    t(30, 39, 6.4, 3.6, 'TRK', { hlAll: 1 }); t(38, 39, 6.4, 3.6, 'PTN');
    t(48, 39, 6.4, 3.6, 'REC', { acc: '#b5533f' }); t(55.6, 39, 6.4, 3.6, 'PLAY'); t(63.2, 39, 6.4, 3.6, 'STOP');
    t(71.5, 42, 5.2, 3.6, 'NO'); t(77.5, 42, 5.2, 3.6, 'YES');
    btn(88.6, 37.4, 4.2, 3.4); btn(83.6, 42, 4.2, 3.6); btn(88.6, 42, 4.2, 3.6); btn(93.6, 42, 4.2, 3.6);
    for (let i = 0; i < 8; i++) btn(54 + i * 3.2, 51, 1.5, 1.5, { circ: 1, acc: i === 0 ? '#b5533f' : undefined, nob: i === 0 ? 1 : 0 });
    t(82, 50, 9, 3.4, 'PAGE');
    t(3, 57, 8, 8, 'FUNC', { acc: '#c99a3e', nob: 1 });
    keyRow(14, 57, 5.125, 4.5, 8, { r: 0.6 }); nums(14, 66.5, 5.125, 4.5, 1, ((d.track || {})[L] ?? 0) - 1);
  } else if (id === 'ANALOG RYTM MKII') {
    H = 52; R = 1.5;
    brand('ELEKTRON', 'ANALOG RYTM MKII', 1.3, 1.9);
    kn(3, 13, 5); kn(10, 13, 5);
    a('screen', 38, 4, 22, 14, { scr: 1, fs: 1.2 });
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) kn(64 + c * 8.4, 4 + r * 8, 5.5);
    ['BD', 'SD', 'RS', 'CP', 'BT', 'LT', 'MT', 'HT', 'CH', 'OH', 'CY', 'CB'].forEach((n, i) => a('inst', 3 + (i % 6) * 8.5, 22 + Math.floor(i / 6) * 8.5, 7, 7, { text: n, fs: 1.2, r: 0.8, corner: 1, hl: i === ((d.track || {})[L] ?? 0) - 1 }));
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) btn(58 + c * 9, 23 + r * 6, 6.5, 3.5);
    keyRow(3, 41, 5.875, 5, 5, { r: 0.5 }); nums(3, 46.6, 5.875, 5, 1.05);
  }
  return { P, H, R };
}
