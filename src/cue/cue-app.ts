import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { ref } from 'lit/directives/ref.js';
import { FAM, INST, LIB, partData, type LaneKey, type PartId } from './data/library.ts';
import { audio, hit, kitById, kitFor, KITS, preview } from './engine/audio.ts';
import { layoutPanel, type PanelTheme } from './engine/panel.ts';
import { bpmOf, clamp, commitTempo, derive, initState, saveDevice, selectPattern, selected, tick, titleCase, toggleBeat, type Derived, type Mode, type State } from './model.ts';
import { applyTheme, storedTheme, THEMES } from './themes.ts';

const CREAM = 'var(--fg)', INK = 'var(--ink)', ACC = 'var(--acc)', MUTED = 'var(--mute)';
const TW = "'Tilt Warp',sans-serif", HG = "'Host Grotesk',sans-serif";
const mix = (c: string, pct: number) => `color-mix(in srgb,${c} ${pct}%,transparent)`;

/** Each drum's notation shape: colour, corner radius and clip-path. */
const SHP: Record<LaneKey, { c: string; r: string; clip: string }> = {
  k: { c: 'var(--kick)', r: '50%', clip: 'none' },
  s: { c: 'var(--snare)', r: '0', clip: 'none' },
  h: { c: INK, r: '0', clip: 'polygon(50% 0,100% 100%,0 100%)' },
  o: { c: 'var(--open)', r: '0', clip: 'polygon(50% 0,100% 100%,0 100%)' },
  c: { c: ACC, r: '0', clip: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' },
  r: { c: 'var(--snareL)', r: '2px', clip: 'inset(30% 0)' },
  t: { c: 'var(--open)', r: '50%', clip: 'none' },
  b: { c: 'var(--snareL)', r: '50%', clip: 'none' },
  w: { c: 'var(--open)', r: '3px', clip: 'none' },
  z: { c: CREAM, r: '999px', clip: 'inset(25% 0 round 999px)' },
  y: { c: ACC, r: '0', clip: 'polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)' }
};
/** Colour a lane is drawn in on the dark ground (hats and snares need lighter tones there). */
const laneColor = (k: LaneKey) => k === 'h' ? ACC : k === 's' ? 'var(--snareL)' : SHP[k].c;
const VERB: Record<string, string> = { sp: 'Hold pad', tr: 'Press', po: 'Hold', ct: 'Pick track', dt: 'Pick track' };
const SUB = ['', 'e', '&', 'a'];
const ORD = ['First', 'Then', 'Then', 'Last'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
const PART_LABEL: Record<PartId, [string, string]> = { MAIN: ['Main', 'Main groove'], VAR: ['Var', 'Variation bar'], FILL: ['Fill', 'Fill bar'] };
const PANEL_THEME: PanelTheme = { stroke: mix(CREAM, 55), faint: mix(CREAM, 25), off: 'transparent', ink: CREAM, mute: mix(CREAM, 75), screen: INK, screenFg: CREAM, onFg: INK, ring: ACC };

type Box = { w: number; h: number };
type BoxName = 'stage' | 'sheet' | 'draw';

/** `?view=mobile` pins the shell to a 390×844 phone frame for previewing on desktop. */
const MOBILE_PREVIEW = new URLSearchParams(location.search).get('view') === 'mobile';

@customElement('cue-app')
export class CueApp extends LitElement {
  @state() private s: State = initState(storedTheme());
  @state() private vw = innerWidth;
  @state() private vh = innerHeight;
  @state() private box: Partial<Record<BoxName, Box>> = {};

  private timer = 0;
  private els: Partial<Record<BoxName, Element>> = {};
  private ro = new ResizeObserver(() => this.measure());
  private focusSearch = false;

  private set(patch: Partial<State>, restart = false) {
    this.s = { ...this.s, ...patch };
    if (restart && this.s.playing) this.start();
  }

  // ---- lifecycle -------------------------------------------------------

  connectedCallback() {
    super.connectedCallback();
    applyTheme(this.s.theme);
    addEventListener('resize', this.onResize);
    addEventListener('keydown', this.onKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.timer);
    this.ro.disconnect();
    removeEventListener('resize', this.onResize);
    removeEventListener('keydown', this.onKey);
  }

  protected updated() {
    if (this.focusSearch) {
      this.focusSearch = false;
      this.renderRoot.querySelector<HTMLInputElement>('#q')?.focus();
    }
  }

  private onResize = () => { this.vw = innerWidth; this.vh = innerHeight; };

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return this.set({ search: false, rack: false, themes: false, info: false, kitMenu: false });
    const t = (e.composedPath()[0] as HTMLElement | undefined)?.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'BUTTON') return;
    if (e.key === ' ') { e.preventDefault(); this.toggle(); }
  };

  /** ref() callback factory: observes the element and records its client size. */
  private track = (name: BoxName) => (el?: Element) => {
    const prev = this.els[name];
    if (prev === el) return;
    if (prev) this.ro.unobserve(prev);
    this.els[name] = el;
    if (el) this.ro.observe(el);
  };

  private measure() {
    const box: Partial<Record<BoxName, Box>> = {};
    let diff = false;
    (Object.keys(this.els) as BoxName[]).forEach(k => {
      const el = this.els[k];
      if (!el || !el.isConnected) return;
      const b = { w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) }, o = this.box[k];
      box[k] = b;
      if (!o || o.w !== b.w || o.h !== b.h) diff = true;
    });
    if (diff) this.box = { ...this.box, ...box };
  }

  // ---- playback --------------------------------------------------------

  private start() {
    audio().resume();
    clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      const base = selected(this.s), next = tick(this.s), d = partData(base, next.part, next.pg);
      const kit = kitById(this.s.kit) || kitFor(base);
      INST.forEach(i => {
        const ch = d[i.key][next.step];
        if (ch === 'X') hit(i.key, 'accent', kit);
        else if (ch === 'x') hit(i.key, 'normal', kit);
        else if (ch === 'g') hit(i.key, 'ghost', kit);
      });
      this.set(next);
    }, 60000 / bpmOf(this.s) / 4);
    this.set({ playing: true });
  }

  private stop() { clearInterval(this.timer); this.set({ playing: false, step: -1 }); }
  private toggle() { if (this.s.playing) this.stop(); else this.start(); }

  // ---- actions ---------------------------------------------------------

  private select(id: string) { this.set(selectPattern(id), true); }
  private openSearch() { this.focusSearch = true; this.set({ search: true, rack: false, themes: false, kitMenu: false }); }
  private setMode(m: Mode) { this.set({ mode: m, step: -1 }, true); }
  private setPart(id: PartId) { this.set({ part: id, chain: false, bar: 0, pg: 0, done: {} }); }
  private setPage(n: number) { this.set({ pg: n, chain: false, bar: 0, done: {} }); }
  private pickDevice(id: string) { saveDevice(id); this.set({ device: id, rack: false, done: {} }); }
  private pickTheme(id: string) { applyTheme(id, true); this.set({ theme: id }); }
  private nudgeTempo(d: number) { this.set({ tempo: clamp(bpmOf(this.s) + d, 40, 220), tempoDraft: null }, true); }
  private commitTempo() { if (this.s.tempoDraft !== null) this.set(commitTempo(this.s.tempoDraft), true); }
  private onTempoKey(e: KeyboardEvent) {
    const el = e.target as HTMLInputElement;
    if (e.key === 'Enter') el.blur();
    if (e.key === 'Escape') { e.stopPropagation(); this.set({ tempoDraft: null }); el.blur(); }
  }
  private toggleKitMenu() { this.set({ kitMenu: !this.s.kitMenu, rack: false, search: false, themes: false, info: false }); }
  /** Picks a kit; while stopped, plays a short groove so you can hear it. */
  private pickKit(id: string) {
    this.set({ kit: id, kitMenu: false });
    if (!this.s.playing) preview(kitById(id)!);
  }

  /** Desktop "Done, next" — ticks the lane off, and after the last lane moves on to Play. */
  private next(x: Derived) {
    const done = { ...this.s.done, [x.layer.key]: true };
    if (x.last) this.set({ done, mode: 'play', step: -1 }, true);
    else this.set({ done, layer: x.lanes[x.li + 1].key });
  }

  // ---- render ----------------------------------------------------------

  render() {
    const s = this.s, x = derive(s);
    const W = MOBILE_PREVIEW ? Math.min(390, this.vw) : this.vw, H = MOBILE_PREVIEW ? Math.min(844, this.vh) : this.vh;
    const compact = W < 760, prog = s.mode === 'program';
    const shell = MOBILE_PREVIEW ? `width:${W}px;height:${H}px;` : 'width:100%;height:100%;';

    return html`
      <div class="frame">
        <div class="shell" style=${shell}>
          ${this.renderHeader(x, compact, H)}
          ${this.renderNav(x, compact, prog)}
          <div class="stage" ${ref(this.track('stage'))}
            style="padding:${compact ? (prog ? '12px 20px 6px' : '12px 20px 14px') : '20px 40px 26px'};">
            ${prog
              ? compact ? this.renderProgramMobile(x) : this.renderProgramDesktop(x)
              : this.renderPlay(x, compact)}
          </div>
          ${this.renderFooter(x, compact, prog)}
          ${s.search ? this.renderSearch(x, compact) : nothing}
          ${s.themes ? this.renderThemes(compact) : nothing}
          ${s.rack ? this.renderRack(x, compact) : nothing}
          ${s.info ? this.renderInfo(x, compact) : nothing}
        </div>
      </div>
    `;
  }

  private renderHeader(x: Derived, compact: boolean, H: number) {
    const s = this.s, hb = compact ? 40 : 46;
    const pill = (on: boolean) => `background:${on ? CREAM : 'transparent'};color:${on ? INK : CREAM};border-color:${on ? CREAM : mix(CREAM, 30)};`;
    return html`
      <header style="gap:${compact ? '6px' : H < 700 ? '8px' : '12px'} ${compact ? 8 : 14}px;padding:${compact ? '12px 20px 8px' : H < 700 ? '18px 40px 12px' : '28px 40px 18px'};">
        <div class="title-col" style="flex:${compact ? '1 1 100%' : '1'};">
          <button class="title" title="Find a beat" @click=${() => this.openSearch()}>
            <span class="name-row" style="font-size:${compact ? 24 : H < 700 ? 40 : 56}px;">
              <span class="name">${x.base.name}</span>
              <svg class="chev" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 1.5 6 6l4.5-4.5"></path></svg>
            </span>
            ${compact || H < 640 ? nothing : html`<span class="artist">${x.base.artist} — <u>find another beat</u></span>`}
          </button>
        </div>
        <div class="kit-wrap">
          <button class="kit-pill" title="Change drum kit" aria-haspopup="menu" aria-expanded=${s.kitMenu ? 'true' : 'false'}
            style="height:${hb}px;padding:0 ${compact ? 12 : 16}px;background:${s.kitMenu ? CREAM : 'transparent'};color:${s.kitMenu ? INK : CREAM};"
            @click=${() => this.toggleKitMenu()}>
            ${compact ? nothing : html`<span class="kit-lbl">Kit</span>`}${x.kit.name} <span class="caret">▾</span>
          </button>
          ${s.kitMenu ? html`
            <div class="kit-scrim" @click=${() => this.toggleKitMenu()}></div>
            <div class="kit-menu" role="menu" style="${compact ? 'left:0;' : 'right:0;'}">
              ${KITS.map(k => {
                const on = k.id === x.kit.id;
                return html`<button role="menuitemradio" aria-checked=${on ? 'true' : 'false'} style="background:${on ? mix(INK, 8) : 'transparent'};" @click=${() => this.pickKit(k.id)}>
                  <span class="kit-name">${k.name}${k.id === x.suits.id ? html`<small>suits ${x.base.genre}</small>` : nothing}</span>
                  <span>${on ? '✓' : ''}</span>
                </button>`;
              })}
            </div>` : nothing}
        </div>
        <button class="device-pill" style="height:${hb}px;" title="Choose your machine"
          @click=${() => this.set({ rack: !s.rack, rackQ: '', search: false, themes: false, info: false, kitMenu: false })}>
          ${compact ? x.dev.short : x.dev.id} <span class="caret">▾</span>
        </button>
        <button class="info-btn" style="width:${hb}px;height:${hb}px;" title="About this beat" aria-label="About this beat"
          @click=${() => this.set({ info: !s.info, search: false, rack: false, themes: false, kitMenu: false })}>i</button>
        <button class="theme-btn" style="width:${hb}px;height:${hb}px;" title="Change theme" aria-label="Change theme"
          @click=${() => this.set({ themes: !s.themes, search: false, rack: false, info: false, kitMenu: false })}><span class="swatch"></span></button>
        <div class="controls">
          <div class="seg">
            ${x.parts.map(id => {
              const on = s.part === id;
              return html`<button title=${PART_LABEL[id][1]} @click=${() => this.setPart(id)}
                style="height:${compact ? 26 : 30}px;background:${on ? CREAM : 'transparent'};color:${on ? INK : MUTED};">${PART_LABEL[id][0]}</button>`;
            })}
          </div>
          ${x.base.bars ? this.barTabs(x, compact) : nothing}
          <button class="toggle" title="Loop main, main, variation, fill"
            style="height:${compact ? 30 : 34}px;${s.chain ? `background:${ACC};color:${INK};border-color:${ACC};` : pill(false)}"
            @click=${() => this.set({ chain: !s.chain, part: 'MAIN', bar: 0, pg: 0, done: {} }, true)}>
            ${compact ? 'Chain' : s.chain ? `Chain · bar ${s.bar + 1}/${x.chainN}` : `Chain ${x.chainN} bars`}
          </button>
          ${x.extraN > 0 ? html`
            <button class="toggle" title="Show extra percussion" style="height:${compact ? 30 : 34}px;${pill(s.perc)}"
              @click=${() => this.set({ perc: !s.perc })}>
              ${s.perc ? (compact ? '− Perc' : '− Percussion') : (compact ? '+ Perc ' : '+ Percussion · ') + x.extraN}
            </button>` : nothing}
        </div>
      </header>
    `;
  }

  /**
   * Bar 1 2 3 4 for multi-bar beats. Stays in place, dimmed and inert, on Var, Fill or Chain so the
   * content below doesn't jump.
   */
  private barTabs(x: Derived, compact: boolean) {
    const s = this.s, live = x.barsN > 1 && !s.chain, n = x.base.bars!.length + 1;
    return html`
      <div class="seg bars-seg" style="opacity:${live ? 1 : 0.35};pointer-events:${live ? 'auto' : 'none'};" aria-disabled=${live ? 'false' : 'true'}>
        <span class="seg-lbl">Bar</span>
        ${Array.from({ length: n }, (_, i) => {
          const on = live && s.pg === i, h = compact ? 26 : 30;
          return html`<button title="Bar ${i + 1} of ${n}" tabindex=${live ? 0 : -1} @click=${() => this.setPage(i)}
            style="height:${h}px;min-width:${h}px;padding:0 6px;background:${on ? CREAM : 'transparent'};color:${on ? INK : CREAM};">${i + 1}</button>`;
        })}
      </div>
    `;
  }

  private beatTabs(x: Derived) {
    const s = this.s, playBeat = x.step >= 0 ? x.step >> 2 : -1;
    const tabs = [0, 1, 2, 3].map(b => {
      const on = !x.allBeats && s.beats.includes(b);
      return { label: String(b + 1), title: `Practise beat ${b + 1}`, on, fs: 17, now: playBeat === b, click: () => this.set({ beats: toggleBeat(s.beats, b), step: -1 }) };
    });
    tabs.push({ label: 'all', title: 'Whole bar', on: x.allBeats, fs: 15, now: false, click: () => this.set({ beats: [0, 1, 2, 3], step: -1 }) });
    return tabs;
  }

  private renderNav(x: Derived, compact: boolean, prog: boolean) {
    const s = this.s, chip = compact ? 34 : 40;
    return html`
      <nav style="gap:${compact ? 20 : 32}px;padding:${compact ? '0 20px' : '0 40px'};">
        ${([['program', 'Program'], ['play', 'Play']] as [Mode, string][]).map(([m, label]) => html`
          <button class="mode" @click=${() => this.setMode(m)}
            style="height:${compact ? 40 : 60}px;font-size:${compact ? 19 : 30}px;border-bottom-color:${s.mode === m ? ACC : 'transparent'};color:${s.mode === m ? CREAM : MUTED};">${label}</button>`)}
        <span class="spacer"></span>
        ${!prog && !compact ? html`
          <div class="beat-tabs">
            ${this.beatTabs(x).map(b => html`<button class="beat" title=${b.title} @click=${b.click}
              style="min-width:${chip}px;height:${chip}px;font-size:${b.fs}px;background:${b.on ? CREAM : 'transparent'};color:${b.on ? INK : CREAM};box-shadow:${b.now ? `0 0 0 3px ${ACC}` : 'none'};">${b.label}</button>`)}
          </div>` : nothing}
      </nav>
    `;
  }

  // ---- Play: the score -------------------------------------------------

  private renderPlay(x: Derived, compact: boolean) {
    const B = this.s.beats, step = x.step, lanes = x.lanes;
    const sh = this.box.sheet || { w: 600, h: 400 }, nl = Math.max(1, lanes.length);
    const labW = compact ? 34 : 120, cg = compact ? 3 : 5, bgap = compact ? 8 : 18, lgap = compact ? 14 : 22;

    // Pick how many lines to wrap the focused beats onto: whichever gives the biggest cells.
    // Phones always stack one beat per line.
    let best: { n: number; bpl: number; cw: number; ch: number; cell: number } | null = null;
    for (const n of compact ? [B.length] : [1, 2, 4].filter(n => B.length % n === 0)) {
      const bpl = B.length / n, cols = bpl * 4, gaps = labW + cg * (cols + bpl * 2) + bgap * (bpl - 1);
      const cw = (sh.w - gaps) / cols, perLine = (sh.h - lgap * (n - 1)) / n - cg * nl;
      // The count row is 0.6 of a cell tall but never under 22px — budget for that floor on short screens.
      let chh = perLine / (nl + 0.6);
      if (chh * 0.6 < 22) chh = (perLine - 22) / nl;
      const cell = Math.min(cw, chh, 110);
      if (!best || cell > best.cell * 1.04) best = { n, bpl, cw: Math.min(cw, 120), ch: Math.min(chh, 96), cell };
    }
    const g = best!;
    const cw = Math.max(4, Math.floor(g.cw)), ch = Math.max(4, Math.floor(g.ch));
    const cntH = Math.floor(clamp(ch * 0.6, 22, 48)), ss = Math.floor(Math.min(cw, ch) * 0.52), br = Math.round(Math.min(cw, ch) * 0.22);
    const cols = [labW + 'px'];
    for (let b = 0; b < g.bpl; b++) { cols.push(`repeat(4,${cw}px)`); if (b < g.bpl - 1) cols.push(bgap - cg + 'px'); }
    const shape = (k: LaneKey, size: number, color = SHP[k].c, opacity = 1) =>
      html`<i class="shape" style="width:${size}px;height:${size}px;background:${color};border-radius:${SHP[k].r};clip-path:${SHP[k].clip};opacity:${opacity};"></i>`;

    const lines = Array.from({ length: g.n }, (_, l) => B.slice(l * g.bpl, (l + 1) * g.bpl));
    return html`
      ${compact ? html`
        <div class="beat-row">
          ${this.beatTabs(x).map(b => html`<button class="beat" title=${b.title} @click=${b.click}
            style="flex:1;height:40px;font-size:${b.fs}px;background:${b.on ? CREAM : 'transparent'};color:${b.on ? INK : CREAM};box-shadow:${b.now ? `0 0 0 3px ${ACC}` : 'none'};">${b.label}</button>`)}
        </div>` : nothing}
      <div class="sheet" ${ref(this.track('sheet'))} style="gap:${lgap}px;">
        ${lines.map(bs => html`
          <div class="score" style="grid-template-columns:${cols.join(' ')};grid-template-rows:${cntH}px repeat(${nl},${ch}px);gap:${cg}px;">
            <span></span>
            ${bs.map((b, bi) => html`
              ${[0, 1, 2, 3].map(j => {
                const now = b * 4 + j === step;
                return html`<span class="count" style="background:${now ? ACC : 'transparent'};color:${now ? INK : j === 0 ? CREAM : MUTED};font-family:${j === 0 ? TW : HG};font-weight:${j === 0 ? 400 : 600};font-size:${Math.round(j === 0 ? Math.min(cntH * 0.8, 40) : Math.min(cntH * 0.5, 18))}px;">${j === 0 ? b + 1 : SUB[j]}</span>`;
              })}
              ${bi < bs.length - 1 ? html`<span></span>` : nothing}`)}
            ${lanes.map(ln => html`
              <span class="lane-label" style="justify-content:${compact ? 'center' : 'flex-start'};padding:0 ${compact ? 0 : 4}px;font-size:${Math.round(Math.min(22, ch * 0.34))}px;">
                ${shape(ln.key, Math.round(Math.min(18, ch * 0.32)), ln.key === 'h' ? CREAM : ln.key === 's' ? 'var(--snareL)' : SHP[ln.key].c)}${compact ? '' : titleCase(ln.label)}
              </span>
              ${bs.map((b, bi) => html`
                ${[0, 1, 2, 3].map(j => {
                  const i = b * 4 + j, char = x.sel[ln.key][i], on = char !== '.', now = i === step;
                  const isAccent = char === 'X', isGhost = char === 'g';
                  const noteSize = Math.floor(now ? ss * 1.15 : isAccent ? ss * 1.15 : isGhost ? ss * 0.65 : ss);
                  return html`<span class="cell" style="position:relative;border-radius:${br}px;background:${on ? (isGhost ? mix(CREAM, 65) : CREAM) : now ? mix(ACC, 28) : mix(CREAM, 10)};box-shadow:${on && now ? `0 0 0 3px ${ACC}` : isAccent ? `0 0 0 2px ${ACC}` : 'none'};">
                    ${on ? shape(ln.key, noteSize, undefined, isGhost ? 0.7 : 1) : nothing}
                  </span>`;
                })}
                ${bi < bs.length - 1 ? html`<span></span>` : nothing}`)}`)}
          </div>`)}
      </div>
    `;
  }

  // ---- Program ---------------------------------------------------------

  /** The 16 keys to press, sized to fill the drawing area. */
  private keyGrid(x: Derived, compact: boolean, capOn: boolean) {
    const dw = this.box.draw || { w: 300, h: 200 }, gap = compact ? 6 : 10;
    const fit = (n: number) => Math.min((dw.w - gap * (n - 1)) / n, (dw.h - (capOn ? 30 : 0) - gap * (16 / n - 1)) / (16 / n));
    // Pad machines stay 4×4 when it's big enough; otherwise take whichever layout gives the biggest keys.
    const pads = x.dev.fam === 'sp' || x.dev.fam === 'po';
    const cols = pads && fit(4) >= 34 ? 4 : [4, 8, 16].reduce((a, n) => fit(n) > fit(a) * 1.08 ? n : a, 4);
    const size = Math.floor(clamp(fit(cols), 16, compact ? 120 : 110)), col = laneColor(x.layer.key);
    return html`
      <div class="keys" style="grid-template-columns:repeat(${cols},${size}px);gap:${gap}px;">
        ${Array.from({ length: 16 }, (_, i) => {
          const char = x.sel[x.layer.key][i];
          const on = char !== '.';
          const isAccent = char === 'X', isGhost = char === 'g';
          return html`<span class="key" style="position:relative;width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.26)}px;font-size:${Math.round(size * 0.38)}px;border-color:${on ? col : mix(CREAM, 18)};background:${on ? (isGhost ? mix(col, 55) : col) : mix(CREAM, 6)};color:${on ? INK : 'var(--mute2)'};box-shadow:${i === x.step ? `0 0 0 4px ${CREAM}` : isAccent ? `0 0 0 2px ${ACC}` : 'none'};">
            ${i + 1}${isAccent ? html`<small class="dyn-mark">▲</small>` : isGhost ? html`<small class="dyn-mark">°</small>` : nothing}
          </span>`;
        })}
      </div>
    `;
  }

  /** The whole machine, drawn in line-art with the lane's steps lit. */
  private machine(x: Derived, compact: boolean) {
    const dw = this.box.draw || { w: 300, h: 200 };
    const pv = layoutPanel({ dev: x.dev, layer: x.layer, pat: x.sel, step: x.step, th: PANEL_THEME, w: dw.w - 2, h: dw.h - 2, color: laneColor(x.layer.key), maxK: compact ? 10 : 8 });
    return html`
      <div class="panel" style="width:${pv.vw};height:${pv.vh};border-radius:${pv.cropR};">
        ${pv.parts.map(p => html`<span style="left:${p.l};top:${p.t};width:${p.w};height:${p.h};border:${p.bd};border-radius:${p.r};background:${p.bg};box-shadow:${p.ring};color:${p.fg};font-size:${p.fs};font-weight:${p.fw};align-items:${p.ai};justify-content:${p.jc};padding:${p.pad};">${p.text}</span>`)}
      </div>
    `;
  }

  private drumPills(x: Derived, desktop: boolean) {
    const s = this.s;
    return x.lanes.map(l => {
      const on = l === x.layer, S = SHP[l.key];
      const col = l.key === 'h' ? (on ? INK : CREAM) : l.key === 's' ? 'var(--snareL)' : S.c;
      const mark = s.done[l.key] ? '✓' : x.dev.map[l.key] ? '' : '–';
      return html`<button class=${desktop ? 'drum drum-d' : 'drum drum-m'} @click=${() => this.set({ layer: l.key })}
        style="background:${on ? CREAM : 'transparent'};color:${on ? INK : MUTED};${desktop ? `box-shadow:${on ? '0 6px 18px -8px rgba(0,0,0,0.6)' : 'none'};` : `border-color:${on ? CREAM : mix(CREAM, 22)};`}">
        <i class="shape" style="width:${desktop ? 12 : 10}px;height:${desktop ? 12 : 10}px;background:${col};border-radius:${S.r};clip-path:${S.clip};"></i>
        <span class="ellip">${titleCase(l.label)}</span>
        <span class="mark">${mark}</span>
      </button>`;
    });
  }

  private renderProgramMobile(x: Derived) {
    const s = this.s, key = x.dev.map[x.layer.key], first = x.li <= 0;
    return html`
      <div class="prog-m">
        <div class="pills-m">${this.drumPills(x, false)}</div>
        <div class="draw" ${ref(this.track('draw'))}>
          ${s.zoom ? this.keyGrid(x, true, false) : this.machine(x, true)}
        </div>
        <div class="prog-m-foot">
          <div class="hint">
            ${key
              ? html`<span class="ellip">${VERB[x.dev.fam] || 'Pick'} <b>${key}</b>, then tap the lit keys</span>`
              : html`<span class="ellip"><b>${titleCase(x.layer.label)}</b> isn't on your ${x.dev.short}. Skip it or sample one.</span>`}
            <button class="link" @click=${() => this.set({ zoom: !s.zoom })}>${s.zoom ? 'Show whole machine' : 'Back to keys'}</button>
          </div>
          <div class="arrows">
            <button class="arrow" title="Previous drum" aria-label="Previous drum" ?disabled=${first}
              @click=${() => { if (!first) this.set({ layer: x.lanes[x.li - 1].key }); }}>←</button>
            <button class="arrow arrow-fill" title="Next drum" aria-label="Next drum" ?disabled=${x.last}
              @click=${() => { if (!x.last) this.set({ done: { ...s.done, [x.layer.key]: true }, layer: x.lanes[x.li + 1].key }); }}>→</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderProgramDesktop(x: Derived) {
    const s = this.s, stg = this.box.stage || { w: 600, h: 400 }, dw = this.box.draw || { w: 300, h: 200 };
    const key = x.dev.map[x.layer.key], capOn = dw.h > 200;
    const sentF = Math.round(clamp(Math.min(stg.w * 0.55 / 9, (stg.h - 140) / 4.6), stg.h < 300 ? 24 : 34, 72));
    const chipH = Math.round(sentF * 1.15);
    const keysCap = (x.dev.fam === 'sp' ? 'Pads' : x.dev.fam === 'po' ? 'Buttons' : x.dev.fam === 'ct' ? 'Top 16 pads' : 'Step keys') + ` on your ${x.dev.short} · lit = press`
      + (x.barsN > 1 && !s.chain && s.pg > 0 ? ` · bar ${s.pg + 1}: ${x.dev.fam === 'po' || x.dev.fam === 'sp' ? 'next pattern' : 'next page'}` : '');
    return html`
      <div class="prog-d">
        <div class="sentence-col" style="gap:${stg.h < 300 ? 14 : 26}px;">
          <div class="pills-d">${this.drumPills(x, true)}</div>
          ${key
            ? html`<div class="sentence" style="font-size:${sentF}px;gap:${Math.round(sentF * 0.22)}px ${Math.round(sentF * 0.18)}px;">
                <span>${ORD[x.li] || 'Then'}, ${(VERB[x.dev.fam] || 'pick').toLowerCase()}</span>
                <span class="chip chip-acc" style="height:${chipH}px;padding:0 ${Math.round(sentF * 0.35)}px;">${key}</span>
                <span>then tap</span>
                ${x.hits(x.layer.key).map(i => html`<span class="chip chip-num" style="min-width:${chipH}px;height:${chipH}px;box-shadow:${i === x.step ? `0 0 0 4px ${ACC}` : 'none'};">${i + 1}</span>`)}
              </div>`
            : html`<div class="unmapped" style="font-size:${sentF}px;">${titleCase(x.layer.label)} isn't on your ${x.dev.short}.
                <span>Skip this part, or sample a ${x.layer.label.toLowerCase()} onto a free pad and program it with the steps shown.</span></div>`}
          <div>
            <button class="next" style="height:${stg.h < 300 ? 44 : 52}px;" @click=${() => this.next(x)}>
              ${x.last ? 'Now play it' : `Done, next: ${x.lanes[x.li + 1].label.toLowerCase()}`} →</button>
          </div>
        </div>
        <div class="draw-col">
          <div class="draw" ${ref(this.track('draw'))}>
            ${s.zoom
              ? html`<div class="keys-wrap" style="gap:${capOn ? 14 : 0}px;">${this.keyGrid(x, false, capOn)}${capOn ? html`<span class="caption">${keysCap}</span>` : nothing}</div>`
              : this.machine(x, false)}
          </div>
          <div class="draw-foot">
            <span class="method">${x.dev.id} · ${x.dev.method.toLowerCase()}${x.dev.guess ? ' · suggested mapping' : ''}</span>
            <button class="outline" @click=${() => this.set({ zoom: !s.zoom })}>${s.zoom ? 'Show whole machine' : 'Back to keys'}</button>
          </div>
        </div>
      </div>
    `;
  }

  // ---- footer + overlays -----------------------------------------------

  private renderFooter(x: Derived, compact: boolean, prog: boolean) {
    const s = this.s;
    const sub = s.playing ? `${x.step + 1} / 16` : prog ? 'hear it' : x.allBeats ? 'whole bar' : 'beat ' + s.beats.map(b => b + 1).join('+');
    return html`
      <footer style="padding:${compact ? '8px 16px calc(8px + env(safe-area-inset-bottom))' : '14px 40px'};">
        <button class="play" title="Play / stop (space)" style="background:${s.playing ? CREAM : ACC};" @click=${() => this.toggle()}>
          <i class=${s.playing ? 'ico-stop' : 'ico-play'}></i>${s.playing ? 'Stop' : 'Play'}<span class="spacer"></span><span class="play-sub">${sub}</span>
        </button>
        <div class="tempo">
          <button class="round" title="Slower" aria-label="Slower" @click=${() => this.nudgeTempo(-2)}>−</button>
          <span class="bpm">
            <input .value=${live(s.tempoDraft ?? String(x.bpm))} inputmode="numeric" aria-label="Tempo in BPM"
              @focus=${(e: FocusEvent) => (e.target as HTMLInputElement).select()}
              @input=${(e: InputEvent) => this.set({ tempoDraft: (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '').slice(0, 3) })}
              @blur=${() => this.commitTempo()}
              @keydown=${(e: KeyboardEvent) => this.onTempoKey(e)}>
            <small>BPM</small>
          </span>
          <button class="round" title="Faster" aria-label="Faster" @click=${() => this.nudgeTempo(2)}>+</button>
        </div>
      </footer>
    `;
  }

  private renderSearch(x: Derived, compact: boolean) {
    const s = this.s;
    return html`
      <section class="overlay">
        <div class="ov-head" style="max-width:880px;padding:${compact ? '16px 20px 8px' : '36px 40px 12px'};">
          <div class="ov-bar"><span>${LIB.length} beats to learn</span><button class="ov-close" @click=${() => this.set({ search: false })}>Close</button></div>
          <input id="q" .value=${s.query} placeholder="What beat?" autocomplete="off" style="height:${compact ? 60 : 92}px;font-size:${compact ? 38 : 68}px;"
            @input=${(e: InputEvent) => this.set({ query: (e.target as HTMLInputElement).value })}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' && x.list[0]) this.select(x.list[0].id); }}>
          <div class="genres">
            ${['ALL', ...x.genres].map(gn => {
              const on = s.genre === gn;
              return html`<button style="background:${on ? INK : 'transparent'};color:${on ? CREAM : INK};" @click=${() => this.set({ genre: gn })}>${gn === 'ALL' ? 'All' : gn}</button>`;
            })}
          </div>
        </div>
        <div class="ov-scroll">
          <div style="max-width:880px;margin:0 auto;padding:${compact ? '0 20px 24px' : '0 40px 40px'};box-sizing:border-box;">
            ${x.list.map(p => html`
              <button class="item" @click=${() => this.select(p.id)}>
                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                  <span class="item-name" style="font-size:${compact ? 24 : 30}px;">${p.name}</span>
                  ${p.difficulty ? html`<span class="diff-tag diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span>` : nothing}
                </div>
                <span class="item-bpm">${p.bpm}<small> BPM</small></span>
                <span class="item-artist">${p.artist}${p.gear ? ` · ${p.gear}` : ''}</span>
                <span class="item-genre">${p.genre}</span>
              </button>`)}
            ${x.list.length ? nothing : html`<span class="empty">Nothing matches. Try an artist or a genre.</span>`}
          </div>
        </div>
      </section>
    `;
  }

  /** Beat notes: title + level meter, "The sound" / "Try this", which hand per drum, tags. */
  private renderInfo(x: Derived, compact: boolean) {
    const p = x.base, close = () => this.set({ info: false });
    const lvl = Math.max(0, LEVELS.indexOf(p.difficulty ?? (p.bpm > 150 ? 'Intermediate' : 'Beginner')));
    const bar = (n: number) => html`<i style="background:${lvl >= n ? ACC : 'var(--line)'};"></i>`;
    const hands = INST.filter(i => p.hands?.[i.key]).map(i => [i.key, p.hands![i.key]!] as const);
    if (!hands.length) hands.push(['k', 'L'], ['s', 'R'], ['h', /x{6}/i.test(p.h) ? 'L+R' : 'R']);
    return html`
      <div class="scrim" @click=${close}></div>
      <section class="sheet-up info-sheet" style="padding:${compact ? '18px 20px calc(20px + env(safe-area-inset-bottom))' : '24px 40px 32px'};">
        <div class="info-wrap">
          <div class="info-head">
            <div class="info-title-col">
              <span class="info-title" style="font-size:${compact ? 30 : 40}px;">${p.name}</span>
              <div class="info-meta">
                <span>${p.artist}</span><span>${p.genre}</span><span>${p.bpm} BPM</span>
                <span class="level"><span class="bars">${bar(0)}${bar(1)}${bar(2)}</span>${LEVELS[lvl]}</span>
              </div>
            </div>
            <button class="ov-close ov-close-dark" @click=${close}>Done</button>
          </div>
          <div class="info-cols">
            <div class="info-section">
              <span class="info-label">The sound</span>
              <p class="info-sound">${p.gear || p.artist + '.'}</p>
            </div>
            <div class="info-section">
              <span class="info-label">Try this</span>
              <p class="info-tip">${p.tip || 'Program the kick and snare first, then layer the hats on top.'}</p>
            </div>
          </div>
          <div class="info-section info-rule">
            <span class="info-label">Which hand</span>
            <div class="hands">
              ${hands.map(([k, hand]) => {
                const S = SHP[k];
                return html`<div class="hand">
                  <i class="shape" style="width:16px;height:16px;background:${k === 'h' ? CREAM : laneColor(k)};border-radius:${k === 's' ? '3px' : S.r};clip-path:${S.clip};"></i>
                  <span class="hand-inst">${INST.find(i => i.key === k)!.label}</span>
                  <span class="hand-val">${hand}</span>
                </div>`;
              })}
            </div>
          </div>
          <div class="info-tags">
            ${(p.tags?.length ? p.tags : [p.genre.toLowerCase()]).map(t => html`<span>#${t.replace(/ /g, '')}</span>`)}
          </div>
        </div>
      </section>
    `;
  }

  private renderThemes(compact: boolean) {
    const close = () => this.set({ themes: false });
    return html`
      <div class="scrim" @click=${close}></div>
      <section class="sheet-up" style="padding:${compact ? '18px 20px calc(20px + env(safe-area-inset-bottom))' : '24px 40px 32px'};">
        <div class="ov-bar"><span class="sheet-title">Theme</span><button class="ov-close ov-close-dark" @click=${close}>Done</button></div>
        <div class="theme-grid">
          ${THEMES.map(t => {
            const on = t.id === this.s.theme;
            return html`<button class="theme-card" style="border-color:${on ? t.v.acc : t.v.line};background:${t.v.bg};color:${t.v.fg};" @click=${() => this.pickTheme(t.id)}>
              <span class="dots">
                <i style="border-radius:50%;background:${t.v.acc};"></i><i style="border-radius:50%;background:${t.v.kick};"></i>
                <i style="border-radius:6px;background:${t.v.fg};"></i><i style="background:${t.v.open};clip-path:polygon(50% 0,100% 100%,0 100%);"></i>
              </span>
              <span class="theme-name">${t.name}<small>${on ? '✓' : ''}</small></span>
            </button>`;
          })}
        </div>
      </section>
    `;
  }

  private renderRack(x: Derived, compact: boolean) {
    const s = this.s;
    return html`
      <section class="overlay">
        <div class="ov-head" style="max-width:980px;padding:${compact ? '16px 20px 8px' : '36px 40px 12px'};">
          <div class="ov-bar"><span>What are you playing on?</span><button class="ov-close" @click=${() => this.set({ rack: false })}>Close</button></div>
          <input .value=${s.rackQ} placeholder="Search machines" autocomplete="off" style="height:${compact ? 60 : 92}px;font-size:${compact ? 38 : 68}px;"
            @input=${(e: InputEvent) => this.set({ rackQ: (e.target as HTMLInputElement).value })}>
        </div>
        <div class="ov-scroll">
          <div class="rack-grid" style="padding:${compact ? '0 20px 24px' : '0 40px 40px'};">
            ${x.makers.map(gr => html`
              <div class="maker">
                <span>${gr.maker}</span>
                ${gr.items.map(d => {
                  const on = d.id === x.dev.id;
                  return html`<button class="machine" style="background:${on ? INK : 'transparent'};color:${on ? CREAM : INK};" @click=${() => this.pickDevice(d.id)}>${d.id}<small>${FAM[d.fam].toLowerCase()}</small></button>`;
                })}
              </div>`)}
          </div>
        </div>
      </section>
    `;
  }

  static styles = css`
    :host { display: block; height: 100dvh; font-family: 'Host Grotesk', sans-serif; color: var(--fg); }
    button { font-family: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    button:disabled { cursor: default; }
    button:focus-visible, input:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: var(--ink); } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-button { display: none; height: 0; }
    input::placeholder { color: var(--mute2); }
    .ellip { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .spacer { flex: 1; }
    .shape { flex: none; display: block; }

    .frame { height: 100dvh; display: flex; align-items: center; justify-content: center; background: var(--bg2); overflow: hidden; }
    .shell { position: relative; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }

    header { flex: none; display: flex; flex-wrap: wrap; align-items: flex-start; }
    .title-col { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
    .title { max-width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; border: none; background: transparent; padding: 0; text-align: left; color: var(--fg); }
    .title .name-row { max-width: 100%; display: flex; align-items: center; gap: 0.3em; }
    .title .name { min-width: 0; font-family: 'Tilt Warp', sans-serif; line-height: 1.12; padding-bottom: 0.04em; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .chev { flex: none; width: 0.42em; height: 0.28em; margin-top: 0.08em; color: var(--mute); }
    .title .artist { max-width: 100%; font-size: 14px; font-weight: 600; color: var(--mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .title u { text-underline-offset: 3px; }
    .device-pill { flex: none; display: flex; align-items: center; gap: 8px; padding: 0 18px; border: 2px solid var(--fg); border-radius: 999px; background: transparent; color: var(--fg); font-size: 14px; font-weight: 700; white-space: nowrap; }
    .device-pill:hover { background: var(--fg); color: var(--ink); }
    .caret { font-size: 11px; }
    .kit-wrap { position: relative; flex: none; }
    .kit-pill { display: flex; align-items: center; gap: 6px; border: 2px solid var(--fg); border-radius: 999px; font-size: 14px; font-weight: 700; white-space: nowrap; }
    .kit-lbl { font-weight: 600; opacity: 0.75; }
    .kit-scrim { position: fixed; inset: 0; z-index: 20; }
    .kit-menu { position: absolute; top: calc(100% + 8px); z-index: 21; min-width: 220px; display: flex; flex-direction: column; padding: 6px; background: var(--fg); color: var(--ink); border-radius: 18px; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35); }
    .kit-menu button { min-height: 44px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 12px; border: none; border-radius: 12px; color: var(--ink); font-size: 15px; font-weight: 700; text-align: left; }
    .kit-menu button:hover { background: color-mix(in srgb, var(--ink) 10%, transparent) !important; }
    .kit-name { display: flex; align-items: baseline; gap: 8px; }
    .kit-name small { font-size: 12px; font-weight: 600; opacity: 0.6; }
    .info-btn { flex: none; display: flex; align-items: center; justify-content: center; padding: 0; border: 2px solid var(--fg); border-radius: 50%; background: transparent; color: var(--fg); font-family: 'Tilt Warp', sans-serif; font-size: 19px; }
    .info-btn:hover { background: var(--fg); color: var(--ink); }
    .theme-btn { flex: none; display: flex; align-items: center; justify-content: center; padding: 0; border: 2px solid var(--fg); border-radius: 50%; background: transparent; }
    .swatch { width: 22px; height: 22px; border-radius: 50%; background: conic-gradient(var(--acc) 0 25%, var(--kick) 0 50%, var(--fg) 0 75%, var(--snareL) 0); }
    .controls { flex: 1 0 100%; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .seg { display: flex; gap: 2px; padding: 2px; border-radius: 999px; background: color-mix(in srgb, var(--fg) 9%, transparent); }
    .seg button { padding: 0 12px; border: none; border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }
    .bars-seg { align-items: center; transition: opacity 0.15s; }
    .seg-lbl { padding: 0 6px 0 10px; font-size: 12px; font-weight: 700; color: var(--mute); }
    .toggle { padding: 0 12px; border: 2px solid; border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }

    nav { flex: none; display: flex; align-items: flex-end; border-bottom: 2px solid color-mix(in srgb, var(--fg) 20%, transparent); }
    .mode { display: flex; align-items: baseline; border: none; border-bottom: 6px solid; margin-bottom: -2px; background: transparent; padding: 0; font-family: 'Tilt Warp', sans-serif; white-space: nowrap; }
    .beat-tabs { display: flex; align-items: center; gap: 6px; padding-bottom: 10px; }
    .beat { padding: 0 8px; border: 2px solid var(--fg); border-radius: 999px; font-family: 'Tilt Warp', sans-serif; }

    .stage { position: relative; flex: 1; min-height: 0; box-sizing: border-box; display: flex; flex-direction: column; }

    .beat-row { flex: none; display: flex; align-items: center; gap: 6px; padding-bottom: 12px; }
    .beat-row .beat { padding: 0 6px; }
    .sheet { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .score { display: grid; }
    .score > span { display: flex; align-items: center; justify-content: center; min-width: 0; overflow: hidden; white-space: nowrap; }
    .count { border-radius: 999px; }
    .lane-label { gap: 8px; font-family: 'Tilt Warp', sans-serif; color: var(--fg); }

    .draw { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
    .keys { display: grid; }
    .key { display: flex; align-items: center; justify-content: center; border: 2px solid; box-sizing: border-box; font-family: 'Tilt Warp', sans-serif; }
    .panel { position: relative; flex: none; overflow: hidden; background: var(--panel); }
    .panel > span { position: absolute; display: flex; box-sizing: border-box; white-space: nowrap; overflow: hidden; line-height: 1.1; }
    .drum { min-width: 0; display: flex; align-items: center; justify-content: center; font-family: 'Tilt Warp', sans-serif; }
    .drum .mark { flex: none; font-family: 'Host Grotesk', sans-serif; font-weight: 700; }

    .prog-m { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 10px; }
    .pills-m { flex: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)); gap: 6px; }
    .drum-m { height: 38px; gap: 4px; padding: 0 4px; border: 2px solid; border-radius: 999px; font-size: 15px; }
    .drum-m .mark { font-size: 11px; }
    .prog-m-foot { flex: none; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: var(--mute); }
    .hint { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
    .hint b { color: var(--acc); font-weight: 600; }
    .link { border: none; background: transparent; padding: 0; color: var(--fg); font-size: 12px; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
    .arrows { flex: none; display: flex; gap: 6px; }
    .arrow { width: 44px; height: 44px; padding: 0; border: 2px solid var(--fg); border-radius: 50%; background: transparent; color: var(--fg); font-family: 'Tilt Warp', sans-serif; font-size: 18px; }
    .arrow-fill { border: none; background: var(--fg); color: var(--ink); }
    .arrow:disabled { opacity: 0.3; }

    .prog-d { flex: 1; min-height: 0; display: flex; gap: 48px; }
    .sentence-col { flex: 1.25 1 0; min-width: 0; min-height: 0; display: flex; flex-direction: column; justify-content: safe center; }
    .pills-d { display: flex; flex-wrap: wrap; gap: 6px; padding: 5px; border-radius: 22px; background: color-mix(in srgb, var(--fg) 7%, transparent); }
    .drum-d { flex: 1 1 110px; height: 52px; gap: 8px; padding: 0 8px; border: none; border-radius: 17px; font-size: 17px; }
    .drum-d .mark { font-size: 12px; opacity: 0.7; }
    .sentence { display: flex; flex-wrap: wrap; align-items: center; font-family: 'Tilt Warp', sans-serif; line-height: 1.05; color: var(--fg); }
    .chip { display: flex; align-items: center; border-radius: 999px; color: var(--ink); box-sizing: border-box; }
    .chip-acc { background: var(--acc); }
    .chip-num { justify-content: center; padding: 0 4px; background: var(--fg); }
    .unmapped { font-family: 'Tilt Warp', sans-serif; line-height: 1.1; color: var(--fg); text-wrap: pretty; }
    .unmapped span { display: block; margin-top: 12px; font-family: 'Host Grotesk', sans-serif; font-size: 17px; font-weight: 500; color: var(--mute); }
    .next { padding: 0 24px; border: none; border-radius: 999px; background: var(--fg); color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 18px; white-space: nowrap; }
    .next:hover { background: var(--acc); }
    .draw-col { flex: 1 1 0; min-width: 0; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
    .keys-wrap { display: flex; flex-direction: column; align-items: center; }
    .caption { font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: var(--mute); }
    .draw-foot { flex: none; display: flex; align-items: center; gap: 10px; }
    .method { flex: 1; min-width: 0; font-size: 13px; font-weight: 500; line-height: 17px; color: var(--mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .outline { flex: none; height: 36px; padding: 0 16px; border: 2px solid var(--fg); border-radius: 999px; background: transparent; color: var(--fg); font-size: 13px; font-weight: 700; white-space: nowrap; }

    footer { flex: none; display: flex; align-items: center; gap: 12px; background: var(--ink); color: var(--fg); }
    .play { flex: 1; min-width: 0; height: 52px; display: flex; align-items: center; gap: 14px; padding: 0 22px; border: none; border-radius: 999px; color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 20px; }
    .ico-play { width: 15px; height: 17px; background: currentColor; clip-path: polygon(0 0, 100% 50%, 0 100%); }
    .ico-stop { width: 14px; height: 14px; background: currentColor; }
    .play-sub { font-family: 'Host Grotesk', sans-serif; font-size: 13px; font-weight: 600; white-space: nowrap; }
    .tempo { flex: none; display: flex; align-items: center; gap: 4px; }
    .round { width: 44px; height: 44px; padding: 0; border: 2px solid var(--line); border-radius: 50%; background: transparent; color: var(--fg); font-size: 20px; }
    .bpm { min-width: 56px; display: flex; flex-direction: column; align-items: center; line-height: 1; }
    .bpm input { width: 58px; height: 30px; padding: 0; border: none; border-bottom: 2px dashed var(--line); border-radius: 0; background: transparent; color: var(--fg); font-family: 'Tilt Warp', sans-serif; font-size: 24px; text-align: center; outline: none; }
    .bpm input:focus { border-bottom: 2px solid var(--acc); }
    .bpm small { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: var(--mute2); }

    .overlay { position: absolute; inset: 0; z-index: 10; background: var(--fg); color: var(--ink); display: flex; flex-direction: column; }
    .ov-head { flex: none; width: 100%; margin: 0 auto; box-sizing: border-box; display: flex; flex-direction: column; gap: 14px; }
    .ov-bar { display: flex; align-items: center; justify-content: space-between; font-size: 14px; font-weight: 700; }
    .ov-close { height: 44px; padding: 0 18px; border: 2px solid var(--ink); border-radius: 999px; background: transparent; color: var(--ink); font-size: 14px; font-weight: 700; }
    .ov-close-dark { border-color: var(--fg); color: var(--fg); }
    .overlay input { border: none; border-bottom: 3px solid var(--bg); background: transparent; padding: 0; font-family: 'Tilt Warp', sans-serif; color: var(--bg); outline: none; min-width: 0; }
    .genres { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
    .genres button { flex: none; height: 36px; padding: 0 14px; border: 2px solid var(--ink); border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }
    .ov-scroll { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; }
    .item { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 2px 16px; padding: 14px 0; border: none; border-bottom: 2px solid var(--div); background: transparent; color: var(--ink); text-align: left; }
    .item:hover { color: var(--bg); }
    .item-name { font-family: 'Tilt Warp', sans-serif; line-height: 1.12; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .diff-tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; font-family: 'Host Grotesk', sans-serif; }
    .diff-beginner { background: color-mix(in srgb, #22c55e 20%, transparent); color: #16a34a; border: 1px solid #22c55e; }
    .diff-intermediate { background: color-mix(in srgb, #eab308 20%, transparent); color: #ca8a04; border: 1px solid #eab308; }
    .diff-advanced { background: color-mix(in srgb, #ef4444 20%, transparent); color: #dc2626; border: 1px solid #ef4444; }
    .dyn-mark { font-size: 10px; margin-left: 2px; color: var(--acc); font-weight: 700; }
    .item-bpm { font-family: 'Tilt Warp', sans-serif; font-size: 18px; white-space: nowrap; }
    .item-bpm small, .machine small { font-family: 'Host Grotesk', sans-serif; font-size: 11px; font-weight: 700; }
    .item-artist { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .item-genre { font-size: 12px; font-weight: 700; white-space: nowrap; text-align: right; }
    .empty { display: block; padding: 24px 0; font-size: 16px; font-weight: 500; }
    .rack-grid { max-width: 980px; margin: 0 auto; box-sizing: border-box; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr)); gap: 24px 32px; }
    .maker { display: flex; flex-direction: column; gap: 6px; }
    .maker > span { font-size: 13px; font-weight: 700; }
    .machine { height: 48px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; border: 2px solid var(--fg); border-radius: 999px; font-family: 'Tilt Warp', sans-serif; font-size: 17px; text-align: left; }
    .machine small { font-size: 12px; font-weight: 600; }

    .scrim { position: absolute; inset: 0; z-index: 11; background: color-mix(in srgb, var(--ink) 60%, transparent); }
    .sheet-up { position: absolute; left: 0; right: 0; bottom: 0; z-index: 12; max-height: 85%; overflow-y: auto; background: var(--bg); border-top: 2px solid var(--fg); box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; }
    .sheet-title { font-family: 'Tilt Warp', sans-serif; font-size: 26px; font-weight: 400; }
    .info-sheet { max-height: 86%; display: block; }
    .info-wrap { max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: 22px; }
    .info-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
    .info-head .ov-close { flex: none; }
    .info-title-col { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
    .info-title { font-family: 'Tilt Warp', sans-serif; line-height: 1.02; letter-spacing: -0.01em; text-wrap: balance; }
    .info-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; font-size: 14px; font-weight: 600; color: var(--mute); }
    .level { display: flex; align-items: center; gap: 6px; color: var(--fg); }
    .bars { display: flex; gap: 3px; }
    .bars i { width: 6px; height: 14px; border-radius: 2px; }
    .info-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 22px 40px; padding-top: 20px; border-top: 1px solid var(--line); }
    .info-section { display: flex; flex-direction: column; gap: 8px; }
    .info-rule { gap: 12px; padding-top: 20px; border-top: 1px solid var(--line); }
    .info-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--acc); text-transform: uppercase; }
    .info-sound { margin: 0; font-size: 19px; line-height: 1.4; text-wrap: pretty; }
    .info-tip { margin: 0; font-size: 17px; line-height: 1.45; color: var(--mute); text-wrap: pretty; }
    .hands { display: flex; flex-wrap: wrap; gap: 10px; }
    .hand { display: flex; align-items: center; gap: 12px; padding: 8px 8px 8px 14px; border-radius: 999px; background: var(--panel); }
    .hand-inst { min-width: 52px; font-size: 14px; font-weight: 700; }
    .hand-val { height: 32px; min-width: 32px; padding: 0 8px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 999px; background: var(--fg); color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 15px; }
    .info-tags { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 13px; font-weight: 600; color: var(--mute2); }

    .theme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
    .theme-card { display: flex; flex-direction: column; gap: 10px; padding: 12px; border: 2px solid; border-radius: 18px; text-align: left; }
    .dots { display: flex; gap: 5px; }
    .dots i { width: 22px; height: 22px; }
    .theme-name { display: flex; align-items: center; justify-content: space-between; font-family: 'Tilt Warp', sans-serif; font-size: 18px; }
    .theme-name small { font-family: 'Host Grotesk', sans-serif; font-size: 13px; font-weight: 700; }
  `;
}

declare global {
  interface HTMLElementTagNameMap { 'cue-app': CueApp }
}

