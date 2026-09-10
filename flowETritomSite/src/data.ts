export type Brand = "flow" | "triton";

export type Product = {
  id: string;
  brand: Brand;
  category: string;
  name: string;
  summary: string;
  specs: string;
  image: string;
};

export const WHATSAPP = "554720334417";
export const PHONE_DISPLAY = "(47) 2033-4417";
export const PHONE_ALT = "(47) 99918-9698";
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

export const flowCategories = [
  { id: "todos", label: "Todos" },
  { id: "dth", label: "Perfuração DTH" },
  { id: "rotativa", label: "Perfuração rotativa" },
  { id: "hastes", label: "Hastes" },
  { id: "bombas", label: "Bombeamento" },
] as const;

export const tritonCategories = [
  { id: "todos", label: "Todos" },
  { id: "maquinas", label: "Máquinas" },
  { id: "compressores", label: "Compressores" },
  { id: "mineracao", label: "Mineração e desmonte" },
  { id: "fundacoes", label: "Fundações" },
  { id: "sondagem", label: "Sondagem e geotécnica" },
] as const;

export const categoryLabel: Record<string, string> = {
  dth: "Perfuração DTH",
  rotativa: "Perfuração rotativa",
  hastes: "Hastes",
  bombas: "Bombeamento",
  maquinas: "Máquinas",
  compressores: "Compressores",
  mineracao: "Mineração e desmonte",
  fundacoes: "Fundações",
  sondagem: "Sondagem e geotécnica",
};

export const products: Product[] = [
  {
    id: "cir-linha",
    brand: "flow",
    category: "dth",
    name: "Martelos CIR",
    summary: "Linha de baixa pressão para compressores de 5 a 10 BAR, mínimo 200 PCM.",
    specs: "CIR 65 · CIR 76 · CIR 90 · CIR 110 · CIR 130",
    image: "/images/martelos-cir-1.webp",
  },
  {
    id: "cir-90",
    brand: "flow",
    category: "dth",
    name: "Martelo CIR 90",
    summary: "Médio porte, resistência e rendimento em diferentes tipos de solo.",
    specs: "CIR 90 · baixa pressão",
    image: "/images/martelo-cir-90.webp",
  },
  {
    id: "cir-110",
    brand: "flow",
    category: "dth",
    name: "Martelo CIR 110",
    summary: "Mais robustez para potência e profundidade na perfuração.",
    specs: "CIR 110 · baixa pressão",
    image: "/images/martelo-cir-110.webp",
  },
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
    image: "/images/martelo-mission-60.webp",
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
    image: "/images/broca-pdc.webp",
  },
  {
    id: "triconicas",
    brand: "flow",
    category: "rotativa",
    name: "Brocas tricônicas",
    summary: "Botão e fresadas, corpo robusto. Diâmetros de 115 mm a 350 mm.",
    specs: "Ø 115–350 mm",
    image: "/images/broca-triconica.webp",
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
    category: "hastes",
    name: "Hastes de perfuração",
    summary: "Transmitem ar comprimido até a ponta da broca, com precisão.",
    specs: "Rosca API · pronta entrega",
    image: "/images/hastes.webp",
  },
  {
    id: "bomba-2",
    brand: "flow",
    category: "bombas",
    name: 'Motobomba submersa 2"',
    summary: "Captação em poços artesianos, irrigação e cisternas.",
    specs: '2"',
    image: "/images/img-7754.webp",
  },
  {
    id: "bomba-25",
    brand: "flow",
    category: "bombas",
    name: 'Motobomba submersa 2,5"',
    summary: "Multestágio para poços e abastecimento doméstico.",
    specs: '2,5"',
    image: "/images/produto-7754.webp",
  },
  {
    id: "bomba-3",
    brand: "flow",
    category: "bombas",
    name: 'Motobomba submersa 3"',
    summary: "Vazão maior para irrigação e prédios de pequeno porte.",
    specs: '3"',
    image: "/images/img-7755.webp",
  },
  {
    id: "bomba-4",
    brand: "flow",
    category: "bombas",
    name: 'Motobomba submersa 4"',
    summary: "Aço inox AISI 304, motor IP68, para poços e irrigação.",
    specs: '4" · até 80 m de imersão',
    image: "/images/produto-7755.webp",
  },
  {
    id: "superficie",
    brand: "flow",
    category: "bombas",
    name: "Motobombas de superfície",
    summary: "Autoescorvante, autoaspirante e centrífuga para captação.",
    specs: "Superfície · alta vazão",
    image: "/images/produto-7757.webp",
  },
  {
    id: "tri600",
    brand: "triton",
    category: "compressores",
    name: "Compressor TRI600A-18G2",
    summary: "Compressor portátil de alta pressão para DTH e operação de campo. Motor Cummins.",
    specs: "600 cfm · 18 bar · 162 kW · 240 L",
    image: "/images/triton-tri600-hero.webp",
  },
  {
    id: "tri600-manut",
    brand: "triton",
    category: "compressores",
    name: "TRI600A-18G2 — acesso e manutenção",
    summary: "Portas amplas, inspeção rápida e projeto robusto para campo.",
    specs: "3 t · saídas G1¼ e G¾ · CN III",
    image: "/images/triton-tri600-manutencao.webp",
  },
  {
    id: "tri600-painel",
    brand: "triton",
    category: "compressores",
    name: "TRI600A-18G2 — painel de controle",
    summary: "Painel integrado, leitura rápida de parâmetros e operação simples.",
    specs: "18 bar · 162 kW",
    image: "/images/triton-tri600-painel.webp",
  },
  {
    id: "csh350",
    brand: "triton",
    category: "compressores",
    name: "Compressor CSH350A-10",
    summary: "Portátil 350 cfm para fundações, DTH leve e obras.",
    specs: "10 m³/min · 10 bar · 93 kW · 2 t",
    image: "/images/triton-csh350-ficha.webp",
  },
  {
    id: "compressor-campo",
    brand: "triton",
    category: "compressores",
    name: "Compressores portáteis Triton",
    summary: "Linha de ar comprimido para pedreira, mineração e sondagem.",
    specs: "Alta pressão · reboque",
    image: "/images/triton-tri600-vista.webp",
  },
  {
    id: "perfuratriz",
    brand: "triton",
    category: "maquinas",
    name: "Perfuratriz sobre esteiras",
    summary: "Máquinas para perfuração de rocha em pedreiras e mineração.",
    specs: "Esteiras · operação de campo",
    image: "/brand/perfuratriz.webp",
  },
  {
    id: "perfuratriz-pneu",
    brand: "triton",
    category: "maquinas",
    name: "Perfuratriz pneumática",
    summary: "Manual e de coluna para fundações, tirantes e contenções.",
    specs: "Manual · coluna",
    image: "/images/img-7101.webp",
  },
  {
    id: "bits-roscados",
    brand: "triton",
    category: "mineracao",
    name: "Bits lisos e Retrac",
    summary: "Fragmentação e desmonte com roscas R e T.",
    specs: "R25 · R28 · R32 · T38 · T45 · T51",
    image: "/images/img-7391.webp",
  },
  {
    id: "taper",
    brand: "triton",
    category: "mineracao",
    name: "Taper bits",
    summary: "Bits cônicos para desmonte em pedreiras e mineração.",
    specs: "32 a 42 mm",
    image: "/images/wa-150405.webp",
  },
  {
    id: "luvas",
    brand: "triton",
    category: "mineracao",
    name: "Luvas e punhos",
    summary: "Acoplamentos e shanks para perfuratrizes de superfície.",
    specs: "COP131 · VL140 · YH80 · AL600",
    image: "/images/produto-7069.webp",
  },
  {
    id: "sextavadas",
    brand: "triton",
    category: "mineracao",
    name: "Hastes sextavadas",
    summary: "Rosca redonda e rosca dupla para desmonte de rochas.",
    specs: "Rosca redonda · dupla",
    image: "/images/wa-151037.webp",
  },
  {
    id: "integrais",
    brand: "triton",
    category: "mineracao",
    name: "Brocas integrais e ponteiras",
    summary: "Hastes integrais e ponteiras para desmonte.",
    specs: "22 · 26 · 32 · 36 · 40 mm",
    image: "/images/wa-150822.webp",
  },
  {
    id: "rompedor",
    brand: "triton",
    category: "fundacoes",
    name: "Rompedor pneumático",
    summary: "Manual para contenções, concreto e desmonte em obra.",
    specs: "Manual · bits e ponteiras",
    image: "/images/produto-7475.webp",
  },
  {
    id: "ponteiras",
    brand: "triton",
    category: "fundacoes",
    name: "Bits de fresadoras e ponteiras",
    summary: "Pontas para rompedores e bits de fresadora.",
    specs: "Moil · talhadeira",
    image: "/images/img-7476.webp",
  },
  {
    id: "coroas",
    brand: "triton",
    category: "sondagem",
    name: "Coroas diamantadas",
    summary: "Coleta de testemunho para geotécnica e sondagem.",
    specs: "PQ · HQ · NQ",
    image: "/images/img-7624.webp",
  },
  {
    id: "barriletes",
    brand: "triton",
    category: "sondagem",
    name: "Barriletes e calibradores",
    summary: "Tubos de testemunho e calibradores para manter o diâmetro.",
    specs: "Sondagem · geotécnica",
    image: "/images/img-7625.webp",
  },
];

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
    text: "Entregar soluções confiáveis para perfuração, bombeamento e operações de campo, unindo portfólio técnico, orientação comercial e suporte para elevar produtividade e reduzir paradas.",
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
      text: "Equipamentos para poços artesianos e perfuração DTH: martelos, bits, brocas, hastes e motobombas.",
    },
    {
      id: "triton",
      name: "Triton",
      to: "/triton",
      text: "Máquinas e compressores para mineração, fundações, sondagem e operação de campo.",
    },
  ],
} as const;

export const faqs = [
  {
    q: "A Flow & Triton atende só Santa Catarina?",
    a: "Atendemos todo o Brasil, com estoque em Itapema-SC e envio via transportadoras parceiras, com rastreamento e nota fiscal.",
  },
  {
    q: "O que cada marca comercializa?",
    a: "A Flow e a Triton pertencem ao Grupo FVT, que reúne três marcas. A Flow concentra ferramentas e equipamentos para poços artesianos e perfuração DTH/rotativa. A Triton cobre máquinas, compressores, mineração, fundações e sondagem.",
  },
  {
    q: "Posso pedir um orçamento personalizado?",
    a: "Sim. A equipe técnica indica o item certo para solo, vazão, pressão e profundidade. Use o WhatsApp ou o formulário de contato.",
  },
  {
    q: "Quais formas de pagamento?",
    a: "Boleto, Pix e cartão de crédito, com condições flexíveis conforme o pedido.",
  },
  {
    q: "Os produtos têm garantia?",
    a: "Sim. São originais, com qualidade assegurada pelos fabricantes e garantia conforme cada linha.",
  },
  {
    q: "Há suporte depois da compra?",
    a: "Sim. Orientamos instalação, uso e manutenção preventiva — não é só venda de catálogo.",
  },
];
