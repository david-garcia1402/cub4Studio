import { copyFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const assets = "C:/Users/David/.cursor/projects/c-Users-David-cub4Studio-cub4StudioLPs-flowETritomSite/assets";
const logos = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/logos";
const downloads = "C:/Users/David/Downloads/Grupo-FVT-Logo";

function isLetterPixel(r, g, b, mode) {
  if (mode === "white") return r > 220 && g > 220 && b > 220;
  const dark = r < 40 && g < 70 && b < 110;
  return dark;
}

function findLetters(data, width, height, channels, mode) {
  const y0 = Math.round(height * (mode === "navy" ? 0.36 : 0.30));
  const y1 = Math.round(height * (mode === "navy" ? 0.56 : 0.58));
  const col = new Array(width).fill(0);
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (isLetterPixel(data[i], data[i + 1], data[i + 2], mode)) col[x] += 1;
    }
  }
  const minHits = Math.round((y1 - y0) * 0.04);
  const runs = [];
  let start = -1;
  for (let x = 0; x < width; x++) {
    const on = col[x] >= minHits;
    if (on && start < 0) start = x;
    if (!on && start >= 0) {
      runs.push({ start, end: x - 1, count: col.slice(start, x).reduce((a, b) => a + b, 0) });
      start = -1;
    }
  }
  if (start >= 0) runs.push({ start, end: width - 1, count: col.slice(start).reduce((a, b) => a + b, 0) });

  const letters = runs.filter((r) => r.end - r.start > 18).sort((a, b) => a.start - b.start);
  return { letters, y0, y1 };
}

function letterBox(data, width, height, channels, x0, x1, yMin, yMax, mode) {
  const pad = 3;
  const hits = [];
  let maxHits = 0;
  for (let y = yMin; y < yMax; y++) {
    let n = 0;
    for (let x = x0; x <= x1; x++) {
      const i = (y * width + x) * channels;
      if (isLetterPixel(data[i], data[i + 1], data[i + 2], mode)) n += 1;
    }
    hits.push({ y, n });
    if (n > maxHits) maxHits = n;
  }
  const need = Math.max(8, Math.round(maxHits * 0.28));
  const dense = hits.filter((h) => h.n >= need);
  const top = dense[0].y;
  const bottom = dense[dense.length - 1].y;
  return {
    left: Math.max(0, x0 - pad),
    top: Math.max(0, top - pad),
    width: Math.min(width - 1, x1 + pad) - Math.max(0, x0 - pad) + 1,
    height: Math.min(height - 1, bottom + pad) - Math.max(0, top - pad) + 1,
  };
}

async function swapWordmark(src, dest, mode) {
  const { data, info } = await sharp(src, { failOn: "none" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const { letters, y0, y1 } = findLetters(data, width, height, channels, mode);
  if (letters.length < 3) {
    throw new Error(`${src}: expected 3 letters, found ${letters.length} -> ${JSON.stringify(letters)}`);
  }

  const [f, t, v] = letters.slice(0, 3);
  const tBox = letterBox(data, width, height, channels, t.start, t.end, y0, y1, mode);
  const vBox = letterBox(data, width, height, channels, v.start, v.end, y0, y1, mode);

  const base = sharp(src, { failOn: "none" });
  const tGlyph = await sharp(src, { failOn: "none" }).extract(tBox).toBuffer();
  const vGlyph = await sharp(src, { failOn: "none" }).extract(vBox).toBuffer();

  const sampleX = Math.max(0, f.start - 20);
  const sampleY = Math.round(height * 0.12);
  const si = (sampleY * width + sampleX) * channels;
  const bg = { r: data[si], g: data[si + 1], b: data[si + 2], alpha: 255 };

  const gap = vBox.left - (tBox.left + tBox.width);
  const vLeft = tBox.left;
  const tLeft = vLeft + vBox.width + Math.max(8, gap);

  const out = await base
    .composite([
      { input: { create: { width: tBox.width, height: tBox.height, channels: 4, background: bg } }, left: tBox.left, top: tBox.top },
      { input: { create: { width: vBox.width, height: vBox.height, channels: 4, background: bg } }, left: vBox.left, top: vBox.top },
      { input: vGlyph, left: vLeft, top: vBox.top },
      { input: tGlyph, left: tLeft, top: tBox.top },
    ])
    .png({ compressionLevel: 6 })
    .toFile(dest);

  console.log(path.basename(src), { f, t, v, tBox, vBox, vLeft, tLeft }, out);
}

await swapWordmark(path.join(assets, "grupo-ftv-v2-navy.png"), path.join(logos, "grupo-fvt-navy.png"), "white");
await swapWordmark(path.join(assets, "grupo-ftv-v2-light.png"), path.join(logos, "grupo-fvt-light.png"), "navy");

copyFileSync(path.join(assets, "grupo-ftv-v2-emblem.png"), path.join(logos, "grupo-fvt-emblem.png"));
copyFileSync(path.join(logos, "grupo-fvt-navy.png"), path.join(logos, "grupo-ftv-navy.png"));
copyFileSync(path.join(logos, "grupo-fvt-light.png"), path.join(logos, "grupo-ftv-light.png"));
copyFileSync(path.join(logos, "grupo-fvt-emblem.png"), path.join(logos, "grupo-ftv-emblem.png"));

for (const file of ["grupo-fvt-navy.png", "grupo-fvt-light.png", "grupo-fvt-emblem.png"]) {
  copyFileSync(path.join(logos, file), path.join(downloads, file));
  copyFileSync(path.join(logos, file), path.join(assets, file));
}

console.log("swapped T/V on original artwork");
