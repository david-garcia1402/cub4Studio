export const site = {
  name: "Onze Bar",
  tagline: "A noite começa às onze.",
  rating: 4.7,
  reviews: 169,
  priceRange: "R$ 40–60",
  phone: "(51) 4066-0411",
  phoneHref: "tel:+555140660411",
  whatsapp: "https://wa.me/555140660411",
  instagram: "https://www.instagram.com/onze.bar/",
  instagramHandle: "@onze.bar",
  address: "R. Cel. Fernando Machado, 1172",
  neighborhood: "Centro Histórico, Porto Alegre — RS",
  cep: "90010-320",
  plusCode: "XQ8F+48",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Fernando+Machado+1172+Porto+Alegre",
  mapsEmbed:
    "https://maps.google.com/maps?q=Rua%20Coronel%20Fernando%20Machado%201172%20Porto%20Alegre&t=&z=16&ie=UTF8&iwloc=&output=embed",
}

export const hours = [
  { day: "Segunda", time: "Fechado" },
  { day: "Terça", time: "18:00 — 00:00" },
  { day: "Quarta", time: "18:00 — 00:00" },
  { day: "Quinta", time: "18:00 — 00:00" },
  { day: "Sexta", time: "18:00 — 00:00" },
  { day: "Sábado", time: "18:00 — 00:00" },
  { day: "Domingo", time: "Às vezes aberto" },
] as const

export const services = [
  "Refeição no local",
  "Retirada na porta",
  "Entrega",
  "Mesas ao ar livre",
  "Wi-fi",
  "Reservas",
]

export const menu = {
  drinks: [
    {
      name: "Onze Mule",
      tag: "assinatura",
      text: "O drink da casa. Espuma de maracujá e aquele toque que a galera pede de volta.",
      image:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Jambubeba",
      tag: "autoral",
      text: "Favorito de quem entende de balcão. Uma carta que se orgulha dos autorais.",
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb24831c2?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Sem Nome",
      tag: "cult",
      text: "O drink sem nome — e com fama. Peça no bar e descubra por quê.",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Pisco Sour",
      tag: "clássico",
      text: "Espuma justa, acidez no ponto. Um clássico que combina com a casa.",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Whiskey Sour",
      tag: "clássico",
      text: "Equilíbrio de whisky, cítrico e doçura. Direto ao ponto.",
      image:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1600&q=85",
    },
  ],
  food: [
    {
      name: "Croquetas Cogumelo",
      tag: "petisco",
      text: "Crocantes por fora, cremosas por dentro. O pedido que volta à mesa.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Croquetas Carne",
      tag: "petisco",
      text: "Clássico de bar, feito para acompanhar o próximo round.",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Croquetas Costela",
      tag: "destaque",
      text: "Costela desfiada em croqueta dourada. Petisco de verdade.",
      image:
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=85",
    },
    {
      name: "Falafels",
      tag: "petisco",
      text: "Uma opção que aparece nas mesas e nas conversas depois.",
      image:
        "https://images.unsplash.com/photo-1593001874117-c99c800e3c61?auto=format&fit=crop&w=1600&q=85",
    },
  ],
}

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=85",
    alt: "Balcão iluminado do bar",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc88?auto=format&fit=crop&w=1600&q=85",
    alt: "Drinks e copos no balcão",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=85",
    alt: "Ambiente noturno com luzes quentes",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?auto=format&fit=crop&w=1600&q=85",
    alt: "DJ e pista",
    span: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=2000&q=85",
    alt: "Cerveja gelada servida",
    span: "wide",
  },
]

export const reviews = [
  {
    name: "Aline Lucena",
    time: "há 1 ano",
    quote:
      "Lugar em que me sinto segura, acolhida e bem atendida. Já virei amiga da equipe e tenho o bar como segunda casa. A carta de drinks é sensacional — e olha que sou bartender. Meu favorito é o Jambubeba.",
  },
  {
    name: "Patricia Cunha",
    time: "há 3 meses",
    quote:
      "O melhor bar do centro histórico, com os melhores petiscos, drinks e setlists. O diferencial fica por conta do atendimento do Alex — melhor que ele, só dois dele.",
  },
  {
    name: "Visitante",
    time: "Google",
    quote:
      "Ótimo ambiente, comidas maravilhosas, cerveja gelada e bons drinks. Espaço, decoração e organização da equipe impecáveis.",
  },
]

export const reviewBars = [
  { stars: 5, value: 78 },
  { stars: 4, value: 14 },
  { stars: 3, value: 5 },
  { stars: 2, value: 2 },
  { stars: 1, value: 1 },
]
