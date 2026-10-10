import type { LaneKey, Pattern } from '../data/library.ts';

// Simple synthesized drum voices — enough to hear the groove, not a sampler.
let ctx: AudioContext | null = null;
let noise: AudioBuffer;
let master: GainNode | null = null;

const VOL_KEY = 'bm-vol';
let vol = (() => { try { const v = parseFloat(localStorage.getItem(VOL_KEY) ?? ''); return isNaN(v) ? 0.8 : v; } catch { return 0.8; } })();

/** Master volume, 0–1 (remembered). The gain is squared so the slider fades evenly to the ear. */
export const getVolume = () => vol;
export function setVolume(v: number): void {
  vol = Math.max(0, Math.min(1, v));
  try { localStorage.setItem(VOL_KEY, String(vol)); } catch { /* storage unavailable */ }
  if (ctx && master) master.gain.setTargetAtTime(vol * vol, ctx.currentTime, 0.02);
}

export function audio(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain(); master.gain.value = vol * vol; master.connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

export type Dynamic = 'accent' | 'normal' | 'ghost';

/**
 * A kit only re-voices the core four; extra percussion sounds the same in every kit.
 * k = [startHz, endHz, sweep, decay, gain] · s = [filter, hz, decay, toneHz, gain] · h/o = [hpHz, decay, gain] · lp = output lowpass
 */
export interface Kit {
  id: string; name: string;
  k: [number, number, number, number, number];
  s: [BiquadFilterType, number, number, number, number];
  h: [number, number, number]; o: [number, number, number];
  lp?: number;
}

export const KITS: Kit[] = [
  { id: '808', name: '808', k: [120, 48, 0.09, 0.9, 1], s: ['bandpass', 1500, 0.18, 185, 0.55], h: [8000, 0.035, 0.22], o: [8000, 0.38, 0.22] },
  { id: '909', name: '909', k: [190, 52, 0.06, 0.38, 1], s: ['highpass', 1800, 0.2, 210, 0.5], h: [9000, 0.05, 0.28], o: [8500, 0.28, 0.26] },
  { id: 'acoustic', name: 'Acoustic', k: [110, 58, 0.08, 0.26, 0.95], s: ['bandpass', 2400, 0.22, 230, 0.6], h: [7000, 0.06, 0.24], o: [6500, 0.5, 0.2] },
  { id: 'dusty', name: 'Dusty', k: [105, 46, 0.1, 0.3, 1], s: ['bandpass', 1400, 0.14, 190, 0.7], h: [5000, 0.035, 0.3], o: [4500, 0.3, 0.24], lp: 3800 },
  { id: 'dancehall', name: 'Dancehall', k: [160, 55, 0.05, 0.2, 1], s: ['bandpass', 3200, 0.09, 260, 0.6], h: [9500, 0.028, 0.26], o: [9000, 0.15, 0.24] }
];

const GENRE_KIT: Record<string, string> = {
  Trap: '808', Electro: '808', Dubstep: '808', Grime: '808',
  House: '909', Techno: '909', Electronic: '909', Club: '909', 'UK Garage': '909',
  'Hip-Hop': 'dusty', 'Lo-Fi': 'dusty', Breakbeat: 'dusty', Jungle: 'dusty', 'Drum & Bass': 'dusty',
  Reggaeton: 'dancehall', Dancehall: 'dancehall'
};

/** The kit a beat starts on: picked by genre, Acoustic for everything else. */
export const kitFor = (p: Pattern): Kit => KITS.find(k => k.id === (GENRE_KIT[p.genre] || 'acoustic'))!;
export const kitById = (id: string | null): Kit | undefined => KITS.find(k => k.id === id);

export function hit(key: LaneKey, dynamic: Dynamic = 'normal', kit: Kit = KITS[2]): void {
  const c = audio(), out = master!, t = c.currentTime, g = c.createGain();
  if (kit.lp) {
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = kit.lp;
    g.connect(lp); lp.connect(out);
  } else g.connect(out);
  const vel = dynamic === 'accent' ? 1.45 : dynamic === 'ghost' ? 0.32 : 1.0;
  const env = (peak: number, dur: number, gain = g) => {
    gain.gain.setValueAtTime(peak * vel, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (dynamic === 'ghost' ? dur * 0.75 : dur));
  };
  const noiseThrough = (type: BiquadFilterType, freq: number, dur: number, offsets = [0]) => {
    const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.connect(g);
    offsets.forEach(dt => { const n = c.createBufferSource(); n.buffer = noise; n.connect(f); n.start(t + dt); n.stop(t + dt + dur + 0.02); });
  };

  if (key === 'k') {
    const [from, to, sweep, dur, gain] = kit.k, o = c.createOscillator();
    o.frequency.setValueAtTime(dynamic === 'accent' ? from * 1.1 : from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + sweep);
    env(gain, dur); o.connect(g); o.start(t); o.stop(t + dur + 0.02);
  } else if (key === 's') {
    const [type, hz, dur, tone, gain] = kit.s, o = c.createOscillator(), og = c.createGain();
    noiseThrough(type, dynamic === 'ghost' ? hz * 0.8 : hz, dur); env(gain, dur);
    // The tone body goes through the kit's lowpass too, so Dusty stays dusty.
    o.frequency.value = tone; env(gain * 0.6, 0.07, og);
    o.connect(og); og.connect(kit.lp ? g : out); o.start(t); o.stop(t + 0.08);
  } else if (key === 'h' || key === 'o') {
    const [hz, dur, gain] = kit[key];
    noiseThrough('highpass', hz, dur); env(gain, dur);
  } else if (key === 't' || key === 'b') {
    const o = c.createOscillator(), f0 = key === 't' ? 170 : 420;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f0 * 0.6, t + 0.2);
    env(0.7, key === 't' ? 0.35 : 0.18); o.connect(g); o.start(t); o.stop(t + 0.4);
  } else if (key === 'w' || key === 'r') {
    (key === 'w' ? [540, 800] : [1700]).forEach(fr => { const o = c.createOscillator(); o.type = 'square'; o.frequency.value = fr; o.connect(g); o.start(t); o.stop(t + 0.3); });
    env(key === 'w' ? 0.12 : 0.2, key === 'w' ? 0.25 : 0.03);
  } else if (key === 'c') {
    noiseThrough('bandpass', 1200, 0.2, [0, 0.01, 0.02]); env(0.5, 0.18);
  } else {
    const dur = key === 'z' ? 0.06 : 1.1;
    noiseThrough('highpass', key === 'z' ? 6000 : 5000, dur); env(key === 'z' ? 0.15 : 0.25, dur);
  }
}

/** A short kick-hat-snare-hat so you can hear a kit while stopped. */
export function preview(kit: Kit): void {
  audio().resume();
  hit('k', 'normal', kit);
  setTimeout(() => hit('h', 'normal', kit), 110);
  setTimeout(() => hit('s', 'normal', kit), 220);
  setTimeout(() => hit('h', 'normal', kit), 330);
}

/** Count-in click: higher on the first beat of the bar. */
export function click(high: boolean): void {
  const c = audio(), t = c.currentTime, o = c.createOscillator(), g = c.createGain();
  o.type = 'square'; o.frequency.value = high ? 1760 : 1175;
  g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  o.connect(g); g.connect(master!); o.start(t); o.stop(t + 0.06);
}
