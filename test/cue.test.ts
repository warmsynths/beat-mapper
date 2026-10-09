import { describe, it } from 'node:test';
import assert from 'node:assert';
import { chainOf, DEVS, INST, LIB, partData } from '../src/cue/data/library.ts';
import { drawDevice } from '../src/cue/data/drawings.ts';
import { derive, initState, selectPattern, tick, toggleBeat, type State } from '../src/cue/model.ts';

const state = (patch: Partial<State> = {}): State => ({ ...initState('aubergine'), device: DEVS[0].id, ...patch });

describe('Cue library data', () => {
  it('every pattern has 16 steps in every lane, for every part', () => {
    for (const p of LIB) {
      for (const part of ['MAIN', 'VAR', 'FILL'] as const) {
        const d = partData(p, part);
        for (const i of INST) assert.match(d[i.key], /^[xXg.]{16}$/, `${p.id} ${part} ${i.key}`);
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

  it('chains main, main, var (when there is one), fill', () => {
    assert.deepStrictEqual(chainOf(LIB.find(p => p.id === 'amen')!), ['MAIN', 'MAIN', 'VAR', 'FILL']);
    assert.deepStrictEqual(chainOf(LIB.find(p => p.id === 'billie')!), ['MAIN', 'MAIN', 'MAIN', 'FILL']);
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
    assert.deepStrictEqual(parts, ['MAIN', 'MAIN', 'VAR', 'FILL', 'MAIN']);
  });
});
