// Builds BEAT_AUDIT_REFERENCE.md from the library and the reference metadata in audit_builder.cjs.
// Writes the repo-root copy and public/ (Vite copies public/ into docs/ on build; docs/ itself is emptied).
// Run from the repo root: node .scratch/generate_reference_doc.cjs
const fs = require('fs');
const { AUDIT_DATA } = require('./audit_builder.cjs');
const { noteOf } = require('./apply_fills.cjs');

const libContent = fs.readFileSync('src/cue/data/library.ts', 'utf8');
const rawMatch = libContent.match(/const RAW: RawPattern\[\] = (\[[\s\S]*?\n\];)/);
const patterns = eval(rawMatch[1]);

// Same list as STYLE_ONLY in src/cue/data/library.ts: styles with no artist or record behind them.
const STYLE_ONLY = new Set(['sonclave', 'rumbaclave', 'cumbia', 'tambor', 'rock', 'twostep', 'jungle', 'dnb', 'drill']);
const inspired = p => p.genre !== 'Drills' && !STYLE_ONLY.has(p.id);

const genreOrder = [
  'Breakbeat', 'Funk', 'Rock', 'Jazz & Soul', 'Pop', 'Krautrock', 'Latin', 'Reggaeton', 'Afrobeat', 'Reggae',
  'Hip-Hop', 'Lo-Fi', 'Electro', 'Electronic', 'House', 'Techno', 'UK Garage', 'Jungle', 'Drum & Bass',
  'Dubstep', 'Grime', 'Trap', 'Drills'
];

let doc = `# Beat Reference

What each of the ${patterns.length} patterns in Beat Mapper / Cue is based on, with its main groove and fill.

> Patterns are simplified interpretations written for practice, inspired by the records and artists named. They are not transcriptions of the recordings, and Beat Mapper is not affiliated with or endorsed by the artists or rights holders.

---

## How to read this

- **Main grooves** are approximations based on common charts and written descriptions of the records, not on listening to them. They have not been checked against the recordings, and recorded breaks are simplified to a 16-step grid.
- **Fills are written, not transcribed.** Each fill is built from the beat's own main groove in a style that suits its genre: a funk turnaround, a house build, a hat roll and so on. Songs whose records don't have a fill, such as sample loops and steady sequenced grooves, get a light variation of the groove instead. The Amen break uses its commonly charted fourth bar, and the practice drills use fills written as exercises.
- **References** name the record, or the style when there is no single record, and the drummer or producer where one is known. Credits marked "as commonly credited" or "uncredited" are uncertain. Years are left out for styles.
- **Notation:** \`X\` accent · \`x\` hit · \`g\` ghost note · \`.\` rest. Steps run 1–16 as 1 e & a, 2 e & a…

---

## Beats

`;

const byGenre = {};
patterns.forEach(p => { (byGenre[p.genre] = byGenre[p.genre] || []).push(p); });
const missing = Object.keys(byGenre).filter(g => !genreOrder.includes(g));
if (missing.length) throw new Error('Genres missing from genreOrder: ' + missing.join(', '));

let n = 1;
for (const g of genreOrder) {
  const items = byGenre[g];
  if (!items || !items.length) continue;
  doc += `### ${g} (${items.length})\n\n`;
  for (const p of items) {
    const a = AUDIT_DATA[p.id];
    if (!a) throw new Error('No reference for ' + p.id);
    if (!p.fill) throw new Error('No fill for ' + p.id);
    doc += `#### ${n++}. ${p.name} (\`${p.id}\`)\n`;
    doc += inspired(p)
      ? `- **Inspired by**: *${a.refSong}*${a.refYear ? ` (${a.refYear})` : ''} · ${p.artist}\n`
      : `- **Style**: ${p.artist}\n`;
    doc += `- **Drummer / producer**: ${a.refDrummer}\n`;
    doc += `- **Tempo & level**: ${p.bpm} BPM · ${p.difficulty || 'Intermediate'}\n\n`;
    doc += '```text\n';
    doc += 'Beat:     1e&a2e&a3e&a4e&a\n';
    doc += `[MAIN]\nKick (k): ${p.k}\nSnar (s): ${p.s}\nHat  (h): ${p.h}\nOpen (o): ${p.o}\n`;
    doc += `[FILL]\nKick (k): ${p.fill.k}\nSnar (s): ${p.fill.s}\nHat  (h): ${p.fill.h}\nOpen (o): ${p.fill.o}\n`;
    doc += '```\n\n';
    doc += `**Fill:** ${noteOf(p)}\n\n---\n\n`;
  }
}

fs.writeFileSync('BEAT_AUDIT_REFERENCE.md', doc);
fs.writeFileSync('public/BEAT_AUDIT_REFERENCE.md', doc);
console.log(`Wrote reference for ${n - 1} beats.`);
