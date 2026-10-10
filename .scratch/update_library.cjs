const fs = require('fs');
const { AUDIT_DATA } = require('./audit_builder.cjs');

const libFile = 'src/cue/data/library.ts';
let content = fs.readFileSync(libFile, 'utf8').replace(/\r\n/g, '\n');

// Find where RAW starts and ends
const rawStartMarker = 'const RAW: RawPattern[] = [';
const rawEndMarker = '\n];\n\n// Extra percussion per pattern.';

const startIndex = content.indexOf(rawStartMarker);
if (startIndex === -1) {
  console.error('Could not find rawStartMarker');
  process.exit(1);
}

const endIndex = content.indexOf(rawEndMarker, startIndex);
if (endIndex === -1) {
  console.error('Could not find rawEndMarker');
  process.exit(1);
}

const beforeRaw = content.slice(0, startIndex + rawStartMarker.length);
const rawString = content.slice(startIndex + rawStartMarker.length, endIndex);
const afterRaw = content.slice(endIndex);

// Evaluate RAW to get the pattern objects
const patterns = eval('[' + rawString + ']');
console.log('Parsed existing patterns:', patterns.length);

// Update each pattern with its audited fill
let updatedCount = 0;
patterns.forEach(p => {
  const audit = AUDIT_DATA[p.id];
  if (!audit) {
    console.error('Missing audit for pattern:', p.id);
    process.exit(1);
  }
  // Add/replace fill
  p.fill = audit.fill;
  updatedCount++;
});

console.log(`Updated ${updatedCount} patterns with audited fills.`);

// Format patterns cleanly as JSON-like TypeScript objects
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
  if (p.k) lines.push(`    "k": ${JSON.stringify(p.k)},`);
  if (p.s) lines.push(`    "s": ${JSON.stringify(p.s)},`);
  if (p.h) lines.push(`    "h": ${JSON.stringify(p.h)},`);
  if (p.o) lines.push(`    "o": ${JSON.stringify(p.o)},`);
  if (p.var) lines.push(`    "var": ${JSON.stringify(p.var, null, 6).replace(/\n/g, '\n    ')},`);
  if (p.fill) lines.push(`    "fill": ${JSON.stringify(p.fill, null, 6).replace(/\n/g, '\n    ')}`);
  lines.push('  }');
  return lines.join('\n');
}

const formattedRaw = '\n' + patterns.map(formatPattern).join(',\n') + '\n';
const newContent = beforeRaw + formattedRaw + afterRaw.slice(1);

fs.writeFileSync(libFile, newContent);
console.log('Successfully written updated library.ts with all 135 explicit fills!');
