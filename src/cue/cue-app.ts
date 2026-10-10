import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { ref } from 'lit/directives/ref.js';
import { DEVS, FAM, INST, LIB, partData, type LaneKey, type PartId } from './data/library.ts';
import { audio, click, getVolume, hit, kitById, kitFor, KITS, preview, setVolume } from './engine/audio.ts';
import { peekDraw } from './engine/peek.ts';
import { bpmOf, clamp, commitTempo, COUNTIN_KEY, derive, initState, LEVELS, levelOf, RAMP_KEY, rampNext, rampStart, saveDevice, saveFlag, savePeek, selectPattern, selected, stepMs, tick, titleCase, toggleBeat, toggleLearned, type Derived, type Mode, type State } from './model.ts';
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
/** The setup line under the keys, in plain words per machine family. */
const PLAIN: Record<string, string> = { sp: 'step record: pads are steps 1–16', tr: 'step mode: pick the drum, then press steps 1–16', po: 'write mode: one sound per pass', ct: 'the top 16 pads are steps 1–16', dt: 'grid recording: trig keys are steps 1–16' };
const ORD = ['First', 'Then', 'Then', 'Last'];
const PART_LABEL:Record<PartId, [string, string]> = { MAIN: ['Main', 'Main groove'], VAR: ['Var', 'Variation bar'], FILL: ['Fill', 'Fill bar'] };
/** Small down-chevron after the kit and machine names. */
const caret = html`<svg class="caret" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 1.5 6 6l4.5-4.5"></path></svg>`;
/** Kit (a drum) and machine (a pad box) icons for the phone header. */
const KIT_ICO = html`<svg class="hd-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="8" rx="8" ry="3"></ellipse><path d="M4 8v8c0 1.7 3.6 3 8 3s8-1.3 8-3V8"></path><path d="M4 12.5c2 1.2 4.8 1.8 8 1.8s6-.6 8-1.8"></path></svg>`;
/** Speaker with level waves; an X when muted. */
const volIco = (v: number) => html`<svg class="vol-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h3l5-4v14l-5-4H4z" fill="currentColor"></path>${v > 0 ? svg`<path d="M15.5 9.5a3.5 3.5 0 0 1 0 5"></path>` : nothing}${v > 0.5 ? svg`<path d="M18 7a7 7 0 0 1 0 10"></path>` : nothing}${v > 0 ? nothing : svg`<path d="M16 9l5 6M21 9l-5 6"></path>`}</svg>`;
/** The Accent / Ghost key, shown only on beats that use them. */
const feelKey = (accent = 'Accent', ghost = 'Ghost') => html`<span class="feel-key"><span><i class="fk-acc"></i>${accent}</span><span><i class="fk-ghost"></i>${ghost}</span></span>`;
const MACHINE_ICO = html`<svg class="hd-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"></rect><rect x="7" y="11" width="3.5" height="3.5" rx="0.8"></rect><rect x="13.5" y="11" width="3.5" height="3.5" rx="0.8"></rect><path d="M7 7.5h10"></path></svg>`;

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
  @state() private vol = getVolume();
  /** Level to return to on unmute. */
  private volPrev = 0.8;

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
    clearTimeout(this.timer);
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
    if (e.key === 'Escape') return this.set({ search: false, rack: false, themes: false, info: false, kitMenu: false, partsOpen: false, volOpen: false });
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

  /**
   * Starts (or restarts) playback. `fresh` = started by the user: Play can count in, and the tempo ramp starts over.
   * Each step schedules the next, so swing and the ramp change the timing step by step.
   */
  private start(fresh = false) {
    audio().resume();
    clearTimeout(this.timer);
    const s0 = this.s, play = s0.mode === 'play';
    let ramp = fresh || !play || !s0.ramp ? (play && s0.ramp ? rampStart(bpmOf(s0)) : 0) : s0.rampBpm;
    let ci = fresh && play && s0.ciOn ? 16 : 0;
    const step = () => {
      const s = this.s;
      if (ci > 0) {
        const n = 16 - ci--;
        if (n % 4 === 0) click(n === 0);
        this.set({ countIn: (n >> 2) + 1, step: -1 });
        this.timer = window.setTimeout(step, stepMs(ramp || bpmOf(s), 0, 50));
        return;
      }
      const base = selected(s), next = tick(s), d = partData(base, next.part, next.pg);
      // The ramp speeds up each time the loop comes round.
      if (ramp && s.step >= 0 && next.step <= s.step) ramp = rampNext(ramp, bpmOf(s));
      const kit = kitById(s.kit) || kitFor(base);
      INST.forEach(i => {
        const ch = d[i.key][next.step];
        if (ch === 'X') hit(i.key, 'accent', kit);
        else if (ch === 'x') hit(i.key, 'normal', kit);
        else if (ch === 'g') hit(i.key, 'ghost', kit);
      });
      this.set({ ...next, countIn: null, rampBpm: ramp });
      this.timer = window.setTimeout(step, stepMs(ramp || bpmOf(s), next.step, s.swingOn ? base.sw : 50));
    };
    this.timer = window.setTimeout(step, 0);
    this.set({ playing: true, rampBpm: ramp });
  }

  private stop() { clearTimeout(this.timer); this.set({ playing: false, step: -1, countIn: null, rampBpm: 0 }); }
  private toggle() { if (this.s.playing) this.stop(); else this.start(true); }

  // ---- actions ---------------------------------------------------------

  private select(id: string) { this.set(selectPattern(id), true); }
  private openSearch() { this.focusSearch = true; this.set({ search: true, rack: false, themes: false, kitMenu: false }); }
  private setMode(m: Mode) { this.set({ mode: m, step: -1 }, true); }
  private setPart(id: PartId) { this.set({ part: id, chain: false, bar: 0, pg: 0, done: {} }); }
  private toggleChain() { this.set({ chain: !this.s.chain, part: 'MAIN', bar: 0, pg: 0, done: {} }, true); }
  private setPage(n: number) { this.set({ pg: n, chain: false, bar: 0, done: {} }); }
  private pickDevice(id: string) { saveDevice(id); this.set({ device: id, rack: false, rackPrev: null, done: {} }); }
  private toggleRack() { this.set({ rack: !this.s.rack, rackQ: '', rackPrev: null, search: false, themes: false, info: false, kitMenu: false }); }
  private togglePeek() { savePeek(!this.s.peek); this.set({ peek: !this.s.peek, rackPrev: null }); }
  private pickTheme(id: string) { applyTheme(id, true); this.set({ theme: id }); }
  private nudgeTempo(d: number) { this.set({ tempo: clamp(bpmOf(this.s) + d, 40, 220), tempoDraft: null }, true); }
  private commitTempo() { if (this.s.tempoDraft !== null) this.set(commitTempo(this.s.tempoDraft), true); }
  private onTempoKey(e: KeyboardEvent) {
    const el = e.target as HTMLInputElement;
    if (e.key === 'Enter') el.blur();
    if (e.key === 'Escape') { e.stopPropagation(); this.set({ tempoDraft: null }); el.blur(); }
  }
  private setVol(v: number) { setVolume(v); this.vol = getVolume(); }
  private toggleMute() {
    if (this.vol > 0) { this.volPrev = this.vol; this.setVol(0); } else this.setVol(this.volPrev || 0.8);
  }
  private toggleKitMenu() { this.set({ kitMenu: !this.s.kitMenu, rack: false, search: false, themes: false, info: false }); }
  /** Picks a kit; while stopped, plays a short groove so you can hear it. */
  private pickKit(id: string) {
    this.set({ kit: id, kitMenu: false });
    if (!this.s.playing) preview(kitById(id)!);
  }

  private toggleCountIn() { saveFlag(COUNTIN_KEY, !this.s.ciOn); this.set({ ciOn: !this.s.ciOn }); }
  /** Turning the ramp on mid-play restarts it from 70%; turning it off returns to the set tempo. */
  private toggleRamp() {
    const on = !this.s.ramp;
    saveFlag(RAMP_KEY, on);
    this.set({ ramp: on, rampBpm: on && this.s.playing && this.s.mode === 'play' ? rampStart(bpmOf(this.s)) : 0 }, true);
  }
  private toggleLearned(id: string) { this.set({ learned: toggleLearned(this.s.learned, id) }); }

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
            style="padding:${compact ? (prog ? '12px 20px 6px' : '12px 20px 14px') : prog && H < 760 ? '14px 40px 14px' : '20px 40px 26px'};">
            ${prog
              ? compact ? this.renderProgramMobile(x) : this.renderProgramDesktop(x)
              : this.renderPlay(x, compact)}
          </div>
          ${this.renderFooter(x, compact, prog)}
          ${s.search ? this.renderSearch(x, compact) : nothing}
          ${s.themes ? this.renderThemes(compact) : nothing}
          ${s.rack ? this.renderRack(x, compact, W, H) : nothing}
          ${s.info ? this.renderInfo(x, compact) : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Desktop: title, then kit / machine pills and the info + theme buttons, with the part, bar, chain
   * and percussion controls on a full-width row below. Phones: one row — the title with "808 kit · SP-404"
   * under it, then round kit, machine, info and theme buttons; parts and chain move into the footer.
   */
  private renderHeader(x: Derived, compact: boolean, H: number) {
    const s = this.s, ico = compact ? 36 : 46;
    return html`
      <header class=${compact ? 'compact' : ''} style="gap:${compact ? '6px' : H < 700 ? '8px' : '12px'} ${compact ? 8 : 14}px;padding:${compact ? '12px 20px 8px' : H < 700 ? '18px 40px 12px' : '28px 40px 18px'};">
        <div class="title-col">
          <button class="title" title="Find a beat" @click=${() => this.openSearch()}>
            <span class="name-row" style="font-size:${compact ? 24 : H < 700 ? 40 : 56}px;">
              <span class="name">${x.base.name}</span>
              <svg class="chev" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 1.5 6 6l4.5-4.5"></path></svg>
            </span>
            ${compact || H < 640 ? nothing : html`<span class="artist">${x.base.artist}${x.base.simp ? ' · simplified' : ''} — <u>find another beat</u></span>`}
          </button>
          ${compact ? html`<span class="sub-line">${x.kit.name} kit · ${x.dev.id}${x.base.simp ? ' · simplified' : ''}</span>` : nothing}
        </div>
        <div class="km" style="order:${compact ? 1 : 2};gap:${compact ? 8 : 14}px;">
          <div class="kit-wrap">
            ${compact ? html`
              <button class="ico-btn" title="Change drum kit (${x.kit.name})" aria-label="Change drum kit" aria-haspopup="menu" aria-expanded=${s.kitMenu ? 'true' : 'false'}
                style="${s.kitMenu ? `background:${CREAM};color:${INK};` : ''}" @click=${() => this.toggleKitMenu()}>${KIT_ICO}</button>` : html`
              <button class="hd-pill" title="Change drum kit" aria-haspopup="menu" aria-expanded=${s.kitMenu ? 'true' : 'false'}
                style="padding:0 16px;${s.kitMenu ? `background:${CREAM};color:${INK};` : ''}" @click=${() => this.toggleKitMenu()}>
                <span class="hd-lbl">Kit</span>${x.kit.name}${caret}
              </button>`}
            ${s.kitMenu ? html`
              <div class="kit-scrim" @click=${() => this.toggleKitMenu()}></div>
              <div class="kit-menu" role="menu" style="right:0;">
                ${KITS.map(k => {
                  const on = k.id === x.kit.id;
                  return html`<button role="menuitemradio" aria-checked=${on ? 'true' : 'false'} style="background:${on ? mix(INK, 8) : 'transparent'};" @click=${() => this.pickKit(k.id)}>
                    <span class="kit-name">${k.name}${k.id === x.suits.id ? html`<small>suits ${x.base.genre}</small>` : nothing}</span>
                    <span>${on ? '✓' : ''}</span>
                  </button>`;
                })}
              </div>` : nothing}
          </div>
          ${compact
            ? html`<button class="ico-btn" title="Choose your machine (${x.dev.id})" aria-label="Choose your machine" @click=${() => this.toggleRack()}>${MACHINE_ICO}</button>`
            : html`<button class="hd-pill device-pill" style="padding:0 18px;" title="Choose your machine" @click=${() => this.toggleRack()}>${x.dev.id}${caret}</button>`}
        </div>
        <div class="icons" style="order:${compact ? 1 : 3};gap:${compact ? 8 : 14}px;">
          <button class="info-btn" style="width:${ico}px;height:${ico}px;font-size:${compact ? 17 : 19}px;" title="About this beat" aria-label="About this beat"
            @click=${() => this.set({ info: !s.info, search: false, rack: false, themes: false, kitMenu: false })}>i</button>
          <button class="theme-btn" style="width:${ico}px;height:${ico}px;" title="Change theme" aria-label="Change theme"
            @click=${() => this.set({ themes: !s.themes, search: false, rack: false, info: false, kitMenu: false })}><span class="swatch" style="width:${compact ? 18 : 22}px;height:${compact ? 18 : 22}px;"></span></button>
        </div>
        ${compact ? nothing : html`
            <div class="controls">
              <div class="seg">
                ${x.parts.map(id => {
                  const on = !s.chain && s.part === id;
                  return html`<button title=${PART_LABEL[id][1]} @click=${() => this.setPart(id)}
                    style="height:30px;background:${on ? CREAM : 'transparent'};color:${on ? INK : MUTED};">${PART_LABEL[id][0]}</button>`;
                })}
                <button title="Loop all bars, variation and fill" @click=${() => this.toggleChain()}
                  style="height:30px;background:${s.chain ? CREAM : 'transparent'};color:${s.chain ? INK : MUTED};">
                  ${s.chain ? `Chain · bar ${s.bar + 1}/${x.chainN}` : `Chain · ${x.chainN} bars`}</button>
              </div>
              ${x.base.bars ? this.barTabs(x, false) : nothing}
              ${x.extraN > 0 ? html`
                <div class="seg">
                  <button title=${s.perc ? 'Hide extra percussion' : `Show ${x.extraN} extra percussion`} @click=${() => this.set({ perc: !s.perc })}
                    style="height:30px;background:${s.perc ? CREAM : 'transparent'};color:${s.perc ? INK : MUTED};">
                    ${s.perc ? '− Percussion' : '+ Percussion · ' + x.extraN}</button>
                </div>` : nothing}
            </div>`}
      </header>
    `;
  }

  /**
   * Bar 1 2 3 4 for multi-bar beats. Stays in place, dimmed and inert, on Var, Fill or Chain so the
   * content below doesn't jump. On phones it sits at the right of the Program / Play row, labelled outside.
   */
  private barTabs(x: Derived, compact: boolean) {
    const s = this.s, live = x.barsN > 1 && !s.chain, n = x.base.bars!.length + 1;
    return html`
      <div class="seg bars-seg" style="padding:${compact ? 3 : 2}px;opacity:${live ? 1 : 0.35};pointer-events:${live ? 'auto' : 'none'};" aria-disabled=${live ? 'false' : 'true'}>
        ${compact ? nothing : html`<span class="seg-lbl">Bar</span>`}
        ${Array.from({ length: n }, (_, i) => {
          const on = live && s.pg === i;
          return html`<button title="Bar ${i + 1} of ${n}" tabindex=${live ? 0 : -1} @click=${() => this.setPage(i)}
            style="${compact ? 'width:28px;height:28px;padding:0;' : 'height:30px;min-width:30px;padding:0 6px;'}background:${on ? CREAM : 'transparent'};color:${on ? INK : CREAM};">${i + 1}</button>`;
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

  /** Program / Play tabs. On phones, multi-bar beats put the bar selector on the right. */
  private renderNav(x: Derived, compact: boolean, prog: boolean) {
    const s = this.s;
    return html`
      <nav style="gap:${compact ? 16 : 32}px;padding:${compact ? '0 20px' : '0 40px'};">
        ${([['program', 'Program'], ['play', 'Play']] as [Mode, string][]).map(([m, label]) => html`
          <button class="mode" @click=${() => this.setMode(m)}
            style="height:${compact ? 40 : 60}px;font-size:${compact ? 19 : 30}px;border-bottom-color:${s.mode === m ? ACC : 'transparent'};color:${s.mode === m ? CREAM : MUTED};">${label}</button>`)}
        <span class="spacer"></span>
        ${compact && x.base.bars ? html`<div class="nav-bars"><span class="bars-lbl">Bar</span>${this.barTabs(x, true)}</div>` : nothing}
        ${!prog && !compact ? html`
          <div class="beat-tabs">
            <span class="practise-lbl">Practise</span>
            ${this.beatTabs(x).map(b => html`<button class="beat" title=${b.title} @click=${b.click}
              style="min-width:40px;height:40px;font-size:${b.fs}px;background:${b.on ? CREAM : 'transparent'};color:${b.on ? INK : CREAM};box-shadow:${b.now ? `inset 0 0 0 2px ${ACC}` : 'none'};">${b.label}</button>`)}
          </div>` : nothing}
      </nav>
    `;
  }

  // ---- Play: the score -------------------------------------------------

  private renderPlay(x: Derived, compact: boolean) {
    const B = this.s.beats, step = x.step, lanes = x.lanes;
    const sb = this.box.sheet || { w: 600, h: 400 }, nl = Math.max(1, lanes.length);
    // Leave room for the Accent / Ghost key under the score.
    const sh = { w: sb.w, h: sb.h - (x.feel ? (compact ? 26 : 34) : 0) };
    const labW = compact ? 34 : 120, cg = compact ? 3 : 5, bgap = compact ? 8 : 18, lgap = compact ? 14 : 22;

    // Pick how many lines to wrap the focused beats onto: whichever gives the biggest cells.
    // Phones stack one beat per line, or two per line when that's bigger (short or landscape screens).
    let best: { n: number; bpl: number; cw: number; ch: number; cell: number } | null = null;
    for (const n of compact ? [B.length, B.length / 2].filter(n => n >= 1 && n % 1 === 0) : [1, 2, 4].filter(n => B.length % n === 0)) {
      const bpl = B.length / n, cols = bpl * 4, gaps = labW + cg * (cols + bpl * 2) + bgap * (bpl - 1);
      const cw = (sh.w - gaps) / cols, perLine = (sh.h - lgap * (n - 1)) / n - cg * nl;
      // The count row is 0.6 of a cell tall but never under 22px — budget for that floor on short screens.
      let chh = perLine / (nl + 0.6);
      if (chh * 0.6 < 22) chh = (perLine - 22) / nl;
      const cell = Math.min(cw, chh, 110);
      if (!best || cell > best.cell * 1.04) best = { n, bpl, cw: Math.min(cw, 120), ch: Math.min(chh, 96), cell };
    }
    const g = best!;
    // Phone cells never go under 28px tall (the sheet scrolls instead), and never stretch into flat bars.
    const ch = Math.max(4, Math.floor(Math.max(g.ch, compact ? Math.min(28, g.cw) : 0)));
    const cw = Math.max(4, Math.floor(Math.min(g.cw, Math.max(ch * 1.8, 36))));
    const cntH = Math.floor(clamp(ch * 0.6, 22, 48)), ss = Math.floor(Math.min(cw, ch) * 0.52), br = Math.round(Math.min(cw, ch) * 0.22);
    const cols = [labW + 'px'];
    for (let b = 0; b < g.bpl; b++) { cols.push(`repeat(4,${cw}px)`); if (b < g.bpl - 1) cols.push(bgap - cg + 'px'); }
    const shape = (k: LaneKey, size: number, color = SHP[k].c) =>
      html`<i class="shape" style="width:${size}px;height:${size}px;background:${color};border-radius:${SHP[k].r};clip-path:${SHP[k].clip};"></i>`;

    const lines = Array.from({ length: g.n }, (_, l) => B.slice(l * g.bpl, (l + 1) * g.bpl));
    return html`
      ${compact ? html`
        <div class="seg beat-row">
          <span class="practise-lbl">Practise</span>
          ${this.beatTabs(x).map(b => html`<button title=${b.title} @click=${b.click}
            style="font-size:${b.fs}px;background:${b.on ? CREAM : 'transparent'};color:${b.on ? INK : CREAM};box-shadow:${b.now ? `inset 0 0 0 2px ${ACC}` : 'none'};">${b.label}</button>`)}
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
                  const ghost = char === 'g', ring = [char === 'X' ? `inset 0 0 0 ${Math.max(3, Math.round(cw * 0.07))}px ${ACC}` : '', on && now ? `0 0 0 3px ${ACC}` : ''].filter(Boolean).join(',');
                  return html`<span class="cell" style="border-radius:${br}px;background:${ghost ? mix(CREAM, 42) : on ? CREAM : now ? mix(ACC, 28) : mix(CREAM, 10)};box-shadow:${ring || 'none'};">
                    ${on ? shape(ln.key, Math.floor(ss * (now ? 1.15 : 1) * (ghost ? 0.6 : 1))) : nothing}
                  </span>`;
                })}
                ${bi < bs.length - 1 ? html`<span></span>` : nothing}`)}`)}
          </div>`)}
        ${x.feel ? feelKey() : nothing}
      </div>
      ${this.practiseRow(x, compact)}
    `;
  }

  /** Under the score: count-in, tempo ramp and (on swung beats) swing on/off, then Mark learned. */
  private practiseRow(x: Derived, compact: boolean) {
    const s = this.s, sw = x.base.sw, learned = s.learned.includes(x.base.id);
    const tools = [
      { label: 'Count-in', title: 'Four clicks before the beat starts', on: s.ciOn, click: () => this.toggleCountIn() },
      { label: s.ramp && s.playing && s.rampBpm ? `Ramp · ${s.rampBpm}` : 'Ramp up', title: 'Start at 70% speed and add 2 BPM each loop', on: s.ramp, click: () => this.toggleRamp() },
      ...(sw > 50 ? [{ label: `Swing ${sw}%`, title: 'Turn off to hear it straight', on: s.swingOn, click: () => this.set({ swingOn: !s.swingOn }) }] : [])
    ];
    return html`
      <div class="practise" style="padding-top:${compact ? 10 : 16}px;">
        <div class="seg tools">
          ${tools.map(t => html`<button title=${t.title} aria-pressed=${t.on ? 'true' : 'false'} @click=${t.click}
            style="background:${t.on ? CREAM : 'transparent'};color:${t.on ? INK : MUTED};">${t.label}</button>`)}
        </div>
        <span class="spacer"></span>
        <button class="learned" aria-pressed=${learned ? 'true' : 'false'} @click=${() => this.toggleLearned(x.base.id)}
          style="border-color:${learned ? ACC : mix(CREAM, 30)};background:${learned ? ACC : 'transparent'};color:${learned ? INK : CREAM};">
          ${learned ? '✓ Learned' : 'Mark learned'}</button>
      </div>
    `;
  }

  /**
   * How to enter swing and accents/ghosts on this machine. Swing shows on the first lane of a swung beat;
   * the velocity line when the lane has accents or ghosts. `short` is the one-line version.
   */
  private tips(x: Derived) {
    const sw = x.base.sw, fam = x.dev.fam, po = fam === 'po';
    const swing = sw > 50 && x.li === 0, vel = /[Xg]/.test(x.sel[x.layer.key]);
    const SWL: Record<string, string> = {
      sp: `Set swing to about ${sw}% before you record.`,
      tr: `Turn shuffle up until the off-beats lean late, about ${sw}% swing. Machines scale it differently, so match it by ear.`,
      po: 'Pocket operators have no swing setting. Program it straight.',
      ct: `Set swing to ${sw} (50 is straight).`,
      dt: `Set swing to ${sw}% on the tempo page.`
    };
    const VL: Record<string, string> = {
      sp: 'Turn fixed velocity off. Hit ringed steps hard and faded steps lightly.',
      tr: 'Put ringed steps on the accent track. Faded steps are ghost notes: lower their level or leave them out.',
      po: 'Pocket operators have no velocity. Leave the faded steps out.',
      ct: 'Hold a step and set its velocity: high for ringed steps, low for faded ones.',
      dt: 'Hold a trig and set velocity: about 120 for ringed steps, 40 for faded ones.'
    };
    const short = [swing ? (po ? 'No swing on a pocket operator' : `Swing ${sw}%`) : '', vel ? (po ? 'leave faded steps out' : 'ringed = hard, faded = soft') : ''].filter(Boolean).join(' · ');
    return { swing: swing ? SWL[fam] : '', vel: vel ? VL[fam] : '', short, mapped: !!x.dev.map[x.layer.key] };
  }

  // ---- Program ---------------------------------------------------------

  /** The 16 keys to press, sized to fill the drawing area; `legend` = the caption and Accent / Ghost key show below. */
  private keyGrid(x: Derived, compact: boolean, legend: boolean) {
    const dw = this.box.draw || { w: 300, h: 200 }, gap = compact ? 6 : legend ? 10 : 8;
    const below = legend ? 30 + (x.feel ? 30 : 0) : 0;
    const fit = (n: number) => Math.min((dw.w - gap * (n - 1)) / n, (dw.h - below - gap * (16 / n - 1)) / (16 / n));
    // Pad machines stay 4×4 when it's big enough; otherwise take whichever layout gives the biggest keys.
    const pads = x.dev.fam === 'sp' || x.dev.fam === 'po';
    const cols = pads && fit(4) >= 34 ? 4 : [4, 8, 16].reduce((a, n) => fit(n) > fit(a) * 1.08 ? n : a, 4);
    const size = Math.floor(clamp(fit(cols), 16, compact ? 120 : 110)), col = laneColor(x.layer.key);
    return html`
      <div class="keys" style="grid-template-columns:repeat(${cols},${size}px);gap:${gap}px;">
        ${Array.from({ length: 16 }, (_, i) => {
          const char = x.sel[x.layer.key][i], on = char !== '.', accent = char === 'X', ghost = char === 'g';
          const ring = [accent ? `inset 0 0 0 3px ${ACC}` : '', i === x.step ? `0 0 0 4px ${CREAM}` : ''].filter(Boolean).join(',');
          return html`<span class="key" style="width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.26)}px;font-size:${Math.round(size * 0.38)}px;border-color:${accent ? ACC : on ? col : mix(CREAM, 18)};background:${ghost ? `color-mix(in srgb,${col} 38%,transparent)` : on ? col : mix(CREAM, 6)};color:${ghost ? CREAM : on ? INK : 'var(--mute2)'};box-shadow:${ring || 'none'};">${i + 1}</span>`;
        })}
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
        style="background:${on ? CREAM : 'transparent'};color:${on ? INK : MUTED};${desktop ? `box-shadow:${on ? '0 6px 18px -8px rgba(0,0,0,0.6)' : 'none'};` : ''}">
        <i class="shape" style="width:${desktop ? 12 : 10}px;height:${desktop ? 12 : 10}px;background:${col};border-radius:${S.r};clip-path:${S.clip};"></i>
        <span class="ellip">${titleCase(l.label)}</span>
        <span class="mark">${mark}</span>
      </button>`;
    });
  }

  /** Phones: drum selector, the key grid filling the rest, and one line naming the pad to hold. */
  private renderProgramMobile(x: Derived) {
    const s = this.s, key = x.dev.map[x.layer.key], tp = this.tips(x);
    // One even row for up to four drums; with percussion showing, two rows of equal columns.
    const n = x.lanes.length + (x.extraN > 0 ? 1 : 0), cols = n <= 4 ? n : Math.ceil(n / 2);
    return html`
      <div class="prog-m">
        <div class="pills-m" style="grid-template-columns:repeat(${cols},minmax(0,1fr));">
          ${this.drumPills(x, false)}
          ${x.extraN > 0 ? html`<button class="perc-m" title=${s.perc ? 'Hide extra percussion' : `Show ${x.extraN} extra percussion`}
            @click=${() => this.set({ perc: !s.perc })}>${s.perc ? 'Less' : '+' + x.extraN}</button>` : nothing}
        </div>
        ${tp.short && tp.mapped ? html`<div class="tips-m">${tp.short}</div>` : nothing}
        <div class="draw" ${ref(this.track('draw'))}>${this.keyGrid(x, true, false)}</div>
        <div class="prog-m-foot">
          ${key
            ? html`<span class="hold">${VERB[x.dev.fam] || 'Pick'}<span class="hold-key">${key}</span></span>`
            : html`<span class="ellip">Not on your ${x.dev.short}</span>`}
          ${x.feel ? feelKey() : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Desktop: drums, the sentence and Next on the left; keys on the right. Short windows drop the caption,
   * key and setup line so the keys stay big, and fold the swing / velocity tips into one line beside Next.
   */
  private renderProgramDesktop(x: Derived) {
    const s = this.s, stg = this.box.stage || { w: 600, h: 400 }, dw = this.box.draw || { w: 300, h: 200 };
    const key = x.dev.map[x.layer.key], tall = dw.h > 380, low = stg.h < 360, tp = this.tips(x);
    // The tips take up to two lines a paragraph, plus a gap; the sentence shrinks to make room so Next stays on screen.
    const tipsH = tp.mapped && !low && (tp.swing || tp.vel) ? 26 + ((tp.swing ? 1 : 0) + (tp.vel ? 1 : 0)) * 48 : 0;
    const sentF = Math.round(clamp(Math.min(stg.w * 0.55 / 9, (stg.h - 150 - tipsH) / 4.6), stg.h < 300 ? 24 : 34, 72));
    const chipH = Math.round(sentF * 1.15), sGap = `${Math.round(sentF * 0.22)}px ${Math.round(sentF * 0.18)}px`;
    const keysCap = (x.dev.fam === 'sp' ? 'Pads = steps' : x.dev.fam === 'po' ? 'Buttons' : x.dev.fam === 'ct' ? 'Top 16 pads' : 'Step keys') + ` on your ${x.dev.short} · lit = press`
      + (x.barsN > 1 && !s.chain && s.pg > 0 ? ` · bar ${s.pg + 1}: ${x.dev.fam === 'po' || x.dev.fam === 'sp' ? 'next pattern' : 'next page'}` : '');
    const wrap = x.lanes.length > 4;
    return html`
      <div class="prog-d">
        <div class="sentence-col" style="gap:${low ? 10 : 26}px;">
          <div class="pills-d" style="flex-wrap:${wrap ? 'wrap' : 'nowrap'};--drum-h:${low ? 40 : 52}px;--drum-flex:${wrap ? '1 1 110px' : '1 1 0'};">${this.drumPills(x, true)}</div>
          ${key
            ? html`<div class="sentence" style="font-size:${sentF}px;gap:${sGap};">
                <span>${ORD[x.li] || 'Then'}, ${(VERB[x.dev.fam] || 'pick').toLowerCase()}</span>
                <span class="chip chip-acc" style="height:${chipH}px;padding:0 ${Math.round(sentF * 0.35)}px;">${key}</span>
                <span>then tap</span>
                <span class="press" style="gap:${sGap};">
                  ${x.hits(x.layer.key).map(i => {
                    const ch = x.sel[x.layer.key][i], ghost = ch === 'g';
                    return html`<span class="chip chip-num" style="min-width:${chipH}px;height:${chipH}px;border-color:${ch === 'X' ? ACC : ghost ? mix(CREAM, 55) : CREAM};background:${ghost ? 'transparent' : CREAM};color:${ghost ? CREAM : INK};box-shadow:${i === x.step ? `0 0 0 4px ${ACC}` : 'none'};">${i + 1}</span>`;
                  })}
                </span>
              </div>`
            : html`<div class="unmapped" style="font-size:${sentF}px;">${titleCase(x.layer.label)} isn't on your ${x.dev.short}.
                <span>Skip this part, or sample a ${x.layer.label.toLowerCase()} onto a free pad and program it with the steps shown.</span></div>`}
          ${tp.mapped && !low && (tp.swing || tp.vel) ? html`
            <div class="tips">
              ${tp.swing ? html`<span><strong>Swing.</strong> ${tp.swing}</span>` : nothing}
              ${tp.vel ? html`<span><strong>Accents and ghosts.</strong> ${tp.vel}</span>` : nothing}
            </div>` : nothing}
          <div class="next-row">
            <button class="next" style="height:${stg.h < 300 ? 44 : 52}px;" @click=${() => this.next(x)}>
              ${x.last ? 'Now play it' : `Done, next: ${x.lanes[x.li + 1].label.toLowerCase()}`} →</button>
            ${tp.mapped && low && tp.short ? html`<span class="tips-short">${tp.short}</span>` : nothing}
          </div>
        </div>
        <div class="draw-col">
          <div class="draw" ${ref(this.track('draw'))}>
            <div class="keys-wrap" style="gap:${tall ? 14 : 0}px;">
              ${this.keyGrid(x, false, tall)}${tall ? html`<span class="caption">${keysCap}</span>` : nothing}${x.feel && tall ? feelKey('Accent · hit harder', 'Ghost · barely touch') : nothing}
            </div>
          </div>
          ${tall || stg.h < 420 ? nothing : html`
            <div class="draw-foot">
              <span class="method">${x.dev.id} · ${PLAIN[x.dev.fam]}${x.dev.guess ? ' · suggested mapping' : ''}</span>
            </div>`}
        </div>
      </div>
    `;
  }

  // ---- footer + overlays -----------------------------------------------

  /** Play, then tempo. Phones: a round icon-only Play, with Main · Var · Fill · Chain between it and the tempo. */
  private renderFooter(x: Derived, compact: boolean, prog: boolean) {
    const s = this.s;
    const sub = s.countIn ? 'count-in' : s.playing ? (s.rampBpm ? `ramping ${s.rampBpm} → ${x.bpm}` : `${x.step + 1} / 16`) : prog ? 'hear it' : x.allBeats ? 'whole bar' : 'beat ' + s.beats.map(b => b + 1).join('+');
    const parts = [
      ...x.parts.map(id => ({ label: PART_LABEL[id][0], title: PART_LABEL[id][1], on: !s.chain && s.part === id, click: () => this.setPart(id) })),
      { label: 'Chain', title: 'Loop all bars, variation and fill', on: s.chain, click: () => this.toggleChain() }
    ];
    const cur = parts.find(p => p.on) || parts[0], v = this.vol;
    return html`
      <footer class=${compact ? 'compact' : ''} style="gap:${compact ? 8 : 12}px;padding:${compact ? '8px 16px calc(8px + env(safe-area-inset-bottom))' : '14px 40px'};">
        <button class="play" title="Play / stop (space)" aria-label=${s.playing ? 'Stop' : 'Play'} style="background:${s.playing ? CREAM : ACC};" @click=${() => this.toggle()}>
          ${s.countIn ? html`<span class="ci-n">${s.countIn}</span>` : html`<i class=${s.playing ? 'ico-stop' : 'ico-play'}></i>`}
          ${compact ? nothing : html`${s.playing ? 'Stop' : 'Play'}<span class="spacer"></span><span class="play-sub">${sub}</span>`}
        </button>
        ${compact ? html`
          <button class="part-btn" title="Part" aria-haspopup="true" aria-expanded=${s.partsOpen ? 'true' : 'false'}
            style="background:${s.partsOpen ? CREAM : mix(CREAM, 9)};color:${s.partsOpen ? INK : CREAM};"
            @click=${() => this.set({ partsOpen: !s.partsOpen, volOpen: false })}>
            <span class="part-cur"><i></i><span class="ellip">${cur.label}</span></span>
            <span class="part-chev" style="transform:${s.partsOpen ? 'rotate(225deg)' : 'rotate(45deg)'};margin-top:${s.partsOpen ? 4 : -4}px;"></span>
          </button>
          ${s.partsOpen ? html`
            <div class="parts-pop">
              ${parts.map(p => html`<button title=${p.title} aria-pressed=${p.on ? 'true' : 'false'}
                style="background:${p.on ? INK : 'transparent'};color:${p.on ? CREAM : INK};"
                @click=${() => { if (!p.on) p.click(); this.set({ partsOpen: false }); }}>${p.label}</button>`)}
            </div>` : nothing}` : nothing}
        <div class="vol-wrap">
          <button class="vol-btn" title="Volume" aria-label="Volume" aria-expanded=${s.volOpen ? 'true' : 'false'}
            style="background:${s.volOpen ? CREAM : mix(CREAM, 9)};color:${s.volOpen ? INK : CREAM};"
            @click=${() => this.set({ volOpen: !s.volOpen, partsOpen: false })}>${volIco(v)}</button>
          ${s.volOpen ? html`
            <div class="vol-pop" style="right:${compact ? -110 : 0}px;">
              <button class="mute" @click=${() => this.toggleMute()}>${v > 0 ? 'Mute' : 'Unmute'}</button>
              <input type="range" min="0" max="100" step="1" .value=${live(String(Math.round(v * 100)))} aria-label="Volume"
                style="width:${compact ? 130 : 180}px;" @input=${(e: InputEvent) => this.setVol(+(e.target as HTMLInputElement).value / 100)}>
              <span class="vol-pct">${Math.round(v * 100)}</span>
            </div>` : nothing}
        </div>
        <div class="tempo">
          <button class="round" title="Slower" aria-label="Slower" @click=${() => this.nudgeTempo(-2)}>−</button>
          <span class="bpm">
            <input .value=${live(s.tempoDraft ?? String(s.playing && s.rampBpm ? s.rampBpm : x.bpm))} inputmode="numeric" aria-label="Tempo in BPM"
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
          <div class="ov-bar"><span>${LIB.length} beats · ${s.learned.length} learned</span><button class="ov-close" @click=${() => this.set({ search: false })}>Close</button></div>
          <input id="q" .value=${s.query} placeholder="What beat?" autocomplete="off" style="height:${compact ? 60 : 92}px;font-size:${compact ? 38 : 68}px;"
            @input=${(e: InputEvent) => this.set({ query: (e.target as HTMLInputElement).value })}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' && x.list[0]) this.select(x.list[0].id); }}>
          <div class="genre-bar">
            <button class="genre-btn" aria-expanded=${s.genreOpen ? 'true' : 'false'} style="background:${s.genreOpen ? INK : 'transparent'};color:${s.genreOpen ? CREAM : INK};"
              @click=${() => this.set({ genreOpen: !s.genreOpen })}>
              <span class="genre-lbl">Genre</span>${s.genre === 'ALL' ? 'All' : s.genre}
              <svg viewBox="0 0 12 8" style="transform:${s.genreOpen ? 'rotate(180deg)' : 'none'};" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 1.5 6 6l4.5-4.5"></path></svg>
            </button>
            <span class="spacer"></span>
            <div class="sort">
              ${([['level', 'By level'], ['az', 'A–Z']] as const).map(([id, label]) => html`<button aria-pressed=${s.sort === id ? 'true' : 'false'}
                style="background:${s.sort === id ? INK : 'transparent'};color:${s.sort === id ? CREAM : INK};" @click=${() => this.set({ sort: id })}>${label}</button>`)}
            </div>
            ${s.genre !== 'ALL' ? html`<button class="genre-clear" @click=${() => this.set({ genre: 'ALL', genreOpen: false })}>Clear</button>` : nothing}
          </div>
          ${s.genreOpen ? html`
            <div class="genres">
              ${['ALL', ...x.genres].map(gn => {
                const on = s.genre === gn;
                return html`<button style="background:${on ? INK : 'transparent'};color:${on ? CREAM : INK};" @click=${() => this.set({ genre: gn, genreOpen: false })}>${gn === 'ALL' ? 'All' : gn}</button>`;
              })}
            </div>` : nothing}
        </div>
        <div class="ov-scroll">
          <div style="max-width:880px;margin:0 auto;padding:${compact ? '0 20px 24px' : '0 40px 40px'};box-sizing:border-box;">
            ${x.groups.map(gr => html`
              ${gr.title ? html`<div class="group"><span>${gr.title}</span><small>${gr.learned} of ${gr.items.length} learned</small></div>` : nothing}
              ${gr.items.map(p => html`
                <button class="item" @click=${() => this.select(p.id)}>
                  <span class="item-name-row"><span class="item-name" style="font-size:${compact ? 24 : 30}px;">${p.name}</span>${s.learned.includes(p.id) ? html`<span class="learned-tag">✓ Learned</span>` : nothing}</span>
                  <span class="item-bpm">${p.bpm}<small> BPM</small></span>
                  <span class="item-artist">${p.artist}</span>
                  <span class="item-genre">${gr.title ? '' : LEVELS[levelOf(p)] + ' · '}${p.genre}${p.simp ? ' · simplified' : ''}</span>
                </button>`)}`)}
            ${x.list.length ? nothing : html`<span class="empty">Nothing matches. Try an artist or a genre.</span>`}
          </div>
        </div>
      </section>
    `;
  }

  /** Beat notes: title + level meter, "The sound" / "Try this", feel (swing) and whether it's simplified, then Mark as learned. */
  private renderInfo(x: Derived, compact: boolean) {
    const p = x.base, close = () => this.set({ info: false });
    const lvl = levelOf(p), learned = this.s.learned.includes(p.id);
    const bar = (n: number) => html`<i style="background:${lvl >= n ? ACC : 'var(--line)'};"></i>`;
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
          <div class="info-cols">
            <div class="info-section">
              <span class="info-label">Feel</span>
              <p class="info-tip">${p.sw > 50 ? `Swung, about ${p.sw}%. Every second 16th lands a little late. Turn swing off on the Play tab to hear the difference.` : 'Straight. Every 16th lands on the grid.'}</p>
            </div>
            ${p.simp ? html`
              <div class="info-section">
                <span class="info-label">Simplified</span>
                <p class="info-tip">Reduced to a 16-step pattern${p.bars ? ` across ${p.bars.length + 1} bars` : ''}. The record has more variation and looser timing than shown here.</p>
              </div>` : nothing}
          </div>
          <div class="info-learn">
            <button aria-pressed=${learned ? 'true' : 'false'} style="background:${learned ? ACC : CREAM};" @click=${() => this.toggleLearned(p.id)}>${learned ? '✓ Learned' : 'Mark as learned'}</button>
            <span>${this.s.learned.length} of ${LIB.length} beats learned</span>
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

  /**
   * Machine chooser. Peek (the checkered button, remembered) adds a card with a dithered drawing of the
   * machine; with it on, tapping (or hovering, on desktop) previews a machine and "Use this" picks it.
   */
  private renderRack(x: Derived, compact: boolean, W: number, H: number) {
    const s = this.s, short = H < 700;
    const rd = (s.rackPrev && DEVS.find(d => d.id === s.rackPrev)) || x.dev, isCur = rd.id === x.dev.id;
    const inner = Math.min(W, 980) - (compact ? 40 : 80) - (compact ? 28 : 48);
    const pw = Math.round(inner * (compact ? 0.56 : 0.62)), ph = Math.round(compact ? clamp(H * 0.19, 100, 160) : clamp(H * 0.3, 110, 260));
    const pk = { dev: rd, lk: x.layer.key, pat: x.sel, step: x.step, w: pw, h: ph, theme: s.theme };
    return html`
      <section class="overlay">
        <div class="ov-head" style="max-width:980px;padding:${compact ? '16px 20px 8px' : '36px 40px 12px'};">
          <div class="ov-bar">
            <span>What are you playing on?</span>
            <div class="ov-actions">
              <button class="peek-btn" title="Peek at the hardware" aria-pressed=${s.peek ? 'true' : 'false'}
                style="background:${s.peek ? INK : 'transparent'};color:${s.peek ? CREAM : INK};" @click=${() => this.togglePeek()}>
                <span style="background:repeating-conic-gradient(${s.peek ? CREAM : INK} 0 25%,transparent 0 50%) 0 0/4px 4px;"></span>Peek
              </button>
              <button class="ov-close" @click=${() => this.toggleRack()}>Close</button>
            </div>
          </div>
          ${s.peek ? html`
            <div class="peek" style="gap:${compact ? 14 : 28}px;padding:${compact ? '14px' : '20px 24px'};">
              <div class="peek-info">
                <div class="peek-name">
                  <span class="peek-maker">${rd.maker} · ${FAM[rd.fam].toLowerCase()}</span>
                  <span class="peek-id" style="font-size:${compact ? 22 : 34}px;">${rd.id}</span>
                </div>
                ${isCur
                  ? html`<span class="in-use"><i></i>In use</span>`
                  : html`<button class="use" @click=${() => this.pickDevice(rd.id)}>Use this</button>`}
              </div>
              <div class="peek-art" style="width:${pw}px;height:${ph}px;">
                <canvas ${ref(el => { if (el) peekDraw(el as HTMLCanvasElement, pk); })}></canvas>
              </div>
            </div>` : nothing}
          <input .value=${s.rackQ} placeholder="Search machines" autocomplete="off" style="height:${compact || short ? 48 : 72}px;font-size:${compact || short ? 26 : 44}px;"
            @input=${(e: InputEvent) => this.set({ rackQ: (e.target as HTMLInputElement).value })}>
        </div>
        <div class="ov-scroll">
          <div class="rack-grid" style="padding:${compact ? '0 20px 24px' : '0 40px 40px'};">
            ${x.makers.map(gr => html`
              <div class="maker">
                <span>${gr.maker}</span>
                ${gr.items.map(d => {
                  const on = d.id === x.dev.id, shown = s.peek && d.id === rd.id;
                  return html`<button class="machine" style="background:${on ? INK : 'transparent'};color:${on ? CREAM : INK};border-color:${on || shown ? INK : CREAM};"
                    @click=${() => s.peek ? this.set({ rackPrev: d.id }) : this.pickDevice(d.id)}
                    @mouseenter=${() => { if (s.peek && !compact) this.set({ rackPrev: d.id }); }}>${d.id}<small>${FAM[d.fam].toLowerCase()}</small></button>`;
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
    input::placeholder { color: color-mix(in srgb, var(--ink) 65%, var(--fg)); }
    .ellip { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .spacer { flex: 1; }
    .shape { flex: none; display: block; }

    .frame { height: 100dvh; display: flex; align-items: center; justify-content: center; background: var(--bg2); overflow: hidden; }
    .shell { position: relative; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }

    header { flex: none; display: flex; flex-wrap: wrap; align-items: flex-start; }
    .title-col { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; }
    .sub-line { max-width: 100%; margin-top: 3px; font-size: 12px; font-weight: 600; color: var(--mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .title { max-width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; border: none; background: transparent; padding: 0; text-align: left; color: var(--fg); }
    .title .name-row { max-width: 100%; display: flex; align-items: center; gap: 0.3em; }
    .title .name { min-width: 0; font-family: 'Tilt Warp', sans-serif; line-height: 1.12; padding-bottom: 0.04em; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .chev { flex: none; width: 0.42em; height: 0.28em; margin-top: 0.08em; color: var(--mute); }
    .title .artist { max-width: 100%; font-size: 14px; font-weight: 600; color: var(--mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .title u { text-underline-offset: 3px; }
    .km { min-width: 0; display: flex; align-items: center; }
    .ico-btn { flex: none; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; padding: 0; border: none; border-radius: 50%; background: color-mix(in srgb, var(--fg) 9%, transparent); color: var(--fg); }
    .hd-ico { width: 19px; height: 19px; }
    .icons { flex: none; display: flex; align-items: center; }
    .hd-pill { flex: none; height: 46px; display: flex; align-items: center; gap: 6px; border: 2px solid var(--fg); border-radius: 999px; background: transparent; color: var(--fg); font-size: 14px; font-weight: 700; white-space: nowrap; }
    .device-pill:hover { background: var(--fg); color: var(--ink); }
    .caret { flex: none; width: 9px; height: 6px; }
    .hd-lbl { font-weight: 600; }
    .kit-wrap { position: relative; flex: none; }
    .kit-scrim { position: fixed; inset: 0; z-index: 20; }
    .kit-menu { position: absolute; top: calc(100% + 8px); z-index: 21; min-width: 220px; display: flex; flex-direction: column; padding: 6px; background: var(--fg); color: var(--ink); border-radius: 18px; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35); }
    .kit-menu button { min-height: 44px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 12px; border: none; border-radius: 12px; color: var(--ink); font-size: 15px; font-weight: 700; text-align: left; }
    .kit-menu button:hover { background: color-mix(in srgb, var(--ink) 10%, transparent) !important; }
    .kit-name { display: flex; align-items: baseline; gap: 8px; }
    .kit-name small { font-size: 12px; font-weight: 600; opacity: 0.6; }
    .info-btn { flex: none; display: flex; align-items: center; justify-content: center; padding: 0; border: 2px solid var(--fg); border-radius: 50%; background: transparent; color: var(--fg); font-family: 'Tilt Warp', sans-serif; }
    .info-btn:hover { background: var(--fg); color: var(--ink); }
    .theme-btn { flex: none; display: flex; align-items: center; justify-content: center; padding: 0; border: 2px solid var(--fg); border-radius: 50%; background: transparent; }
    .compact .info-btn, .compact .theme-btn { border-color: transparent; background: color-mix(in srgb, var(--fg) 9%, transparent); }
    .swatch { border-radius: 50%; background: conic-gradient(var(--acc) 0 25%, var(--kick) 0 50%, var(--fg) 0 75%, var(--snareL) 0); }
    .controls { order: 4; flex: 1 0 100%; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .bars-lbl { font-size: 12px; font-weight: 700; color: var(--mute2); }
    .seg { display: flex; gap: 2px; padding: 2px; border-radius: 999px; background: color-mix(in srgb, var(--fg) 9%, transparent); }
    .seg button { padding: 0 12px; border: none; border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }
    .bars-seg { align-items: center; transition: opacity 0.15s; }
    .seg-lbl { padding: 0 6px 0 10px; font-size: 12px; font-weight: 700; color: var(--mute); }

    nav { flex: none; display: flex; align-items: flex-end; border-bottom: 2px solid color-mix(in srgb, var(--fg) 20%, transparent); }
    .mode { display: flex; align-items: baseline; border: none; border-bottom: 6px solid; margin-bottom: -2px; background: transparent; padding: 0; font-family: 'Tilt Warp', sans-serif; white-space: nowrap; }
    .nav-bars { align-self: stretch; display: flex; align-items: center; gap: 8px; padding-bottom: 6px; }
    .nav-bars .seg { flex: none; }
    .beat-tabs { display: flex; align-items: center; gap: 6px; padding-bottom: 10px; }
    .practise-lbl { flex: none; margin-right: 4px; font-size: 12px; font-weight: 700; color: var(--mute); }
    .beat-row .practise-lbl { margin: 0; padding: 0 6px 0 10px; }
    .beat { padding: 0 8px; border: 2px solid var(--fg); border-radius: 999px; font-family: 'Tilt Warp', sans-serif; }

    .stage { position: relative; flex: 1; min-height: 0; box-sizing: border-box; display: flex; flex-direction: column; }

    .beat-row { flex: none; align-items: center; padding: 3px; margin-bottom: 12px; }
    .beat-row button { flex: 1; height: 36px; padding: 0 6px; font-family: 'Tilt Warp', sans-serif; font-weight: 400; }
    .sheet { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; display: flex; flex-direction: column; align-items: center; justify-content: safe center; }
    .sheet > * { flex: none; }
    .practise { flex: none; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .tools { padding: 3px; }
    .tools button { height: 34px; }
    .learned { height: 40px; padding: 0 16px; border: 2px solid; border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }
    .feel-key { flex: none; display: flex; align-items: center; gap: 14px; font-size: 12px; font-weight: 700; color: var(--mute); white-space: nowrap; }
    .feel-key > span { display: flex; align-items: center; gap: 6px; }
    .feel-key i { width: 14px; height: 14px; border-radius: 4px; }
    .fk-acc { background: var(--fg); box-shadow: inset 0 0 0 3px var(--acc); }
    .fk-ghost { background: color-mix(in srgb, var(--fg) 42%, transparent); }
    .prog-m-foot .feel-key { gap: 12px; }
    .prog-m-foot .feel-key > span { gap: 5px; }
    .score { display: grid; }
    .score > span { display: flex; align-items: center; justify-content: center; min-width: 0; overflow: hidden; white-space: nowrap; }
    .count { border-radius: 999px; }
    .lane-label { gap: 8px; font-family: 'Tilt Warp', sans-serif; color: var(--fg); }

    .draw { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
    .keys { display: grid; }
    .key { display: flex; align-items: center; justify-content: center; border: 2px solid; box-sizing: border-box; font-family: 'Tilt Warp', sans-serif; }
    .drum { min-width: 0; display: flex; align-items: center; justify-content: center; font-family: 'Tilt Warp', sans-serif; }
    .drum .mark { flex: none; font-family: 'Host Grotesk', sans-serif; font-weight: 700; }

    .prog-m { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 10px; }
    .pills-m { flex: none; display: grid; gap: 2px; padding: 3px; border-radius: 20px; background: color-mix(in srgb, var(--fg) 9%, transparent); }
    .drum-m { height: 36px; gap: 5px; padding: 0 6px; border: none; border-radius: 999px; font-size: 15px; }
    .drum-m .mark { font-size: 11px; }
    .perc-m { min-width: 0; height: 36px; padding: 0 8px; border: none; border-radius: 999px; background: transparent; color: var(--mute); font-size: 13px; font-weight: 700; white-space: nowrap; }
    .tips-m { flex: none; font-size: 13px; font-weight: 600; line-height: 1.35; color: var(--mute); text-wrap: pretty; }
    .prog-m-foot { flex: none; min-height: 36px; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; font-weight: 600; color: var(--mute); }
    .hold { min-width: 0; display: flex; align-items: center; gap: 8px; white-space: nowrap; }
    .hold-key { height: 28px; display: flex; align-items: center; padding: 0 10px; border-radius: 999px; background: var(--acc); color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 15px; }

    .prog-d { flex: 1; min-height: 0; display: flex; gap: 48px; }
    .sentence-col { flex: 1.25 1 0; min-width: 0; min-height: 0; overflow-y: auto; scrollbar-width: none; display: flex; flex-direction: column; justify-content: safe center; }
    .pills-d { display: flex; gap: 6px; padding: 5px; border-radius: 22px; background: color-mix(in srgb, var(--fg) 7%, transparent); }
    .drum-d { flex: var(--drum-flex, 1 1 110px); height: var(--drum-h, 52px); gap: 8px; padding: 0 8px; border: none; border-radius: 17px; font-size: 17px; }
    .drum-d .mark { font-size: 12px; opacity: 0.7; }
    .sentence { display: flex; flex-wrap: wrap; align-items: center; font-family: 'Tilt Warp', sans-serif; line-height: 1.05; color: var(--fg); }
    .press { flex: 1 0 100%; display: flex; flex-wrap: wrap; }
    .tips { max-width: 560px; display: flex; flex-direction: column; gap: 6px; font-size: 16px; font-weight: 500; line-height: 1.45; color: var(--mute); text-wrap: pretty; }
    .tips strong { color: var(--fg); }
    .next-row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
    .tips-short { font-size: 14px; font-weight: 600; line-height: 1.35; color: var(--mute); }
    .chip { display: flex; align-items: center; border-radius: 999px; color: var(--ink); box-sizing: border-box; }
    .chip-acc { background: var(--acc); }
    .chip-num { justify-content: center; padding: 0 4px; border: 3px solid; }
    .unmapped { font-family: 'Tilt Warp', sans-serif; line-height: 1.1; color: var(--fg); text-wrap: pretty; }
    .unmapped span { display: block; margin-top: 12px; font-family: 'Host Grotesk', sans-serif; font-size: 17px; font-weight: 500; color: var(--mute); }
    .next { padding: 0 24px; border: none; border-radius: 999px; background: var(--fg); color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 18px; white-space: nowrap; }
    .next:hover { background: var(--acc); }
    .draw-col { flex: 1 1 0; min-width: 0; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
    .keys-wrap { display: flex; flex-direction: column; align-items: center; }
    .caption { font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: var(--mute); }
    .draw-foot { flex: none; display: flex; align-items: center; gap: 10px; }
    .method { flex: 1; min-width: 0; font-size: 13px; font-weight: 500; line-height: 17px; color: var(--mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    footer { flex: none; display: flex; align-items: center; background: var(--ink); color: var(--fg); }
    .play { flex: 1; min-width: 0; height: 52px; display: flex; align-items: center; gap: 14px; padding: 0 22px; border: none; border-radius: 999px; color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 20px; }
    .ico-play { width: 15px; height: 17px; background: currentColor; clip-path: polygon(0 0, 100% 50%, 0 100%); }
    .ico-stop { width: 14px; height: 14px; background: currentColor; }
    .ci-n { flex: none; min-width: 17px; font-family: 'Tilt Warp', sans-serif; font-size: 22px; line-height: 1; text-align: center; }
    .play-sub { font-family: 'Host Grotesk', sans-serif; font-size: 13px; font-weight: 600; white-space: nowrap; }
    .compact .play { flex: none; width: 52px; justify-content: center; padding: 0; }
    .compact .ico-play { margin-left: 3px; }
    footer { position: relative; }
    .part-btn { flex: 1; min-width: 0; height: 44px; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 16px; border: none; border-radius: 999px; font-size: 14px; font-weight: 700; }
    .part-cur { min-width: 0; display: flex; align-items: center; gap: 8px; }
    .part-cur i { flex: none; width: 7px; height: 7px; border-radius: 50%; background: var(--acc); }
    .part-chev { flex: none; width: 9px; height: 9px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; box-sizing: border-box; transition: transform 0.2s; }
    @keyframes pill-up { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: none; } }
    .parts-pop { position: absolute; left: 12px; right: 12px; bottom: calc(100% + 10px); z-index: 20; display: flex; gap: 4px; padding: 5px; border-radius: 999px; background: var(--fg); box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4); animation: pill-up 0.26s cubic-bezier(0.2, 0.9, 0.3, 1.15) both; }
    .parts-pop button { flex: 1; min-width: 0; height: 46px; padding: 0 4px; border: none; border-radius: 999px; font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .vol-wrap { flex: none; position: relative; display: flex; }
    .vol-btn { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; padding: 0; border: none; border-radius: 50%; }
    .vol-ico { width: 22px; height: 22px; }
    .vol-pop { position: absolute; bottom: calc(100% + 12px); z-index: 20; display: flex; align-items: center; gap: 12px; padding: 10px 16px 10px 10px; border-radius: 999px; background: var(--fg); color: var(--ink); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35); }
    .mute { flex: none; height: 32px; padding: 0 12px; border: none; border-radius: 999px; background: var(--ink); color: var(--fg); font-size: 12px; font-weight: 700; }
    .vol-pop input { height: 32px; margin: 0; accent-color: var(--ink); cursor: pointer; }
    .vol-pct { min-width: 30px; text-align: right; font-family: 'Tilt Warp', sans-serif; font-size: 16px; }
    @media (prefers-reduced-motion: reduce) { .parts-pop { animation: none; } }
    .tempo { flex: none; display: flex; align-items: center; gap: 4px; }
    .round { width: 44px; height: 44px; padding: 0; border: 2px solid var(--line); border-radius: 50%; background: transparent; color: var(--fg); font-size: 20px; }
    .compact .tempo { gap: 0; }
    .compact .round { width: 30px; border: none; background: color-mix(in srgb, var(--fg) 9%, transparent); }
    .compact .bpm { min-width: 42px; }
    .compact .bpm input { width: 42px; font-size: 20px; }
    .bpm { min-width: 56px; display: flex; flex-direction: column; align-items: center; line-height: 1; }
    .bpm input { width: 58px; height: 30px; padding: 0; border: none; border-bottom: 2px dashed var(--line); border-radius: 0; background: transparent; color: var(--fg); font-family: 'Tilt Warp', sans-serif; font-size: 24px; text-align: center; outline: none; }
    .bpm input:focus { border-bottom: 2px solid var(--acc); }
    .bpm small { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: var(--mute2); }

    .overlay { position: absolute; inset: 0; z-index: 10; background: var(--fg); color: var(--ink); display: flex; flex-direction: column; }
    .ov-head { flex: none; width: 100%; margin: 0 auto; box-sizing: border-box; display: flex; flex-direction: column; gap: 14px; }
    .ov-bar { display: flex; align-items: center; justify-content: space-between; font-size: 14px; font-weight: 700; }
    .ov-close { height: 44px; padding: 0 18px; border: 2px solid var(--ink); border-radius: 999px; background: transparent; color: var(--ink); font-size: 14px; font-weight: 700; }
    .ov-close-dark { border-color: var(--fg); color: var(--fg); }
    .ov-actions { display: flex; align-items: center; gap: 8px; }
    .peek-btn { flex: none; height: 44px; display: flex; align-items: center; gap: 8px; padding: 0 16px 0 14px; border: 2px solid var(--ink); border-radius: 999px; font-size: 14px; font-weight: 700; }
    .peek-btn span { flex: none; width: 16px; height: 16px; border-radius: 3px; }
    .peek { display: flex; align-items: center; border-radius: 22px; background: var(--ink); color: var(--fg); }
    .peek-info { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
    .peek-name { max-width: 100%; display: flex; flex-direction: column; gap: 4px; }
    .peek-maker { font-size: 12px; font-weight: 700; color: var(--mute); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .peek-id { font-family: 'Tilt Warp', sans-serif; line-height: 1.05; text-wrap: balance; overflow-wrap: anywhere; }
    .in-use { height: 32px; display: flex; align-items: center; gap: 8px; padding: 0 12px; border-radius: 999px; background: color-mix(in srgb, var(--fg) 10%, transparent); font-size: 12px; font-weight: 700; white-space: nowrap; }
    .in-use i { width: 7px; height: 7px; border-radius: 50%; background: var(--acc); }
    .use { height: 40px; padding: 0 16px; border: none; border-radius: 999px; background: var(--acc); color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 15px; white-space: nowrap; }
    .peek-art { flex: none; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: repeating-conic-gradient(color-mix(in srgb, var(--fg) 10%, transparent) 0 25%, transparent 0 50%) 0 0/4px 4px; }
    .peek-art canvas { display: block; image-rendering: pixelated; }
    .overlay input { border: none; border-bottom: 3px solid var(--bg); background: transparent; padding: 0; font-family: 'Tilt Warp', sans-serif; color: var(--bg); outline: none; min-width: 0; }
    .genre-bar { display: flex; align-items: center; gap: 10px; }
    .genre-btn { height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 16px; border: 2px solid var(--ink); border-radius: 999px; font-size: 14px; font-weight: 700; }
    .genre-btn svg { width: 10px; height: 7px; transition: transform 0.15s; }
    .genre-lbl { font-weight: 600; opacity: 0.7; }
    .genre-clear { height: 40px; padding: 0 4px; border: none; background: transparent; color: var(--ink); font-size: 13px; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
    .sort { order: 3; display: flex; gap: 2px; padding: 3px; border: 2px solid var(--ink); border-radius: 999px; }
    .sort button { height: 30px; padding: 0 12px; border: none; border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }
    .genres { display: flex; flex-wrap: wrap; gap: 6px; }
    .genres button { flex: none; height: 36px; padding: 0 14px; border: 2px solid var(--ink); border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; }
    .ov-scroll { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; }
    .item { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 2px 16px; padding: 14px 0; border: none; border-bottom: 2px solid var(--div); background: transparent; color: var(--ink); text-align: left; }
    .item:hover { color: var(--bg); }
    .group { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 26px 0 8px; border-bottom: 3px solid var(--ink); }
    .group span { font-family: 'Tilt Warp', sans-serif; font-size: 22px; }
    .group small { font-size: 13px; font-weight: 700; }
    .item-name-row { min-width: 0; display: flex; align-items: center; gap: 10px; }
    .learned-tag { flex: none; height: 24px; display: flex; align-items: center; padding: 0 9px; border-radius: 999px; background: var(--ink); color: var(--fg); font-size: 11px; font-weight: 700; }
    .item-name { min-width: 0; font-family: 'Tilt Warp', sans-serif; line-height: 1.12; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .item-bpm { font-family: 'Tilt Warp', sans-serif; font-size: 18px; white-space: nowrap; }
    .item-bpm small, .machine small { font-family: 'Host Grotesk', sans-serif; font-size: 11px; font-weight: 700; }
    .item-artist { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .item-genre { font-size: 12px; font-weight: 700; text-align: right; white-space: nowrap; }
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
    .info-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--acc); text-transform: uppercase; }
    .info-sound { margin: 0; font-size: 19px; line-height: 1.4; text-wrap: pretty; }
    .info-tip { margin: 0; font-size: 17px; line-height: 1.45; color: var(--mute); text-wrap: pretty; }
    .info-learn { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; padding-top: 20px; border-top: 1px solid var(--line); font-size: 14px; font-weight: 600; color: var(--mute); }
    .info-learn button { height: 48px; padding: 0 22px; border: none; border-radius: 999px; color: var(--ink); font-family: 'Tilt Warp', sans-serif; font-size: 17px; white-space: nowrap; }

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

