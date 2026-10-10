// Rewrites every fill in src/cue/data/library.ts from the beat's own main groove, in a style that suits its genre,
// and corrects a few metadata facts. Fills are written, not transcribed: beats whose records don't have a fill
// (sample loops, sequenced electronic tracks) get a light variation of the groove instead.
// Run from the repo root: node .scratch/apply_fills.cjs
const fs = require('fs');

const libFile = 'src/cue/data/library.ts';
const content = fs.readFileSync(libFile, 'utf8').replace(/\r\n/g, '\n');
const startMarker = 'const RAW: RawPattern[] = [', endMarker = '\n];\n\n// Extra percussion per pattern.';
const start = content.indexOf(startMarker), end = content.indexOf(endMarker, start);
if (start < 0 || end < 0) throw new Error('RAW block not found');
const patterns = eval('[' + content.slice(start + startMarker.length, end) + ']');

// ---- fill styles ------------------------------------------------------------------------------------------

const BY_GENRE = {
  Breakbeat: 'funk', Funk: 'funk', 'Jazz & Soul': 'funk', Rock: 'rock',
  'Hip-Hop': 'loop', 'Lo-Fi': 'loop', Reggaeton: 'loop',
  Electro: 'seq', Electronic: 'seq', Krautrock: 'seq', Pop: 'seq',
  House: 'house', Techno: 'techno', 'UK Garage': 'garage', Jungle: 'dnb', 'Drum & Bass': 'dnb',
  Trap: 'trap', Dubstep: 'halftime', Grime: 'grime',
  Latin: 'latin', Afrobeat: 'afro', Reggae: 'reggae'
};
// Beats that don't follow their genre's style. 'keep' = the existing fill stays (a real bar, or a practice exercise).
const BY_ID = { amen: 'keep', bluemonday: 'keep', sexualhealing: 'seq', motown: 'motown', ska: 'ska' };
const styleOf = p => BY_ID[p.id] || (p.genre === 'Drills' ? 'keep' : BY_GENRE[p.genre]);

/** What each style does, for the reference doc. */
const STYLE_NOTE = {
  keep: '',
  funk: 'Funk turnaround: the groove runs to beat 4, then the hats stop for an accented snare, a kick on the "&" and a snare on the last 16th, with ghost notes where the groove already has them.',
  rock: 'Rock turnaround: the groove runs to beat 4, then the hats stop and snare and kick alternate in 8ths into the next bar.',
  loop: 'Light variation: the record loops a sample, so there is no fill. The loop drops out after the beat-4 snare and a kick picks up on the last 16th.',
  seq: 'Light variation: the record is a steady sequenced or played groove with no fill. The hats drop out for beat 4.',
  house: 'House build: the kick stays on every beat while a snare builds from 8ths to 16ths across beats 3 and 4; hats and open hats stop for beat 4.',
  techno: 'Kick drop: the kick cuts out for beat 4 while the hats keep going, with an open hat on the "&".',
  garage: '2-step skip: the kick leaves beat 4 for a pickup on the last 16th, with a ghost snare before the backbeat and an extra snare on the "&" of 4.',
  dnb: 'Breakbeat chop: beats 3 and 4 get a ghost snare, an extra kick and a snare double into the next bar; hats stop for beat 4.',
  trap: 'Hat roll: the hats run 16ths through beat 4 (the record would roll faster than the grid can show) with an extra kick on the "&".',
  halftime: 'Half-time pickup: the kick drops out of beat 4, hats go to 8ths, and a snare lands on the last 16th.',
  grime: 'Grime push: an extra snare before beat 4 and a kick on the "&" of 4; hats stop for beat 4.',
  latin: 'Light variation: the clave pattern stays put; a timbale-style pickup adds snare on the "e" and "a" of beat 4.',
  afro: 'Light variation: Tony Allen-style ghost snares fill out beats 3 and 4 around the groove.',
  reggae: 'Reggae turnaround: the groove runs to beat 4, then the hats stop for a snare figure (on the beat, the "&" and the last 16th).',
  ska: 'Snare press roll through beat 4, the classic ska pickup.',
  motown: 'Light variation: the four-on-the-snare stomp keeps going with a snare pickup on the "&" and last 16th of beat 4.'
};

const NOTE_KEEP = {
  amen: 'The fourth bar of the break as it is commonly charted: kick double, shifted snares and the open hat.',
  bluemonday: 'Built on the track\'s well-known 16th-note kick run.'
};
const noteOf = p => NOTE_KEEP[p.id] || (p.genre === 'Drills' ? 'Practice exercise fill, written for the drill.' : STYLE_NOTE[styleOf(p)]);

function makeFill(p, style) {
  const L = { k: p.k.split(''), s: p.s.split(''), h: p.h.split(''), o: p.o.split('') };
  const set = (lane, idx, ch) => idx.forEach(i => { L[lane][i] = ch; });
  const clear = (lane, from, to = 15) => { for (let i = from; i <= to; i++) L[lane][i] = '.'; };
  const free = i => L.k[i] === '.' && L.s[i] === '.';
  const ghosty = /g/.test(p.s), opens = /[xX]/.test(p.o);
  switch (style) {
    case 'funk': {
      const pickup = /[xX]/.test(p.k[15]);
      clear('k', 12); clear('s', 12); clear('h', 13); clear('o', 12);
      set('k', [14], 'x'); set('s', [12], 'X');
      if (pickup) { set('k', [15], 'x'); set('s', [13], 'X'); } else set('s', [15], 'X');
      if (ghosty) { const g = [9, 11].find(free); if (g !== undefined) set('s', [g], 'g'); if (!pickup) set('s', [13], 'g'); }
      break;
    }
    case 'rock':
      clear('k', 12); clear('s', 12); clear('h', 12); clear('o', 12);
      set('s', [12, 14], 'X'); set('k', [13, 15], 'x');
      break;
    case 'loop':
      clear('k', 12); clear('h', 13); clear('o', 12); set('k', [15], 'x');
      break;
    case 'seq':
      if (/[xXg]/.test(p.h.slice(12) + p.o.slice(12))) { clear('h', 12); clear('o', 12); }
      else set('k', [14], 'x');
      break;
    case 'house':
      for (let i = 8; i < 16; i++) L.s[i] = i < 12 ? (i % 2 ? '.' : 'x') : i === 15 ? 'X' : 'x';
      clear('h', 12); clear('o', 12);
      break;
    case 'techno':
      clear('k', 12);
      if (opens) { clear('o', 12); set('o', [14], 'x'); set('h', [14], '.'); }
      else set('h', [12, 13, 14, 15], 'x');
      break;
    case 'garage':
      clear('k', 12); set('k', [15], 'x'); if (L.s[11] === '.') set('s', [11], 'g'); set('s', [14], 'x');
      break;
    case 'dnb':
      set('s', [10], 'g'); set('k', [13], 'x'); set('s', [14], 'x'); set('s', [15], 'X'); set('k', [12], '.');
      clear('h', 12); clear('o', 12);
      break;
    case 'trap':
      set('h', [12, 13, 14, 15], 'x'); set('h', [12], 'X'); clear('o', 12);
      if (L.s[14] === '.') set('k', [14], 'x');
      break;
    case 'halftime':
      clear('k', 12); clear('h', 12); clear('o', 12); set('h', [12, 14], 'x'); set('s', [15], 'X');
      break;
    case 'grime':
      set('s', [11], 'x'); set('k', [14], 'x'); clear('h', 12); clear('o', 12);
      break;
    case 'latin':
      set('s', [13], 'x'); set('s', [15], 'X');
      break;
    case 'afro':
      [9, 11, 13].forEach(i => { if (free(i)) set('s', [i], 'g'); });
      break;
    case 'reggae':
      clear('s', 12); clear('h', 12); clear('o', 12); set('s', [12, 14], 'x'); set('s', [15], 'X');
      break;
    case 'ska':
      clear('s', 12); clear('h', 12); clear('o', 12); set('s', [12, 13, 14], 'x'); set('s', [15], 'X');
      break;
    case 'motown':
      set('s', [14], 'x'); set('s', [15], 'X'); clear('o', 12);
      break;
    default: throw new Error(`no fill style for ${p.id} (${p.genre})`);
  }
  const out = { k: L.k.join(''), s: L.s.join(''), h: L.h.join(''), o: L.o.join('') };
  if (['k', 's', 'h', 'o'].every(k => out[k] === p[k])) throw new Error(`fill for ${p.id} is the same as the main groove`);
  return out;
}

// ---- metadata corrections (shown in the beat info sheet) --------------------------------------------------

const FIX = {
  amen: { gear: '1960s acoustic kit / G.C. Coleman' },
  electricrelaxation: { tip: 'Built on a Ronnie Foster "Mystic Brew" sample over swung boom bap kick rolls. Keep the right hand steady on the 8th hats.' },
  differentstrokes: { gear: 'Chicago studio kit (Twinight Records)' }
};

module.exports = { noteOf, styleOf };
if (require.main !== module) return;

let changed = 0;
patterns.forEach(p => {
  Object.assign(p, FIX[p.id] || {});
  const style = styleOf(p);
  if (style === 'keep') return;
  // Fill lanes for extra percussion are inherited from the main bar, so only the core four are written.
  p.fill = makeFill(p, style);
  changed++;
});

// ---- write back (same layout as update_library.cjs) -------------------------------------------------------

function formatPattern(p) {
  const lines = ['  {'];
  lines.push(`    "id": ${JSON.stringify(p.id)},`);
  lines.push(`    "name": ${JSON.stringify(p.name)},`);
  lines.push(`    "artist": ${JSON.stringify(p.artist)},`);
  lines.push(`    "genre": ${JSON.stringify(p.genre)},`);
  lines.push(`    "bpm": ${p.bpm},`);
  if (p.difficulty) lines.push(`    "difficulty": ${JSON.stringify(p.difficulty)},`);
  if (p.gear) lines.push(`    "gear": ${JSON.stringify(p.gear)},`);
  if (p.tip) lines.push(`    "tip": ${JSON.stringify(p.tip)},`);
  if (p.tags) lines.push(`    "tags": ${JSON.stringify(p.tags, null, 6).replace(/\n/g, '\n    ')},`);
  if (p.hands) lines.push(`    "hands": ${JSON.stringify(p.hands, null, 6).replace(/\n/g, '\n    ')},`);
  if (p.stepHands) lines.push(`    "stepHands": ${JSON.stringify(p.stepHands, null, 6).replace(/\n/g, '\n    ')},`);
  for (const k of ['k', 's', 'h', 'o']) if (p[k]) lines.push(`    "${k}": ${JSON.stringify(p[k])},`);
  if (p.var) lines.push(`    "var": ${JSON.stringify(p.var, null, 6).replace(/\n/g, '\n    ')},`);
  if (p.fill) lines.push(`    "fill": ${JSON.stringify(p.fill, null, 6).replace(/\n/g, '\n    ')}`);
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  lines.push('  }');
  return lines.join('\n');
}

const known = new Set(['id', 'name', 'artist', 'genre', 'bpm', 'difficulty', 'gear', 'tip', 'tags', 'hands', 'stepHands', 'k', 's', 'h', 'o', 'var', 'fill']);
patterns.forEach(p => Object.keys(p).forEach(k => { if (!known.has(k)) throw new Error(`${p.id}: field ${k} would be dropped`); }));

const out = content.slice(0, start + startMarker.length) + '\n' + patterns.map(formatPattern).join(',\n') + content.slice(end);
fs.writeFileSync(libFile, out);
console.log(`Rewrote ${changed} fills; kept ${patterns.length - changed}.`);
