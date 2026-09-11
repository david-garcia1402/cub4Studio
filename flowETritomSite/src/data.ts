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
  perfuratrizDemonstracao: {
    src: "/videos/perfuratriz-demonstracao.mp4",
    poster: "/videos/perfuratriz-demonstracao-poster.webp",
    title: "Triton — perfuratriz em demonstração",
    source: "public/images/imagensVideosReaisFVT/IMG_0877.MP4",
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

/** Categorias e o que cada uma inclui — definição do cliente (10/09/2026). */
export const flowCategories: readonly Category[] = [
  { id: "dth", label: "Perfuração DTH", includes: ["Martelos", "Bits", "Hastes"] },
  { id: "rotativa", label: "Perfuração Rotativa", includes: ["Brocas"] },
  { id: "horizontal", label: "Perfuração Horizontal", includes: ["Brocas", "Hastes"] },
  {
    id: "top-hammer",
    label: "Top Hammer",
    includes: ["Punhos", "Luvas", "Hastes", "Bits", "Perfuratrizes manuais", "Barras mina", "Taper bit", "Mangueiras e conectores"],
  },
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
  // FLOW · PERFURAÇÃO DTH — produto 1 aprovado pelo cliente (fotos reais)
  // ------------------------------------------------------------------
  {
    id: "martelos-cir",
    brand: "flow",
    category: "dth",
    name: "Martelos CIR",
    summary: "Martelos de baixa pressão utilizados para compressores de 5 a 10 BAR, mínimo 200 PCM.",
    specs: "Baixa pressão · 5 a 10 BAR · mín. 200 PCM",
    // Capa: imagem de IA autorizada pelo cliente (linha CIR em campo). Galeria: fotos reais do estoque.
    image: "/images/martelo-cir-capa.webp",
    coverFit: "cover",
    images: ["/images/martelo-cir-capa.webp", "/images/martelo-cir-1.webp", "/images/martelo-cir-2.webp", "/images/martelo-cir-3.webp"],
    status: "aprovado",
  },
  // FLOW · PERFURAÇÃO DTH — produto 2 aprovado pelo cliente (M3 e M4, fotos reais)
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
  // ------------------------------------------------------------------
  // Itens abaixo: catálogo do protótipo, aguardando modelo/descrição do cliente
  // ------------------------------------------------------------------
  {
    id: "mission-40",
    brand: "flow",
    category: "dth",
    name: "Martelo Mission 40",
    summary: "Alta pressão para perfurações leves, com durabilidade e custo-benefício.",
    specs: "MISSION 40 · 12 a 25 BAR",
    image: "/images/martelo-mission-40.webp",
  },
  {
    id: "mission-50",
    brand: "flow",
    category: "dth",
    name: "Martelo Mission 50",
    summary: "Equilíbrio entre força e versatilidade para projetos que pedem precisão.",
    specs: "MISSION 50 · alta pressão",
    image: "/images/martelo-mission-50.webp",
  },
  {
    id: "mission-60",
    brand: "flow",
    category: "dth",
    name: "Martelo Mission 60",
    summary: "Indicado para furos mais profundos, com alto rendimento e vida útil.",
    specs: "MISSION 60 · alta pressão",
    image: "/images/reais-fvt/martelo-mission60.webp",
    images: ["/images/reais-fvt/martelo-mission60.webp", "/images/reais-fvt/bit-dth.webp"],
  },
  {
    id: "mission-80",
    brand: "flow",
    category: "dth",
    name: "Martelo Mission 80",
    summary: "Aplicações de maior exigência em grandes projetos.",
    specs: "MISSION 80 · alta pressão",
    image: "/images/martelo-mission-80.webp",
  },
  {
    id: "bit-65",
    brand: "flow",
    category: "dth",
    name: "Bit 65 mm CIR 65",
    summary: "Bit de baixa pressão para martelos CIR 65.",
    specs: "Ø 65 mm",
    image: "/images/bit-65mm-cir-65.webp",
  },
  {
    id: "bit-76",
    brand: "flow",
    category: "dth",
    name: "Bit 76 mm CIR 76",
    summary: "Bit de baixa pressão para martelos CIR 76.",
    specs: "Ø 76 mm",
    image: "/images/bit-76mm-cir-76.webp",
  },
  {
    id: "bit-90",
    brand: "flow",
    category: "dth",
    name: "Bit 90 mm CIR 90",
    summary: "Face convexa e botão balístico para martelos CIR 90.",
    specs: "Ø 90 mm",
    image: "/images/bit-90-mm-cir-90.webp",
  },
  {
    id: "bit-110",
    brand: "flow",
    category: "dth",
    name: "Bit 110 mm CIR 110",
    summary: "Bit de baixa pressão para martelos CIR 110.",
    specs: "Ø 110 mm",
    image: "/images/bit-110mm-cir-110.webp",
  },
  {
    id: "bit-130",
    brand: "flow",
    category: "dth",
    name: "Bit 130 mm CIR 90",
    summary: "Diâmetro maior para martelos CIR 90.",
    specs: "Ø 130 mm",
    image: "/images/bit-130-mm-cir-90.webp",
  },
  {
    id: "bit-150",
    brand: "flow",
    category: "dth",
    name: "Bit 150 mm CIR 110",
    summary: "Bit largo para martelos CIR 110.",
    specs: "Ø 150 mm",
    image: "/images/bit-150mm-cir-110.webp",
  },
  {
    id: "bit-m40",
    brand: "flow",
    category: "dth",
    name: "Bit 412 M40",
    summary: "Bit para martelos Mission / média e alta pressão.",
    specs: "412 M40",
    image: "/images/bit-412m40.webp",
  },
  {
    id: "bit-m50",
    brand: "flow",
    category: "dth",
    name: "Bit 512 M50",
    summary: "Bit para martelos Mission 50.",
    specs: "512 M50",
    image: "/images/bit512m50.webp",
  },
  {
    id: "bit-m60",
    brand: "flow",
    category: "dth",
    name: "Bit 622 M60",
    summary: "Bit para martelos Mission 60.",
    specs: "622 M60",
    image: "/images/bit-622-m60.webp",
  },
  {
    id: "pdc-asa",
    brand: "flow",
    category: "rotativa",
    name: "Brocas PDC em asa",
    summary: "Corte rotativo para mineração, construção e exploração.",
    specs: "PDC asa · 3 e 6 vias",
    image: "/images/reais-fvt/broca-pdc.webp",
    images: ["/images/reais-fvt/broca-pdc.webp"],
  },
  {
    id: "triconicas",
    brand: "flow",
    category: "rotativa",
    name: "Brocas tricônicas",
    summary: "Botão e fresadas, corpo robusto. Diâmetros de 115 mm a 350 mm.",
    specs: "Ø 115–350 mm",
    image: "/images/reais-fvt/broca-triconica.webp",
    images: ["/images/reais-fvt/broca-triconica.webp"],
  },
  {
    id: "alargadores",
    brand: "flow",
    category: "rotativa",
    name: "Alargadores",
    summary: "Fresados, de botão e PDC para ampliar o diâmetro do furo.",
    specs: "Gás, petróleo e poços",
    image: "/images/flow123.webp",
  },
  {
    id: "hastes-flow",
    brand: "flow",
    category: "dth",
    name: "Hastes de perfuração",
    summary: "Transmitem ar comprimido até a ponta da broca, com precisão.",
    specs: "Rosca API · pronta entrega",
    image: "/images/reais-fvt/hastes-perfuracao.webp",
    images: ["/images/reais-fvt/hastes-perfuracao.webp", "/images/reais-fvt/hastes-estoque.webp", "/images/reais-fvt/hastes-expedicao.webp"],
  },
  {
    id: "bomba-2",
    brand: "flow",
    category: "bombeamento",
    name: 'Motobomba submersa 2"',
    summary: "Captação em poços artesianos, irrigação e cisternas.",
    specs: '2"',
    image: "/images/img-7754.webp",
  },
  {
    id: "bomba-25",
    brand: "flow",
    category: "bombeamento",
    name: 'Motobomba submersa 2,5"',
    summary: "Multestágio para poços e abastecimento doméstico.",
    specs: '2,5"',
    image: "/images/produto-7754.webp",
  },
  {
    id: "bomba-3",
    brand: "flow",
    category: "bombeamento",
    name: 'Motobomba submersa 3"',
    summary: "Vazão maior para irrigação e prédios de pequeno porte.",
    specs: '3"',
    image: "/images/img-7755.webp",
  },
  {
    id: "bomba-4",
    brand: "flow",
    category: "bombeamento",
    name: 'Motobomba submersa 4"',
    summary: "Aço inox AISI 304, motor IP68, para poços e irrigação.",
    specs: '4" · até 80 m de imersão',
    image: "/images/produto-7755.webp",
    images: ["/images/produto-7755.webp", "/images/reais-fvt/bombas-submersas.webp"],
  },
  {
    id: "superficie",
    brand: "flow",
    category: "bombeamento",
    name: "Motobombas de superfície",
    summary: "Autoescorvante, autoaspirante e centrífuga para captação.",
    specs: "Superfície · alta vazão",
    image: "/images/reais-fvt/bomba-superficie.webp",
    images: ["/images/reais-fvt/bomba-superficie.webp", "/images/reais-fvt/bomba-superficie-jet.webp"],
  },
  // FLOW · TOP HAMMER (punhos, luvas, hastes, bits, perfuratrizes manuais, barras mina, taper bit, mangueiras e conectores)
  {
    id: "perfuratriz-pneu",
    brand: "flow",
    category: "top-hammer",
    name: "Perfuratriz pneumática manual",
    summary: "Manual e de coluna para fundações, tirantes e contenções.",
    specs: "Manual · coluna",
    image: "/images/reais-fvt/perfuratrizes-manuais.webp",
    images: ["/images/reais-fvt/perfuratrizes-manuais.webp", "/images/reais-fvt/perfuratriz-manual.webp"],
  },
  {
    id: "bits-roscados",
    brand: "flow",
    category: "top-hammer",
    name: "Bits lisos e Retrac",
    summary: "Fragmentação e desmonte com roscas R e T.",
    specs: "R25 · R28 · R32 · T38 · T45 · T51",
    image: "/images/img-7391.webp",
  },
  {
    id: "taper",
    brand: "flow",
    category: "top-hammer",
    name: "Taper bits",
    summary: "Bits cônicos para desmonte em pedreiras e mineração.",
    specs: "32 a 42 mm",
    image: "/images/reais-fvt/taper-bits.webp",
    images: ["/images/reais-fvt/taper-bits.webp"],
  },
  {
    id: "luvas",
    brand: "flow",
    category: "top-hammer",
    name: "Luvas e punhos",
    summary: "Acoplamentos e shanks para perfuratrizes de superfície.",
    specs: "COP131 · VL140 · YH80 · AL600",
    image: "/images/produto-7069.webp",
  },
  {
    id: "sextavadas",
    brand: "flow",
    category: "top-hammer",
    name: "Hastes sextavadas",
    summary: "Rosca redonda e rosca dupla para desmonte de rochas.",
    specs: "Rosca redonda · dupla",
    image: "/images/wa-151037.webp",
  },
  {
    id: "integrais",
    brand: "flow",
    category: "top-hammer",
    name: "Barras mina e ponteiras",
    summary: "Hastes integrais e ponteiras para desmonte.",
    specs: "22 · 26 · 32 · 36 · 40 mm",
    image: "/images/wa-150822.webp",
  },
  {
    id: "rompedor",
    brand: "flow",
    category: "top-hammer",
    name: "Rompedor pneumático",
    summary: "Manual para contenções, concreto e desmonte em obra.",
    specs: "Manual · bits e ponteiras",
    image: "/images/produto-7475.webp",
  },
  {
    id: "ponteiras",
    brand: "flow",
    category: "top-hammer",
    name: "Bits de fresadoras e ponteiras",
    summary: "Pontas para rompedores e bits de fresadora.",
    specs: "Moil · talhadeira",
    image: "/images/img-7476.webp",
  },
  // FLOW · SONDAGENS (coroas, calibradores, barriletes)
  {
    id: "coroas",
    brand: "flow",
    category: "sondagens",
    name: "Coroas diamantadas",
    summary: "Coleta de testemunho para geotécnica e sondagem.",
    specs: "PQ · HQ · NQ",
    image: "/images/img-7624.webp",
  },
  {
    id: "barriletes",
    brand: "flow",
    category: "sondagens",
    name: "Barriletes e calibradores",
    summary: "Tubos de testemunho e calibradores para manter o diâmetro.",
    specs: "Sondagem · geotécnica",
    image: "/images/img-7625.webp",
  },
  // ------------------------------------------------------------------
  // TRITON · categorias do cliente (10/09/2026). Sem modelo/potência nas
  // perfuratrizes sem ficha confirmada.
  // ------------------------------------------------------------------
  {
    id: "perfuratriz",
    brand: "triton",
    category: "perfuratrizes-pocos",
    name: "Perfuratriz rotativa para poços",
    summary: "Perfuratriz sobre esteiras para poços artesianos. Consulte a equipe para dimensionar o projeto.",
    specs: "Poços artesianos · máquina rotativa",
    image: "/images/reais-fvt/perfuratriz-pocos.webp",
    images: ["/images/reais-fvt/perfuratriz-pocos.webp", "/images/reais-fvt/perfuratriz-pocos-lado.webp"],
  },
  {
    id: "perfuratriz-hdd",
    brand: "triton",
    category: "horizontal-hdd",
    name: "Perfuratriz horizontal HDD",
    summary: "Máquina para perfuração horizontal. Converse com a equipe sobre a aplicação e o modelo adequado.",
    specs: "Perfuração horizontal · HDD",
    image: "/images/reais-fvt/perfuratriz-horizontal.webp",
    coverFit: "cover",
    images: ["/images/reais-fvt/perfuratriz-horizontal.webp", "/images/reais-fvt/perfuratriz-entrega.webp"],
  },
  {
    id: "perfuratriz-mineracao",
    brand: "triton",
    category: "mineracao-rochas",
    name: "Perfuratriz para mineração e desmonte",
    summary: "Perfuratriz para mineração e desmonte de rochas. Peça orientação técnica para o seu terreno.",
    specs: "Mineração · desmonte de rochas",
    image: "/images/reais-fvt/perfuratriz-mineracao.webp",
    coverFit: "cover",
    images: ["/images/reais-fvt/perfuratriz-mineracao.webp"],
  },
  {
    id: "tri600",
    brand: "triton",
    category: "diesel-pocos",
    name: "Compressor TRI600A-18G2",
    summary: "Compressor portátil de alta pressão para DTH e poços artesianos. Motor Cummins.",
    specs: "600 cfm · 18 bar · 162 kW · 240 L",
    image: "/images/reais-fvt/tri600-0.webp",
    images: [
      "/images/reais-fvt/tri600-0.webp",
      "/images/triton-tri600-hero.webp",
      "/images/triton-tri600-vista.webp",
      "/images/triton-tri600-manutencao.webp",
      "/images/triton-tri600-painel.webp",
      "/images/reais-fvt/tri600-ficha.webp",
    ],
  },
  {
    id: "tri860",
    brand: "triton",
    category: "diesel-pocos",
    name: "Compressor TRI860A-21",
    summary: "Compressor de ar portátil a diesel, com motor Cummins B7-T3 e pressão de 21 bar.",
    specs: "860 cfm · 21 bar · 221 kW · 340 L",
    image: "/images/reais-fvt/tri860-0.webp",
    images: ["/images/reais-fvt/tri860-0.webp", "/images/reais-fvt/tri860-ficha.webp"],
  },
  {
    id: "csh350",
    brand: "triton",
    category: "diesel-pedreiras",
    name: "Compressor CSH350A-10",
    summary: "Portátil 350 cfm para fundações, DTH leve e obras. Consulte a equipe para confirmar a aplicação.",
    specs: "10 m³/min · 10 bar · 93 kW · 2 t",
    image: "/images/triton-csh350-ficha.webp",
  },
];

/** Quatro destaques por empresa, com fotos reais correspondentes ao item. */
export const previewIds = ["martelos-cir", "triconicas", "hastes-flow", "superficie", "perfuratriz", "perfuratriz-hdd", "tri600", "tri860"];
export const featuredByBrand = (brand: Brand) =>
  previewIds.map((id) => products.find((p) => p.id === id && p.brand === brand)).filter((p): p is Product => Boolean(p));
export const catalogLink = (product: Product) => `/${product.brand}?categoria=${encodeURIComponent(product.category)}#${product.id}`;

/** Miniaturas da seção "Sobre o grupo" — 3 fotos reais por marca, ligadas ao catálogo. */
export const brandThumbnails = {
  flow: [
    { src: "/images/reais-fvt/martelos-dth.webp", alt: "Martelos DTH Flow no estoque", href: "/flow?categoria=dth" },
    { src: "/images/reais-fvt/bit-dth.webp", alt: "Bit DTH Flow", href: "/flow?categoria=dth" },
    { src: "/images/reais-fvt/bombas-submersas.webp", alt: "Motobombas submersas", href: "/flow?categoria=bombeamento" },
  ],
  triton: [
    { src: "/images/reais-fvt/perfuratriz-pocos.webp", alt: "Perfuratriz rotativa para poços", href: "/triton?categoria=perfuratrizes-pocos#perfuratriz" },
    { src: "/images/reais-fvt/perfuratriz-horizontal.webp", alt: "Perfuratriz horizontal HDD", href: "/triton?categoria=horizontal-hdd#perfuratriz-hdd" },
    { src: "/images/reais-fvt/perfuratriz-entrega.webp", alt: "Equipamento Triton em entrega", href: "/triton" },
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
      text: "Perfuração DTH, rotativa e horizontal, Top Hammer, sondagens e bombeamento: martelos, bits, brocas, hastes, coroas e bombas.",
    },
    {
      id: "triton",
      name: "Triton",
      to: "/triton",
      text: "Perfuratrizes rotativas para poços, máquinas HDD e perfuratrizes para mineração e desmonte de rochas. Compressores a diesel para poços, pedreiras e construção civil; elétricos para fundações e saneamento.",
    },
  ],
} as const;
