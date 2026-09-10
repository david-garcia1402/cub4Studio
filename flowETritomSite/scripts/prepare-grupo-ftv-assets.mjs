import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const assets = "C:/Users/David/.cursor/projects/c-Users-David-cub4Studio-cub4StudioLPs-flowETritomSite/assets";
const publicLogos = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/logos";
const publicImages = "C:/Users/David/cub4Studio/cub4StudioLPs/flowETritomSite/public/images";
const downloads = "C:/Users/David/Downloads/Grupo-FTV-Logo";

mkdirSync(publicLogos, { recursive: true });
mkdirSync(downloads, { recursive: true });

const sources = {
  navy: path.join(assets, "grupo-ftv-logo-navy.png"),
  light: path.join(assets, "grupo-ftv-logo-light.png"),
  emblem: path.join(assets, "grupo-ftv-emblem.png"),
};

const claudioSrc = path.join(publicImages, "sobre-equipe.webp");

await sharp(sources.navy).png({ compressionLevel: 6 }).toFile(path.join(publicLogos, "grupo-ftv-navy.png"));
await sharp(sources.light).png({ compressionLevel: 6 }).toFile(path.join(publicLogos, "grupo-ftv-light.png"));
await sharp(sources.emblem).png({ compressionLevel: 6 }).toFile(path.join(publicLogos, "grupo-ftv-emblem.png"));

await sharp(claudioSrc)
  .resize(1080, 1440, { fit: "cover", position: "center" })
  .webp({ quality: 86 })
  .toFile(path.join(publicImages, "claudio.webp"));

const packFiles = [
  "grupo-ftv.svg",
  "grupo-ftv-transparente.svg",
  "grupo-ftv-navy.png",
  "grupo-ftv-light.png",
  "grupo-ftv-emblem.png",
];

for (const file of packFiles) {
  copyFileSync(path.join(publicLogos, file), path.join(downloads, file));
}

writeFileSync(
  path.join(downloads, "LEIA-ME.txt"),
  [
    "GRUPO FTV — identidade proposta para o protótipo",
    "",
    "Arquivos:",
    "- grupo-ftv.svg              marca completa com fundo navy (vetor)",
    "- grupo-ftv-transparente.svg marca sem fundo, para fundos claros (vetor)",
    "- grupo-ftv-navy.png         versão raster com fundo navy",
    "- grupo-ftv-light.png        versão raster com fundo claro",
    "- grupo-ftv-emblem.png       símbolo isolado",
    "",
    "O emblema (escudo + três lâminas) representa evolução, proteção e as empresas do grupo.",
    "A Flow e a Triton são as marcas visíveis nesta etapa. A terceira empresa fica para projeto futuro.",
    "",
  ].join("\n"),
  "utf8",
);

console.log("Grupo FTV assets ready");
