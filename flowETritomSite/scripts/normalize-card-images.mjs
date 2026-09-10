import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const srcDir = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/images";
const outDir = path.join(srcDir, "cards");
mkdirSync(outDir, { recursive: true });

const catalogBits = [
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
];

const skip = new Set(["claudio.webp", "sobre-equipe.webp", "flow-build.webp"]);

async function toSquare(input, output, cropCatalog) {
  const img = sharp(input, { failOn: "none" });
  const meta = await img.metadata();
  const w = meta.width || 1000;
  const h = meta.height || 1000;
  let pipeline = sharp(input, { failOn: "none" }).rotate();
  if (cropCatalog) {
    const top = Math.round(h * 0.17);
    const height = Math.round(h * 0.58);
    pipeline = pipeline.extract({ left: 0, top, width: w, height });
  }
  await pipeline
    .resize(900, 900, {
      fit: "contain",
      background: { r: 247, g: 244, b: 238, alpha: 1 },
    })
    .webp({ quality: 86 })
    .toFile(output);
}

const files = readdirSync(srcDir).filter((f) => f.endsWith(".webp") && !skip.has(f));
for (const file of files) {
  const crop = catalogBits.includes(file);
  await toSquare(path.join(srcDir, file), path.join(outDir, file), crop);
  console.log(crop ? "crop" : "pad", file);
}

console.log("cards", files.length);
