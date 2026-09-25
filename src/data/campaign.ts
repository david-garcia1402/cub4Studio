export type CampaignNiche = {
  id: string;
  niche: string;
  cta: string;
};

/** A copy não muda. Só o segmento e o botão que fala com o cliente. */
export const campaignNiches: CampaignNiche[] = [
  { id: "advocacia", niche: "Escritórios de advocacia", cta: "Quero o site do meu escritório" },
  { id: "odonto", niche: "Clínicas odontológicas", cta: "Quero o site da minha clínica" },
  { id: "beleza", niche: "Estúdios de beleza", cta: "Quero o site do meu estúdio" },
  { id: "gastro", niche: "Restaurantes e deliverys", cta: "Quero o site do meu restaurante" },
  { id: "industria", niche: "Indústria e equipamentos", cta: "Quero o site da minha empresa" },
];

export const campaignKicker = "Desenvolvemos seu site!";

export const campaignChips = ["24h", "WhatsApp", "Confiança"] as const;

export const campaignCaption = "Projetos pensados para cada negócio, sem template genérico.";

export type CampaignShot = {
  src: string;
  alt: string;
  name: string;
  domain: string;
};

/** Previews dos sites que já estão no portfólio — o carrossel aberto do anúncio. */
export const campaignSites: CampaignShot[] = [
  {
    src: "/portfolio/grupofvt-home.jpg",
    alt: "Home do site Grupo FVT, com as marcas Flow e Triton",
    name: "Flow & Triton",
    domain: "grupofvt.com",
  },
  {
    src: "/portfolio/gabilazz-home.jpg",
    alt: "Home do site Gabrieli Lazzarotto, lash designer",
    name: "Gabrieli Lazzarotto",
    domain: "gabilazzbeauty.com",
  },
  {
    src: "/portfolio/pipocrunch-home.jpg",
    alt: "Home do site PipoCrunch, pipocas gourmet",
    name: "PipoCrunch",
    domain: "pipocrunch.com",
  },
  {
    src: "/portfolio/econoradar-1.jpg",
    alt: "Campanha visual do app EconoRadar",
    name: "EconoRadar",
    domain: "econoradar.app",
  },
  {
    src: "/portfolio/gabilazz-catalogo.jpg",
    alt: "Catálogo de cílios no site Gabrieli Lazzarotto",
    name: "Catálogo Gabilazz",
    domain: "gabilazzbeauty.com",
  },
];

/** Fotos reais do trabalho, logo abaixo dos previews de site. */
export const campaignPhotos: { src: string; alt: string }[] = [
  { src: "/portfolio/mel-brasa.jpg", alt: "Close de steak na brasa, peça do reel Mel & Brasa" },
  { src: "/portfolio/nectar.jpg", alt: "Still de produto da campanha Néctar Atelier" },
  { src: "/portfolio/gabilazz-studio.jpg", alt: "Studio da Gabrieli Lazzarotto no site" },
  { src: "/portfolio/pipocrunch-cardapio.jpg", alt: "Cardápio do site PipoCrunch" },
  { src: "/portfolio/grupofvt-setores.jpg", alt: "Setores atendidos no site do Grupo FVT" },
  { src: "/portfolio/grupofvt-marcas.jpg", alt: "Marcas Flow e Triton no site do grupo" },
];
