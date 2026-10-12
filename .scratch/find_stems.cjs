const fs = require('fs');
const zlib = require('zlib');

// Load raw uncompressed image
const buf = fs.readFileSync('C:/Users/d384512/.gemini/antigravity-ide/brain/0129eebc-49d0-4085-8f4e-93f5479884ca/.user_uploaded/media_1791768552136.png');
let pos = 8, width, height, colorType;
const idatChunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
    colorType = buf[pos + 17];
  } else if (type === 'IDAT') idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  else if (type === 'IEND') break;
  pos += 12 + len;
}

const bpp = colorType === 6 ? 4 : 3;
const stride = 1 + width * bpp;
const decomp = zlib.inflateSync(Buffer.concat(idatChunks));

// Simple vertical stem finder in Measure 10 (y from 155 to 195)
// Measure 10 is approximately x from 35 to 185
const measureStart = 35;
const measureEnd = 185;

// Let's find columns with dark pixels in the staff
const stemCols = [];
for (let x = measureStart; x < measureEnd; x++) {
  let darkCount = 0;
  for (let y = 150; y < 195; y++) {
    const off = y * stride + 1 + x * bpp;
    const lum = (decomp[off] + decomp[off + 1] + decomp[off + 2]) / 3;
    if (lum < 100) darkCount++;
  }
  stemCols.push({ x, darkCount });
}

// Print peaks
for (let i = 1; i < stemCols.length - 1; i++) {
  if (stemCols[i].darkCount > 15 && stemCols[i].darkCount >= stemCols[i-1].darkCount && stemCols[i].darkCount >= stemCols[i+1].darkCount) {
    console.log(`Peak at x=${stemCols[i].x}, darkCount=${stemCols[i].darkCount}`);
  }
}
