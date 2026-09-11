import { readFileSync, readdirSync, statSync, rmSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const deleteUnused = process.argv.includes("--delete");

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const mediaExt = new Set([".webp", ".png", ".jpg", ".jpeg", ".svg", ".gif", ".mp4", ".webm", ".heic", ".avif"]);
const files = walk(publicDir).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return mediaExt.has(ext) || path.basename(f) === "hastesVideo";
});

const srcFiles = walk(path.join(root, "src")).concat(path.join(root, "index.html"));
let blob = "";
for (const f of srcFiles) {
  if (/\.(ts|tsx|css|html)$/.test(f)) blob += readFileSync(f, "utf8") + "\n";
}

const used = new Set([
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/logos/grupo-fvt-og.jpg",
  "/logos/grupo-fvt-emblem.png",
  "/logos/grupo-fvt-emblem.svg",
  "/logos/flow-light.png",
  "/logos/flow-dark.png",
  "/logos/triton-light.png",
  "/logos/triton-dark.png",
]);

const re = /(?:["'`(\s])(\/(?:images|brand|videos|logos|favicon)[^"'`\s)]+)/g;
let m;
while ((m = re.exec(blob))) used.add(m[1].split("?")[0]);

for (const u of [...used]) {
  if (u.startsWith("/images/") && !u.includes("/cards/") && !u.includes("/carroChefe")) {
    used.add(`/images/cards/${u.split("/").pop()}`);
  }
}

const unused = [];
const kept = [];
for (const abs of files) {
  const rel = `/${path.relative(publicDir, abs).replaceAll("\\", "/")}`;
  const rec = { rel, size: statSync(abs).size, abs };
  (used.has(rel) ? kept : unused).push(rec);
}

unused.sort((a, b) => b.size - a.size);
const sum = (arr) => arr.reduce((s, x) => s + x.size, 0);
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

console.log(`USED   ${kept.length} files  ${mb(sum(kept))}`);
console.log(`UNUSED ${unused.length} files  ${mb(sum(unused))}`);
console.log("---UNUSED---");
for (const u of unused) console.log(`${(u.size / 1024 / 1024).toFixed(2).padStart(8)}  ${u.rel}`);

if (deleteUnused) {
  for (const u of unused) rmSync(u.abs, { force: true });
  const dirs = ["images/carroChefeFlow", "images/carroChefeTriton", "images/reais-fvt"];
  for (const d of dirs) {
    const abs = path.join(publicDir, d);
    try {
      rmSync(abs, { recursive: true, force: true });
      console.log("removed dir", d);
    } catch {
      /* empty */
    }
  }
  console.log("deleted", unused.length, "files");
}
