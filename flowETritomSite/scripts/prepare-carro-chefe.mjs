/**
 * Converte as fotos de carro-chefe do cliente (HEIC/JPG/PNG)
 * para WebP full-size + cards 900×900.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import convert from "heic-convert";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public/images");
const cardsDir = path.join(imagesDir, "cards");
const flowSrc = path.join(imagesDir, "carroChefeFlow");
const tritonSrc = path.join(imagesDir, "carroChefeTriton");
mkdirSync(cardsDir, { recursive: true });

const CARD_BG = { r: 247, g: 244, b: 238, alpha: 1 };

async function loadBuffer(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const raw = readFileSync(filePath);
  if (ext === ".heic") {
    return Buffer.from(await convert({ buffer: raw, format: "JPEG", quality: 0.92 }));
  }
  return raw;
}

async function writePair(buffer, outName, { fit = "contain", extract } = {}) {
  let pipeline = sharp(buffer, { failOn: "none" }).rotate();
  if (extract) pipeline = pipeline.extract(extract);
  const full = await pipeline.webp({ quality: 86 }).toBuffer();
  const dest = path.join(imagesDir, outName);
  writeFileSync(dest, full);

  const cardFit = fit === "cover" ? "cover" : "contain";
  await sharp(full, { failOn: "none" })
    .resize(900, 900, { fit: cardFit, background: CARD_BG })
    .flatten({ background: CARD_BG })
    .webp({ quality: 86 })
    .toFile(path.join(cardsDir, outName));
  console.log("ok", outName, fit, extract ? "cropped" : "full");
}

const jobs = [
  // FLOW
  { src: path.join(flowSrc, "IMG_5096.HEIC"), out: "flow-martelos-dth.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_0096.HEIC"), out: "flow-mission-60.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_9153.JPG.jpeg"), out: "flow-bit-dth.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_4792.JPG.jpeg"), out: "flow-pdc-lote.webp", fit: "cover" },
  { src: path.join(flowSrc, "IMG_7552.HEIC"), out: "flow-pdc.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_7554.HEIC"), out: "flow-triconica.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_9499.HEIC"), out: "flow-hastes.webp", fit: "cover" },
  { src: path.join(flowSrc, "IMG_9501.HEIC"), out: "flow-hastes-2.webp", fit: "cover" },
  { src: path.join(flowSrc, "IMG_9577.JPG.jpeg"), out: "flow-hastes-expedicao.webp", fit: "cover" },
  { src: path.join(flowSrc, "IMG_9574.HEIC"), out: "flow-hastes-caminhao.webp", fit: "cover" },
  { src: path.join(flowSrc, "IMG_0515.HEIC"), out: "flow-bombas-submersas.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_0530.HEIC"), out: "flow-bomba-superficie.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_7281.HEIC"), out: "flow-perfuratriz-manual.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_0021.HEIC"), out: "flow-perfuratriz-manual-2.webp", fit: "contain" },
  { src: path.join(flowSrc, "IMG_7146.HEIC"), out: "flow-taper-bits.webp", fit: "cover" },

  // TRITON — fotos reais
  { src: path.join(tritonSrc, "IMG_0290.JPG.jpeg"), out: "triton-perfuratriz-pocos.webp", fit: "contain" },
  {
    src: path.join(tritonSrc, "IMG_0424.PNG"),
    out: "triton-perfuratriz-pocos-2.webp",
    fit: "contain",
    // Recorte da máquina, sem chrome do celular (1290×2796)
    extract: { left: 80, top: 720, width: 1130, height: 1320 },
  },
  {
    src: path.join(tritonSrc, "IMG_0345.PNG"),
    out: "triton-perfuratriz-mineracao.webp",
    fit: "contain",
    extract: { left: 60, top: 980, width: 1170, height: 1180 },
  },
  { src: path.join(tritonSrc, "IMG_0893.JPG.jpeg"), out: "triton-hdd.webp", fit: "cover" },
  { src: path.join(tritonSrc, "IMG_0894.JPG.jpeg"), out: "triton-hdd-2.webp", fit: "cover" },
  {
    src: path.join(tritonSrc, "IMG_0831.PNG"),
    out: "triton-tri860.webp",
    fit: "contain",
    extract: { left: 36, top: 210, width: 500, height: 540 },
  },
  { src: path.join(tritonSrc, "IMG_0831.PNG"), out: "triton-tri860-ficha.webp", fit: "contain" },
  {
    src: path.join(tritonSrc, "IMG_0829.PNG"),
    out: "triton-tri1100.webp",
    fit: "contain",
    extract: { left: 36, top: 210, width: 500, height: 540 },
  },
  { src: path.join(tritonSrc, "IMG_0829.PNG"), out: "triton-tri1100-ficha.webp", fit: "contain" },
];

for (const job of jobs) {
  if (!existsSync(job.src) || readFileSync(job.src).length === 0) {
    console.log("skip", path.basename(job.src));
    continue;
  }
  const buffer = await loadBuffer(job.src);
  await writePair(buffer, job.out, job);
}

console.log("done");
