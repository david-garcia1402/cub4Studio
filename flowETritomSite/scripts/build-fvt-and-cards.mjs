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

async function raster(svgName, outName, width, height, background) {
  const buf = await sharp(path.join(logos, svgName), { density: 220 })
    .resize(width, height, { fit: "contain", background })
    .png({ compressionLevel: 6 })
    .toBuffer();
  const dests = [outName, outName.replace("fvt", "ftv")];
  for (const name of dests) {
    await sharp(buf).toFile(path.join(logos, name));
  }
}

const navy = { r: 11, g: 31, b: 51, alpha: 1 };
const paper = { r: 247, g: 244, b: 238, alpha: 1 };

await raster("grupo-fvt.svg", "grupo-fvt-navy.png", 1600, 640, navy);
await raster("grupo-fvt-transparente.svg", "grupo-fvt-light.png", 1600, 580, paper);
await raster("grupo-fvt-emblem.svg", "grupo-fvt-emblem.png", 800, 800, navy);

copyFileSync(path.join(logos, "grupo-fvt.svg"), path.join(logos, "grupo-ftv.svg"));
copyFileSync(path.join(logos, "grupo-fvt-transparente.svg"), path.join(logos, "grupo-ftv-transparente.svg"));

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

const pack = [
  "grupo-fvt.svg",
  "grupo-fvt-transparente.svg",
  "grupo-fvt-emblem.svg",
  "grupo-fvt-navy.png",
  "grupo-fvt-light.png",
  "grupo-fvt-emblem.png",
];

for (const file of pack) {
  copyFileSync(path.join(logos, file), path.join(downloads, file));
}

writeFileSync(
  path.join(downloads, "LEIA-ME.txt"),
  [
    "GRUPO FVT — identidade do site",
    "",
    "Arquivos:",
    "- grupo-fvt.svg                 marca completa com fundo navy (vetor)",
    "- grupo-fvt-transparente.svg    marca sem fundo, para fundos claros (vetor)",
    "- grupo-fvt-emblem.svg          emblema isolado (vetor)",
    "- grupo-fvt-navy.png            versão raster com fundo navy",
    "- grupo-fvt-light.png           versão raster com fundo claro",
    "- grupo-fvt-emblem.png          símbolo isolado",
    "",
    "As letras da marca são FVT (não FTV).",
    "",
  ].join("\n"),
  "utf8",
);

console.log("FVT logos + card images ready");
