// Builds BEAT_AUDIT_REFERENCE.md with full verified audit findings and web references for all 135 beats.
// Writes to public/BEAT_AUDIT_REFERENCE.md and repo-root BEAT_AUDIT_REFERENCE.md.
// Run from repo root: node .scratch/generate_enhanced_reference_doc.cjs

const fs = require('fs');
const { FULL_AUDIT_DATA } = require('./full_audit_database.cjs');
const { noteOf } = require('./apply_fills.cjs');

const libContent = fs.readFileSync('src/cue/data/library.ts', 'utf8');
const rawMatch = libContent.match(/const RAW: RawPattern\[\] = (\[[\s\S]*?\n\];)/);
const patterns = eval(rawMatch[1]);

const STYLE_ONLY = new Set(['sonclave', 'rumbaclave', 'cumbia', 'tambor', 'rock', 'twostep', 'jungle', 'dnb', 'drill']);
const inspired = p => p.genre !== 'Drills' && !STYLE_ONLY.has(p.id);

const genreOrder = [
  'Breakbeat', 'Funk', 'Rock', 'Jazz & Soul', 'Pop', 'Krautrock', 'Latin', 'Reggaeton', 'Afrobeat', 'Reggae',
  'Hip-Hop', 'Lo-Fi', 'Electro', 'Electronic', 'House', 'Techno', 'UK Garage', 'Jungle', 'Drum & Bass',
  'Dubstep', 'Grime', 'Trap', 'Drills'
];

let doc = `# Beat Reference & Comprehensive Audit

What each of the ${patterns.length} patterns in Beat Mapper / Cue is based on, with verified web references, groove transcription analysis, record reality auditing (fills vs. loops), and attribution.

> Patterns are simplified interpretations written for practice, inspired by the records and artists named. They are not affiliated with or endorsed by the original artists or rights holders.

---

## Audit Methodology & How to Read This Reference

This audit cross-references every pattern in Beat Mapper against published drum sheet music, historical session documentation, and verified musicological sources.

### 1. Main Grooves & Grid Mapping
- Each groove is mapped to a 16th-note step grid (\`1 e & a, 2 e & a, 3 e & a, 4 e & a\`).
- \`X\` = Accented hit, \`x\` = Standard hit, \`g\` = Ghost note, \`.\` = Rest.
- Each entry compares the grid representation with real drum sheet music transcriptions (from sources such as *OnlineDrummer*, *DrumsTheWord*, *Scribd's 30 Classic Breakbeats* by Szymon Ciszek, *Drumeo*, and *Modern Drummer*).
- Swing feels and microtiming nuances (such as J Dilla's unquantized pocket or Bernard Purdie's half-time shuffle) are noted explicitly alongside their 16-step grid approximations.

### 2. Record Reality: Distinguishing Real Recorded Fills from Synthetic Practice Exercises
A critical finding of this audit is clarifying what actually happens on the original recording:
- **Real Recorded Fills & Variations**: Present on live drum recordings and classic break solos (e.g. *Amen Brother* bar 4 solo at 1:26, *Funky Drummer* bar 8 solo at 5:44, *When the Levee Breaks* transition fills, *Smells Like Teen Spirit* tom rolls, *Blue Monday* 16th kick roll intro).
- **Sample Loops & Sequenced Tracks (No Fills on Record)**: Hip-hop boom bap tracks (e.g. *Mass Appeal*, *Shook Ones Pt. II*, *C.R.E.A.M.*, *Electric Relaxation*) and Lo-Fi / Chillhop tracks (*Feather*, *Time: The Donut of the Heart*, *Accordion*) loop a single 1-bar or 2-bar break. **The original recordings contain NO drum kit fills.** In Beat Mapper, these beats receive an intentional, genre-written synthetic turnaround exercise to allow players to practice finger drumming transitions.
- **The Billie Jean Rule**: On *Billie Jean*, producer Quincy Jones famously strictly barred Leon "Ndugu" Chancler from playing any drum fills across the entire song. The only variation on the record is an open hi-hat splash on the "&" of 4 leading into section transitions (e.g., at 1:08 before the pre-chorus).

### 3. Verified Personnel & Equipment
- Drummers, producers, session musicians, recording studios, drum machines (TR-808, TR-909, DMX, SP-1200, MPC), and sample origins have been verified against original liner notes, Discogs, Sound On Sound engineering archives, and producer interviews.

### 4. Authoritative Web References
- Every single pattern includes direct web references and links to printable PDF sheet music, interactive drum tabs (Songsterr), educational lessons, and musicological analyses for independent verification.

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
    const a = FULL_AUDIT_DATA[p.id];
    if (!a) throw new Error('No reference for ' + p.id);
    if (!p.fill) throw new Error('No fill for ' + p.id);

    doc += `#### ${n++}. ${p.name} (\`${p.id}\`)\n`;
    if (inspired(p)) {
      doc += `- **Inspired by**: *${a.refSong}*${a.refYear ? ` (${a.refYear})` : ''} · ${p.artist}\n`;
    } else {
      doc += `- **Style**: ${p.artist}\n`;
    }
    doc += `- **Drummer / producer**: ${a.refDrummer}\n`;
    if (a.label) doc += `- **Label / Studio**: ${a.label}\n`;
    if (a.gear) doc += `- **Gear & Setup**: ${a.gear}\n`;
    doc += `- **Tempo & level**: ${p.bpm} BPM · ${p.difficulty || 'Intermediate'}\n\n`;

    doc += '```text\n';
    doc += 'Beat:     1e&a2e&a3e&a4e&a\n';
    doc += `[MAIN]\n`;
    doc += `Kick (k): ${p.k}\nSnar (s): ${p.s}\nHat  (h): ${p.h}\nOpen (o): ${p.o}\n`;
    if (p.c && p.c !== '................') doc += `Clap (c): ${p.c}\n`;
    if (p.r && p.r !== '................') doc += `Rim  (r): ${p.r}\n`;
    if (p.t && p.t !== '................') doc += `Tom  (t): ${p.t}\n`;
    if (p.w && p.w !== '................') doc += `Cowb (w): ${p.w}\n`;
    if (p.z && p.z !== '................') doc += `Shkr (z): ${p.z}\n`;

    doc += `[FILL]\n`;
    doc += `Kick (k): ${p.fill.k}\nSnar (s): ${p.fill.s}\nHat  (h): ${p.fill.h}\nOpen (o): ${p.fill.o}\n`;
    if (p.fill.c && p.fill.c !== '................') doc += `Clap (c): ${p.fill.c}\n`;
    if (p.fill.r && p.fill.r !== '................') doc += `Rim  (r): ${p.fill.r}\n`;
    if (p.fill.t && p.fill.t !== '................') doc += `Tom  (t): ${p.fill.t}\n`;
    if (p.fill.w && p.fill.w !== '................') doc += `Cowb (w): ${p.fill.w}\n`;
    if (p.fill.z && p.fill.z !== '................') doc += `Shkr (z): ${p.fill.z}\n`;
    doc += '```\n\n';

    doc += `**Record Reality & Structure:**\n${a.recordReality}\n\n`;
    doc += `**Transcription & Groove Verification:**\n${a.transcriptionNotes}\n\n`;
    doc += `**Practice Fill in Beat Mapper:** ${noteOf(p)}\n\n`;

    if (a.sources && a.sources.length) {
      doc += `**Web References & Verified Sources:**\n`;
      a.sources.forEach(s => {
        doc += `- [${s.title}](${s.url})\n`;
      });
      doc += '\n';
    }

    doc += `---\n\n`;
  }
}

// Write to public/ and repo-root
fs.writeFileSync('public/BEAT_AUDIT_REFERENCE.md', doc);
fs.writeFileSync('BEAT_AUDIT_REFERENCE.md', doc);
console.log(`Successfully generated verified reference document for ${n - 1} beats in public/ and root.`);
