import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite";
const logos = path.join(root, "public/logos");
const images = path.join(root, "public/images");
const cards = path.join(images, "cards");
const downloads = "C:/Users/David/Downloads/Grupo-FVT-Logo";

mkdirSync(cards, { recursive: true });
mkdirSync(downloads, { recursive: true });

// A marca do Grupo FVT é o emblema circular vetorial (grupo-fvt-emblem.svg, texto em paths).
// Aqui só rasterizamos os PNGs derivados (transparentes) e a imagem Open Graph.
const navy = { r: 11, g: 31, b: 51, alpha: 1 };
const paper = { r: 247, g: 244, b: 238, alpha: 1 };
const emblemSvg = path.join(logos, "grupo-fvt-emblem.svg");

await sharp(emblemSvg, { density: 300 }).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(logos, "grupo-fvt-emblem.png"));
await sharp(emblemSvg, { density: 300 }).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(logos, "grupo-fvt-emblem-512.png"));

const ogEmblem = await sharp(emblemSvg, { density: 300 }).resize(520, 520).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: navy } })
  .composite([{ input: ogEmblem, left: 340, top: 55 }])
  .jpeg({ quality: 90 })
  .toFile(path.join(logos, "grupo-fvt-og.jpg"));

const catalogBits = new Set([
  "bit-65mm-cir-65.webp",
  "bit-76mm-cir-76.webp",
  "bit-90-mm-cir-90.webp",
  "bit-110mm-cir-110.webp",
  "bit-130-mm-cir-90.webp",
  "bit-150mm-cir-110.webp",
  "bit-412m40.webp",
  "bit512m50.webp",
  "bit-622-m60.webp",
  "bit-6m60.webp",
]);

const productFiles = [
  "martelos-cir-1.webp",
  "martelo-cir-90.webp",
  "martelo-cir-110.webp",
  "martelo-mission-40.webp",
  "martelo-mission-50.webp",
  "martelo-mission-60.webp",
  "martelo-mission-80.webp",
  "bit-65mm-cir-65.webp",
  "bit-76mm-cir-76.webp",
  "bit-90-mm-cir-90.webp",
  "bit-110mm-cir-110.webp",
  "bit-130-mm-cir-90.webp",
  "bit-150mm-cir-110.webp",
  "bit-412m40.webp",
  "bit512m50.webp",
  "bit-622-m60.webp",
  "broca-pdc.webp",
  "broca-triconica.webp",
  "flow123.webp",
  "hastes.webp",
  "img-7754.webp",
  "produto-7754.webp",
  "img-7755.webp",
  "produto-7755.webp",
  "produto-7757.webp",
  "triton-tri600-hero.webp",
  "triton-tri600-manutencao.webp",
  "triton-tri600-painel.webp",
  "triton-csh350-ficha.webp",
  "triton-tri600-vista.webp",
  "img-7101.webp",
  "img-7391.webp",
  "wa-150405.webp",
  "produto-7069.webp",
  "wa-151037.webp",
  "wa-150822.webp",
  "produto-7475.webp",
  "img-7476.webp",
  "img-7624.webp",
  "img-7625.webp",
];

async function toSquare(input, output, cropCatalog) {
  const img = sharp(input, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  const w = meta.width || 1000;
  const h = meta.height || 1000;
  let pipeline = sharp(input, { failOn: "none" }).rotate();
  if (cropCatalog) {
    pipeline = pipeline.extract({
      left: 0,
      top: Math.round(h * 0.17),
      width: w,
      height: Math.max(80, Math.round(h * 0.58)),
    });
  }
  await pipeline
    .resize(900, 900, { fit: "contain", background: paper })
    .webp({ quality: 86 })
    .toFile(output);
}

for (const file of productFiles) {
  await toSquare(path.join(images, file), path.join(cards, file), catalogBits.has(file));
}

await toSquare(
  path.join(root, "public/brand/perfuratriz.webp"),
  path.join(cards, "perfuratriz.webp"),
  false,
);

const pack = ["grupo-fvt-emblem.svg", "grupo-fvt-emblem.png", "grupo-fvt-emblem-512.png", "grupo-fvt-og.jpg"];

for (const file of pack) {
  copyFileSync(path.join(logos, file), path.join(downloads, file));
}

writeFileSync(
  path.join(downloads, "LEIA-ME.txt"),
  [
    "GRUPO FVT — identidade do site",
    "",
    "Arquivos:",
    "- grupo-fvt-emblem.svg          emblema circular GRUPO / FVT / 11 ANOS (vetor, texto em paths)",
    "- grupo-fvt-emblem.png          emblema 1024x1024, fundo transparente",
    "- grupo-fvt-emblem-512.png      emblema 512x512, fundo transparente",
    "- grupo-fvt-og.jpg              imagem para redes sociais (1200x630, fundo navy)",
    "",
    "As letras da marca são FVT (não FTV).",
    "",
  ].join("\n"),
  "utf8",
);

console.log("FVT logos + card images ready");
