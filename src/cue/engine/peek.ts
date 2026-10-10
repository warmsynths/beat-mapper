import { drawDevice } from '../data/drawings.ts';
import type { Device, LaneKey, Lanes } from '../data/library.ts';

/** What the Peek card shows: a machine, the lane whose steps are lit, and the playhead. w×h in CSS px. */
export interface Peek { dev: Device; lk: LaneKey; pat: Lanes; step: number; w: number; h: number; theme: string }

/** 8×8 ordered-dither (Bayer) thresholds, 0–63. */
const BAYER = (() => {
  let m = [[0]];
  for (let n = 1; n < 8; n *= 2) m = [...m.map(r => [...r.map(v => 4 * v), ...r.map(v => 4 * v + 2)]), ...m.map(r => [...r.map(v => 4 * v + 3), ...r.map(v => 4 * v + 1)])];
  return m;
})();
const DOT = 2;
const hexRGB = (v: string, f: string) => { v = v.trim(); if (!/^#[0-9a-f]{6}$/i.test(v)) v = f; return [1, 3, 5].map(i => parseInt(v.slice(i, i + 2), 16)); };

/**
 * Renders the machine as a greyscale shaded drawing plus a mask of the lit keys, then dithers it into
 * the theme's two tones (ink ground, cream ink) with lit parts in the accent. `prog` (0–1) dissolves it in.
 */
function draw(cv: HTMLCanvasElement, P: Peek, prog: number) {
  const w = Math.max(10, Math.round(P.w / DOT)), h = Math.max(10, Math.round(P.h / DOT));
  const dg = drawDevice(P.dev, P.lk), k = Math.min(w / 100, h / dg.H), ox = (w - 100 * k) / 2, oy = (h - dg.H * k) / 2;
  const mk = () => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c.getContext('2d', { willReadFrequently: true })!; };
  const g = mk(), m = mk(), X = (v: number) => ox + v * k, Y = (v: number) => oy + v * k;
  const gray = (v: number) => { const c = Math.round(Math.max(0, Math.min(1, v)) * 255); return `rgb(${c},${c},${c})`; };
  const rr = (c: CanvasRenderingContext2D, x: number, y: number, ww: number, hh: number, r: number) => { c.beginPath(); c.roundRect(X(x), Y(y), ww * k, hh * k, Math.min(r * k, ww * k / 2, hh * k / 2)); };
  const lin = (y: number, hh: number, a: number, b: number) => { const gr = g.createLinearGradient(0, Y(y), 0, Y(y + hh)); gr.addColorStop(0, gray(a)); gr.addColorStop(1, gray(b)); return gr; };

  rr(g, 0, 0, 100, dg.H, dg.R || 2); g.fillStyle = lin(0, dg.H, 0.42, 0.12); g.fill();
  rr(g, 0.4, 0.4, 99.2, dg.H - 0.8, dg.R || 2); g.strokeStyle = gray(0.62); g.lineWidth = 1; g.stroke();
  dg.P.forEach(p => {
    const lit = p.t === 'key' ? P.pat[P.lk][p.step!] !== '.' : !!(p.hl || p.hlAll);
    const now = p.t === 'key' && p.step === P.step;
    const paint = (c: CanvasRenderingContext2D, fill: string | CanvasGradient) => {
      c.fillStyle = fill;
      if (p.circ || p.t === 'knob') { c.beginPath(); c.ellipse(X(p.x + p.w / 2), Y(p.y + p.h / 2), p.w * k / 2, p.h * k / 2, 0, 0, 7); }
      else rr(c, p.x, p.y, p.w, p.h, p.r ?? 0.6);
      c.fill();
    };
    const text = (c: CanvasRenderingContext2D, s: string, v: number) => {
      const fs = (p.fs || 1.4) * k;
      if (fs < 4 || !s) return;
      c.fillStyle = gray(v); c.font = `700 ${fs}px "Host Grotesk",sans-serif`; c.textBaseline = 'middle';
      c.textAlign = p.right ? 'right' : p.center || p.t !== 'label' ? 'center' : 'left';
      c.fillText(s, p.t === 'label' && !p.center ? (p.right ? X(p.x + p.w) : X(p.x)) : X(p.x + p.w / 2), Y(p.y + p.h / 2));
    };
    if (p.t === 'knob') {
      const cx = X(p.x + p.w * 0.38), cy = Y(p.y + p.h * 0.32), rg = g.createRadialGradient(cx, cy, 0, cx, cy, Math.max(p.w, p.h) * k * 0.7);
      rg.addColorStop(0, gray(0.95)); rg.addColorStop(1, gray(0.08)); paint(g, rg);
    } else if (p.t === 'grille') {
      paint(g, gray(0.06)); g.fillStyle = gray(0.5);
      const st = Math.max(1.2, 3 / k);
      for (let yy = p.y + st / 2; yy < p.y + p.h; yy += st) for (let xx = p.x + st / 2; xx < p.x + p.w; xx += st) g.fillRect(X(xx), Y(yy), Math.max(1, k * 0.35), Math.max(1, k * 0.35));
    } else if (p.t === 'screen') { paint(g, gray(0.03)); text(g, P.dev.map[P.lk] || '', 0.85); }
    else if (p.t === 'fader') { paint(g, gray(0.05)); g.fillStyle = gray(0.85); g.fillRect(X(p.x - p.w * 0.4), Y(p.y + p.h * 0.45), p.w * k * 1.8, Math.max(2, p.h * k * 0.12)); }
    else if (p.t === 'label') text(g, p.scr ? (P.dev.map[P.lk] || '') : p.text || '', p.mute ? 0.5 : 0.8);
    else {
      const base = p.t === 'key' ? [0.62, 0.32] : p.t === 'btn' ? (p.acc ? [0.6, 0.4] : [0.45, 0.25]) : (p.soft || p.dim) ? [0.3, 0.18] : [0.55, 0.3];
      paint(g, lin(p.y, p.h, base[0], base[1]));
      if (now) { g.lineWidth = 2; g.strokeStyle = gray(1); g.stroke(); }
      if (p.text && p.t !== 'key') text(g, p.text, 0.05);
    }
    // Ghost notes go into the mask at 40%, which dithers them in at reduced brightness.
    if (lit && p.t !== 'label') { paint(m, p.t === 'key' && P.pat[P.lk][p.step!] === 'g' ? 'rgba(255,255,255,0.4)' : '#fff'); if (now) { m.lineWidth = 2; m.strokeStyle = '#fff'; m.stroke(); } }
  });

  const cs = getComputedStyle(document.documentElement);
  const BG = hexRGB(cs.getPropertyValue('--ink'), '#150E18'), FG = hexRGB(cs.getPropertyValue('--fg'), '#F7EADF'), AC = hexRGB(cs.getPropertyValue('--acc'), '#FFB38A');
  const gd = g.getImageData(0, 0, w, h).data, md = m.getImageData(0, 0, w, h).data;
  cv.width = w; cv.height = h; cv.style.width = w * DOT + 'px'; cv.style.height = h * DOT + 'px';
  const ctx = cv.getContext('2d')!, out = ctx.createImageData(w, h), o = out.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, t = (BAYER[y & 7][x & 7] + 0.5) / 64, lum = gd[i] / 255 * (gd[i + 3] / 255), lv = md[i + 3] / 255, lit = lv > 0.2;
    // A second, offset Bayer pass decides which dots have dissolved in so far.
    const vis = (BAYER[(y + 3) & 7][(x + 5) & 7] + 0.5) / 64 < prog * 1.02, on = vis && (lit ? t < 0.82 * lv : lum > t);
    const c = on ? (lit ? AC : FG) : BG;
    o[i] = c[0]; o[i + 1] = c[1]; o[i + 2] = c[2]; o[i + 3] = 255;
  }
  ctx.putImageData(out, 0, 0);
}

type PeekCanvas = HTMLCanvasElement & { _pk?: Peek; _key?: string; _dev?: string; _raf?: number; _anim?: boolean };

/** Draws `pk` into the canvas when anything visible changed; a newly shown machine dissolves in over ~0.5s. */
export function peekDraw(el: PeekCanvas, pk: Peek) {
  const key = [pk.dev.id, pk.lk, pk.step, pk.w, pk.h, pk.theme, pk.pat[pk.lk]].join('|');
  el._pk = pk;
  if (el._key === key) return;
  el._key = key;
  if (el._dev !== pk.dev.id) {
    el._dev = pk.dev.id; el._anim = true;
    cancelAnimationFrame(el._raf ?? 0);
    const t0 = performance.now();
    const f = (now: number) => {
      const p = Math.min(1, (now - t0) / 520);
      draw(el, el._pk!, p);
      if (p < 1) el._raf = requestAnimationFrame(f); else el._anim = false;
    };
    el._raf = requestAnimationFrame(f);
  } else if (!el._anim) requestAnimationFrame(() => draw(el, el._pk!, 1));
}
