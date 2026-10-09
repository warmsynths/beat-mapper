import type { LaneKey } from '../data/library.ts';

// Simple synthesized drum voices — enough to hear the groove, not a sampler.
let ctx: AudioContext | null = null;
let noise: AudioBuffer;

export function audio(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

export type Dynamic = 'accent' | 'normal' | 'ghost';

export function hit(key: LaneKey, dynamic: Dynamic = 'normal'): void {
  const c = audio(), t = c.currentTime, g = c.createGain();
  g.connect(c.destination);
  const vel = dynamic === 'accent' ? 1.25 : dynamic === 'ghost' ? 0.35 : 1.0;
  const env = (peak: number, dur: number) => {
    g.gain.setValueAtTime(peak * vel, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + (dynamic === 'ghost' ? dur * 0.75 : dur));
  };
  const noiseThrough = (type: BiquadFilterType, freq: number, dur: number, offsets = [0]) => {
    const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.connect(g);
    offsets.forEach(dt => { const n = c.createBufferSource(); n.buffer = noise; n.connect(f); n.start(t + dt); n.stop(t + dt + dur + 0.02); });
  };

  if (key === 'k') {
    const o = c.createOscillator();
    o.frequency.setValueAtTime(dynamic === 'accent' ? 165 : 150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    env(0.9, 0.32); o.connect(g); o.start(t); o.stop(t + 0.33);
  } else if (key === 't' || key === 'b') {
    const o = c.createOscillator(), f0 = key === 't' ? 170 : 420;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f0 * 0.6, t + 0.2);
    env(0.7, key === 't' ? 0.35 : 0.18); o.connect(g); o.start(t); o.stop(t + 0.4);
  } else if (key === 'w' || key === 'r') {
    (key === 'w' ? [540, 800] : [1700]).forEach(fr => { const o = c.createOscillator(); o.type = 'square'; o.frequency.value = fr; o.connect(g); o.start(t); o.stop(t + 0.3); });
    env(key === 'w' ? 0.12 : 0.2, key === 'w' ? 0.25 : 0.03);
  } else if (key === 'c') {
    noiseThrough('bandpass', 1200, 0.2, [0, 0.01, 0.02]); env(0.5, 0.18);
  } else if (key === 'z' || key === 'y') {
    const dur = key === 'z' ? 0.06 : 1.1;
    noiseThrough('highpass', key === 'z' ? 6000 : 5000, dur); env(key === 'z' ? 0.15 : 0.25, dur);
  } else {
    const dur = key === 's' ? 0.16 : key === 'h' ? 0.045 : 0.28;
    noiseThrough(key === 's' ? 'bandpass' : 'highpass', key === 's' ? (dynamic === 'ghost' ? 1400 : 1800) : 7000, dur);
    env(key === 's' ? 0.6 : 0.28, dur);
  }
}
