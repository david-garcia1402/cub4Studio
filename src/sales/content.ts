import type { LightboxLabels } from "../components/ui/Lightbox";
import {
  CHECKOUT_BR_URL,
  CHECKOUT_EN_URL,
  GUARANTEE_TERMS_BR,
  GUARANTEE_TERMS_EN,
  META_PIXEL_ID_BR,
  META_PIXEL_ID_EN,
  PAGE_URL_BR,
  PAGE_URL_EN,
  PRODUCT_CURRENCY_BR,
  PRODUCT_CURRENCY_EN,
  PRODUCT_PRICE_BR,
  PRODUCT_PRICE_EN,
  TRACKING_PARAMS_BR,
  TRACKING_PARAMS_EN,
} from "./config";

export type Locale = "pt-br" | "en";

export type Track = { code: string; title: string; level: string; text: string; highlight?: boolean };
export type Preview = { file: string; title: string; caption: string; alt: string };
export type Faq = { q: string; a: string };

export type SalesContent = {
  locale: Locale;
  htmlLang: string;
  pageUrl: string;
  alternateUrl: string;
  alternateLabel: string;
  checkoutUrl: string;
  trackingParams: readonly string[];
  platform: string;
  price: number;
  currency: string;
  priceLabel: string;
  guarantee: string;
  pixelId: string;
  assets: string;
  cover: string;
  switcherLabel: string;
  skipLink: string;
  unavailable: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    bullets: string[];
    cta: string;
    note: string;
    coverAlt: string;
    badge: string;
  };
  facts: { value: string; label: string }[];
  tracks: { tag: string; title: string; desc: string; note: string; items: Track[] };
  inside: { tag: string; title: string; desc: string; open: string; prev: string; next: string; fictional: string; items: Preview[] };
  receive: { tag: string; title: string; desc: string; items: { title: string; text: string }[]; rights: string; notIncluded: string };
  audience: {
    tag: string;
    title: string;
    desc: string;
    items: { title: string; text: string }[];
    prereqTitle: string;
    prereq: string[];
    notForTitle: string;
    notFor: string[];
  };
  steps: { tag: string; title: string; desc: string; items: { title: string; text: string; ref: string }[]; disclaimer: string };
  offer: { tag: string; title: string; name: string; includes: string[]; priceCaption: string; cta: string; note: string; taxes: string };
  faq: { tag: string; title: string; items: Faq[] };
  closing: { title: string; text: string; cta: string };
  footer: {
    developed: string;
    support: string;
    legal: string;
    links: { label: string; href: string }[];
    rights: string;
  };
  sticky: string;
  lightbox: LightboxLabels;
};

function formatPrice(value: number, currency: string, locale: string) {
  if (!value || !currency) return "";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}

const priceBr = formatPrice(PRODUCT_PRICE_BR, PRODUCT_CURRENCY_BR, "pt-BR");
const priceEn = formatPrice(PRODUCT_PRICE_EN, PRODUCT_CURRENCY_EN, "en-US");

export const ptBr: SalesContent = {
  locale: "pt-br",
  htmlLang: "pt-BR",
  pageUrl: PAGE_URL_BR,
  alternateUrl: "/en/ai-to-business/",
  alternateLabel: "EN",
  checkoutUrl: CHECKOUT_BR_URL,
  trackingParams: TRACKING_PARAMS_BR,
  platform: "Kiwify",
  price: PRODUCT_PRICE_BR,
  currency: PRODUCT_CURRENCY_BR,
  priceLabel: priceBr,
  guarantee: GUARANTEE_TERMS_BR,
  pixelId: META_PIXEL_ID_BR,
  assets: "/ai-to-business/pt-br",
  cover: "capa",
  switcherLabel: "Idioma",
  skipLink: "Pular para o conteúdo",
  unavailable: "O checkout desta edição ainda não está disponível.",
  hero: {
    eyebrow: "Guia prático em PDF · Edição 1.0",
    title: "Quer criar sites e materiais com IA para oferecer a clientes?",
    lead:
      "O AI to Business é um guia em PDF que mostra como transformar o que você já consegue fazer com IA, como sites, criativos, vídeos e automações, em um serviço com escopo definido, preço de teste e uma demonstração para apresentar.",
    bullets: [
      "Escolha uma entre 10 trilhas de serviço ou produto, com critério de pontuação.",
      "Monte uma oferta de uma página: entregáveis, prazo, revisões, exclusões e preço.",
      "Produza uma demonstração e organize a prospecção com um plano de 14 dias.",
    ],
    cta: "Quero acessar o guia",
    note: "Você será direcionado ao checkout da Kiwify.",
    coverAlt: "Capa do guia AI to Business, edição em português do Brasil, da cub4Studio",
    badge: "PDF · 105 páginas · PT-BR",
  },
  facts: [
    { value: "105", label: "páginas em PDF" },
    { value: "10", label: "trilhas de serviço e produto" },
    { value: "23", label: "prompts numerados" },
    { value: "14 dias", label: "de plano de execução" },
  ],
  tracks: {
    tag: "Aplicações práticas",
    title: "O que você aprende a estruturar",
    desc:
      "Os capítulos C a L seguem a mesma estrutura de 13 itens, do problema do cliente ao exercício: oportunidade, ferramentas por função, passo a passo, oferta e preço, como encontrar compradores e checklist de qualidade.",
    note: "O nível indicado é o que o próprio guia atribui a cada trilha.",
    items: [
      {
        code: "C",
        title: "Sites e landing pages",
        level: "Iniciante",
        text: "Do briefing à publicação, com domínio, formulário e testes no celular. Inclui a demonstração completa de uma landing page para negócio local.",
        highlight: true,
      },
      {
        code: "D",
        title: "Criativos e design comercial",
        level: "Iniciante",
        text: "Processo para produzir pacotes de peças com guia de estilo e direitos de uso claros, e a diferença entre peça bonita e peça com desempenho comprovado.",
        highlight: true,
      },
      {
        code: "E",
        title: "Vídeos, Reels e anúncios",
        level: "Intermediário",
        text: "Fluxo roteiro, storyboard, captação ou geração, edição e entrega, com um roteiro completo de 36 segundos e regras de voz, imagem e depoimento.",
      },
      {
        code: "F",
        title: "Copy, conteúdo e marketing",
        level: "Iniciante",
        text: "Pesquisa, calendário, produção e revisão factual, e como propor um pacote recorrente com métricas.",
      },
      {
        code: "G",
        title: "Automações",
        level: "Intermediário",
        text: "Gatilhos, ações, condições, tratamento de erro e monitoramento em um exemplo de ponta a ponta, com o custo por execução antes de orçar.",
      },
      {
        code: "H",
        title: "Agentes de IA e atendimento",
        level: "Avançado",
        text: "Diferença entre chatbot, workflow e agente; base de conhecimento, permissões, escalonamento e limites de autonomia por escrito.",
      },
      {
        code: "I",
        title: "Skills, prompts e templates",
        level: "Avançado",
        text: "Estrutura de uma skill com instruções, exemplos e critérios de avaliação, e formas de vender implementação, customização ou licença.",
      },
      {
        code: "J",
        title: "Software house com IA",
        level: "Avançado",
        text: "Ciclo de requisitos, protótipo, testes, publicação e suporte, com lista mínima de segurança e quando chamar um especialista.",
      },
      {
        code: "K",
        title: "Micro-SaaS e produtos digitais",
        level: "Avançado",
        text: "Do problema ao MVP, com cobrança, onboarding e cancelamento, e alternativas mais simples como templates, kits e ebooks.",
      },
      {
        code: "L",
        title: "Ecommerce e inteligência de negócios",
        level: "Intermediário",
        text: "Conteúdo de catálogo, criativos de produto e relatórios simples, com os limites das conclusões tiradas de dados.",
      },
    ],
  },
  inside: {
    tag: "Veja por dentro",
    title: "Páginas reais do guia",
    desc: "Toque em uma página para abrir em tela cheia e ampliar.",
    open: "Abrir página",
    prev: "Página anterior",
    next: "Próxima página",
    fictional: "Os exemplos do guia são fictícios ou demonstrativos e vêm sinalizados com a etiqueta FICTÍCIO.",
    items: [
      { file: "sumario", title: "Sumário", caption: "Seis partes: base, serviços criativos e web, automação e agentes, produtos e dados, vender e executar, materiais práticos.", alt: "Página do sumário do guia AI to Business" },
      { file: "trilhas", title: "Trilhas de leitura", caption: "Por onde começar conforme o seu ponto de partida: iniciante, freelancer, perfil técnico, desenvolvedor ou quem vende produtos.", alt: "Página Trilhas de leitura com a tabela de ponto de partida e trilha sugerida" },
      { file: "mapa", title: "Mapa das dez trilhas", caption: "Comparação de dificuldade, investimento inicial, tempo de aprendizado e esforço de venda (estimativas editoriais, de 1 a 5).", alt: "Tabela comparando as dez trilhas do guia" },
      { file: "demo-landing-page", title: "Demonstração nº 1", caption: "Landing page conceitual de uma clínica fictícia, montada a partir do Prompt 03, mostrando o que foi cortado na revisão.", alt: "Página da demonstração de landing page com mockup de clínica fictícia e o Prompt 03" },
      { file: "plano-14-dias", title: "Plano de 14 dias", caption: "Uma ação e um entregável por dia, com revisão no dia 7 e no dia 14.", alt: "Página de abertura do plano de execução de 14 dias" },
      { file: "modelo-oferta", title: "Modelo de oferta", caption: "Modelo de oferta de uma página e de proposta com escopo e limites, prontos para copiar.", alt: "Página com o modelo de oferta de uma página e o modelo de proposta" },
    ],
  },
  receive: {
    tag: "O que você recebe",
    title: "Um guia digital em PDF, organizado para consulta",
    desc: "Edição 1.0 em português do Brasil, publicada em setembro de 2026, com pesquisa e referências do mercado brasileiro e valores em reais.",
    items: [
      { title: "Guia em PDF com 105 páginas", text: "Seis partes e 14 capítulos (A a N), com trilhas de leitura para você não precisar ler tudo na ordem." },
      { title: "3 demonstrações detalhadas", text: "Landing page de negócio local; pacote de criativos com vídeo de 36 segundos; automação de leads com assistente de atendimento." },
      { title: "23 prompts numerados", text: "Com contexto, entradas, restrições e verificação humana. O texto do PDF é selecionável para copiar." },
      { title: "Modelos para copiar", text: "Matriz de escolha da oportunidade, briefing, oferta de uma página e proposta com escopo e limites." },
      { title: "Checklists e calculadora", text: "Checklist de entrega, checklist de revisão de saída da IA e calculadora de custo e margem." },
      { title: "Glossário e referências", text: "Termos como API, token, agente, MVP, CAC e margem, e fontes com data de consulta." },
    ],
    rights: "Uso pessoal do comprador: você pode copiar e adaptar prompts, modelos e checklists no seu trabalho e no de clientes. Não é permitido revender ou redistribuir o PDF.",
    notIncluded: "Não inclui aulas em vídeo, mentoria, software, licenças ou créditos de ferramentas de IA, nem serviço feito para você.",
  },
  audience: {
    tag: "Para quem é",
    title: "Para quem quer sair da ferramenta e chegar a uma oferta",
    desc: "O guia indica uma trilha de leitura para cada ponto de partida.",
    items: [
      { title: "Iniciante sem portfólio", text: "Começa pelos fundamentos e pela trilha de sites ou de criativos." },
      { title: "Freelancer de design, social media ou vídeo", text: "Criativos, vídeos e copy, com oferta, preço e prospecção." },
      { title: "Perfil técnico ou curioso por no-code", text: "Automações e agentes, e depois skills e templates." },
      { title: "Desenvolvedor", text: "Software house com IA e micro-SaaS." },
      { title: "Quem vende produtos ou atende lojas", text: "Ecommerce, inteligência de negócios e criativos de produto." },
      { title: "Quem quer um produto digital próprio", text: "Skills, templates e micro-SaaS." },
    ],
    prereqTitle: "Pré-requisitos",
    prereq: [
      "Não é preciso programar nas trilhas iniciantes (sites, criativos e copy) se você usar um construtor visual. Com gerador de código por IA, é preciso ler e ajustar HTML simples.",
      "As trilhas intermediárias pedem mais ferramentas conectadas, testes e atenção a custos por uso.",
      "Nas trilhas avançadas (agentes, skills, software house e micro-SaaS), colocar em produção pede conhecimento técnico real ou um parceiro especializado.",
    ],
    notForTitle: "Não é para você se",
    notFor: [
      "Você procura renda garantida ou fórmula pronta.",
      "Você quer um curso em vídeo, mentoria ou alguém que faça o trabalho por você.",
    ],
  },
  steps: {
    tag: "Como aplicar",
    title: "Uma sequência simples, do guia para a prática",
    desc: "A ordem recomendada pelo próprio guia: leia os fundamentos, escolha uma trilha e só depois vá para oferta e execução.",
    items: [
      { title: "Escolher uma oportunidade", text: "Compare as dez trilhas e pontue com a matriz de escolha para ficar com uma só.", ref: "Capítulos A e B" },
      { title: "Estudar a trilha escolhida", text: "Ferramentas por função, passo a passo, responsabilidades e checklist de qualidade.", ref: "Capítulos C a L" },
      { title: "Produzir uma demonstração", text: "Um projeto conceitual, identificado como tal, para mostrar o seu trabalho.", ref: "Capítulo N, dias 5 a 7" },
      { title: "Montar a oferta e a prospecção", text: "Preço de teste pela calculadora, oferta de uma página e roteiros de abordagem e follow-up.", ref: "Capítulos M e N" },
    ],
    disclaimer: "Nada disso garante venda ou clientes. O guia ajuda a evitar erros comuns: escopo aberto, preço sem conta, entrega sem revisão e prospecção que parece spam.",
  },
  offer: {
    tag: "Oferta",
    title: "AI to Business — Edição Brasil",
    name: "Guia digital em PDF · português do Brasil",
    includes: [
      "Guia em PDF com 105 páginas (edição 1.0)",
      "10 trilhas de serviço e produto, com 3 demonstrações detalhadas",
      "23 prompts numerados para copiar",
      "Modelos de briefing, oferta e proposta",
      "Checklists de entrega e de revisão da IA",
      "Calculadora de custo e margem e plano de 14 dias",
    ],
    priceCaption: "Preço do guia",
    cta: "Quero acessar o guia",
    note: "Pagamento processado pela Kiwify. As condições de compra e reembolso aparecem no checkout antes do pagamento.",
    taxes: "",
  },
  faq: {
    tag: "Perguntas frequentes",
    title: "Antes de comprar",
    items: [
      { q: "O material está em qual idioma?", a: "Em português do Brasil. Existe uma edição separada em inglês americano, vendida pela Hotmart, com pesquisa e exemplos do mercado dos Estados Unidos." },
      { q: "Qual é o formato?", a: "Um guia digital em PDF com 105 páginas. Não é curso em vídeo, software, mentoria nem serviço feito para você." },
      { q: "Preciso saber programar?", a: "Não para as trilhas iniciantes (sites com construtor visual, criativos e copy). Se usar gerador de código por IA, ajuda saber ler HTML simples. As trilhas avançadas pedem conhecimento técnico real para colocar algo em produção, e o guia sinaliza onde está essa linha." },
      { q: "Preciso pagar pelas ferramentas de IA?", a: "O preço do guia não inclui licenças, assinaturas nem créditos de ferramentas. O guia cita ferramentas como exemplos por função, com rotas econômicas e completas, e mostra como incluir assinaturas e créditos no custo. Alguns planos gratuitos não permitem uso comercial: confira os termos de cada ferramenta." },
      { q: "Como recebo o acesso?", a: "A compra é feita no checkout da Kiwify. Depois da confirmação do pagamento, o acesso ao PDF é liberado pela Kiwify, usando o e-mail informado na compra." },
      { q: "Inclui suporte ou atualizações?", a: "A oferta é o guia na edição 1.0. Não inclui mentoria nem atendimento individual, e não há promessa de atualizações. Dúvidas sobre compra ou acesso podem ser enviadas para o e-mail de contato abaixo." },
      { q: "Há garantia?", a: "As condições de garantia e reembolso são as exibidas no checkout da Kiwify. Compras online também estão sujeitas ao direito de arrependimento de 7 dias previsto no art. 49 do Código de Defesa do Consumidor." },
      { q: "Isso garante renda?", a: "Não. O guia não promete renda, clientes nem prazo para lucrar. Os preços citados são hipóteses para testar no seu mercado, e os exemplos são fictícios e sinalizados." },
    ],
  },
  closing: {
    title: "Da ferramenta para a oferta",
    text: "Escolha uma trilha, produza uma demonstração e apresente um serviço com escopo, prazo e preço que você consegue explicar.",
    cta: "Quero acessar o guia",
  },
  footer: {
    developed: "Desenvolvido pela cub4Studio",
    support: "Dúvidas sobre compra ou acesso",
    legal: "A compra é processada pela Kiwify, conforme os termos e a política de privacidade da plataforma.",
    links: [
      { label: "Termos de uso da Kiwify", href: "https://kiwify.com.br/termos-de-uso/" },
      { label: "Privacidade da Kiwify", href: "https://kiwify.com.br/politica-de-privacidade/" },
    ],
    rights: "cub4Studio. Todos os direitos reservados.",
  },
  sticky: "Acessar o guia",
  lightbox: {
    dialog: "Páginas do guia em tela cheia",
    close: "Fechar",
    prev: "Página anterior",
    next: "Próxima página",
    hint: "Arraste para o lado para ver mais",
    dots: "Páginas do guia",
    slide: (current, total) => `Página ${current} de ${total}`,
    goTo: (index) => `Ir para a página ${index}`,
    zoomIn: "Ampliar",
    zoomOut: "Reduzir",
  },
};

export const en: SalesContent = {
  locale: "en",
  htmlLang: "en-US",
  pageUrl: PAGE_URL_EN,
  alternateUrl: "/pt-br/ai-to-business/",
  alternateLabel: "PT-BR",
  checkoutUrl: CHECKOUT_EN_URL,
  trackingParams: TRACKING_PARAMS_EN,
  platform: "Hotmart",
  price: PRODUCT_PRICE_EN,
  currency: PRODUCT_CURRENCY_EN,
  priceLabel: priceEn ? `${priceEn} ${PRODUCT_CURRENCY_EN}` : "",
  guarantee: GUARANTEE_TERMS_EN,
  pixelId: META_PIXEL_ID_EN,
  assets: "/ai-to-business/en",
  cover: "cover",
  switcherLabel: "Language",
  skipLink: "Skip to content",
  unavailable: "Checkout for this edition isn't available yet.",
  hero: {
    eyebrow: "Practical PDF guide · Edition 1.0",
    title: "Want to turn AI skills into services you can offer clients?",
    lead:
      "AI to Business is a PDF guide that shows you how to turn what you can already make with AI, like websites, creative assets, videos, and automations, into a clearly scoped service with a test price and a demo you can show.",
    bullets: [
      "Pick one of 10 service or product tracks using a simple scoring method.",
      "Build a one-page offer: deliverables, timeline, revisions, exclusions, and price.",
      "Create a concept demo and plan your outreach with a 14-day execution plan.",
    ],
    cta: "Get the guide",
    note: "You'll complete your purchase on Hotmart.",
    coverAlt: "Cover of the AI to Business guide, American English edition, by cub4Studio",
    badge: "PDF · 104 pages · EN-US",
  },
  facts: [
    { value: "104", label: "PDF pages" },
    { value: "10", label: "service and product tracks" },
    { value: "23", label: "numbered prompts" },
    { value: "14 days", label: "execution plan" },
  ],
  tracks: {
    tag: "What it covers",
    title: "What you'll learn to put together",
    desc:
      "Chapters C through L share the same 13-part structure, from the client's problem to a hands-on exercise: the opportunity, tools by function, step-by-step process, offer and pricing, finding buyers, and a quality checklist.",
    note: "Levels are the ones the guide itself assigns to each track.",
    items: [
      {
        code: "C",
        title: "Websites and landing pages",
        level: "Beginner",
        text: "The workflow from brief to launch, including domain, forms, and mobile testing, plus a full demo of a landing page for a local business.",
        highlight: true,
      },
      {
        code: "D",
        title: "Creative assets and design",
        level: "Beginner",
        text: "A production process for creative packages with a style guide and clear usage rights, and the difference between a good-looking asset and a proven one.",
        highlight: true,
      },
      {
        code: "E",
        title: "Video, Reels, and short-form ads",
        level: "Intermediate",
        text: "Script, storyboard, capture or generation, edit, and delivery, with a complete 36-second script and rules for voice, likeness, and testimonials.",
      },
      {
        code: "F",
        title: "Copy, content, and marketing ops",
        level: "Beginner",
        text: "Research, calendar, production, and fact-checking, and how to pitch a recurring package with metrics.",
      },
      {
        code: "G",
        title: "Automations",
        level: "Intermediate",
        text: "Triggers, actions, conditions, error handling, and monitoring in one end-to-end example, plus how to calculate cost per run before you quote.",
      },
      {
        code: "H",
        title: "AI agents and customer support",
        level: "Advanced",
        text: "Chatbot vs. workflow vs. agent; knowledge base, permissions, handoff, and written autonomy limits.",
      },
      {
        code: "I",
        title: "Skills, prompts, and templates",
        level: "Advanced",
        text: "The structure of a skill with instructions, examples, and evaluation criteria, and ways to sell implementation, customization, or licensing.",
      },
      {
        code: "J",
        title: "AI-assisted dev shop",
        level: "Advanced",
        text: "Requirements, prototype, testing, launch, and support, with a minimum security list and when to bring in a specialist.",
      },
      {
        code: "K",
        title: "Micro-SaaS and digital products",
        level: "Advanced",
        text: "From problem to MVP, including billing, onboarding, and cancellation, plus simpler options like templates, kits, and ebooks.",
      },
      {
        code: "L",
        title: "Ecommerce and business intelligence",
        level: "Intermediate",
        text: "Catalog content, product creative, and simple reports, with the limits of data-driven conclusions.",
      },
    ],
  },
  inside: {
    tag: "Look inside",
    title: "Real pages from the guide",
    desc: "Tap a page to open it full screen and zoom in.",
    open: "Open page",
    prev: "Previous page",
    next: "Next page",
    fictional: "Examples in the guide are fictional or for demonstration only, and are labeled FICTIONAL.",
    items: [
      { file: "contents", title: "Contents", caption: "Six parts: foundations, creative and web services, automation and agents, products and data, sell and execute, practical materials.", alt: "Table of contents page from the AI to Business guide" },
      { file: "reading-tracks", title: "Reading tracks", caption: "Where to start based on your background: beginner, freelancer, technical, developer, or selling products.", alt: "Reading tracks page with the starting point and suggested track table" },
      { file: "opportunity-map", title: "The opportunity map", caption: "Difficulty, upfront cost, learning time, and sales effort for all ten tracks (editorial estimates, 1 to 5).", alt: "Table comparing the guide's ten tracks" },
      { file: "landing-page-demo", title: "Detailed demo #1", caption: "A concept landing page for a fictional clinic, drafted from Prompt 03, showing what was cut in review.", alt: "Landing page demo page with a fictional clinic mockup and Prompt 03" },
      { file: "14-day-plan", title: "14-day plan", caption: "One action and one deliverable per day, with a review on day 7 and day 14.", alt: "Opening page of the 14-day execution plan" },
      { file: "offer-template", title: "Offer template", caption: "One-page offer template and proposal template with scope and limits, ready to copy.", alt: "Page with the one-page offer template and the proposal template" },
    ],
  },
  receive: {
    tag: "What you get",
    title: "A digital PDF guide, organized for quick reference",
    desc: "Edition 1.0 in American English, published September 2026, with U.S. market research and examples in U.S. dollars.",
    items: [
      { title: "104-page PDF guide", text: "Six parts and 14 chapters (A through N), with reading tracks so you don't have to read it cover to cover." },
      { title: "3 detailed demos", text: "A local business landing page; a creative package with a 36-second video; a lead automation with a support assistant." },
      { title: "23 numbered prompts", text: "Each with context, inputs, constraints, and a human check. The PDF text is selectable, so you can copy it." },
      { title: "Copy-ready templates", text: "Opportunity choice matrix, client brief, one-page offer, and a proposal with scope and limits." },
      { title: "Checklists and calculator", text: "Delivery checklist, AI output review checklist, and a cost and margin calculator." },
      { title: "Glossary and references", text: "Terms like API, token, agent, MVP, CAC, and margin, plus dated sources." },
    ],
    rights: "For the buyer's personal use: you may copy and adapt the prompts, templates, and checklists for your own work and your clients' work. You may not resell or redistribute the PDF.",
    notIncluded: "Not included: video lessons, coaching, software, AI tool licenses or credits, or done-for-you services.",
  },
  audience: {
    tag: "Who it's for",
    title: "For people ready to go from tool to offer",
    desc: "The guide suggests a reading track for each starting point.",
    items: [
      { title: "Beginners with no portfolio", text: "Start with the foundations and the websites or creative track." },
      { title: "Designers, social media managers, and video editors", text: "Creative, video, and copy tracks, then offer, pricing, and outreach." },
      { title: "Technical folks and no-code fans", text: "Automations and agents, then skills and templates." },
      { title: "Developers", text: "The AI-assisted dev shop and micro-SaaS tracks." },
      { title: "People who sell products or serve online stores", text: "Ecommerce, business intelligence, and product creative." },
      { title: "People building their own digital product", text: "Skills, templates, and micro-SaaS." },
    ],
    prereqTitle: "Prerequisites",
    prereq: [
      "No coding needed for the beginner tracks (websites, creative, and copy) if you use a visual builder. With an AI code generator, you'll need to read and tweak basic HTML.",
      "Intermediate tracks involve more connected tools, more testing, and attention to usage-based costs.",
      "For the advanced tracks (agents, skills, dev shop, and micro-SaaS), running in production takes real technical knowledge or a specialist partner.",
    ],
    notForTitle: "It's not for you if",
    notFor: [
      "You're looking for guaranteed income or a push-button formula.",
      "You want a video course, coaching, or someone to do the work for you.",
    ],
  },
  steps: {
    tag: "How to use it",
    title: "A simple path from reading to doing",
    desc: "The order the guide recommends: read the foundations, pick one track, and only then move on to the offer and execution.",
    items: [
      { title: "Pick one opportunity", text: "Compare the ten tracks and score them with the choice matrix so you commit to one.", ref: "Chapters A and B" },
      { title: "Study your track", text: "Tools by function, step-by-step process, responsibilities, and a quality checklist.", ref: "Chapters C–L" },
      { title: "Build a concept demo", text: "A project clearly labeled as a concept, so you can show your work honestly.", ref: "Chapter N, days 5–7" },
      { title: "Package the offer and start outreach", text: "A test price from the calculator, a one-page offer, and first-contact and follow-up scripts.", ref: "Chapters M and N" },
    ],
    disclaimer: "None of this guarantees a sale or clients. The guide helps you avoid common mistakes: open-ended scope, prices without math, delivery without review, and outreach that reads like spam.",
  },
  offer: {
    tag: "The offer",
    title: "AI to Business",
    name: "Digital PDF guide · American English",
    includes: [
      "104-page PDF guide (edition 1.0)",
      "10 service and product tracks, with 3 detailed demos",
      "23 numbered, copy-ready prompts",
      "Brief, offer, and proposal templates",
      "Delivery and AI output review checklists",
      "Cost and margin calculator and 14-day plan",
    ],
    priceCaption: "Guide price",
    cta: "Get the guide",
    note: "Payment is processed by Hotmart. The final amount is shown at checkout before you pay.",
    taxes: "+ applicable taxes",
  },
  faq: {
    tag: "FAQ",
    title: "Before you buy",
    items: [
      { q: "What language is it in?", a: "American English. There's a separate Brazilian Portuguese edition, sold through Kiwify, with research and examples from the Brazilian market." },
      { q: "What format is it?", a: "A 104-page digital PDF guide. It isn't a video course, software, coaching, or a done-for-you service." },
      { q: "Do I need to know how to code?", a: "Not for the beginner tracks (websites with a visual builder, creative, and copy). If you use an AI code generator, it helps to read basic HTML. The advanced tracks take real technical knowledge to run anything in production, and the guide flags where that line is." },
      { q: "Do I have to pay for AI tools?", a: "The guide price doesn't include any tool licenses, subscriptions, or credits. The guide mentions tools as examples by function, with budget and full-featured options, and shows how to factor subscriptions and credits into your costs. Some free plans don't allow commercial use, so check each tool's terms." },
      { q: "How do I get access?", a: "You buy through Hotmart's checkout. Once your payment is approved, Hotmart delivers access to the PDF using the email you enter at checkout." },
      { q: "Does it include support or updates?", a: "The offer is the guide, edition 1.0. It doesn't include coaching or one-on-one support, and no updates are promised. For purchase or access questions, use the contact email below." },
      { q: "Is there a guarantee?", a: GUARANTEE_TERMS_EN || "Guarantee and refund terms are the ones shown at Hotmart checkout." },
      { q: "Will this guarantee income?", a: "No. The guide doesn't promise income, clients, or a timeline to profit. Prices in the guide are hypotheses to test in your market, and every example is fictional and labeled." },
    ],
  },
  closing: {
    title: "From tool to offer",
    text: "Pick one track, build a concept demo, and pitch a service with a scope, timeline, and price you can explain.",
    cta: "Get the guide",
  },
  footer: {
    developed: "Developed by cub4Studio",
    support: "Questions about your purchase or access",
    legal: "Purchases are processed by Hotmart under its terms of use and privacy policy.",
    links: [
      { label: "Hotmart terms of use", href: "https://hotmart.com/en/legal/terms-of-use" },
      { label: "Hotmart privacy policy", href: "https://hotmart.com/en/legal/data-privacy-policy" },
    ],
    rights: "cub4Studio. All rights reserved.",
  },
  sticky: "Get the guide",
  lightbox: {
    dialog: "Guide pages, full screen",
    close: "Close",
    prev: "Previous page",
    next: "Next page",
    hint: "Swipe to see more",
    dots: "Guide pages",
    slide: (current, total) => `Page ${current} of ${total}`,
    goTo: (index) => `Go to page ${index}`,
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
  },
};

export const contentByLocale: Record<Locale, SalesContent> = { "pt-br": ptBr, en };
