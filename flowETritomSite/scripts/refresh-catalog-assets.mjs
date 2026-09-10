import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const publicImages = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/images";
const publicLogos = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/logos";
const creatives = "C:/Users/David/Downloads/Flow & Tritom - Criativos";
const assets = "C:/Users/David/.cursor/projects/c-Users-David-cub4Studio-cub4StudioLPs-flowETritomSite/assets";
const downloads = "C:/Users/David/Downloads/Grupo-FTV-Logo";

mkdirSync(publicImages, { recursive: true });
mkdirSync(publicLogos, { recursive: true });
mkdirSync(downloads, { recursive: true });

async function toCardWebp(input, output, size = 1080) {
  await sharp(input, { failOn: "none" })
    .rotate()
    .resize(size, size, { fit: "inside", withoutEnlargement: true, background: { r: 244, g: 241, b: 234, alpha: 1 } })
    .webp({ quality: 84 })
    .toFile(output);
  console.log("ok", path.basename(output));
}

const pages = [
  "https://flowequipamentos.com/martelos/",
  "https://flowequipamentos.com/bits/",
  "https://flowequipamentos.com/brocas/",
  "https://flowequipamentos.com/brocas-de-perfuracao/",
  "https://flowequipamentos.com/motobombas/",
  "https://flowequipamentos.com/perfuracao-dth/",
  "https://flowequipamentos.com/perfuracao-rotativa/",
  "https://flowequipamentos.com/mineracao-e-desmonte-de-rochas/",
  "https://flowequipamentos.com/fundacoes-e-contencoes/",
  "https://flowequipamentos.com/sondagem-e-geotecnica/",
  "https://flowequipamentos.com/bombeamento-e-drenagem/",
  "https://flowequipamentos.com/pecas-e-acessorios/",
  "https://flowequipamentos.com/",
];

const found = new Set();
for (const url of pages) {
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) {
      console.log("skip", res.status, url);
      continue;
    }
    const html = await res.text();
    const matches = html.matchAll(/https?:\/\/flowequipamentos\.com\/wp-content\/uploads\/[^"' )\s]+/gi);
    for (const m of matches) {
      const clean = m[0].split("?")[0];
      if (/\.(jpe?g|png|webp)$/i.test(clean) && !/logo|icon|favicon|whatsapp|sprite/i.test(clean)) {
        found.add(clean);
      }
    }
    console.log("page", url, "images", [...found].length);
  } catch (err) {
    console.log("fail", url, err.message);
  }
}

const wanted = [
  ["cir", /cir[-_ ]?90|martelo[-_ ]?cir|cir-90/i],
  ["mission", /mission[-_ ]?(40|50|60|80)|martelo[-_ ]?mission/i],
  ["bit", /bit|bits/i],
  ["pdc", /pdc/i],
  ["triconica", /tricon/i],
  ["haste", /haste/i],
  ["bomba", /bomba|motobomba|submers/i],
  ["rompedor", /romped/i],
  ["coroa", /coroa|diamant/i],
];

let i = 0;
for (const src of found) {
  const name = src.split("/").pop() || `img-${i}`;
  const slug = name.replace(/\.[a-z]+$/i, "").toLowerCase();
  const hit = wanted.some(([, re]) => re.test(src) || re.test(slug));
  if (!hit && i > 24) continue;
  try {
    const res = await fetch(src, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(publicImages, `flow-${slug.slice(0, 40)}.webp`);
    await toCardWebp(buf, out, 1200);
    i += 1;
  } catch (err) {
    console.log("dl fail", src, err.message);
  }
}

const compressorMap = [
  ["tritomComp (5).png", "triton-tri600-hero.webp"],
  ["tritomComp.png", "triton-tri600-manutencao.webp"],
  ["tritomComp (3).png", "triton-tri600-painel.webp"],
  ["tritomComp (8).png", "triton-tri600-interno.webp"],
  ["tritomComp (2).png", "triton-tri600-vista.webp"],
  ["tritomComp (4).png", "triton-tri600-campo.webp"],
  ["tritomComp (6).png", "triton-comp-06.webp"],
  ["tritomComp (7).png", "triton-comp-07.webp"],
  ["tritomComp (9).png", "triton-comp-09.webp"],
  ["tritomComp (10).png", "triton-comp-10.webp"],
  ["ficTec350A10.png", "triton-csh350-ficha.webp"],
  ["fitc12.jpeg", "triton-fitc12.webp"],
];

for (const [src, dest] of compressorMap) {
  try {
    await toCardWebp(path.join(creatives, src), path.join(publicImages, dest), 1400);
  } catch (err) {
    console.log("creative fail", src, err.message);
  }
}

await sharp(path.join(assets, "grupo-ftv-v2-navy.png")).png({ compressionLevel: 6 }).toFile(path.join(publicLogos, "grupo-ftv-navy.png"));
await sharp(path.join(assets, "grupo-ftv-v2-emblem.png")).png({ compressionLevel: 6 }).toFile(path.join(publicLogos, "grupo-ftv-emblem.png"));
await sharp(path.join(assets, "grupo-ftv-v2-light.png")).png({ compressionLevel: 6 }).toFile(path.join(publicLogos, "grupo-ftv-light.png"));

for (const file of ["grupo-ftv-navy.png", "grupo-ftv-emblem.png", "grupo-ftv-light.png"]) {
  copyFileSync(path.join(publicLogos, file), path.join(downloads, file));
}

writeFileSync(path.join(publicImages, "_scraped.txt"), [...found].sort().join("\n"));
console.log("done. scraped urls", found.size);
