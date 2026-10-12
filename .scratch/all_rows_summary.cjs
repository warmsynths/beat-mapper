const fs = require('fs');
const zlib = require('zlib');

function unfilterPNG(decompressed, width, height, bytesPerPixel) {
  const stride = 1 + width * bytesPerPixel;
  const raw = Buffer.alloc(width * height * bytesPerPixel);
  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }
  for (let y = 0; y < height; y++) {
    const filter = decompressed[y * stride];
    const srcRow = y * stride + 1;
    const dstRow = y * width * bytesPerPixel;
    const prevDstRow = (y - 1) * width * bytesPerPixel;
    for (let x = 0; x < width * bytesPerPixel; x++) {
      const byte = decompressed[srcRow + x];
      const left = x >= bytesPerPixel ? raw[dstRow + x - bytesPerPixel] : 0;
      const up = y > 0 ? raw[prevDstRow + x] : 0;
      const upleft = (y > 0 && x >= bytesPerPixel) ? raw[prevDstRow + x - bytesPerPixel] : 0;
      let val;
      if (filter === 0) val = byte;
      else if (filter === 1) val = (byte + left) & 0xff;
      else if (filter === 2) val = (byte + up) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) val = (byte + paeth(left, up, upleft)) & 0xff;
      else val = byte;
      raw[dstRow + x] = val;
    }
  }
  return raw;
}

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
const raw = unfilterPNG(zlib.inflateSync(Buffer.concat(idatChunks)), width, height, bpp);

// Rows in the score:
// Row 2: yKick ~ 243, ySnare ~ 230
// Row 3: yKick ~ 324, ySnare ~ 311
// Row 4: yKick ~ 406, ySnare ~ 393
// Row 5: yKick ~ 488, ySnare ~ 475
// Row 6: yKick ~ 571, ySnare ~ 558
// Row 7: yKick ~ 657, ySnare ~ 645
// Row 8: yKick ~ 740, ySnare ~ 727 (if exists)

const rows = [
  { name: 'Row 2 (M10-12)', yKick: 243, ySnare: 230 },
  { name: 'Row 3 (M13-15)', yKick: 324, ySnare: 311 },
  { name: 'Row 4 (M16-18)', yKick: 406, ySnare: 393 },
  { name: 'Row 5 (M19-21)', yKick: 488, ySnare: 475 },
  { name: 'Row 6 (M22-24)', yKick: 571, ySnare: 558 },
  { name: 'Row 7 (M25-27)', yKick: 657, ySnare: 645 },
];

for (const r of rows) {
  const notes = [];
  for (let x = 30; x < 460; x++) {
    let isKick = 0, isSnare = 0;
    for (let dy = -2; dy <= 2; dy++) {
      let off = ((r.yKick + dy) * width + x) * bpp;
      if (raw[off] < 120) isKick++;
      off = ((r.ySnare + dy) * width + x) * bpp;
      if (raw[off] < 120) isSnare++;
    }
    if (isKick >= 3) notes.push({ x, type: 'K' });
    if (isSnare >= 3) notes.push({ x, type: 'S' });
  }
  const clusters = [];
  for (const n of notes) {
    const last = clusters[clusters.length - 1];
    if (last && last.type === n.type && (n.x - last.xMax) <= 4) {
      last.xMax = n.x;
    } else {
      clusters.push({ type: n.type, xMin: n.x, xMax: n.x });
    }
  }
  const summary = clusters.map(c => `${c.type}@${Math.round((c.xMin+c.xMax)/2)}`).join(' ');
  console.log(`${r.name}: ${summary}`);
}
