const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (-(c & 1) & 0xedb88320);
    }
  }
  return ~c >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  buf.writeUInt32BE(crc32(buf.subarray(4, 8 + len)), 8 + len);
  return buf;
}

function writePNG(outputPath, rawRGB, w, h) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 2;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  const scanlines = Buffer.alloc(h * (1 + w * 3));
  for (let y = 0; y < h; y++) {
    scanlines[y * (1 + w * 3)] = 0;
    rawRGB.copy(scanlines, y * (1 + w * 3) + 1, y * w * 3, (y + 1) * w * 3);
  }
  const idat = makeChunk('IDAT', zlib.deflateSync(scanlines));
  const iend = makeChunk('IEND', Buffer.alloc(0));

  fs.writeFileSync(outputPath, Buffer.concat([sig, ihdr, idat, iend]));
}

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

function zoomCrop(cropX, cropY, cropW, cropH, scale, outName) {
  const zoomedRGB = Buffer.alloc(cropW * scale * cropH * scale * 3);
  for (let y = 0; y < cropH * scale; y++) {
    const srcY = Math.min(height - 1, Math.max(0, cropY + Math.floor(y / scale)));
    for (let x = 0; x < cropW * scale; x++) {
      const srcX = Math.min(width - 1, Math.max(0, cropX + Math.floor(x / scale)));
      const srcOff = (srcY * width + srcX) * bpp;
      const dstOff = (y * cropW * scale + x) * 3;
      zoomedRGB[dstOff] = raw[srcOff];
      zoomedRGB[dstOff + 1] = raw[srcOff + 1];
      zoomedRGB[dstOff + 2] = raw[srcOff + 2];
    }
  }
  writePNG('C:/Users/d384512/.gemini/antigravity-ide/brain/0129eebc-49d0-4085-8f4e-93f5479884ca/scratch/' + outName, zoomedRGB, cropW * scale, cropH * scale);
}

// Row 2: Interlude (measures 10, 11, 12)
zoomCrop(10, 180, 480, 120, 2, 'row2_interlude.png');

// Row 4: Main Theme 1-1 (measures 16, 17, 18)
zoomCrop(10, 370, 480, 110, 2, 'row4_maintheme.png');

// Row 7: Main Theme 1-2 (measures 25, 26, 27)
zoomCrop(10, 600, 480, 110, 2, 'row7_maintheme.png');

console.log('Cropped rows successfully!');
