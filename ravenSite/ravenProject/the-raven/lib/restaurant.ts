export const restaurant = {
  name: "The Raven",
  tagline: "Alta gastronomia mediterrânea",
  rating: 4.7,
  reviewCount: 1864,
  phone: "(51) 3072-2882",
  phoneHref: "tel:+555130722882",
  whatsapp:
    "https://wa.me/555130722882?text=Ol%C3%A1%21%20Gostaria%20de%20reservar%20uma%20mesa%20no%20The%20Raven.",
  menuLink: "https://linktr.ee",
  address: "R. Sarmento Leite, 969 — Cidade Baixa",
  city: "Porto Alegre — RS",
  cep: "90050-170",
  plusCode: "XQ7G+49",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Sarmento+Leite,+969+-+Cidade+Baixa,+Porto+Alegre",
  mapsEmbed:
    "https://maps.google.com/maps?q=R.+Sarmento+Leite,+969+-+Cidade+Baixa,+Porto+Alegre&t=&z=16&ie=UTF8&iwloc=&output=embed",
  blurb:
    "Um restaurante aconchegante com um mezanino intimista e vários pratos da alta gastronomia mediterrânea.",
} as const;

export const services = [
  { label: "Refeição no local", hint: "Salão e mezanino" },
  { label: "Retirada na porta", hint: "Pedido pronto para levar" },
  { label: "Entrega sem contato", hint: "Direto até você" },
] as const;

export const hours = [
  { day: "Segunda", time: "Fechado" },
  { day: "Terça", time: "19:00 – 00:00" },
  { day: "Quarta", time: "19:00 – 00:00" },
  { day: "Quinta", time: "19:00 – 00:00" },
  { day: "Sexta", time: "19:00 – 00:30" },
  { day: "Sábado", time: "19:00 – 00:30" },
  { day: "Domingo", time: "12:00 – 16:00 · 19:00 – 23:00" },
] as const;

export const sundayPeak = [
  { hour: "12", value: 28 },
  { hour: "13", value: 52 },
  { hour: "14", value: 64 },
  { hour: "15", value: 40 },
  { hour: "16", value: 18 },
  { hour: "19", value: 70 },
  { hour: "20", value: 92 },
  { hour: "21", value: 100 },
  { hour: "22", value: 76 },
  { hour: "23", value: 34 },
] as const;

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  image: string;
  imageAlt: string;
};

export const menu = {
  entradas: [
    {
      name: "Tartare de Carne",
      description:
        "Corte nobre, gema curada, alcaparras e toques cítricos do Mediterrâneo.",
      price: "72",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Tartare de carne em prato escuro",
    },
    {
      name: "Escargot",
      description:
        "Clássico da casa, persilade de alho e manteiga, pão de entrada crocante.",
      price: "68",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Prato de entrada em alta gastronomia",
    },
    {
      name: "Pãozinho de Entrada",
      description:
        "Fornos do dia, azeite extra virgem e sal flor. O ritual que abre a noite.",
      price: "18",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Pães artesanais",
    },
  ] satisfies MenuItem[],
  principais: [
    {
      name: "Polvo do Chef",
      description:
        "O mais pedido. Polvo confitado, aioli defumado e legumes assados.",
      price: "129",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Polvo grelhado do chef",
    },
    {
      name: "Filé ao Vinho",
      description:
        "Filé mignon, redução de vinho tinto, farofa de ervas e legumes da estação.",
      price: "118",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Filé ao vinho",
    },
    {
      name: "Vieiras Flambadas e Caviar",
      description:
        "Vieiras seladas, flambadas na hora, caviar e manteiga noisette.",
      price: "159",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Vieiras flambadas",
    },
    {
      name: "Spaghetti ao Frutos do Mar",
      description:
        "Massa fresca, lula, camarão, mexilhão e fundo de tomate San Marzano.",
      price: "98",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Spaghetti com frutos do mar",
    },
    {
      name: "Risoto de Bacalhau com Alho Negro",
      description:
        "Arroz carnaroli, bacalhau dessalgado e alho negro caramelizado.",
      price: "112",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Risoto cremoso",
    },
    {
      name: "Picanha de Cordeiro",
      description:
        "Ponto impecável, ervas do jardim e redução de vinho do Porto.",
      price: "136",
      image:
        "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Cordeiro assado",
    },
  ] satisfies MenuItem[],
  sobremesas: [
    {
      name: "Creme Brûlée",
      description: "Baunilha de Madagascar e crosta de açúcar caramelizado.",
      price: "42",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1470124182917-cc6e71d1aaa8?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Creme brûlée",
    },
    {
      name: "Mousse de Chocolate com Avelãs",
      description: "Chocolate 70%, praliné de avelã e flor de sal.",
      price: "38",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Mousse de chocolate",
    },
    {
      name: "Tiramisù",
      description: "Mascarpone, café espresso e cacau em camadas.",
      price: "36",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Tiramisù",
    },
    {
      name: "Semifreddo de Baunilha",
      description: "Textura gelada, frutas vermelhas e crocante de amêndoas.",
      price: "38",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Semifreddo de baunilha",
    },
  ] satisfies MenuItem[],
};

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    alt: "Prato de alta gastronomia",
    label: "Gastronomia",
    span: "lg",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Salão do restaurante",
    label: "Ambiente",
    span: "md",
  },
  {
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    alt: "Taça de vinho tinto",
    label: "Carta de vinhos",
    span: "md",
  },
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Mezanino intimista",
    label: "Mezanino",
    span: "lg",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    alt: "Mesa posta",
    label: "Mesa",
    span: "md",
  },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80",
    alt: "Martini e drinks",
    label: "Martini",
    span: "md",
  },
] as const;

export const reviews = [
  {
    name: "Ana B.",
    meta: "Guia local · 5 meses",
    quote:
      "Excelente experiência no The Raven. Ambiente muito charmoso e acolhedor, com iluminação agradável e um clima perfeito para um jantar tranquilo. O atendimento foi atencioso. Eu amei o escargot, que estava simplesmente perfeito.",
  },
  {
    name: "Victor Capeletto",
    meta: "7 meses",
    quote:
      "Excelente lugar, comida muito boa, bons vinhos, ótimo custo benefício. Cardápio variado — risoto, massa, filé, peixe, pato, lagosta. Ambiente excelente para um jantar.",
  },
  {
    name: "Frequentadores",
    meta: "Resumo das avaliações",
    quote:
      "A picanha de cordeiro bem executada, o escargot saboroso e as sobremesas gostosas. Ambiente charmoso, elegante e acolhedor — ideal para um jantar tranquilo e uma boa conversa.",
  },
] as const;

export const reviewTags = [
  { label: "risoto", count: 50 },
  { label: "filé", count: 42 },
  { label: "frutas vermelhas", count: 14 },
  { label: "clima", count: 13 },
] as const;
