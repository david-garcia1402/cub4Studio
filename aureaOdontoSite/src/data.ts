export const clinic = {
  name: "Áurea Odontologia Premium",
  city: "Jaraguá do Sul",
  tagline: "Seu sorriso na proporção perfeita",
  phoneDisplay: "(47) 93383-7333",
  phoneTel: "+5547933837333",
  whatsapp: "5547933837333",
  address: "Ex-Combatente Antônio Rita, 30",
  neighborhood: "Centro",
  cep: "89252-065",
  state: "SC",
  mapsUrl: "https://maps.app.goo.gl/zjZWMBNzvcFiwuLz6",
  mapsEmbed:
    "https://www.google.com/maps?q=Ex-Combatente+Ant%C3%B4nio+Rita,+30+-+Centro,+Jaragu%C3%A1+do+Sul+-+SC,+89252-065&hl=pt-BR&z=17&output=embed",
  instagram: "https://www.instagram.com/aurea_odontopremium/",
  instagramHandle: "@aurea_odontopremium",
  bookingUrl: "https://agenda.link/30838",
  rating: "4,8",
  reviews: 78,
  rt: "Dra. Georgia Ayumi",
  cro: "CRO-SC 20.866",
  epao: "EPAO 3619",
};

export const hours = [
  { days: "Segunda a sexta", time: "09h às 20h" },
  { days: "Sábado", time: "09h às 12h" },
  { days: "Domingo", time: "Fechado" },
];

export function waLink(message?: string) {
  const text =
    message ??
    "Olá! Gostaria de agendar uma avaliação na Áurea Odontologia Premium.";
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const services = [
  {
    title: "Harmonização orofacial",
    text: "Equilíbrio entre dentes, gengiva e face — o cuidado estético com proporção e naturalidade.",
  },
  {
    title: "Ortodontia",
    text: "Alinhamento e função com planejamento individual, do adolescente ao adulto.",
  },
  {
    title: "Clínica geral",
    text: "Consultas, prevenção e acompanhamento completo da saúde bucal em um só endereço.",
  },
  {
    title: "Implantodontia",
    text: "Reposição de dentes com protocolo seguro e acompanhamento próximo em cada etapa.",
  },
  {
    title: "Prótese",
    text: "Próteses fixas e removíveis pensadas para conforto, estética e durabilidade.",
  },
  {
    title: "Tratamento de canal",
    text: "Endodontia com foco em preservar o dente e aliviar a dor com o menor desconforto.",
  },
  {
    title: "Odontopediatria e PNE",
    text: "Atendimento acolhedor para crianças e pacientes com necessidades especiais.",
  },
  {
    title: "Lentes de contato",
    text: "Lâminas ultrafinas para transformar o sorriso com resultado natural e sofisticado.",
  },
  {
    title: "Facetas",
    text: "Reabilitação estética do sorriso com acabamento preciso e harmonia facial.",
  },
  {
    title: "Clareamento dental",
    text: "Protocolos supervisionados para um sorriso mais luminoso, sem abrir mão da saúde.",
  },
];

export const gallery = [
  {
    src: "/images/fachada.webp",
    fallback: "/images/11-extra.jpg",
    alt: "Fachada da Áurea Odontologia Premium com totem de especialidades e estacionamento exclusivo",
    wide: true,
    pos: "object-[center_62%]",
  },
  {
    src: "/images/fachada-close.webp",
    fallback: "/images/01-fachada.jpg",
    alt: "Entrada da clínica Áurea com rampa de acesso e letreiro dourado",
    wide: false,
    pos: "object-[center_45%]",
  },
  {
    src: "/images/recepcao.webp",
    fallback: "/images/02-interior.jpg",
    alt: "Recepção da Áurea com balcão claro, painel de madeira e orquídea",
    wide: false,
    pos: "object-[center_70%]",
  },
  {
    src: "/images/consultorio.webp",
    fallback: "/images/03-ambiente.jpg",
    alt: "Consultório odontológico moderno com cadeira, mesa de mármore e poltrona preta",
    wide: true,
    pos: "object-center",
  },
  {
    src: "/images/detalhes.webp",
    fallback: "/images/04-consultorio.jpg",
    alt: "Estante dourada na janela da clínica com vista para o Centro de Jaraguá do Sul",
    wide: false,
    pos: "object-center",
  },
  {
    src: "/images/logo-parede.webp",
    fallback: "/images/07-sala.jpg",
    alt: "Letreiro Áurea Odontologia Premium em dourado no painel de madeira",
    wide: false,
    pos: "object-[center_42%]",
  },
];

export const reviews = [
  {
    name: "Denise Dalmolin",
    text: "Fiquei extremamente satisfeita com o atendimento. Desde a recepção até o procedimento, fui tratada com profissionalismo e cordialidade. O ambiente é limpo, moderno e acolhedor — super recomendo!",
  },
  {
    name: "Thatá Pereira",
    text: "Equipe extremamente atenciosa, preços justos e estacionamento gratuito.",
  },
  {
    name: "Maicon Foltz",
    text: "A clínica conta com tecnologia de ponta, ambiente limpo e sofisticado, equipe técnica e ética, e parcelamento no boleto.",
  },
  {
    name: "Regina Regina",
    text: "Clínica com ótimos dentistas e ótimo atendimento.",
  },
  {
    name: "Analete Mota",
    text: "Profissionais de excelente qualidade, com atendimento top.",
  },
];
