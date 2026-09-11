export type Brand = "flow" | "triton";

export type Product = {
  id: string;
  brand: Brand;
  category: string;
  name: string;
  summary: string;
  specs: string;
  /** Imagem principal (card). */
  image: string;
  /** Galeria — fotos enviadas pelo cliente. Quando presente, o card mostra miniaturas para alternar e abre lightbox. */
  images?: string[];
  /**
   * Como a capa (`image`) preenche o quadro do card: "contain" (padrão, produto recortado) ou
   * "cover" (foto de cena/ambiente, ocupa o quadro inteiro). As demais fotos da galeria usam "contain".
   */
  coverFit?: "contain" | "cover";
  /**
   * "aprovado" = foto + descrição enviadas pelo cliente na fase 2 (formato final).
   * Sem status = item do protótipo (catálogo 2025), mantido até o cliente enviar o modelo novo.
   */
  status?: "aprovado";
};

export type Category = {
  id: string;
  label: string;
  shortLabel?: string;
  /** O que a categoria inclui (definido pelo cliente). */
  includes: readonly string[];
};

/** Telefone fixo — SOMENTE LIGAÇÃO. Este número não tem WhatsApp. */
export const PHONE_FIXO = "(47) 2033-4417";
export const PHONE_FIXO_TEL = "+554720334417";
/** Celular comercial — WhatsApp e ligação. */
export const PHONE_WHATSAPP = "(47) 99918-9698";
export const WHATSAPP = "5547999189698";

/** @deprecated use PHONE_FIXO (somente ligação) */
export const PHONE_DISPLAY = PHONE_FIXO;
/** @deprecated use PHONE_WHATSAPP */
export const PHONE_ALT = PHONE_WHATSAPP;

/** Vídeos institucionais / produto em operação (hospedados em /public/videos, 720p otimizado). */
export const VIDEOS = {
  flowBemVindo: {
    src: "/videos/flow-bemvindo.mp4",
    poster: "/videos/flow-bemvindo-poster.webp",
    title: "Flow — equipamentos para poços artesianos em operação",
    /** Fonte original enviada pelo cliente (1080x1920, 84 MB). */
    source: "https://flowequipamentos.com/wp-content/uploads/2025/09/FLOW-BEMVINDO.mp4",
  },
  marteloDth: {
    src: "/videos/flow-martelo-dth.mp4",
    poster: "/videos/flow-martelo-dth-poster.webp",
    title: "Flow — martelo DTH em operação",
    source: "IMG_0043.MP4",
  },
  hastesEstoque: {
    src: "/videos/flow-hastes.mp4",
    poster: "/videos/flow-hastes-poster.webp",
    title: "Flow — hastes de perfuração em estoque",
    source: "hastesVideo",
  },
} as const;

/** Diferenciais do negócio — devem aparecer com destaque no site (SEO + confiança). */
export const differentials = [
  {
    id: "envios",
    kicker: "Brasil",
    title: "Envios para todo o Brasil",
    text: "Estoque próprio em Itapema-SC e despacho para todos os estados, com rastreamento do pedido até a entrega.",
  },
  {
    id: "transporte",
    kicker: "100%",
    title: "Transporte dedicado 100% seguro",
    text: "Carga embalada, protegida e acompanhada do nosso estoque até a sua operação, com transportadoras homologadas.",
  },
  {
    id: "garantia",
    kicker: "NF-e",
    title: "Produtos com nota fiscal e garantia",
    text: "Equipamentos originais, faturados com nota fiscal eletrônica e garantia conforme cada linha de produto.",
  },
  {
    id: "seguranca",
    kicker: "Técnico",
    title: "Perfurando com segurança",
    text: "Orientação técnica para escolher martelo, bit, pressão e vazão certos para o seu solo — e suporte técnico pós-venda para operar sem paradas e sem riscos.",
  },
] as const;
export const EMAIL = "comercial@flowequipamentos.com";
export const ADDRESS = "R. 2150, nº 276 — Sertão do Trombudo, Itapema - SC";
export const HOURS = "Seg a sex · 08h00–12h00 e 13h30–17h30";
export const INSTAGRAM = "https://www.instagram.com/flowequipamentos/";
export const FACEBOOK = "https://www.facebook.com/flowcomercial/";
export const CATALOG_URL = "https://flowequipamentos.com/wp-content/uploads/2025/09/Catalogo-Flow.pdf";
export const MAPS_URL = "https://www.google.com/maps?cid=5783940872460123096";
export const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.4!2d-48.611!3d-27.091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b11e7041a919%3A0x50606a0d20279bd8!2sFlow%20Equipamentos%20para%20Po%C3%A7os%20Artesianos!5e0!3m2!1spt-BR!2sbr";
export const GOOGLE_REVIEWS_URL = "https://share.google/3qurHZ2kmDdTA13Th";

export const googlePlace = {
  name: "Flow Equipamentos para Poços Artesianos",
  reviewCount: 6,
  reviewsUrl: GOOGLE_REVIEWS_URL,
  mapsUrl: MAPS_URL,
  reviews: [
    {
      name: "Rosângela De Camargo Silveira",
      text: "Empresa seria e profissionais qualificados.",
    },
  ],
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Opções pré-setadas do formulário de contato. */
export const requestTypes = [
  "Orçamento",
  "Dúvida técnica — qual equipamento usar",
  "Prazo de entrega e frete",
  "Suporte técnico pós-venda",
  "Outro assunto",
] as const;

export const BRAZIL_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type ContactPrefill = {
  brand?: Brand;
  category?: string;
  product?: string;
  type?: (typeof requestTypes)[number];
};

/** Link para /contato com campos pré-preenchidos via query string. */
export const contactLink = (p: ContactPrefill = {}) => {
  const q = new URLSearchParams();
  if (p.brand) q.set("marca", p.brand);
  if (p.category) q.set("categoria", p.category);
  if (p.product) q.set("produto", p.product);
  if (p.type) q.set("tipo", p.type);
  const s = q.toString();
  return `/contato${s ? `?${s}` : ""}`;
};

/** Frase padrão do grupo — usar sempre esta forma (pedido do cliente). */
export const AFTER_SALES = "Suporte técnico pós-venda";

/** Categorias oficiais do cliente (11/09/2026). */
export const flowCategories: readonly Category[] = [
  { id: "dth", label: "Perfuração DTH", includes: ["Martelos", "Bits", "Hastes"] },
  { id: "rotativa", label: "Perfuração Rotativa", includes: ["Brocas"] },
  { id: "horizontal", label: "Perfuração horizontal", includes: ["Brocas", "Hastes"] },
  {
    id: "top-hammer",
    label: "Top Hammer",
    includes: ["Punhos", "Luvas", "Hastes", "Bits", "Perfuratrizes manuais", "Barras mina", "Mangueiras e conectores"],
  },
  { id: "mineracao-desmonte", label: "Mineração e desmonte", includes: ["Taper bits", "Bits de desmonte"] },
  { id: "sondagens", label: "Sondagens", includes: ["Coroas", "Calibradores", "Barriletes"] },
  { id: "bombeamento", label: "Bombeamento", includes: ["Bombas submersas", "Bombas de superfície"] },
];

export const tritonCategories: readonly Category[] = [
  { id: "perfuratrizes-pocos", label: "Perfuratrizes para poços artesianos — máquinas rotativas", shortLabel: "Poços artesianos · rotativas", includes: ["Perfuratrizes para poços artesianos", "Máquinas rotativas"] },
  { id: "horizontal-hdd", label: "Máquinas para perfuração horizontal HDD", shortLabel: "Perfuração horizontal HDD", includes: ["Máquinas para perfuração horizontal HDD"] },
  { id: "mineracao-rochas", label: "Perfuratrizes para mineração e desmonte de rochas", shortLabel: "Mineração e desmonte", includes: ["Perfuratrizes para mineração", "Perfuratrizes para desmonte de rochas"] },
  { id: "diesel-pocos", label: "Compressores de ar a diesel para poços artesianos", shortLabel: "Diesel · poços artesianos", includes: ["Compressores de ar a diesel para poços artesianos"] },
  { id: "diesel-pedreiras", label: "Compressores de ar a diesel para pedreiras e construção civil", shortLabel: "Diesel · pedreiras e construção", includes: ["Compressores de ar a diesel para pedreiras", "Compressores de ar a diesel para construção civil"] },
  { id: "eletricos-fundacoes", label: "Compressores elétricos para fundações e saneamento", shortLabel: "Elétricos · fundações e saneamento", includes: ["Compressores elétricos para fundações", "Compressores elétricos para saneamento"] },
];

export const categoriesByBrand: Record<Brand, readonly Category[]> = {
  flow: flowCategories,
  triton: tritonCategories,
};

export const categoryLabel: Record<string, string> = Object.fromEntries(
  [...flowCategories, ...tritonCategories].map((c) => [c.id, c.label]),
);
export const products: Product[] = [
  // ------------------------------------------------------------------
  // FLOW · PERFURAÇÃO DTH — aprovados (fase 2) + carro-chefe do cliente
  // ------------------------------------------------------------------
  {
    id: "martelos-cir",
    brand: "flow",
    category: "dth",
    name: "Martelos CIR",
    summary: "Martelos de baixa pressão utilizados para compressores de 5 a 10 BAR, mínimo 200 PCM.",
    specs: "Baixa pressão · 5 a 10 BAR · mín. 200 PCM",
    image: "/images/martelo-cir-capa.webp",
    coverFit: "cover",
    images: ["/images/martelo-cir-capa.webp", "/images/martelo-cir-1.webp", "/images/martelo-cir-2.webp", "/images/martelo-cir-3.webp"],
    status: "aprovado",
  },
  {
    id: "martelos-semi-turbinados",
    brand: "flow",
    category: "dth",
    name: "Martelos Semi Turbinados",
    summary: "Martelos de média pressão utilizados para compressores de 8 a 13 BAR, mínimo 300 PCM.",
    specs: "Média pressão · 8 a 13 BAR · mín. 300 PCM",
    image: "/images/martelo-semi-turbinado-capa.webp",
    coverFit: "cover",
    images: [
      "/images/martelo-semi-turbinado-capa.webp",
      "/images/martelo-semi-turbinado-m3.webp",
      "/images/martelo-semi-turbinado-m4.webp",
    ],
    status: "aprovado",
  },
  {
    id: "martelos-dth",
    brand: "flow",
    category: "dth",
    name: "Martelos DTH",
    summary: "Linha Flow de martelos DTH e bits — Mission e demais modelos para poços artesianos.",
    specs: "DTH · Mission e linha Flow",
    image: "/images/flow-martelos-dth.webp",
    images: ["/images/flow-martelos-dth.webp", "/images/flow-mission-60.webp"],
  },
  {
    id: "mission-60",
    brand: "flow",
    category: "dth",
    name: "Martelo Mission 60",
    summary: "Martelo de alta pressão para furos mais profundos, com bit DTH correspondente.",
    specs: "FLOW Mission 60 · alta pressão",
    image: "/images/flow-mission-60.webp",
    images: ["/images/flow-mission-60.webp", "/images/flow-martelos-dth.webp"],
  },
  {
    id: "bits-dth",
    brand: "flow",
    category: "dth",
    name: "Bits DTH",
    summary: "Bits de botão para martelos DTH Flow, em vários diâmetros.",
    specs: "Botão · linha DTH",
    image: "/images/flow-bit-dth.webp",
    images: ["/images/flow-bit-dth.webp"],
  },
  {
    id: "hastes-flow",
    brand: "flow",
    category: "dth",
    name: "Hastes de perfuração",
    summary: "Hastes com rosca para transmitir ar comprimido até a ponta da broca. Estoque e expedição próprios.",
    specs: "Rosca API · pronta entrega",
    image: "/images/flow-hastes.webp",
    coverFit: "cover",
    images: [
      "/images/flow-hastes.webp",
      "/images/flow-hastes-2.webp",
      "/images/flow-hastes-expedicao.webp",
      "/images/flow-hastes-caminhao.webp",
    ],
  },
  {
    id: "pdc-asa",
    brand: "flow",
    category: "rotativa",
    name: "Brocas PDC em asa",
    summary: "Corte rotativo para mineração, construção e exploração.",
    specs: "PDC asa · 3 e 6 vias",
    image: "/images/flow-pdc-lote.webp",
    coverFit: "cover",
    images: ["/images/flow-pdc-lote.webp", "/images/flow-pdc.webp"],
  },
  {
    id: "triconicas",
    brand: "flow",
    category: "rotativa",
    name: "Brocas tricônicas",
    summary: "Botão e fresadas, corpo robusto. Consulte diâmetros disponíveis.",
    specs: "Tricônica · botão",
    image: "/images/flow-triconica.webp",
    images: ["/images/flow-triconica.webp"],
  },
  {
    id: "bombas-submersas",
    brand: "flow",
    category: "bombeamento",
    name: "Motobombas submersas",
    summary: "Linha de motobombas submersas para poços artesianos, irrigação e abastecimento.",
    specs: '2" a 4" · aço inox',
    image: "/images/flow-bombas-submersas.webp",
    images: ["/images/flow-bombas-submersas.webp"],
  },
  {
    id: "superficie",
    brand: "flow",
    category: "bombeamento",
    name: "Motobombas de superfície",
    summary: "Autoescorvante para captação em cisternas, reservatórios e irrigação.",
    specs: "Superfície · alta vazão",
    image: "/images/flow-bomba-superficie.webp",
    images: ["/images/flow-bomba-superficie.webp"],
  },
  {
    id: "perfuratriz-pneu",
    brand: "flow",
    category: "top-hammer",
    name: "Perfuratriz pneumática manual",
    summary: "Perfuratrizes manuais Flow para fundações, tirantes e contenções, com hastes e bits.",
    specs: "Manual · coluna",
    image: "/images/flow-perfuratriz-manual.webp",
    images: ["/images/flow-perfuratriz-manual.webp", "/images/flow-perfuratriz-manual-2.webp"],
  },
  {
    id: "taper",
    brand: "flow",
    category: "mineracao-desmonte",
    name: "Taper bits",
    summary: "Bits cônicos para desmonte em pedreiras e mineração.",
    specs: "Taper · desmonte",
    image: "/images/flow-taper-bits.webp",
    coverFit: "cover",
    images: ["/images/flow-taper-bits.webp"],
  },
  // ------------------------------------------------------------------
  // TRITON · fotos e fichas enviadas pelo cliente (carro-chefe)
  // ------------------------------------------------------------------
  {
    id: "perfuratriz",
    brand: "triton",
    category: "perfuratrizes-pocos",
    name: "Perfuratriz rotativa para poços",
    summary: "Perfuratriz sobre esteiras para poços artesianos. Consulte a equipe para dimensionar o projeto.",
    specs: "Poços artesianos · máquina rotativa",
    image: "/images/triton-perfuratriz-pocos.webp",
    images: ["/images/triton-perfuratriz-pocos.webp", "/images/triton-perfuratriz-pocos-2.webp"],
  },
  {
    id: "perfuratriz-hdd",
    brand: "triton",
    category: "horizontal-hdd",
    name: "Perfuratriz horizontal HDD",
    summary: "Máquina para perfuração horizontal. Converse com a equipe sobre a aplicação e o modelo adequado.",
    specs: "Perfuração horizontal · HDD",
    image: "/images/triton-hdd-catalog.webp",
    images: [
      "/images/triton-hdd-catalog.webp",
      "/images/triton-hdd-catalog-2.webp",
      "/images/triton-hdd.webp",
      "/images/triton-hdd-2.webp",
    ],
  },
  {
    id: "perfuratriz-mineracao",
    brand: "triton",
    category: "mineracao-rochas",
    name: "Perfuratriz para mineração e desmonte",
    summary: "Perfuratriz para mineração e desmonte de rochas. Peça orientação técnica para o seu terreno.",
    specs: "Mineração · desmonte de rochas",
    image: "/images/triton-perfuratriz-mineracao.webp",
    coverFit: "cover",
    images: ["/images/triton-perfuratriz-mineracao.webp"],
  },
  {
    id: "tri600",
    brand: "triton",
    category: "diesel-pocos",
    name: "Compressor TRI600A-18G2",
    summary: "Compressor portátil de alta pressão para DTH e poços artesianos. Motor Cummins.",
    specs: "600 cfm · 18 bar · 162 kW · 240 L",
    image: "/images/triton-tri600-hero.webp",
    images: [
      "/images/triton-tri600-hero.webp",
      "/images/triton-tri600-vista.webp",
      "/images/triton-tri600-manutencao.webp",
      "/images/triton-tri600-painel.webp",
    ],
  },
  {
    id: "tri860",
    brand: "triton",
    category: "diesel-pocos",
    name: "Compressor TRI860A-21",
    summary: "Compressor de ar portátil a diesel, com motor Cummins B7-T3 e pressão de 21 bar.",
    specs: "860 cfm · 21 bar · 221 kW · 340 L",
    image: "/images/triton-tri860.webp",
    coverFit: "contain",
    images: ["/images/triton-tri860.webp", "/images/triton-tri860-ficha.webp"],
  },
  {
    id: "tri1100",
    brand: "triton",
    category: "diesel-pocos",
    name: "Compressor TRI1100A-25",
    summary: "Compressor portátil de alta vazão para operações pesadas. Motor Cummins, estrutura sobre skid.",
    specs: "1100 cfm · 25 bar · 336 kW",
    image: "/images/triton-tri1100.webp",
    coverFit: "contain",
    images: ["/images/triton-tri1100.webp", "/images/triton-tri1100-ficha.webp"],
  },
];

/** Quatro destaques por empresa — carro-chefe com fotos enviadas pelo cliente. */
export const previewIds = [
  "martelos-cir",
  "martelos-dth",
  "hastes-flow",
  "bits-dth",
  "perfuratriz",
  "perfuratriz-hdd",
  "tri860",
  "tri1100",
];
export const featuredByBrand = (brand: Brand) =>
  previewIds.map((id) => products.find((p) => p.id === id && p.brand === brand)).filter((p): p is Product => Boolean(p));
export const catalogLink = (product: Product) => `/${product.brand}?categoria=${encodeURIComponent(product.category)}#${product.id}`;

/** Miniaturas da seção "Sobre o grupo" — 3 fotos reais por marca, ligadas ao catálogo. */
export const brandThumbnails = {
  flow: [
    { src: "/images/cards/flow-martelos-dth.webp", alt: "Martelos DTH Flow", href: "/flow?categoria=dth#martelos-dth" },
    { src: "/images/cards/flow-bit-dth.webp", alt: "Bit DTH Flow", href: "/flow?categoria=dth#bits-dth" },
    { src: "/images/cards/flow-hastes.webp", alt: "Hastes de perfuração", href: "/flow?categoria=dth#hastes-flow" },
  ],
  triton: [
    { src: "/images/cards/triton-perfuratriz-pocos.webp", alt: "Perfuratriz rotativa para poços", href: "/triton?categoria=perfuratrizes-pocos#perfuratriz" },
    { src: "/images/cards/triton-hdd-catalog.webp", alt: "Perfuratriz horizontal HDD", href: "/triton?categoria=horizontal-hdd#perfuratriz-hdd" },
    { src: "/images/cards/triton-tri860.webp", alt: "Compressor Triton TRI860A-21", href: "/triton?categoria=diesel-pocos#tri860" },
  ],
} satisfies Record<Brand, { src: string; alt: string; href: string }[]>;

export const sectors = [
  { title: "Poços artesianos", image: "/images/setor-pocos.webp" },
  { title: "Construção civil", image: "/images/setor-construcao.webp" },
  { title: "Mineração e pedreiras", image: "/images/setor-mineracao.webp" },
  { title: "Geotécnica e sondagens", image: "/images/setor-geotecnica.webp" },
  { title: "Petróleo e gás", image: "/images/setor-petroleo.webp" },
  { title: "Energia e saneamento", image: "/images/setor-energia.webp" },
];

export const group = {
  name: "Grupo FVT",
  founder: "Claudio Patricio",
  founderRole: "Fundador e sócio-administrador",
  mission: {
    title: "Fazer projetos avançarem.",
    text: "Entregar soluções confiáveis para perfuração, bombeamento e operações de campo, unindo portfólio técnico, orientação comercial e suporte técnico pós-venda para elevar produtividade e reduzir paradas.",
  },
  vision: {
    title: "Ser referência nacional.",
    text: "Consolidar o Grupo FVT como referência em soluções para perfuração e infraestrutura, reconhecido por disponibilidade, conhecimento técnico, agilidade e relacionamento de longo prazo.",
  },
  values: {
    title: "Confiança que se prova na operação.",
    text: "Segurança e responsabilidade, qualidade sem atalhos, transparência, conhecimento técnico, agilidade com compromisso, parceria de longo prazo e evolução contínua.",
  },
  brands: [
    {
      id: "flow",
      name: "Flow",
      to: "/flow",
      text: "Perfuração DTH, rotativa e horizontal, Top Hammer, mineração e desmonte, sondagens e bombeamento: martelos, bits, brocas, hastes, coroas e bombas.",
    },
    {
      id: "triton",
      name: "Triton",
      to: "/triton",
      text: "Perfuratrizes rotativas para poços, máquinas HDD e perfuratrizes para mineração e desmonte de rochas. Compressores a diesel para poços, pedreiras e construção civil; elétricos para fundações e saneamento.",
    },
  ],
} as const;
