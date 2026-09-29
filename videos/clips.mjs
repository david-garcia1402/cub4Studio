// Roteiros de gravação dos sites reais. Cada caption/zoom fica amarrado ao frame em que é chamado.
// Marcação das legendas: *vermelho*, [caixa vermelha], | quebra de linha.

const closeLightbox = async (a) => {
  await a.tap('[aria-label^="Fechar"]', { lead: 0.15 });
  await a.wait(0.35);
};

export const clips = {
  lash: {
    url: "https://gabilazzbeauty.com/",
    domain: "gabilazzbeauty.com",
    steps: async (a) => {
      a.caption("Site *profissional*|feito com *IA*.");
      await a.wait(1.9);
      a.caption("Menu pensado|pro *celular*.");
      await a.tap('button[aria-label="Abrir menu"]');
      await a.wait(1.5);
      await a.tap('button[aria-label="Fechar menu"]');
      await a.wait(0.3);
      a.caption("Apresenta a|*profissional*.");
      await a.scroll("#sobre", 1.2, { offset: 40 });
      await a.wait(0.7);
      a.caption("Catálogo com|*fotos reais*.");
      await a.scroll("#catalogo", 1.2, { offset: 330 });
      await a.tap('button[aria-label="Próximo modelo"]');
      await a.wait(0.7);
      a.caption("Toque e vê|*de perto*.");
      await a.tap('button[aria-label="Ampliar foto de Efeito Fox Eyes"]');
      await a.wait(1.5);
      await closeLightbox(a);
      a.caption("Cliente agenda|no *WhatsApp*.");
      await a.tap("text=Agendar este modelo", { lead: 0.3 });
      await a.wait(1.1);
    },
  },

  pipoca: {
    url: "https://pipocrunch.com/",
    domain: "pipocrunch.com",
    steps: async (a) => {
      a.caption("Loja de pipoca|*vendendo online*.");
      await a.wait(1.3);
      a.caption("Cardápio|*completo*.");
      await a.scroll("#cardapio", 1.3, { offset: 120 });
      await a.wait(0.6);
      a.caption("O cliente *monta*|o pedido...");
      await a.scroll("#pedido", 1.3, { offset: 150 });
      await a.tap("text=Recheadas", { lead: 0.35 });
      await a.wait(0.35);
      await a.tap("text=Pistache", { lead: 0.35 });
      await a.wait(0.35);
      await a.tap("text=220 g", { lead: 0.35 });
      await a.wait(0.6);
      a.caption("...e envia pronto|no *WhatsApp*.");
      await a.scroll("text=Enviar no WhatsApp", 1.1, { offset: -520 });
      await a.tap("text=Enviar no WhatsApp", { lead: 0.35 });
      await a.wait(1.0);
    },
  },

  industria: {
    url: "https://grupofvt.com/",
    domain: "grupofvt.com",
    steps: async (a) => {
      a.caption("Site de *indústria*|com catálogo.");
      await a.wait(1.0);
      await a.scroll(1713, 1.3);
      await a.wait(0.3);
      await a.scroll(6236, 1.4, { offset: 0 });
      await a.wait(0.6);
    },
  },

  lashRapido: {
    url: "https://gabilazzbeauty.com/",
    domain: "gabilazzbeauty.com",
    steps: async (a) => {
      a.caption("Site de *beleza*|com agendamento.");
      await a.wait(0.9);
      await a.scroll("#catalogo", 1.3, { offset: 330 });
      await a.tap('button[aria-label="Próximo modelo"]', { lead: 0.2 });
      await a.wait(0.8);
    },
  },

  pipocaRapido: {
    url: "https://pipocrunch.com/",
    domain: "pipocrunch.com",
    steps: async (a) => {
      a.caption("Site de *comida*|com pedido online.");
      await a.wait(0.8);
      await a.scroll("#pedido", 1.5, { offset: 150 });
      await a.tap("text=Recheadas", { lead: 0.3 });
      await a.tap("text=Pistache", { lead: 0.3 });
      await a.wait(0.6);
    },
  },

  guia: {
    url: "https://cub4studio.com/pt-br/ai-to-business/",
    domain: "cub4studio.com",
    steps: async (a) => {
      a.caption("Guia *AI to Business*|em PDF.");
      await a.wait(1.2);
      a.caption("*10 trilhas* de|serviços com IA.");
      await a.scroll(1480, 1.2);
      await a.wait(0.5);
      a.caption("Páginas *reais*|do guia.");
      await a.scroll(3780, 1.0);
      await a.hswipe(".sp-inside__track", 624, 0.7);
      await a.wait(0.2);
      a.caption("Plano de *14 dias*|pra começar.");
      await a.tap('button[aria-label="Abrir página: Plano de 14 dias"]');
      await a.wait(2.0);
      await closeLightbox(a);
      a.caption("Tudo por|[R$ 18,99]");
      await a.scroll(9150, 1.3);
      await a.wait(1.3);
    },
  },

  guiaCurto: {
    url: "https://cub4studio.com/pt-br/ai-to-business/",
    domain: "cub4studio.com",
    steps: async (a) => {
      a.caption("O passo a passo|está no *guia*.");
      await a.wait(1.0);
      await a.scroll(3780, 1.5);
      await a.hswipe(".sp-inside__track", 936, 0.9);
      a.caption("Do zero à|*primeira oferta*.");
      await a.tap('button[aria-label="Abrir página: Modelo de oferta"]');
      await a.wait(1.9);
      await closeLightbox(a);
      a.caption("Tudo por|[R$ 18,99]");
      await a.scroll(9150, 1.2);
      await a.wait(1.1);
    },
  },

  guiaCompleto: {
    url: "https://cub4studio.com/pt-br/ai-to-business/",
    domain: "cub4studio.com",
    steps: async (a) => {
      a.caption("Esse é o guia|*AI to Business*.");
      await a.wait(0.8);
      a.caption("*105 páginas*|direto ao ponto.");
      await a.tap("button.sp-peek__cover");
      await a.wait(1.3);
      await closeLightbox(a);
      a.caption("Escolha entre|*10 trilhas*.");
      await a.scroll(1100, 1.2);
      await a.scroll(2100, 1.6);
      a.caption("*23 prompts*|prontos pra usar.");
      await a.scroll(4700, 1.4);
      await a.wait(0.7);
      a.caption("Veja as páginas|*por dentro*.");
      await a.scroll(3780, 1.0);
      await a.tap('button[aria-label="Abrir página: Sumário"]');
      await a.wait(1.1);
      await a.tap('[aria-label^="Próxima"]', { lead: 0.2 });
      await a.wait(0.9);
      await a.tap('[aria-label^="Próxima"]', { lead: 0.2 });
      await a.wait(0.9);
      await closeLightbox(a);
      a.caption("Tudo por|[R$ 18,99]");
      await a.scroll(9150, 1.2);
      await a.wait(1.1);
    },
  },
};
