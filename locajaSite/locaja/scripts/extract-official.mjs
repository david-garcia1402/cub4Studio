import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const tmp = "tmp";
const outDir = "public/equipment";
mkdirSync(outDir, { recursive: true });

const categoryMap = {
  "acesso-e-elevacao": "acesso-elevacao",
  "andaimes-e-escoras": "andaimes-escoras",
  compactacao: "compactacao",
  "concretagem-e-piso": "concretagem-piso",
  container: "container",
  "ferramentas-eletricas": "ferramentas-eletricas",
  "furacao-e-demolicao": "furacao-demolicao",
  "gerador-bomba-e-compressor": "gerador-bomba-compressor",
  "limpeza-jardinagem-e-pintura": "limpeza-jardinagem-pintura",
  lixadeiras: "lixadeiras",
  "plataforma-elevatoria": "plataforma-elevatoria",
  serras: "serras",
  outros: "outros",
};

function betterUrl(url) {
  return url
    .replace(/-\d+x\d+(?=\.(jpe?g|png|webp))/i, "")
    .replace(/-570x456(?=\.(jpe?g|png|webp))/i, "");
}

function slugFromHref(href) {
  const part = href.split("/equipamentos/")[1] || "";
  return part.replace(/\/$/, "");
}

const items = [];

for (const file of readdirSync(tmp).filter((f) => f.endsWith(".html"))) {
  const key = file.replace(".html", "");
  const category = categoryMap[key];
  const html = readFileSync(path.join(tmp, file), "utf8");
  const articles = html.match(/<article class='mix[\s\S]*?<\/article>/g) || [];

  for (const article of articles) {
    const href = article.match(/href='(https:\/\/www\.locaja\.com\.br\/equipamentos\/[^']+)'/)?.[1];
    const img = article.match(/wp-post-image[^>]*src="([^"]+)"/)?.[1]
      || article.match(/src="(https:\/\/www\.locaja\.com\.br\/wp-content\/uploads\/[^"]+\.(?:jpe?g|png|webp))"/)?.[1];
    const name = article.match(/portfolio_title[^>]*>[\s\S]*?>([^<]+)</)?.[1]?.trim();
    if (!href || !img || !name) continue;
    if (/logo|favicon|cookie/i.test(img)) continue;

    items.push({
      slug: slugFromHref(href),
      name: name.replace(/\s+/g, " "),
      category,
      imageUrl: betterUrl(img),
      thumb: img,
    });
  }
}

const unique = [];
const seen = new Set();
for (const item of items) {
  if (seen.has(item.slug)) continue;
  seen.add(item.slug);
  unique.push(item);
}

console.log(`Found ${unique.length} official products`);

for (const item of unique) {
  const ext = path.extname(new URL(item.imageUrl).pathname) || ".jpg";
  const file = `${item.slug}${ext}`;
  const dest = path.join(outDir, file);
  const candidates = [item.imageUrl, item.thumb];
  let ok = false;
  for (const url of candidates) {
    try {
      execFileSync("curl.exe", ["-L", "--fail", "--max-time", "25", "-o", dest, url], {
        stdio: "pipe",
      });
      const size = readFileSync(dest).length;
      if (size > 2000) {
        item.file = `/equipment/${file}`;
        console.log(`OK ${item.slug} ${size}`);
        ok = true;
        break;
      }
    } catch {
      // try next url
    }
  }
  if (!ok) {
    console.log(`SKIP ${item.slug}`);
  }
}

const kept = unique.filter((item) => item.file);
writeFileSync("tmp/official-catalog.json", JSON.stringify(kept, null, 2));
console.log(`Kept ${kept.length} items with real photos`);
