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

// In Row 3:
// Hi-hats are around y=298-304
// Snares are around y=308-314
// Kicks are around y=320-325

// Let's find columns with dark pixels in each band:
const bands = {
  hat: { y1: 298, y2: 304 },
  snare: { y1: 308, y2: 314 },
  kick: { y1: 320, y2: 325 }
};

for (let x = 30; x < 450; x++) {
  let isHat = 0, isSnare = 0, isKick = 0;
  for (let y = bands.hat.y1; y <= bands.hat.y2; y++) {
    const off = (y * width + x) * bpp;
    if (raw[off] < 120) isHat++;
  }
  for (let y = bands.snare.y1; y <= bands.snare.y2; y++) {
    const off = (y * width + x) * bpp;
    if (raw[off] < 120) isSnare++;
  }
  for (let y = bands.kick.y1; y <= bands.kick.y2; y++) {
    const off = (y * width + x) * bpp;
    if (raw[off] < 120) isKick++;
  }
  if (isKick >= 3 || isSnare >= 3) {
    console.log(`x=${x}: Kick=${isKick>=3 ? 'YES' : 'no'}, Snare=${isSnare>=3 ? 'YES' : 'no'}, Hat=${isHat>=3 ? 'YES' : 'no'}`);
  }
}
