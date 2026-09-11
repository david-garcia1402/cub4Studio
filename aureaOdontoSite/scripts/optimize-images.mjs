import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "images");

const jobs = [
  { in: "11-extra.jpg", out: "fachada.webp", w: 1800, h: 2200, fit: "cover", pos: "centre" },
  { in: "01-fachada.jpg", out: "fachada-close.webp", w: 1600, h: 900, fit: "cover", pos: "centre" },
  { in: "02-interior.jpg", out: "recepcao.webp", w: 1400, h: 1800, fit: "cover", pos: "centre" },
  { in: "03-ambiente.jpg", out: "consultorio.webp", w: 1600, h: 1200, fit: "inside" },
  { in: "04-consultorio.jpg", out: "detalhes.webp", w: 1200, h: 1600, fit: "inside" },
  { in: "06-espaco.jpg", out: "caso-lente.webp", w: 1200, h: 1300, fit: "inside" },
  { in: "07-sala.jpg", out: "logo-parede.webp", w: 1400, h: 1800, fit: "cover", pos: "centre" },
  { in: "08-equipe.jpg", out: "antes-depois.webp", w: 1200, h: 1700, fit: "inside" },
  { in: "09-tratamento.jpg", out: "lentes.webp", w: 1200, h: 1600, fit: "inside" },
  { in: "10-recepcao.jpg", out: "brand.webp", w: 1200, h: 1500, fit: "inside" },
];

await mkdir(dir, { recursive: true });

for (const job of jobs) {
  const input = join(dir, job.in);
  const output = join(dir, job.out);
  await sharp(input)
    .rotate()
    .resize({
      width: job.w,
      height: job.h,
      fit: job.fit,
      position: job.pos ?? "centre",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  console.log("ok", job.out);
}

const logo = await sharp(join(dir, "07-sala.jpg"))
  .rotate()
  .extract({ left: 180, top: 980, width: 2660, height: 1680 })
  .resize({ width: 900 })
  .webp({ quality: 88 })
  .toBuffer();
await sharp(logo).toFile(join(dir, "logo-crop.webp"));

const icon = await sharp(join(dir, "07-sala.jpg"))
  .rotate()
  .extract({ left: 1680, top: 720, width: 720, height: 720 })
  .resize(180, 180)
  .png()
  .toBuffer();
await sharp(icon).toFile(join(root, "public", "apple-touch-icon.png"));

await copyFile(join(dir, "fachada.webp"), join(dir, "og.webp")).catch(() => {});
console.log("images optimized");
