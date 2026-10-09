import { drawDevice } from '../data/drawings.ts';
import type { Device, Inst, Lanes } from '../data/library.ts';

/** Colours the panel is drawn in, taken from the active theme. */
export interface PanelTheme {
  stroke: string; faint: string; off: string; ink: string; mute: string;
  screen: string; screenFg: string; onFg: string; ring: string;
}

/** One absolutely-positioned element of the rendered panel, in px. */
export interface PanelBox {
  l: string; t: string; w: string; h: string; bd: string; r: string; bg: string; fg: string;
  fs: string; fw: number; text: string; jc: string; ai: string; pad: string; ring: string;
}

export interface PanelLayout { parts: PanelBox[]; vw: string; vh: string; cropR: string }

const p2 = (n: number) => String(n).padStart(2, '0');

/**
 * Lays the whole machine panel out to fit w×h, with the active lane's steps
 * lit in `color` and the playhead ringed.
 */
export function layoutPanel(o: { dev: Device; layer: Inst; pat: Lanes; step: number; th: PanelTheme; w: number; h: number; color: string; maxK: number }): PanelLayout {
  const { dev, layer, pat, step, th, w, h, color } = o;
  const dg = drawDevice(dev, layer.key);
  const k = Math.max(0.5, Math.min((w || 300) / 100, (h || 300) / dg.H, o.maxK));
  const U = (v: number) => (v * k).toFixed(2) + 'px';
  const scr = step >= 0 ? 'STEP ' + p2(step + 1) : (dev.map[layer.key] || '—') + ' · ' + layer.label;
  const parts = dg.P.map(p => {
    const r: PanelBox = { l: U(p.x), t: U(p.y), w: U(p.w), h: U(p.h), bd: '1px solid ' + th.stroke, r: p.circ || p.t === 'knob' ? '50%' : U(p.r ?? 0.5), bg: 'transparent', fg: th.ink, fs: U(p.fs || 1.4), fw: p.fw || 400, text: p.text || '', jc: 'center', ai: 'center', pad: '0', ring: 'none' };
    const hl = () => { r.bg = color; r.fg = th.onFg; r.bd = '1px solid ' + color; };
    if (p.t === 'label') { r.bd = 'none'; r.jc = p.right ? 'flex-end' : p.center ? 'center' : 'flex-start'; r.fg = p.mute ? th.mute : th.ink; if (p.scr) r.text = scr; if (p.hl) { hl(); r.r = U(0.3); } }
    else if (p.t === 'screen') { r.bg = th.screen; r.fg = th.screenFg; r.bd = '1px solid ' + th.screen; r.r = U(0.6); r.text = p.scr2 ? 'GROUP A · ' + dev.map[layer.key] : p.scrS ? '' : scr; r.pad = '0 ' + U(1); }
    else if (p.t === 'btn') { r.bd = '1px solid ' + th.faint; if (p.acc) { r.bg = th.faint; r.bd = 'none'; } if (p.nob) r.bd = 'none'; if (p.hlAll) hl(); }
    else if (p.t === 'knob') { r.bd = '1px solid ' + th.faint; }
    else if (p.t === 'grille') { r.bd = '1px dashed ' + th.faint; r.r = p.circ ? '50%' : U(0.6); }
    else if (p.t === 'fader') { r.bd = '1px solid ' + th.faint; r.r = U(0.6); if (p.hl) r.bg = color; }
    else if (p.t === 'inst') { r.r = U(p.r ?? 0.4); if (p.corner) { r.ai = 'flex-start'; r.jc = 'flex-start'; r.pad = U(0.5) + ' ' + U(0.8); } if (p.soft || p.dim) { r.bd = '1px solid ' + th.faint; r.fg = th.mute; } if (p.hl) hl(); }
    else if (p.t === 'key') {
      const on = pat[layer.key][p.step!] === 'x';
      r.bg = on ? color : th.off; r.bd = '1px solid ' + (on ? color : th.stroke);
      r.ring = p.step === step ? '0 0 0 2px ' + th.ring : 'none';
      r.text = String(p.step! + 1); r.fg = on ? th.onFg : th.mute; r.fw = on ? 700 : 400;
      r.fs = Math.max(9, Math.min(p.w, p.h) * k * 0.36).toFixed(1) + 'px';
    }
    return r;
  });
  return { parts, vw: U(100), vh: U(dg.H), cropR: U(dg.R) };
}
