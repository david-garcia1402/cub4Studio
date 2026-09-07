export type UnitId = "jaragua" | "schroeder";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  category: "pizzas" | "burgers" | "extras";
  image: string;
  imageAlt: string;
};

export const brand = {
  name: "Redwolf",
  legalName: "Redwolf Pizzas",
  tagline: "Pizzas de longa fermentação · 48h",
  motto: "Fermento e tempo",
  instagram: "https://www.instagram.com/redwolfjaragua/",
  instagramHandle: "@redwolfjaragua",
  linktree: "https://linktr.ee/redwolf.links",
  followers: "10,5 mil",
  posts: 183,
  rating: 4.9,
  reviewCount: 167,
} as const;

export const units: Record<
  UnitId,
  {
    id: UnitId;
    city: string;
    short: string;
    address: string;
    cep: string;
    mapsUrl: string;
    mapsEmbed: string;
    whatsapp: string;
    whatsappDisplay: string;
    anota: string;
    googleReview: string;
    note: string;
  }
> = {
  jaragua: {
    id: "jaragua",
    city: "Jaraguá do Sul",
    short: "Jaraguá",
    address: "Rua Quintino Bocaiuva, 92 — Centro",
    cep: "89251-680",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Quintino+Bocaiuva+92+Centro+Jaragua+do+Sul",
    mapsEmbed:
      "https://maps.google.com/maps?q=Rua+Quintino+Bocaiuva,+92,+Centro,+Jaragu%C3%A1+do+Sul&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsapp: "554799672534",
    whatsappDisplay: "(47) 99672-534",
    anota: "https://pedido.anota.ai/loja/redwolf-pizzas-longa-fermentao-48h?f=msa",
    googleReview:
      "https://www.google.com/search?q=REDWOLF+Pizzas+Jaragu%C3%A1+do+Sul",
    note: "Pizzas 48h · DOC Certified",
  },
  schroeder: {
    id: "schroeder",
    city: "Schroeder",
    short: "Schroeder",
    address: "Rua Carlos Krogel, 81 — Centro",
    cep: "89275-000",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Carlos+Krogel+81+Centro+Schroeder",
    mapsEmbed:
      "https://maps.google.com/maps?q=Rua+Carlos+Krogel,+81,+Centro,+Schroeder&t=&z=16&ie=UTF8&iwloc=&output=embed",
    whatsapp: "554784164498",
    whatsappDisplay: "(47) 8416-4498",
    anota: "https://pedido.anota.ai/loja/redwolf-pizzas-e-burgers",
    googleReview:
      "https://www.google.com/search?q=REDWOLF+Pizzas+%26+Burgers+Schroeder",
    note: "Pizzas & Burgers",
  },
};

export const hours = [
  { day: "Segunda", salon: "Fechado", delivery: "Delivery" },
  { day: "Terça", salon: "Fechado", delivery: "Delivery" },
  { day: "Quarta", salon: "18:00 →", delivery: "Delivery" },
  { day: "Quinta", salon: "18:00 →", delivery: "Delivery" },
  { day: "Sexta", salon: "18:00 →", delivery: "Delivery" },
  { day: "Sábado", salon: "18:00 →", delivery: "Delivery" },
  { day: "Domingo", salon: "18:00 →", delivery: "Delivery" },
] as const;

export const menu: MenuItem[] = [
  {
    id: "calabresa",
    name: "Calabresa Acebolada",
    description:
      "Calabresa artesanal, cebola caramelizada e orégano na massa de 48h.",
    price: 54,
    popular: true,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pizza de calabresa acebolada",
  },
  {
    id: "quatro-queijos",
    name: "Quatro Queijos com Brie",
    description:
      "Mussarela, gorgonzola, parmesão e brie cremoso — a mais pedida da casa.",
    price: 62,
    popular: true,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pizza quatro queijos",
  },
  {
    id: "margherita",
    name: "Margherita",
    description: "San Marzano, mussarela de búfala, manjericão e azeite.",
    price: 52,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pizza margherita",
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Pepperoni tostado, queijo em queda e borda alveolada.",
    price: 58,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pizza de pepperoni",
  },
  {
    id: "alcatra-bbq",
    name: "Alcatra Barbecue",
    description: "Alcatra macia, barbecue da casa e cebola crispy.",
    price: 64,
    popular: true,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pizza de alcatra com barbecue",
  },
  {
    id: "doce",
    name: "Pizza Doce",
    description: "Chocolate, leite condensado e toque de flor de sal.",
    price: 48,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pizza doce de chocolate",
  },
  {
    id: "famosinha",
    name: "Famosinha",
    description: "O smash da casa, pão macio e a maionese caseira que viralizou.",
    price: 36,
    popular: true,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Hambúrguer Famosinha",
  },
  {
    id: "burger-bbq",
    name: "Burger Barbecue",
    description: "Blend suculento, barbecue defumado e cheddar derretido.",
    price: 39,
    popular: true,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Hambúrguer barbecue",
  },
  {
    id: "maionese",
    name: "Maionese Caseira",
    description: "O extra que o Vale do Itapocu pede de novo. Extra gelada.",
    price: 6,
    category: "extras",
    image:
      "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pote de maionese caseira",
  },
];

export const promotions = [
  {
    title: "Festival de Pizzas",
    detail: "Segunda pizza com 50% na mesma noite — valores ilustrativos.",
    tag: "Destaque",
  },
  {
    title: "Combo Lobo",
    detail: "Pizza 35cm + Famosinha + refrigerante 600ml.",
    tag: "Promo",
  },
  {
    title: "Delivery todos os dias",
    detail: "Salão quarta a domingo, a partir das 18h. Entrega diária.",
    tag: "Rotina",
  },
];

export const highlights = [
  { id: "clientes", label: "Clientes", href: "#avaliacoes", hint: "Prova social" },
  { id: "promos", label: "Promoções", href: "#promos", hint: "Festival e combos" },
  { id: "doc", label: "DOC Certified", href: "#sobre", hint: "Qualidade 48h" },
  { id: "pizzas", label: "Pizzas", href: "#cardapio", hint: "Cardápio piloto" },
  { id: "horarios", label: "Horários", href: "#visitar", hint: "Salão e delivery" },
] as const;

export const reviews = [
  {
    name: "Fernandes",
    meta: "Google · Jaraguá",
    quote:
      "Excelente pizza, com massa especial. Atendimento rápido e sabor de fermentação de verdade.",
  },
  {
    name: "Gabriel",
    meta: "Pediu Calabresa e Burger BBQ",
    quote:
      "Melhor pizza da região. Massa macia, tempero no ponto e o hambúrguer barbecue sem igual.",
  },
  {
    name: "Natália",
    meta: "Fã das Famosinhas",
    quote:
      "A maionese caseira é o vício. A gente pede e acaba rápido demais — sucesso merecido.",
  },
] as const;

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
    alt: "Pizza saindo do forno",
    label: "48 horas",
    span: "lg",
  },
  {
    src: "https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=1200&q=80",
    alt: "Massa de longa fermentação",
    label: "Fermento",
    span: "md",
  },
  {
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    alt: "Hambúrguer gourmet",
    label: "Burgers",
    span: "md",
  },
  {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1600&q=80",
    alt: "Pizza margherita",
    label: "Pizzas",
    span: "lg",
  },
  {
    src: "https://images.unsplash.com/photo-1548365328-8b8490b51d21?auto=format&fit=crop&w=1200&q=80",
    alt: "Forno a lenha",
    label: "Forno",
    span: "md",
  },
  {
    src: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80",
    alt: "Pizza pepperoni",
    label: "Noite",
    span: "md",
  },
] as const;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function whatsappHref(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function unitWhatsApp(unitId: UnitId, text?: string) {
  const unit = units[unitId];
  return whatsappHref(
    unit.whatsapp,
    text ??
      `Olá, Redwolf ${unit.short}! Quero fazer um pedido / reserva pelo site piloto.`,
  );
}
