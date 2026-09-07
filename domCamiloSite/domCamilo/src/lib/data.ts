export const restaurant = {
  name: "Restaurante Dom Camilo",
  shortName: "Dom Camilo",
  rating: 4.2,
  reviewCount: 1250,
  priceRange: "R$ 20–40",
  priceNote: "Informado por 147 pessoas",
  phone: "(51) 99773-7548",
  phoneHref: "tel:+5551997737548",
  whatsapp: "5551997737548",
  whatsappMessage:
    "Olá! Gostaria de informações sobre mesa no Restaurante Dom Camilo.",
  address: "R. José do Patrocínio, 122 - Niterói, Canoas - RS, 92120-080",
  mapsQuery: "R. José do Patrocínio, 122 - Niterói, Canoas - RS, 92120-080",
  plusCode: "3R3F+XV Niterói, Canoas - RS",
  tagline: "Rodízio de carnes na brasa, mesa farta e casa informal.",
  description:
    "Rodízio de carnes assadas na brasa, com acompanhamentos gaúchos e sobremesas, em casa com atmosfera informal.",
  services: ["Refeição no local", "Para viagem", "Entrega sem contato"],
} as const;

export const whatsappHref = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(restaurant.whatsappMessage)}`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`;

export const mapsEmbedSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=-51.1746%2C-29.9501%2C-51.1646%2C-29.9401&layer=mapnik&marker=-29.94506%2C-51.16960";

export const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#visite", label: "Visite" },
] as const;

export const experiences = [
  {
    id: "almoco",
    eyebrow: "Todos os dias",
    title: "Almoço de casa",
    text: "Buffet quente com grelhados, saladas de verdade e sobremesas que a mesa pede repeteco. O ritual do meio-dia em Canoas.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
    alt: "Carnes grelhadas servidas em tábua",
  },
  {
    id: "domingo",
    eyebrow: "Domingo",
    title: "Buffet de frutos do mar",
    text: "O almoço preferido da casa no domingo: mesa de mariscos, camarões e o ritmo mais lento de quem veio pra ficar.",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1400&q=80",
    alt: "Prato de frutos do mar",
  },
  {
    id: "noite",
    eyebrow: "À noite",
    title: "Churrasco, pizza e refri livre",
    text: "Fogo, massa e refrigerante na mesma tarifa. Uma noite informal para família e amigos, sem complicar a conta.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80",
    alt: "Pizza recém-assada",
  },
] as const;

export const menuItems = [
  {
    title: "Mocotó",
    badge: "Mais pedido",
    text: "O clássico da casa. Caldo encorpado, sabor de domingo e o prato que o Google já aprendeu a destacar.",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=1200&q=80",
    alt: "Caldo caseiro servido em tigela",
  },
  {
    title: "Grelhados na brasa",
    badge: "Rodízio",
    text: "Costela, vazio, coração de frango e linguiça. Carne no ponto, fumaça na medida, acompanhamento gaúcho.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    alt: "Espetinhos e carnes grelhadas",
  },
  {
    title: "Pizza",
    badge: "Mais pedida",
    text: "À noite a casa vira forno. Pizza para dividir com o churrasco e o refri livre na mesma tarifa.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    alt: "Pizza artesanal",
  },
  {
    title: "Buffet de saladas",
    badge: "Casa",
    text: "Mesa fria variada e a salada de maionese que as avaliações não cansam de citar.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    alt: "Tigela de salada fresca",
  },
  {
    title: "Banana empanada",
    badge: "Destaque",
    text: "Crocante por fora, doce por dentro. O detalhe do buffet quente que vira assunto na mesa.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    alt: "Sobremesa dourada",
  },
  {
    title: "Sobremesas de casa",
    badge: "Doce",
    text: "A parte que fecha o almoço e justifica a volta. Variedade caseira, preço que não assusta.",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
    alt: "Sobremesas em taça",
  },
] as const;

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1400&q=80",
    alt: "Churrasco na brasa",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    alt: "Ambiente do restaurante",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    alt: "Mesa posta com pratos",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
    alt: "Sala de jantar informal",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    alt: "Prato principal",
    className: "",
  },
] as const;

export const reviewTags = [
  { label: "buffet", count: 59 },
  { label: "pizzas", count: 22 },
  { label: "sobremesas", count: 22 },
  { label: "grelhados", count: 21 },
] as const;

export const reviews = [
  {
    name: "Fernando Stanguerlin",
    meta: "Local Guide · 113 avaliações",
    time: "2 meses atrás",
    rating: 5,
    text: "É uma ótima experiência, ótimo para comer no domingo rápido. No andar de baixo o valor do Kiko é bem em conta, sobremesas ótimas, ambiente caseiro, tudo muito limpo.",
    reply: "Muito obrigada!!",
  },
  {
    name: "Auri Boness",
    meta: "4 avaliações",
    time: "4 meses atrás",
    rating: 5,
    text: "Muito bom!! Superou minhas expectativas. Excelente restaurante pelo preço bem em conta.",
    reply: "Muito obrigada",
  },
  {
    name: "Carla Costa",
    meta: "Local Guide · 78 avaliações",
    time: "2 anos atrás",
    rating: 5,
    text: "Buffet quente com várias delícias, destaque para a banana empanada. Buffet de salada variado, com uma salada de maionese deliciosa. Carnes grelhadas — costela, vazio, coração de frango e linguiça. Aos domingos, buffet de frutos do mar.",
    reply: "Obrigada!",
  },
] as const;

export const reviewQuotes = [
  "Boa variedade de pratos salgados, saladas, grelhados e sobremesas.",
  "É o nosso lugar preferido, no almoço de domingo, buffet de frutos do mar.",
  "À noite, churrasco, pizza e refri livre na mesma tarifa.",
] as const;

export const hours = [
  { day: "Segunda", lunch: "11:00 – 14:30", dinner: "Consulte" },
  { day: "Terça", lunch: "11:00 – 14:30", dinner: "Consulte" },
  { day: "Quarta", lunch: "11:00 – 14:30", dinner: "Consulte" },
  { day: "Quinta", lunch: "11:00 – 14:30", dinner: "Consulte" },
  { day: "Sexta", lunch: "11:00 – 14:30", dinner: "Consulte" },
  { day: "Sábado", lunch: "11:00 – 14:30", dinner: "Consulte" },
  { day: "Domingo", lunch: "11:00 – 14:30", dinner: "Consulte" },
] as const;
