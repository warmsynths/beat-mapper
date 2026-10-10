const fs = require('fs');
const { AUDIT_DATA } = require('./audit_builder.cjs');
const libContent = fs.readFileSync('src/cue/data/library.ts', 'utf8');
const rawMatch = libContent.match(/const RAW: RawPattern\[\] = (\[[\s\S]*?\n\];)/);
const patterns = eval(rawMatch[1]);
patterns.slice(0, 73).forEach((p, idx) => {
  const a = AUDIT_DATA[p.id] || {};
  console.log(`${idx+1}. [${p.genre}] ${p.name} (${p.id}) -> "${a.refSong || p.name}" | ${a.refArtist || p.artist} | Drummer: ${a.refDrummer || 'N/A'} (${a.refYear || 'N/A'})`);
});
