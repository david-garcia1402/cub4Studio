import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const outDir = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/images";
mkdirSync(outDir, { recursive: true });

const pages = [
  "https://flowequipamentos.com/martelos/",
  "https://flowequipamentos.com/bits/",
  "https://flowequipamentos.com/brocas-perfuradoras/",
  "https://flowequipamentos.com/motobombas/",
  "https://flowequipamentos.com/pecas-e-acessorios/",
  "https://flowequipamentos.com/perfuracao-dth/",
  "https://flowequipamentos.com/perfuracao-rotativa/",
  "https://flowequipamentos.com/mineracao-e-desmonte-de-rochas/",
  "https://flowequipamentos.com/fundacoes-e-contencoes/",
  "https://flowequipamentos.com/sondagem-e-geotecnica/",
  "https://flowequipamentos.com/bombeamento-e-drenagem/",
];

const known = [
  "https://flowequipamentos.com/wp-content/uploads/2025/09/Martelo-Cir-90.png",
  "https://flowequipamentos.com/wp-content/uploads/2025/09/Martelo-Mission-40.png",
  "https://flowequipamentos.com/wp-content/uploads/2025/09/Martelo-Mission-50.png",
  "https://flowequipamentos.com/wp-content/uploads/2025/09/Martelo-Mission-60.png",
  "https://flowequipamentos.com/wp-content/uploads/2025/09/Martelo-Mission-80.png",
  "https://flowequipamentos.com/wp-content/uploads/2025/09/MARTELO-CIR-110.jpg",
  "https://flowequipamentos.com/wp-content/uploads/2025/09/Martelos-Cir-1.png",
];

const found = new Set(known);

function curl(url, dest) {
  const r = spawnSync(
    "curl.exe",
    ["-sL", "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0 Safari/537.36", "-H", "Accept: text/html,image/*,*/*", "-o", dest, url],
    { encoding: "utf8" },
  );
  if (r.status !== 0) throw new Error(r.stderr || `curl fail ${url}`);
}

for (const page of pages) {
  const tmp = path.join(outDir, "_page.html");
  try {
    curl(page, tmp);
    const html = readFileSync(tmp, "utf8");
    const matches = html.matchAll(/https?:\/\/flowequipamentos\.com\/wp-content\/uploads\/[^"' )\s]+/gi);
    for (const m of matches) {
      const clean = decodeURI(m[0].split("?")[0]);
      if (/\.(jpe?g|png|webp)$/i.test(clean) && !/logo|icon|favicon|whatsapp|sprite|branco/i.test(clean)) {
        found.add(clean);
      }
    }
    console.log("page", page, "total", found.size);
  } catch (err) {
    console.log("page fail", page, err.message);
  }
}

for (const src of found) {
  const raw = decodeURIComponent(src.split("/").pop() || "img");
  const slug = raw
    .replace(/\.[a-z]+$/i, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  const tmp = path.join(outDir, `_dl-${slug}`);
  try {
    curl(src, tmp);
    await sharp(tmp, { failOn: "none" })
      .rotate()
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(path.join(outDir, `${slug}.webp`));
    console.log("saved", slug);
  } catch (err) {
    console.log("img fail", src, err.message);
  }
}

writeFileSync(path.join(outDir, "_scraped.txt"), [...found].sort().join("\n"));
console.log("done", found.size);
