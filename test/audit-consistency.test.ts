import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { LIB } from '../src/cue/data/library.ts';

const require = createRequire(import.meta.url);
const fullAudit = require('../.scratch/full_audit_database.cjs');
const AUDIT = fullAudit.FULL_AUDIT_DATA;

const STEP_NAMES = [
  '1', '1-e', '1-&', '1-a',
  '2', '2-e', '2-&', '2-a',
  '3', '3-e', '3-&', '3-a',
  '4', '4-e', '4-&', '4-a'
];

function laneHits(pattern: string): string[] {
  const hits: string[] = [];
  for (let i = 0; i < 16; i++) {
    if (pattern[i] && pattern[i] !== '.') hits.push(STEP_NAMES[i]);
  }
  return hits;
}

describe('Audit & Primary Source Ground Truth Verification', () => {
  it('covers all 135 beats with verified references and personnel', () => {
    assert.strictEqual(LIB.length, 135);
    for (const p of LIB) {
      const a = AUDIT[p.id];
      assert.ok(a, `Beat ${p.id} missing from audit database`);
      assert.ok(a.refSong, `Beat ${p.id} missing refSong`);
      assert.ok(a.refDrummer, `Beat ${p.id} missing refDrummer`);
      assert.ok(a.recordReality, `Beat ${p.id} missing recordReality`);
      assert.ok(a.transcriptionNotes, `Beat ${p.id} missing transcriptionNotes`);
      assert.ok(a.sources && a.sources.length >= 1, `Beat ${p.id} needs at least 1 verified source`);
    }
  });

  it('proves Purdie Shuffle is an authentic half-time shuffle with backbeat on beat 3', () => {
    const p = LIB.find(x => x.id === 'purdie')!;
    assert.ok(p, 'purdie exists');
    // Accented backbeat 'X' on snare MUST be on step 9 (beat 3, 0-indexed 8)
    assert.strictEqual(p.s[8], 'X', 'Purdie shuffle backbeat must be on step 9 (beat 3)');
    assert.strictEqual(p.s[4], '.', 'Purdie shuffle step 5 (beat 2) must not be an accented backbeat');
    assert.strictEqual(p.s[12], '.', 'Purdie shuffle step 13 (beat 4) must not be an accented backbeat');
    assert.strictEqual(p.k[0], 'X', 'Kick downbeat on 1');
  });

  it('verifies Funky Drummer against Clyde Stubblefield master notation', () => {
    const p = LIB.find(x => x.id === 'funky')!;
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '1-&', '3-&', '4-e']);
    const openHats = laneHits(p.o);
    assert.deepStrictEqual(openHats, ['2-a']);
    assert.strictEqual(p.s[4], 'X', 'Snare backbeat on 2');
    assert.strictEqual(p.s[12], 'X', 'Snare backbeat on 4');
  });

  it('verifies Impeach the President against Steve Williams recording', () => {
    const p = LIB.find(x => x.id === 'impeach')!;
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '2-a', '3-&']);
    const openHats = laneHits(p.o);
    assert.deepStrictEqual(openHats, ['4-&']);
    assert.ok(p.gear?.includes('Steve Williams'), 'Credits Steve Williams on drums');
  });

  it('verifies When the Levee Breaks against John Bonham Ludwig kit pattern', () => {
    const p = LIB.find(x => x.id === 'levee')!;
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '1-e', '2-a', '3-&', '3-a']);
    assert.strictEqual(p.s[4], 'X', 'Snare backbeat on 2');
    assert.strictEqual(p.s[12], 'X', 'Snare backbeat on 4');
  });

  it('verifies Apache against Jim Gordon galloping kick pattern', () => {
    const p = LIB.find(x => x.id === 'apache')!;
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '2-a', '3', '3-&']);
  });

  it('verifies Walk This Way against Joey Kramer intro open hats', () => {
    const p = LIB.find(x => x.id === 'walkthisway')!;
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '2', '2-&', '3', '4', '4-&']);
    const openHats = laneHits(p.o);
    assert.deepStrictEqual(openHats, ['2-a', '4-a']);
  });

  it('verifies Billie Jean against Ndugu Chancler groove', () => {
    const p = LIB.find(x => x.id === 'billie')!;
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '3']);
    assert.strictEqual(p.s[4], 'X');
    assert.strictEqual(p.s[12], 'X');
    assert.strictEqual(p.h, 'x.x.x.x.x.x.x.x.');
  });

  it('verifies I\'m Glad You\'re Mine against Howard Grimes syncopated cross-stick groove', () => {
    const p = LIB.find(x => x.id === 'imglad')!;
    assert.ok(p, 'imglad exists');
    assert.ok(p.artist.includes('Howard Grimes'), 'Credits Howard Grimes');
    const snares = laneHits(p.s);
    assert.deepStrictEqual(snares, ['2', '2-a', '3-e', '4', '4-e', '4-a']);
    assert.strictEqual(p.s[4], 'X', 'Snare backbeat accent on 2');
    assert.strictEqual(p.s[12], 'X', 'Snare backbeat accent on 4');
    assert.strictEqual(p.k[0], 'X', 'Kick downbeat on 1');
    assert.strictEqual(p.k[11], 'x', 'Kick push on 3-a');
    assert.strictEqual(p.bars?.length, 1, 'Includes bar 2 turnaround');
  });

  it('verifies Long Red against N.D. Smart II Woodstock breakbeat transcription', () => {
    const p = LIB.find(x => x.id === 'longred')!;
    assert.ok(p, 'longred exists');
    assert.strictEqual(p.bpm, 92, 'BPM is 92');
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '1-&', '2-a', '3-e', '3-&']);
    assert.strictEqual(p.s[4], 'X', 'Snare backbeat accent on 2');
    assert.strictEqual(p.s[12], 'X', 'Snare backbeat accent on 4');
    assert.strictEqual(p.h, 'x.x.x.x.x.x.x.x.');
    assert.strictEqual(p.bars?.length, 1, 'Includes 2-bar variation with 2-e push');
    const bar2Kicks = laneHits(p.bars![0].k);
    assert.deepStrictEqual(bar2Kicks, ['1', '1-&', '2-e', '2-a', '3-e', '3-&']);
  });

  it('verifies The Big Beat against Bobby Chouinard authentic master groove', () => {
    const p = LIB.find(x => x.id === 'bigbeat')!;
    assert.ok(p, 'bigbeat exists');
    assert.ok(p.artist.includes('Bobby Chouinard'), 'Credits Bobby Chouinard');
    assert.strictEqual(p.bpm, 91, 'BPM is 91');
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '1-a', '2-&', '3']);
    assert.strictEqual(p.s[4], 'X', 'Snare backbeat accent on 2');
    assert.strictEqual(p.s[12], 'X', 'Snare backbeat accent on 4');
    assert.strictEqual(p.h, '................', 'No hi-hats on the break');
  });

  it('verifies Aruarian Dance against Nujabes authentic MPC lo-fi swing groove', () => {
    const p = LIB.find(x => x.id === 'aruarian')!;
    assert.ok(p, 'aruarian exists');
    assert.ok(p.artist.includes('Laurindo Almeida'), 'Credits Laurindo Almeida alongside Nujabes');
    assert.strictEqual(p.bpm, 99, 'BPM is 99');
    assert.strictEqual(p.sw, 58, 'Swing is 58%');
    const kicks = laneHits(p.k);
    assert.deepStrictEqual(kicks, ['1', '1-e', '3-&', '3-a'], 'Distinctive double kicks on 1/1-e and syncopated double kicks on 3-&/3-a');
    assert.strictEqual(p.s[4], 'X', 'Snare backbeat accent on 2');
    assert.strictEqual(p.s[12], 'X', 'Snare backbeat accent on 4');
    assert.strictEqual(p.h, 'x.x.x.x.x.x.x.x.');
    assert.strictEqual(p.o, '................', 'No open hat clash on the break');
    assert.strictEqual(p.bars?.length, 1, 'Includes bar 2 variation with 2-and push');
    const bar2Kicks = laneHits(p.bars![0].k);
    assert.deepStrictEqual(bar2Kicks, ['1', '1-e', '2-&', '3'], 'Bar 2 double kick on 1/1-e and push on 2-& into 3');
  });

  it('verifies generated BEAT_AUDIT_REFERENCE.md contains exact note grids from library.ts', () => {
    const doc = fs.readFileSync('public/BEAT_AUDIT_REFERENCE.md', 'utf8');
    for (const p of LIB) {
      assert.ok(doc.includes(`Kick (k): ${p.k}`), `${p.id} kick grid missing or drifted in reference doc`);
      assert.ok(doc.includes(`Snar (s): ${p.s}`), `${p.id} snare grid missing or drifted in reference doc`);
      assert.ok(doc.includes(`Hat  (h): ${p.h}`), `${p.id} hat grid missing or drifted in reference doc`);
    }
  });
});
