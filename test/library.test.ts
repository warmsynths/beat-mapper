import { describe, it } from 'node:test';
import assert from 'node:assert';
import { PATTERNS } from '../src/library/patterns.ts';
import {
  DENSITIES,
  EMPTY_FILTER,
  FEELS,
  GENRES,
  densityOf,
  filterPatterns,
  normalizeLane,
  patternBars,
  toQuantizedPattern,
} from '../src/library/pattern.ts';
import { STEPS_PER_BAR } from '../src/audio/quantize.ts';
import { sp404mkiiConfig } from '../src/devices/sp404mkii.ts';
import { po33Config } from '../src/devices/po33.ts';

describe('Pattern library data', () => {
  it('has unique ids and unique grooves', () => {
    assert.strictEqual(new Set(PATTERNS.map((p) => p.id)).size, PATTERNS.length);
    const grooves = PATTERNS.map((p) => Object.values(p.lanes).map(normalizeLane).join('|'));
    assert.strictEqual(new Set(grooves).size, PATTERNS.length);
  });

  it('every pattern is well-formed', () => {
    for (const p of PATTERNS) {
      const lens = Object.values(p.lanes).map((l) => normalizeLane(l).length);
      assert.ok(lens.every((n) => n === lens[0]), `${p.id}: lanes differ in length`);
      assert.ok(lens[0] > 0 && lens[0] % STEPS_PER_BAR === 0, `${p.id}: not a whole number of bars`);
      for (const l of Object.values(p.lanes)) assert.match(normalizeLane(l), /^[x-]+$/, `${p.id}: bad lane chars`);
      assert.ok((GENRES as readonly string[]).includes(p.genre), `${p.id}: unknown genre`);
      assert.ok((FEELS as readonly string[]).includes(p.feel), `${p.id}: unknown feel`);
      const [lo, hi] = p.bpmRange;
      assert.ok(lo <= p.bpm && p.bpm <= hi, `${p.id}: bpm outside its range`);
      assert.ok(lo >= 60 && hi <= 180, `${p.id}: range outside the app's 60-180 BPM bounds`);
      assert.ok(Object.values(p.lanes).some((l) => l.includes('x')), `${p.id}: empty pattern`);
    }
  });

  it('every genre has at least one pattern', () => {
    for (const g of GENRES) assert.ok(PATTERNS.some((p) => p.genre === g), `no patterns for ${g}`);
  });
});

describe('Library filtering', () => {
  it('returns everything with an empty filter', () => {
    assert.strictEqual(filterPatterns(PATTERNS, EMPTY_FILTER).length, PATTERNS.length);
  });

  it('filters by genre, feel and density together', () => {
    const out = filterPatterns(PATTERNS, { ...EMPTY_FILTER, genre: 'trap', feel: 'half-time' });
    assert.ok(out.length > 0 && out.every((p) => p.genre === 'trap' && p.feel === 'half-time'));
    for (const d of DENSITIES) {
      const byDensity = filterPatterns(PATTERNS, { ...EMPTY_FILTER, density: d });
      assert.ok(byDensity.every((p) => densityOf(p) === d));
    }
  });

  it('searches name, genre and tags case-insensitively', () => {
    assert.ok(filterPatterns(PATTERNS, { ...EMPTY_FILTER, query: 'DEMBOW' }).some((p) => p.id === 'reggaeton-dembow'));
    assert.ok(filterPatterns(PATTERNS, { ...EMPTY_FILTER, query: 'jungle' }).some((p) => p.id === 'dnb-amen'));
    assert.strictEqual(filterPatterns(PATTERNS, { ...EMPTY_FILTER, query: 'zzzz-nothing' }).length, 0);
  });
});

describe('Device mapping', () => {
  const fourFloor = PATTERNS.find((p) => p.id === 'house-four-floor')!;

  it('routes each lane through the device classMapping', () => {
    const q = toQuantizedPattern(fourFloor, sp404mkiiConfig);
    assert.strictEqual(q.totalSteps, STEPS_PER_BAR);
    const kicks = q.steps.filter((s) => s.class === 'kick');
    assert.deepStrictEqual(kicks.map((s) => s.step), [0, 4, 8, 12]);
    assert.ok(kicks.every((s) => s.controlLabel === '1'));
    assert.ok(q.steps.filter((s) => s.class === 'snare').every((s) => s.controlLabel === '2'));
  });

  it('maps the same pattern onto a different device', () => {
    const q = toQuantizedPattern(fourFloor, po33Config);
    assert.ok(q.steps.filter((s) => s.class === 'hat').every((s) => s.controlLabel === '3'));
  });

  it('reports the full length of multi-bar patterns', () => {
    const twoBar = PATTERNS.find((p) => patternBars(p) === 2)!;
    assert.strictEqual(toQuantizedPattern(twoBar, sp404mkiiConfig).totalSteps, 32);
  });
});
