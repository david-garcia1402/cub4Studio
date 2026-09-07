export const site = {
  name: "Guacamole Cocina Mexicana",
  city: "Porto Alegre",
  neighborhood: "Petrópolis",
  tagline: "Tudo é mexicano.",
  description:
    "Um restaurante onde tudo é mexicano, com pratos típicos e músicas tocadas por um grupo de mariachis.",
  founded: 2013,
  rating: 4.7,
  reviews: 14347,
  priceRange: "R$ 80–160",
  phoneDisplay: "(51) 99361-9797",
  phoneE164: "5551993619797",
  address: "R. Des. Augusto Loureiro Lima, 165",
  addressFull:
    "R. Des. Augusto Loureiro Lima, 165 - Petrópolis, Porto Alegre - RS, 90470-120",
  plusCode: "XR98+7H Petrópolis, Porto Alegre - RS",
  hours: "Todos os dias, 19h às 00h",
  hoursShort: "Aberto · Fecha 00:00",
  website: "https://guacamolemex.com.br",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Desembargador+Augusto+Loureiro+Lima+165+Petropolis+Porto+Alegre",
  ifoodUrl:
    "https://www.ifood.com.br/delivery/porto-alegre-rs/guacamole-cocina-mexicana---porto-alegre-petropolis/d637a1b4-a1c3-4a06-9da8-5737d0d101bd",
  instagram: "https://www.instagram.com/explore/locations/guacamole-cocina-mexicana/",
  services: ["Refeição no local", "Para viagem", "Entrega"],
} as const;

export const highlights = [
  {
    title: "Rodízio mexicano",
    price: "R$ 93,90",
    was: "R$ 106,90",
    note: "Com reserva",
    copy: "Tacos, burritos, nachos, quesadillas e a sequência de molhos que virou marca da casa.",
  },
  {
    title: "Happy hour",
    price: "Até 20h",
    note: "Exceto véspera de feriado",
    copy: "O horário certo para abrir a noite com tequila, margarita e mesa compartilhada.",
  },
  {
    title: "Mariachis ao vivo",
    price: "A partir das 20h",
    note: "Tequileiro e DJ",
    copy: "Música na mesa, tequileiro e a energia caliente que o Guaca leva desde 2006.",
  },
] as const;

export const dishes = [
  {
    name: "Nachos",
    tag: "Mais pedidos",
    desc: "Tortilla chips da casa com guacamole, cheddar, chili e pico de gallo.",
    image:
      "https://images.pexels.com/photos/1108775/pexels-photo-1108775.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Tacos",
    tag: "Clássico",
    desc: "Soft ou crocante: mignon barbacoa, pollo yucatán, ribs tex-mex e chili.",
    image:
      "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Guacamole",
    tag: "Assinatura",
    desc: "O molho que dá nome à casa. Abacate fresco, limão e o ponto certo de picância.",
    image:
      "https://images.pexels.com/photos/5945664/pexels-photo-5945664.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Quesadilla",
    tag: "Mais pedidos",
    desc: "Trigo tostado na chapa com queijos mistos, tapachula, pollo loco ou al pastor.",
    image:
      "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Churros com sorvete",
    tag: "Aniversário",
    desc: "Sobremesa de festa: churros recheados, mini brownie e sorvete de creme.",
    image:
      "https://images.pexels.com/photos/372851/pexels-photo-372851.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Margarita 1L",
    tag: "Bar",
    desc: "A jarra que pede mesa grande. Clássica, de morango ou o drink Catrina.",
    image:
      "https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
] as const;

export const menu = {
  sauces: {
    title: "Entradita + molhos",
    items: [
      "Tortilla chips",
      "Guacamole",
      "Pico de gallo",
      "Sour cream",
      "Frijoles",
      "Chili",
      "Cheddar",
    ],
  },
  combo: {
    title: "Combo de entrada",
    items: [
      "Quesadilla mignon barbacoa",
      "Papas fritas",
      "Mini nachos chili Jalisco",
      "Salsa picante",
    ],
  },
  sections: [
    {
      title: "Tacos",
      items: [
        {
          name: "Mignon Barbacoa",
          desc: "Tortilla soft, cubos de mignon, molho barbacoa, queijos, alface e pico de gallo.",
        },
        {
          name: "Pollo crocante Yucatán",
          desc: "Frango empanado, geleia de abacaxi com pimenta, rúcula, abacate e mix de queijos.",
        },
        {
          name: "Ribs tex-mex",
          desc: "Tortilla de milho crocante, costela suína desfiada ao barbecue e queijo.",
        },
        {
          name: "Chili Chicharito",
          desc: "Chili de carne moída, alface, queijos mistos e pico de gallo.",
        },
      ],
    },
    {
      title: "Burritos",
      items: [
        {
          name: "Mignon Santa Fé",
          desc: "Mignon, frijoles, cogumelo, arroz mexicano, guacamole, pico de gallo e cebola caramelizada.",
        },
        {
          name: "Pollo Crocante",
          desc: "Cubos empanados de frango, geleia de pimenta com abacaxi e frijoles.",
        },
        {
          name: "Al Pastor",
          desc: "Lombo suíno al pastor, bacon, geleia de abacaxi, frijoles e arroz mexicano.",
        },
        {
          name: "Chili Monterrey",
          desc: "Chili de carne, crispy de tortillas, arroz mexicano e creme de milho.",
        },
      ],
    },
    {
      title: "Quesadillas",
      items: [
        { name: "Tapachula", desc: "Mignon com molho barbacoa e queijos mistos." },
        { name: "Pollo Loco", desc: "Frango desfiado, cheddar, bacon e queijos mistos." },
        { name: "Al Pastor", desc: "Lombo suíno, cubos de abacaxi, bacon e queijos." },
        { name: "Marguerita", desc: "Tomate, manjericão e queijos mistos." },
      ],
    },
    {
      title: "Clássicos",
      items: [
        {
          name: "Pollo la Luna",
          desc: "Frango ao molho rosê de média picância, tortillas crocantes e queijos gratinados.",
        },
        { name: "Pastelitos", desc: "Chili de carne moída com mix de queijos." },
        { name: "Panelinha de chili", desc: "Carne, feijão, tomate e especiarias, fumegante na mesa." },
      ],
    },
    {
      title: "Vegetarianos",
      items: [
        {
          name: "Burrito Carlos Santana",
          desc: "Legumes, azeitona, milho, arroz mexicano, frijoles vegano e soja.",
        },
        {
          name: "Taco Sierra Madre",
          desc: "Creme de milho vegano, cogumelo, pico de gallo e milho.",
        },
        {
          name: "Nacho Caliente",
          desc: "Chips com frijoles, chili vegano, jalapeño, pimenta biquinho e coentro.",
        },
        {
          name: "Quesadilla Serrano",
          desc: "Creme de milho vegano, mix de legumes, azeitona e milho.",
        },
      ],
    },
    {
      title: "Doces e drinks",
      items: [
        {
          name: "Churros com sorvete",
          desc: "Churros de doce de leite, mini brownie e sorvete com calda.",
        },
        { name: "Margarita 1L", desc: "A jarra clássica da casa para dividir." },
        { name: "Marguerita de morango", desc: "Doce, cítrica e gelada." },
        { name: "Drink Catrina", desc: "Tequila, cítricos e o visual mais caliente do bar." },
        { name: "Mojito", desc: "Um dos mais pedidos da noite." },
      ],
    },
  ],
} as const;

export const reviews = [
  {
    quote: "Lugar top. Comida boa, bons atendentes, música boa!",
    author: "Frequentador",
    stars: 5,
  },
  {
    quote:
      "Muita boa comida. O rodízio é o motivo de voltar — tacos, burritos e chili no ponto.",
    author: "Frequentador",
    stars: 5,
  },
  {
    quote:
      "Atmosfera animada, mariachis talentosos e serviço atencioso. Experiência completa.",
    author: "Resumo das avaliações",
    stars: 5,
  },
] as const;

export const reviewSummary =
  "Os frequentadores dizem que a comida mexicana é deliciosa e autêntica, com tacos, burritos e chili em destaque. Apreciam a atmosfera animada, os músicos ao vivo e o serviço atencioso da equipe.";

export const gallery = [
  {
    src: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Tacos mexicanos servidos na mesa",
    label: "Tacos",
  },
  {
    src: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Ambiente aconchegante de restaurante à noite",
    label: "Ambiente",
  },
  {
    src: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Drinks servidos no bar",
    label: "Bar",
  },
  {
    src: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Salão do restaurante",
    label: "Salão",
  },
] as const;
