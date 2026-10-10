import { describe, it } from 'node:test';
import assert from 'node:assert';
import { barsOf, chainOf, DEVS, INST, LIB, partData } from '../src/cue/data/library.ts';
import { drawDevice } from '../src/cue/data/drawings.ts';
import { commitTempo, derive, initState, selectPattern, tick, toggleBeat, type State } from '../src/cue/model.ts';
import { KITS, kitFor } from '../src/cue/engine/audio.ts';

const state = (patch: Partial<State> = {}): State => ({ ...initState('aubergine'), device: DEVS[0].id, ...patch });

describe('Cue library data', () => {
  it('every pattern has 16 steps in every lane, for every part', () => {
    for (const p of LIB) {
      for (const part of ['MAIN', 'VAR', 'FILL'] as const) {
        for (let bar = 0; bar < barsOf(p, part); bar++) {
          const d = partData(p, part, bar);
          for (const i of INST) assert.match(d[i.key], /^[xXg.]{16}$/, `${p.id} ${part} bar ${bar + 1} ${i.key}`);
        }
      }
    }
  });

  it('has comprehensive catalogue with rich metadata and hands', () => {
    assert.ok(LIB.length >= 130, `Catalogue has ${LIB.length} patterns`);
    for (const p of LIB) {
      assert.ok(p.difficulty, `${p.id} missing difficulty`);
      assert.ok(p.gear, `${p.id} missing gear`);
      assert.ok(p.tip, `${p.id} missing tip`);
      assert.ok(p.hands, `${p.id} missing hands`);
    }
  });

  it('has unique pattern and device ids', () => {
    assert.strictEqual(new Set(LIB.map(p => p.id)).size, LIB.length);
    assert.strictEqual(new Set(DEVS.map(d => d.id)).size, DEVS.length);
  });

  it('maps the core four drums on every machine', () => {
    for (const d of DEVS) for (const k of ['k', 's', 'h', 'o'] as const) assert.ok(d.map[k], `${d.id} ${k}`);
  });

  it('extends pad machines past the core four (A5…A11)', () => {
    const sp = DEVS.find(d => d.id === 'SP-404MKII')!;
    assert.strictEqual(sp.map.c, 'A5');
    assert.strictEqual(sp.map.y, 'A11');
    assert.strictEqual(DEVS.find(d => d.id === 'MPC ONE+')!.map.c, 'A05');
  });

  it('draws 16 step keys for every machine', () => {
    for (const d of DEVS) {
      const keys = drawDevice(d, 'k').P.filter(p => p.t === 'key');
      assert.deepStrictEqual(keys.map(k => k.step), [...Array(16).keys()], d.id);
    }
  });

  it('chains main, main, var (when there is one), fill for one-bar beats', () => {
    const one = LIB.filter(p => !p.bars);
    const withVar = one.find(p => p.var)!, noVar = one.find(p => !p.var)!;
    assert.deepStrictEqual(chainOf(withVar), [['MAIN', 0], ['MAIN', 0], ['VAR', 0], ['FILL', 0]]);
    assert.deepStrictEqual(chainOf(noVar), [['MAIN', 0], ['MAIN', 0], ['MAIN', 0], ['FILL', 0]]);
  });

  it('chains every main bar, then var and fill, for multi-bar beats', () => {
    assert.deepStrictEqual(chainOf(LIB.find(p => p.id === 'amen')!), [['MAIN', 0], ['MAIN', 1], ['MAIN', 2], ['MAIN', 3], ['VAR', 0], ['FILL', 0]]);
    assert.deepStrictEqual(chainOf(LIB.find(p => p.id === 'billie')!), [['MAIN', 0], ['MAIN', 1], ['MAIN', 2], ['MAIN', 3], ['FILL', 0]]);
  });

  it('gives only Main extra bars, and keeps unlisted lanes from bar 1', () => {
    const amen = LIB.find(p => p.id === 'amen')!;
    assert.strictEqual(barsOf(amen, 'MAIN'), 4);
    assert.strictEqual(barsOf(amen, 'VAR'), 1);
    assert.strictEqual(barsOf(LIB.find(p => p.id === 'levee')!, 'MAIN'), 2);
    assert.strictEqual(barsOf(LIB.find(p => p.id === 'apache')!, 'MAIN'), 1);
    assert.strictEqual(partData(amen, 'MAIN', 1).h, amen.h);
    assert.notStrictEqual(partData(amen, 'MAIN', 2).k, amen.k);
  });

  it('adds the TR-808, TR-909 and RD-78', () => {
    for (const id of ['TR-808', 'TR-909', 'RD-78']) assert.ok(DEVS.find(d => d.id === id), id);
    const rd78 = DEVS.find(d => d.id === 'RD-78')!;
    assert.strictEqual(rd78.map.o, 'CY');
    assert.strictEqual(rd78.map.t, undefined, 'RD-78 has no toms');
  });
});

describe('Cue model', () => {
  it('shows only lanes with hits, and percussion only when asked', () => {
    const apache = state({ selectedId: 'apache' });
    assert.deepStrictEqual(derive(apache).lanes.map(l => l.key), ['k', 's', 'h']);
    assert.strictEqual(derive(apache).extraN, 2);
    assert.deepStrictEqual(derive({ ...apache, perc: true }).lanes.map(l => l.key), ['k', 's', 'h', 't', 'b']);
  });

  it('offers Var only for patterns that have a variation bar', () => {
    assert.deepStrictEqual(derive(state({ selectedId: 'billie' })).parts, ['MAIN', 'FILL']);
    assert.deepStrictEqual(derive(state({ selectedId: 'amen' })).parts, ['MAIN', 'VAR', 'FILL']);
  });

  it('shows the Accent / Ghost key only when a shown lane has dynamics', () => {
    assert.strictEqual(derive(state({ selectedId: 'amen' })).feel, true);
    assert.strictEqual(derive(state({ selectedId: 'bossa' })).feel, false);
  });

  it('searches name, artist and genre', () => {
    assert.deepStrictEqual(derive(state({ query: 'james brown' })).list.map(p => p.id).sort(), ['coldsweat', 'funky', 'giveitup']);
    assert.ok(derive(state({ query: 'zzz' })).list.length === 0);
  });

  it('picking a pattern resets to the main part on its first lane', () => {
    const p = selectPattern('onedrop');
    assert.strictEqual(p.part, 'MAIN');
    assert.strictEqual(p.layer, 'k');
    assert.strictEqual(p.search, false);
  });

  it('focus: isolate, combine, and fall back to the whole bar', () => {
    assert.deepStrictEqual(toggleBeat([0, 1, 2, 3], 2), [2]);
    assert.deepStrictEqual(toggleBeat([2], 0), [0, 2]);
    assert.deepStrictEqual(toggleBeat([0, 2], 0), [2]);
    assert.deepStrictEqual(toggleBeat([2], 2), [0, 1, 2, 3]);
  });

  it('play loops only the focused beats', () => {
    let s = state({ mode: 'play', beats: [1], playing: true, step: -1 });
    const seen: number[] = [];
    for (let i = 0; i < 6; i++) { s = { ...s, ...tick(s) }; seen.push(s.step); }
    assert.deepStrictEqual(seen, [4, 5, 6, 7, 4, 5]);
  });

  it('program always plays the whole bar', () => {
    const s = state({ mode: 'program', beats: [1], step: 15 });
    assert.strictEqual(tick(s).step, 0);
  });

  it('chain advances a bar at each wrap', () => {
    let s = state({ selectedId: 'amen', chain: true, step: -1 });
    const parts: string[] = [];
    for (let i = 0; i < 16 * 4 + 1; i++) { s = { ...s, ...tick(s) }; if (s.step === 0) parts.push(s.part); }
    assert.deepStrictEqual(parts, ['MAIN', 'MAIN', 'MAIN', 'MAIN', 'VAR']);
  });

  it('chain walks every main bar of a multi-bar beat', () => {
    let s = state({ selectedId: 'amen', chain: true, step: -1 });
    const seen: string[] = [];
    for (let i = 0; i < 16 * 6 + 1; i++) { s = { ...s, ...tick(s) }; if (s.step === 0) seen.push(s.part + s.pg); }
    assert.deepStrictEqual(seen, ['MAIN0', 'MAIN1', 'MAIN2', 'MAIN3', 'VAR0', 'FILL0', 'MAIN0']);
  });

  it('play loops through every bar of the part; program stays on the chosen bar', () => {
    let s = state({ selectedId: 'levee', mode: 'play', step: -1 });
    const bars: number[] = [];
    for (let i = 0; i < 16 * 3 + 1; i++) { s = { ...s, ...tick(s) }; if (s.step === 0) bars.push(s.pg); }
    assert.deepStrictEqual(bars, [0, 1, 0, 1]);
    let p = state({ selectedId: 'levee', mode: 'program', pg: 1, step: -1 });
    for (let i = 0; i < 40; i++) p = { ...p, ...tick(p) };
    assert.strictEqual(p.pg, 1);
  });

  it('shows the chosen main bar', () => {
    const amen = LIB.find(p => p.id === 'amen')!;
    assert.strictEqual(derive(state({ selectedId: 'amen', pg: 2 })).sel.k, partData(amen, 'MAIN', 2).k);
    assert.strictEqual(derive(state({ selectedId: 'amen' })).barsN, 4);
    assert.strictEqual(derive(state({ selectedId: 'amen', part: 'FILL' })).barsN, 1);
    assert.strictEqual(derive(state({ selectedId: 'amen' })).chainN, 6);
  });

  it('starts each beat on the kit that suits its genre, and remembers a picked one', () => {
    const genreKit = (genre: string) => kitFor({ ...LIB[0], genre }).id;
    assert.strictEqual(genreKit('Trap'), '808');
    assert.strictEqual(genreKit('House'), '909');
    assert.strictEqual(genreKit('Lo-Fi'), 'dusty');
    assert.strictEqual(genreKit('Reggaeton'), 'dancehall');
    assert.strictEqual(genreKit('Funk'), 'acoustic');
    const s = state({ selectedId: 'amen' });
    assert.strictEqual(derive(s).kit.id, kitFor(derive(s).base).id);
    assert.strictEqual(derive({ ...s, kit: '808' }).kit.id, '808');
    assert.strictEqual(KITS.length, 5);
  });

  it('picking a pattern goes back to its own tempo and kit', () => {
    const p = selectPattern('amen');
    assert.strictEqual(p.tempo, null);
    assert.strictEqual(p.kit, null);
    assert.strictEqual(p.tempoDraft, null);
    assert.strictEqual(p.kitMenu, false);
  });

  it('typed tempo is clamped to 40–220, and junk keeps the current tempo', () => {
    assert.deepStrictEqual(commitTempo('140'), { tempo: 140, tempoDraft: null });
    assert.deepStrictEqual(commitTempo('999'), { tempo: 220, tempoDraft: null });
    assert.deepStrictEqual(commitTempo('5'), { tempo: 40, tempoDraft: null });
    assert.deepStrictEqual(commitTempo(''), { tempoDraft: null });
  });
});
