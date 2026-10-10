const fs = require('fs');
const libContent = fs.readFileSync('src/cue/data/library.ts', 'utf8');
const rawMatch = libContent.match(/const RAW: RawPattern\[\] = (\[[\s\S]*?\n\];)/);
const patterns = eval(rawMatch[1]);

const genreOrder = [
  'Breakbeat', 'Funk', 'Rock', 'Jazz & Soul', 'Pop', 'Krautrock', 'Latin', 'Reggaeton', 'Afrobeat', 'Reggae',
  'Hip-Hop', 'Lo-Fi', 'Electro', 'Electronic', 'House', 'Techno', 'UK Garage', 'Jungle', 'Drum & Bass',
  'Dubstep', 'Grime', 'Trap', 'Drills'
];

const byGenre = {};
patterns.forEach(p => {
  byGenre[p.genre] = byGenre[p.genre] || [];
  byGenre[p.genre].push(p);
});

genreOrder.forEach(g => {
  const items = byGenre[g] || [];
  console.log(`=== ${g} (${items.length}) ===`);
  items.forEach(p => {
    console.log(`  - ${p.id}: "${p.name}" (${p.artist})`);
  });
});
