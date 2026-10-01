// Versões do anúncio. Cena "hook": texto de gancho; "phone": gravação de um clipe de clips.mjs;
// "cta": fechamento. Marcação: *vermelho*, [caixa vermelha], | quebra de linha.

const saibaMais = {
  type: "cta",
  dur: 3.8,
  title: "Quer aprender|*do zero*?",
  line: 'Toque em <span class="pill">Saiba mais</span>',
  price: "Guia completo por <b>R$ 18,99</b>",
  url: "cub4studio.com/pt-br/ai-to-business",
};

export const projects = {
  "v1-dinheiro-ia-lash": {
    title: "Gancho dinheiro com IA + site de lash designer + guia",
    timeline: [
      { type: "hook", dur: 2.3, text: "Quer aprender a|*ganhar dinheiro*|com IA?", emoji: "💸", bg: "lash" },
      { type: "hook", dur: 1.4, text: "Olha o que dá|pra fazer com *IA*", emoji: "👇", bg: "lash", bgFrom: 40 },
      { type: "phone", clip: "lash", tag: "SITE REAL NO AR", domain: "gabilazzbeauty.com" },
      { type: "hook", dur: 2.1, text: "Negócios *pagam*|por sites assim.", sub: "E você pode aprender a fazer.", bg: "guia" },
      { type: "phone", clip: "guia", tag: "O GUIA", domain: "cub4studio.com" },
      saibaMais,
    ],
  },

  "v2-ia-so-pra-conversar": {
    title: "Gancho 'usa IA só pra conversar?' + montador de pedido + guia",
    timeline: [
      { type: "hook", dur: 1.9, text: "Você usa IA|só pra *conversar*?", emoji: "🤔", bg: "pipoca" },
      { type: "hook", dur: 1.8, text: "Dá pra *ganhar dinheiro*|com ela.", emoji: "💰", bg: "pipoca", bgFrom: 30 },
      { type: "phone", clip: "pipoca", tag: "SITE REAL NO AR", domain: "pipocrunch.com" },
      { type: "hook", dur: 1.9, text: "Todo negócio|precisa de *um site*.", sub: "Quem sabe fazer com IA, sai na frente.", bg: "guiaCurto" },
      { type: "phone", clip: "guiaCurto", tag: "O GUIA", domain: "cub4studio.com" },
      saibaMais,
    ],
  },

  "v3-dinheiro-ia-do-zero": {
    title: "Gancho 'dinheiro com IA do zero' + montagem de 3 sites + CTA Enviar mensagem",
    timeline: [
      { type: "hook", dur: 2.4, text: "Quer ganhar|*dinheiro com IA*|começando do zero?", emoji: "🚀", bg: "industria" },
      { type: "hook", dur: 1.3, text: "Sites assim|são feitos *com IA*", emoji: "👇", bg: "industria", bgFrom: 30 },
      { type: "phone", clip: "industria", tag: "SITE REAL NO AR", domain: "grupofvt.com" },
      { type: "phone", clip: "lashRapido", tag: "SITE REAL NO AR", domain: "gabilazzbeauty.com" },
      { type: "phone", clip: "pipocaRapido", tag: "SITE REAL NO AR", domain: "pipocrunch.com" },
      { type: "hook", dur: 1.7, text: "E você aprende|*o passo a passo*.", emoji: "📘", bg: "guiaCurto" },
      { type: "phone", clip: "guiaCurto", tag: "O GUIA", domain: "cub4studio.com" },
      {
        type: "cta",
        dur: 3.8,
        title: "Fale com a|*Cub4Studio*.",
        line: 'Toque em <span class="pill">Enviar mensagem</span><br/>e peça o guia.',
        price: "AI to Business por <b>R$ 18,99</b>",
        url: "@cub4studio",
      },
    ],
  },

  "v4-guia-por-dentro": {
    title: "Gancho dinheiro com IA + tour pelo guia + prova com site real",
    timeline: [
      { type: "hook", dur: 2.2, text: "Quer aprender a|*ganhar dinheiro*|com IA?", emoji: "💸", bg: "guiaCompleto" },
      { type: "hook", dur: 1.3, text: "Te mostro|*por dentro*", emoji: "👇", bg: "guiaCompleto", bgFrom: 40 },
      { type: "phone", clip: "guiaCompleto", tag: "O GUIA", domain: "cub4studio.com" },
      { type: "hook", dur: 1.5, text: "Pra criar sites|*como este*:", emoji: "👇", bg: "lashRapido" },
      { type: "phone", clip: "lashRapido", tag: "SITE REAL NO AR", domain: "gabilazzbeauty.com" },
      saibaMais,
    ],
  },
};
