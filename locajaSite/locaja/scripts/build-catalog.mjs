import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const extras = [
  { slug: "container-com-sem-banheiro", name: "Container Com/Sem Banheiro", category: "container", file: "/equipment/container-com-sem-banheiro.jpeg" },
  { slug: "chave-de-impacto", name: "Chave de Impacto", category: "ferramentas-eletricas", file: "/equipment/chave-de-impacto.jpg" },
  { slug: "esmerilhadeira-45", name: "Esmerilhadeira 4,5”", category: "ferramentas-eletricas", file: "/equipment/esmerilhadeira-45.jpg" },
  { slug: "esmerilhadeira-9", name: "Esmerilhadeira 9”", category: "ferramentas-eletricas", file: "/equipment/esmerilhadeira-9.jpg" },
  { slug: "multicorte-eletrica", name: "Multicorte Elétrica", category: "ferramentas-eletricas", file: "/equipment/multicorte-eletrica.jpg" },
  { slug: "plaina-para-madeira", name: "Plaina para Madeira", category: "ferramentas-eletricas", file: "/equipment/plaina-para-madeira.jpg" },
  { slug: "retifica-reta", name: "Retífica Reta", category: "ferramentas-eletricas", file: "/equipment/retifica-reta.jpg" },
  { slug: "furadeira", name: "Furadeira", category: "furacao-demolicao", file: "/equipment/furadeira.jpg" },
  { slug: "furadeira-de-bancada-movel", name: "Furadeira de Bancada Móvel", category: "furacao-demolicao", file: "/equipment/furadeira-de-bancada-movel.jpg" },
  { slug: "furadeira-parafusadeira", name: "Furadeira/Parafusadeira", category: "furacao-demolicao", file: "/equipment/furadeira-parafusadeira.jpg" },
];

const raw = JSON.parse(readFileSync("tmp/official-catalog.json", "utf8"));
const files = new Set(readdirSync("public/equipment"));

function cleanSlug(slug) {
  return decodeURIComponent(slug).replace(/\u2060/g, "").replace(/^\W+/, "");
}

const featured = new Set([
  "betoneira-250-litros",
  "compactador-de-solo-a-gasolina",
  "plataforma-tipo-tesoura",
  "guincho-de-coluna-400kg-trifasico",
  "andaimes-tubolares",
  "esmerilhadeira-9",
]);

const shorts = {
  "betoneira-250-litros": "O volume certo para concretagens do dia a dia.",
  "compactador-de-solo-a-gasolina": "Compactador tipo sapo para bases, valas e calçadas.",
  "plataforma-tipo-tesoura": "Área de trabalho estável para instalações e pintura.",
  "guincho-de-coluna-400kg-trifasico": "Elevação de materiais em obra com capacidade de 400 kg.",
  "andaimes-tubolares": "Montagem modular para fachadas e estruturas.",
  "esmerilhadeira-9": "Corte e desbaste pesado em metal e concreto.",
};

const merged = [...raw, ...extras];
const seen = new Set();
const items = [];

for (const item of merged) {
  const slug = cleanSlug(item.slug);
  if (seen.has(slug)) continue;
  const fileName = path.basename(item.file || "").replace(/%e2%81%a0/gi, "").replace(/\u2060/g, "");
  const decoded = decodeURIComponent(fileName);
  const exists = files.has(fileName) || files.has(decoded) || files.has(`${slug}${path.extname(fileName)}`);
  if (!exists) continue;
  const used = files.has(decoded) ? decoded : files.has(fileName) ? fileName : `${slug}${path.extname(fileName)}`;
  seen.add(slug);
  items.push({
    slug,
    name: item.name.replace(/\u2060/g, "").trim(),
    category: item.category,
    short: shorts[slug] || `${item.name.replace(/\u2060/g, "").trim()} para locação, com foto oficial do catálogo Locajá.`,
    image: `/equipment/${used}`,
    featured: featured.has(slug),
  });
}

const categories = [
  ["acesso-elevacao", "Acesso e Elevação", "Guinchos, balancins, empilhadeiras e talhas"],
  ["andaimes-escoras", "Andaimes e Escoras", "Tubulares, retráteis e escoras metálicas"],
  ["compactacao", "Compactação", "Sapos e placas vibratórias"],
  ["concretagem-piso", "Concretagem e Piso", "Betoneiras, vibradores e alisadoras"],
  ["container", "Container", "Apoio de obra e banheiro metálico"],
  ["ferramentas-eletricas", "Ferramentas Elétricas", "Esmerilhadeiras, impacto e retífica"],
  ["furacao-demolicao", "Furação e Demolição", "Rompedores, furadeiras e perfuradores"],
  ["gerador-bomba-compressor", "Gerador, Bomba e Compressor", "Energia, água e ar comprimido"],
  ["limpeza-jardinagem-pintura", "Limpeza, Jardinagem e Pintura", "Lava-jato, roçadeiras e airless"],
  ["lixadeiras", "Lixadeiras", "Parede, teto, cinta e politriz"],
  ["plataforma-elevatoria", "Plataforma Elevatória", "Tesoura, articulada e unipessoal"],
  ["serras", "Serras", "Madeira, mármore, concreto e parede"],
  ["outros", "Outros", "Solda, níveis a laser e apoio"],
];

const catBlock = categories
  .map(([id, name, blurb]) => {
    const cover = items.find((i) => i.category === id)?.image;
    if (!cover) return null;
    return `  {\n    id: "${id}",\n    name: "${name}",\n    blurb: "${blurb}",\n    image: "${cover}",\n  }`;
  })
  .filter(Boolean)
  .join(",\n");

const itemBlock = items
  .map(
    (i) =>
      `  {\n    slug: ${JSON.stringify(i.slug)},\n    name: ${JSON.stringify(i.name)},\n    category: "${i.category}",\n    short: ${JSON.stringify(i.short)},\n    description: ${JSON.stringify(`${i.name} disponível para locação nas unidades Locajá. Foto oficial do catálogo da empresa.`)},\n    image: ${JSON.stringify(i.image)},${i.featured ? "\n    featured: true," : ""}\n  }`,
  )
  .join(",\n");

const ts = `export type CategoryId =
  | "acesso-elevacao"
  | "andaimes-escoras"
  | "compactacao"
  | "concretagem-piso"
  | "container"
  | "ferramentas-eletricas"
  | "furacao-demolicao"
  | "gerador-bomba-compressor"
  | "limpeza-jardinagem-pintura"
  | "lixadeiras"
  | "plataforma-elevatoria"
  | "serras"
  | "outros";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
};

export type Equipment = {
  slug: string;
  name: string;
  category: CategoryId;
  short: string;
  description: string;
  image: string;
  featured?: boolean;
};

export const categories: Category[] = [
${catBlock}
];

export const equipment: Equipment[] = [
${itemBlock}
];

export function getEquipment(slug: string) {
  return equipment.find((item) => item.slug === slug);
}

export function getByCategory(category: CategoryId) {
  return equipment.filter((item) => item.category === category);
}

export function searchEquipment(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return equipment;
  return equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.short.toLowerCase().includes(q) ||
      categories
        .find((category) => category.id === item.category)
        ?.name.toLowerCase()
        .includes(q),
  );
}

export const featuredEquipment = equipment.filter((item) => item.featured);
`;

writeFileSync("src/data/equipment.ts", ts);
console.log(`Wrote ${items.length} official items`);
console.log(Object.fromEntries(categories.map(([id]) => [id, items.filter((i) => i.category === id).length])));
