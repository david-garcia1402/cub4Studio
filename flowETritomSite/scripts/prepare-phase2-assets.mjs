/**
 * Fase 2 — assets enviados pelo cliente (10/09/2026).
 *
 *  - Martelos CIR (3 fotos reais em PNG, fundo branco) -> webp com fundo transparente + versão card 900x900.
 *  - Recorte do Claudio (fundo removido com @imgly/background-removal-node, rodado fora do repo) -> webp com alpha.
 *
 * Uso: node scripts/prepare-phase2-assets.mjs [caminho/do/claudio-cutout.png]
 */
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public/images");
const cardsDir = path.join(imagesDir, "cards");
mkdirSync(cardsDir, { recursive: true });

const CARD_BG = { r: 247, g: 244, b: 238, alpha: 1 };

/** Converte fundo branco (foto de produto já recortada e achatada em branco) em transparência. */
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    // 252+ -> transparente; 242- -> opaco; rampa curta para suavizar a borda.
    const alpha = Math.max(0, Math.min(255, Math.round((252 - min) * 25)));
    data[i + 3] = Math.min(data[i + 3], alpha);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

/** Fotos reais de produto (fundo branco) -> transparente + card. */
const hammers = [
  ["cir200 (2).png", "martelo-cir-1.webp"],
  ["cir200 (3).png", "martelo-cir-2.webp"],
  ["cir200.png", "martelo-cir-3.webp"],
  ["marteloSemiTurbinadoM3.png", "martelo-semi-turbinado-m3.webp"],
  ["marteloSemiTurbinadoM4.png", "martelo-semi-turbinado-m4.webp"],
];

/** Capas de cena (imagens de IA autorizadas pelo cliente) -> webp cheio + card 900x900 cover. */
const covers = [
  ["cards/iaCirMartelo.png", "martelo-cir-capa.webp"],
  ["cards/iaMartelosM3M4.png", "martelo-semi-turbinado-capa.webp"],
];

for (const [src, out] of covers) {
  const input = path.join(imagesDir, src);
  if (!existsSync(input)) {
    console.log("skip (não encontrado)", src);
    continue;
  }
  await sharp(input).webp({ quality: 88 }).toFile(path.join(imagesDir, out));
  await sharp(input).resize(900, 900, { fit: "cover" }).webp({ quality: 86 }).toFile(path.join(cardsDir, out));
  console.log("ok capa", src, "->", out);
}

for (const [src, out] of hammers) {
  const input = path.join(imagesDir, src);
  if (!existsSync(input)) {
    console.log("skip (não encontrado)", src);
    continue;
  }
  const base = await whiteToAlpha(input);
  const trimmed = await base.trim({ threshold: 10 }).png().toBuffer();
  await sharp(trimmed).resize({ height: 1000, fit: "inside", withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.join(imagesDir, out));
  await sharp(trimmed)
    .resize(900, 900, { fit: "contain", background: CARD_BG })
    .flatten({ background: CARD_BG })
    .webp({ quality: 86 })
    .toFile(path.join(cardsDir, out));
  console.log("ok", src, "->", out);
}

// Fachada do galpão sem o selo antigo "há 10 anos" (topo da foto) — fundo do recorte do fundador.
const facade = path.join(imagesDir, "flow-build.webp");
if (existsSync(facade) && !existsSync(path.join(imagesDir, "galpao-itapema.webp"))) {
  await sharp(facade).extract({ left: 0, top: 264, width: 763, height: 936 }).webp({ quality: 82 }).toFile(path.join(imagesDir, "galpao-itapema.webp"));
  console.log("ok galpao-itapema.webp");
}

// Compressor TRI600 inteiro, recortado da ficha técnica (sem textos) — imagem principal do card Triton na home.
const ficha = path.join(imagesDir, "triton-comp-10.webp");
if (existsSync(ficha) && !existsSync(path.join(imagesDir, "triton-tri600-compressor.webp"))) {
  await sharp(ficha).extract({ left: 0, top: 250, width: 608, height: 420 }).resize({ width: 1216 }).webp({ quality: 86 }).toFile(path.join(imagesDir, "triton-tri600-compressor.webp"));
  console.log("ok triton-tri600-compressor.webp");
}

const cutout = process.argv[2];
if (cutout && existsSync(cutout)) {
  const trimmed = await sharp(cutout).trim({ threshold: 8 }).png().toBuffer();
  const info = await sharp(trimmed)
    .resize({ width: 1080, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(path.join(imagesDir, "claudio-cutout.webp"));
  console.log("ok claudio-cutout.webp", info.width, info.height);
}
