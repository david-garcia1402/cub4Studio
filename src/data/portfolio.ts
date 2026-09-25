export type PortfolioImage = {
  src: string;
  alt: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  cardTitle: string;
  tag: string;
  client?: string;
  summary: string;
  lead: string;
  description: string;
  deliverables: string[];
  tools: string;
  url?: string;
  urlLabel?: string;
  domain?: string;
  live?: boolean;
  featured?: boolean;
  portrait?: boolean;
  play?: boolean;
  cta?: string;
  video?: string;
  images: PortfolioImage[];
};

export const projects: PortfolioProject[] = [
  {
    id: "grupofvt",
    title: "Grupo FVT — Flow & Triton",
    cardTitle: "Flow & Triton",
    tag: "Site & Catálogo",
    client: "Grupo FVT · Itapema-SC",
    summary:
      "Site institucional com catálogo de duas marcas de perfuração — máquinas, compressores e ferramentas — com orçamento direto no WhatsApp.",
    lead: "Site institucional e catálogo de duas marcas de equipamentos para perfuração, publicado em grupofvt.com.",
    description:
      "Um só site para o grupo e suas duas marcas: Flow (martelos, bits, hastes, brocas e bombas) e Triton (perfuratrizes e compressores). Hero dividido por marca, catálogo com filtros e busca, vídeos do equipamento em operação, avaliações do Google e orçamento pré-preenchido no WhatsApp — responsivo e otimizado para SEO local.",
    deliverables: ["Site institucional", "Catálogo com filtros", "Vídeos & Google Reviews", "WhatsApp integrado"],
    tools: "React + Vite, Tailwind CSS, React Router e Cloudflare",
    url: "https://grupofvt.com",
    urlLabel: "Visitar grupofvt.com",
    domain: "grupofvt.com",
    live: true,
    featured: true,
    images: [
      { src: "/portfolio/grupofvt-home.jpg", alt: "Home do grupofvt.com — painéis Flow e Triton com o emblema do Grupo FVT" },
      { src: "/portfolio/grupofvt-catalogo-flow.jpg", alt: "Catálogo Flow com filtros por categoria e busca" },
      { src: "/portfolio/grupofvt-catalogo-triton.jpg", alt: "Catálogo Triton — perfuratrizes e compressores" },
      { src: "/portfolio/grupofvt-marcas.jpg", alt: "Seção Sobre o grupo com as duas marcas e produtos em destaque" },
      { src: "/portfolio/grupofvt-institucional.jpg", alt: "Página institucional do Grupo FVT com o cofundador Claudio Patricio" },
      { src: "/portfolio/grupofvt-setores.jpg", alt: "Setores atendidos e vídeo institucional da Flow" },
      { src: "/portfolio/grupofvt-mobile.jpg", alt: "Versão mobile da home do grupofvt.com" },
    ],
  },
  {
    id: "gabilazz",
    title: "Gabrieli Lazzarotto",
    cardTitle: "Gabrieli Lazzarotto",
    tag: "Site & Catálogo",
    client: "Gabilazz Beauty · Jaraguá do Sul-SC",
    summary: "Site da lash designer com catálogo de cílios, studio, depoimentos e agendamento direto no WhatsApp.",
    lead: "Site da lash designer Gabrieli Lazzarotto — catálogo de cílios, studio e agendamento no WhatsApp.",
    description:
      "Identidade em vinho, dourado e creme, com a foto real da Gabrieli no hero. O catálogo apresenta cada técnica — Volume Brasileiro, Fox Eyes, Egípcio 5D e outras — em um carrossel com as fotos dos procedimentos. A página ainda mostra o studio no Centro, depoimentos de clientes, dúvidas frequentes e o convite para agendar, já com a mensagem pronta no WhatsApp.",
    deliverables: ["Site institucional", "Catálogo de cílios", "Studio & depoimentos", "Agendamento no WhatsApp"],
    tools: "React, Vite, Tailwind CSS e Cloudflare",
    url: "https://gabilazzbeauty.com",
    urlLabel: "Visitar gabilazzbeauty.com",
    domain: "gabilazzbeauty.com",
    live: true,
    images: [
      { src: "/portfolio/gabilazz-home.jpg", alt: "Hero do site Gabrieli Lazzarotto — lash designer em Jaraguá do Sul" },
      { src: "/portfolio/gabilazz-catalogo.jpg", alt: "Catálogo de extensão de cílios — Volume Brasileiro, Egípcio 5D e Fox Eyes" },
      { src: "/portfolio/gabilazz-sobre.jpg", alt: "Seção sobre a Gabrieli, com retrato e valores do atendimento" },
      { src: "/portfolio/gabilazz-studio.jpg", alt: "Studio no Centro de Jaraguá do Sul, com endereço e formas de pagamento" },
      { src: "/portfolio/gabilazz-depoimentos.jpg", alt: "Depoimentos de clientes e nota 5,0 no Google" },
      { src: "/portfolio/gabilazz-contato.jpg", alt: "Chamada final para agendar o horário no WhatsApp" },
      { src: "/portfolio/gabilazz-mobile.jpg", alt: "Versão mobile do site Gabrieli Lazzarotto" },
    ],
  },
  {
    id: "pipocrunch",
    title: "PipoCrunch",
    cardTitle: "PipoCrunch",
    tag: "Landing Page",
    client: "PipoCrunch · Jaraguá do Sul-SC",
    summary: "Landing page para uma marca de pipocas gourmet — cardápio, sabores e um montador de pedido que envia tudo pronto no WhatsApp.",
    lead: "Landing page para uma marca de pipocas gourmet — do cardápio ao pedido pronto no WhatsApp.",
    description:
      "Identidade quente (bordô, dourado e creme) com tipografia editorial, cardápio por linha (gourmet, recheadas e petiscos), sabores da casa e uma seção de eventos. O destaque é o montador de pedido: o cliente escolhe linha, sabor e tamanho, vê o total e envia tudo formatado direto no WhatsApp da marca.",
    deliverables: ["Landing page", "Cardápio & sabores", "Montador de pedido", "Integração com WhatsApp"],
    tools: "Next.js, Tailwind CSS e Cloudflare Workers",
    url: "https://pipocrunch.com",
    urlLabel: "Visitar pipocrunch.com",
    domain: "pipocrunch.com",
    live: true,
    images: [
      { src: "/portfolio/pipocrunch-home.jpg", alt: "Hero do site PipoCrunch — pipocas gourmet em Jaraguá do Sul" },
      { src: "/portfolio/pipocrunch-cardapio.jpg", alt: "Cardápio PipoCrunch — pipocas gourmet, recheadas e petiscos" },
      { src: "/portfolio/pipocrunch-sabores.jpg", alt: "Seção de sabores da casa" },
      { src: "/portfolio/pipocrunch-pedido.jpg", alt: "Montador de pedido com resumo e envio no WhatsApp" },
      { src: "/portfolio/pipocrunch-mobile.jpg", alt: "Versão mobile do site PipoCrunch" },
    ],
  },
  {
    id: "guacamole",
    title: "Guacamole Cocina Mexicana",
    cardTitle: "Guacamole Cocina",
    tag: "Site & Reservas",
    client: "Guacamole Cocina Mexicana · Petrópolis, Porto Alegre-RS",
    summary: "Site do restaurante mexicano em Petrópolis — rodízio, cardápio e reserva direto no WhatsApp.",
    lead: "Site de conversão do restaurante mexicano — rodízio, cardápio e reserva no WhatsApp.",
    description:
      "Página pensada para a unidade de Petrópolis: hero com a identidade da casa, destaques de rodízio e happy hour, cardápio de tacos, burritos e quesadillas, e o caminho curto até a reserva. O visitante sai com mesa marcada ou pedido a caminho, sem formulário no meio.",
    deliverables: ["Site institucional", "Cardápio", "Reservas no WhatsApp", "Localização"],
    tools: "Next.js, React e Tailwind CSS",
    images: [
      { src: "/portfolio/guacamole-home.jpg", alt: "Hero do Guacamole Cocina Mexicana" },
      { src: "/portfolio/guacamole-mobile.jpg", alt: "Versão mobile do site Guacamole Cocina Mexicana" },
    ],
  },
  {
    id: "raven",
    title: "The Raven",
    cardTitle: "The Raven",
    tag: "Site & Reservas",
    client: "The Raven · Cidade Baixa, Porto Alegre-RS",
    summary: "Site do restaurante mediterrâneo na Cidade Baixa — cardápio, galeria, avaliações e reserva de mesa.",
    lead: "Site do restaurante de alta gastronomia mediterrânea, com cardápio, galeria e reserva.",
    description:
      "Identidade escura com dourado, tipografia editorial e a atmosfera do mezanino na Cidade Baixa. A página reúne cardápio, galeria, avaliações do Google e um pedido de reserva que abre direto no WhatsApp — no desktop e no celular.",
    deliverables: ["Site institucional", "Cardápio", "Galeria", "Reserva no WhatsApp"],
    tools: "Next.js, React e Tailwind CSS",
    images: [
      { src: "/portfolio/raven-home.jpg", alt: "Hero do The Raven na Cidade Baixa" },
      { src: "/portfolio/raven-cardapio.jpg", alt: "Cardápio do The Raven" },
      { src: "/portfolio/raven-galeria.jpg", alt: "Galeria do The Raven" },
      { src: "/portfolio/raven-mobile.jpg", alt: "Versão mobile do site The Raven" },
    ],
  },
  {
    id: "econoradar",
    title: "EconoRadar",
    cardTitle: "EconoRadar",
    tag: "Criativos IA",
    summary: "Campanha de lançamento para um app de inteligência financeira — dark mode, mockups e direção de arte.",
    lead: "Campanha de lançamento para o app de inteligência financeira em econoradar.app.",
    description:
      "Direção de arte em dark mode, mockups de produto e peças para redes. A ideia era transformar ruído de mercado em um radar único: indicadores, notícias e ativos com clareza visual — pronto para anúncio e perfil.",
    deliverables: ["Peças de campanha", "Mockups de app", "Direção de arte"],
    tools: "IA generativa, Photoshop e direção de arte",
    url: "https://econoradar.app",
    urlLabel: "Visitar econoradar.app",
    domain: "econoradar.app",
    live: true,
    images: [
      { src: "/portfolio/econoradar-2.jpg", alt: "Campanha visual do app EconoRadar" },
      { src: "/portfolio/econoradar-1.jpg", alt: "Mockup do app EconoRadar com cards flutuantes" },
      { src: "/portfolio/econoradar-3.jpg", alt: "Peça de campanha EconoRadar — você no meio da informação" },
    ],
  },
  {
    id: "melbrasa",
    title: "Mel & Brasa",
    cardTitle: "Mel & Brasa",
    tag: "Reel / Vídeo IA",
    summary: "Reel gastronômico gerado com IA — close-ups cinematográficos e gancho nos primeiros segundos.",
    lead: "Reel gastronômico gerado com IA, no ritmo de anúncio.",
    description:
      "Close-ups de fogo e selagem, gancho nos primeiros segundos e corte pensado para tráfego e redes. O objetivo era apetite imediato — sem parecer stock, sem perder a marca.",
    deliverables: ["Roteiro", "Vídeo gerado com IA", "Corte para redes"],
    tools: "IA de vídeo, edição e direção criativa",
    images: [{ src: "/portfolio/mel-brasa.jpg", alt: "Close cinematográfico de um steak no grill para o reel Mel & Brasa" }],
  },
  {
    id: "nectar",
    title: "Néctar Atelier",
    cardTitle: "Néctar Atelier",
    tag: "Criativos IA",
    summary: "Campanha de skincare com stills gerados por IA. Linguagem editorial, luz coral e paleta de marca.",
    lead: "Campanha de skincare com stills editoriais gerados por IA.",
    description:
      "Luz coral, paleta de marca e linguagem de revista. Peças pensadas para anúncio e feed — produto em destaque, sem cenário genérico, com a atmosfera de um atelier.",
    deliverables: ["Stills de produto", "Paleta de campanha", "Peças para feed e ads"],
    tools: "IA generativa e direção de arte",
    images: [{ src: "/portfolio/nectar.jpg", alt: "Stills de produto da campanha Néctar Atelier" }],
  },
  {
    id: "nyos",
    title: "The Lake Nyos Mystery",
    cardTitle: "The Lake Nyos Mystery",
    tag: "Documentário IA",
    summary: "Curta documental gerado com IA — narrativa, atmosfera e motion graphics para um mistério histórico.",
    lead: "Curta documental gerado com IA sobre o mistério do Lago Nyos.",
    description:
      "Narração, atmosfera e motion graphics em formato de vídeo curto. Uma história real tratada como mistério cinematográfico — do conceito ao cut final, com IA no meio e curadoria humana no ritmo.",
    deliverables: ["Roteiro", "Vídeo documental", "Motion graphics"],
    tools: "IA de vídeo, narração e edição",
    play: true,
    portrait: true,
    cta: "Assistir",
    video: "https://drive.google.com/file/d/1iMwef8uLu5_Qta_GYXAMztKbwLtXgSTH/preview",
    images: [{ src: "/portfolio/nyos.jpg", alt: "Frame do documentário The Lake Nyos Mystery" }],
  },
];

export function projectById(id: string) {
  return projects.find((project) => project.id === id);
}
