// cub4Studio — interações básicas do site

const SITE = {
  email: 'cub4studio@gmail.com',
  whatsapp: '5547999940399',
  whatsappDisplay: '(47) 99994-0399',
  ga4: '',
  metaPixel: ''
};

document.addEventListener('DOMContentLoaded', () => {
  // Ano dinâmico no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header com sombra ao rolar
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,0.35)' : 'none';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animação de entrada (reveal) via IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  initAnalytics();
  initWhatsappLinks();
  initContactForm();
  initMarquee();
  const projectModal = initProjectModal();
  initPortfolioCarousel(projectModal);
});

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

function whatsappMessage(service) {
  const chosen = (service || '').trim();
  if (chosen) return `Oi, vi o site do cub4Studio e quero orçamento de ${chosen}.`;
  return 'Oi, vi o site do cub4Studio e quero um orçamento.';
}

function whatsappHref(service) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappMessage(service))}`;
}

function selectedService() {
  return String(document.getElementById('servico')?.value || '').trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function trackLead(source, service) {
  const payload = { source, service: service || '' };
  if (typeof window.va === 'function') {
    window.va('event', { name: 'generate_lead', data: payload });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { method: source, service: payload.service });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: payload.service || 'orçamento', source });
  }
}

function initAnalytics() {
  if (SITE.ga4) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', SITE.ga4);
  }

  if (SITE.metaPixel) {
    const fbq = window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    window.fbq('init', SITE.metaPixel);
    window.fbq('track', 'PageView');
  }
}

function serviceFromTrigger(el) {
  if (el.hasAttribute('data-whatsapp-generic')) return '';
  return el.getAttribute('data-whatsapp') || selectedService();
}

function initWhatsappLinks() {
  const refresh = () => {
    document.querySelectorAll('[data-whatsapp]').forEach((el) => {
      el.href = whatsappHref(serviceFromTrigger(el));
    });
  };

  document.getElementById('servico')?.addEventListener('change', refresh);
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-whatsapp]');
    if (!el) return;
    trackLead('whatsapp', serviceFromTrigger(el));
  });
  refresh();
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const submitBtn = document.getElementById('contactSubmit');
  const nextInput = document.getElementById('formNext');
  if (!form || !submitBtn) return;

  const idleLabel = submitBtn.textContent;
  const returnUrl = `${window.location.origin}${window.location.pathname}?orcamento=enviado#contato`;
  if (nextInput) nextInput.value = returnUrl;

  const setNote = (message, tone) => {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.classList.remove('form-note--success', 'form-note--error');
    if (tone) formNote.classList.add(`form-note--${tone}`);
  };

  const setBusy = (busy) => {
    submitBtn.disabled = busy;
    submitBtn.textContent = busy ? 'Enviando orçamento...' : idleLabel;
  };

  const params = new URLSearchParams(window.location.search);
  if (params.get('orcamento') === 'enviado') {
    setNote('Orçamento enviado! Vamos responder em breve no e-mail informado.', 'success');
    const cleanUrl = `${window.location.pathname}#contato`;
    window.history.replaceState({}, '', cleanUrl);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;

    const data = new FormData(form);
    const nome = String(data.get('Nome') || '').trim();
    const email = String(data.get('email') || '').trim();
    const servico = String(data.get('Serviço') || '').trim();
    const projeto = String(data.get('Projeto') || '').trim();

    if (!nome || !email || !projeto) {
      setNote('Preencha nome, e-mail e a descrição do projeto para solicitar o orçamento.', 'error');
      return;
    }

    setBusy(true);
    setNote('');

    const payload = {
      Nome: nome,
      email,
      Serviço: servico,
      Projeto: projeto,
      Origem: window.location.href,
      _subject: `Novo orçamento cub4Studio — ${servico || 'Contato'}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
      _autoresponse: `Olá, ${nome}! Recebemos seu pedido de orçamento no cub4Studio e retornamos em breve.`
    };

    const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(`Orçamento cub4Studio — ${servico || 'Contato'}`)}&body=${encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nServiço: ${servico}\n\n${projeto}`)}`;
    const showSendError = () => {
      if (!formNote) return;
      formNote.classList.remove('form-note--success');
      formNote.classList.add('form-note--error');
      formNote.innerHTML = `Não foi possível enviar agora. <a href="${whatsappHref(servico)}" data-whatsapp="${escapeHtml(servico)}" target="_blank" rel="noopener">Falar no WhatsApp</a> ou <a href="${mailtoHref}">abrir e-mail</a>.`;
    };

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 12000);
      const body = new FormData();
      Object.entries(payload).forEach(([key, value]) => body.append(key, value));

      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
        signal: controller.signal
      });
      window.clearTimeout(timeoutId);

      const result = await response.json().catch(() => null);
      const success = Boolean(result && (result.success === true || result.success === 'true'));
      const message = result && typeof result.message === 'string' ? result.message : '';
      const needsActivation = /activat|confirm (your )?e-?mail|check your e-?mail|ativar/i.test(message);

      if (success) {
        form.reset();
        trackLead('form', servico);
        formNote.classList.remove('form-note--error');
        formNote.classList.add('form-note--success');
        formNote.innerHTML = `Obrigado, ${escapeHtml(nome)}! Seu orçamento chegou no estúdio. Quer agilizar? <a href="${whatsappHref(servico)}" data-whatsapp="${escapeHtml(servico)}" target="_blank" rel="noopener">Continuar no WhatsApp</a>.`;
        setBusy(false);
        return;
      }

      if (needsActivation) {
        trackLead('form', servico);
        formNote.classList.remove('form-note--error');
        formNote.classList.add('form-note--success');
        formNote.innerHTML = `Pedido registrado. Confirme o e-mail de ativação enviado para ${SITE.email} (só uma vez). Enquanto isso, <a href="${whatsappHref(servico)}" data-whatsapp="${escapeHtml(servico)}" target="_blank" rel="noopener">fale no WhatsApp</a>.`;
        setBusy(false);
        return;
      }

      showSendError();
      setBusy(false);
    } catch (error) {
      showSendError();
      setBusy(false);
    }
  });
}

function initMarquee() {
  const marquee = document.querySelector('.marquee');
  const track = marquee?.querySelector('.marquee-track');
  const source = track?.querySelector('.marquee-group');
  if (!marquee || !track || !source) return;

  const fill = () => {
    track.querySelectorAll('.marquee-group[data-clone]').forEach((el) => el.remove());

    const groupWidth = source.offsetWidth;
    if (!groupWidth) return;

    const copies = Math.max(2, Math.ceil(marquee.offsetWidth / groupWidth) + 1);
    const existing = track.querySelectorAll('.marquee-group').length;
    for (let i = existing; i < copies; i++) {
      const clone = source.cloneNode(true);
      clone.setAttribute('data-clone', '');
      track.appendChild(clone);
    }

    track.style.setProperty('--marquee-distance', `${groupWidth}px`);
  };

  fill();
  window.addEventListener('resize', fill);
}

const PORTFOLIO_PROJECTS = {
  grupofvt: {
    title: 'Grupo FVT — Flow & Triton',
    tag: 'Site & Catálogo',
    client: 'Grupo FVT · Itapema-SC',
    lead: 'Site institucional e catálogo de duas marcas de equipamentos para perfuração, publicado em grupofvt.com.',
    description: 'Um só site para o grupo e suas duas marcas: Flow (martelos, bits, hastes, brocas e bombas) e Triton (perfuratrizes e compressores). Hero dividido por marca, catálogo com filtros e busca, vídeos do equipamento em operação, avaliações do Google e orçamento pré-preenchido no WhatsApp — responsivo e otimizado para SEO local.',
    deliverables: ['Site institucional', 'Catálogo com filtros', 'Vídeos & Google Reviews', 'WhatsApp integrado'],
    tools: 'React + Vite, Tailwind CSS, React Router e Cloudflare',
    url: 'https://grupofvt.com',
    urlLabel: 'Visitar grupofvt.com',
    images: [
      { src: 'assets/portfolio/grupofvt-home.jpg', alt: 'Home do grupofvt.com — painéis Flow e Triton com o emblema do Grupo FVT' },
      { src: 'assets/portfolio/grupofvt-catalogo-flow.jpg', alt: 'Catálogo Flow com filtros por categoria e busca' },
      { src: 'assets/portfolio/grupofvt-catalogo-triton.jpg', alt: 'Catálogo Triton — perfuratrizes e compressores' },
      { src: 'assets/portfolio/grupofvt-marcas.jpg', alt: 'Seção "Sobre o grupo" com as duas marcas e produtos em destaque' },
      { src: 'assets/portfolio/grupofvt-institucional.jpg', alt: 'Página institucional do Grupo FVT com o cofundador Claudio Patricio' },
      { src: 'assets/portfolio/grupofvt-setores.jpg', alt: 'Setores atendidos e vídeo institucional da Flow' },
      { src: 'assets/portfolio/grupofvt-mobile.jpg', alt: 'Versão mobile da home do grupofvt.com' }
    ]
  },
  pipocrunch: {
    title: 'PipoCrunch',
    tag: 'Landing Page',
    client: 'PipoCrunch · Jaraguá do Sul-SC',
    lead: 'Landing page para uma marca de pipocas gourmet — do cardápio ao pedido pronto no WhatsApp.',
    description: 'Identidade quente (bordô, dourado e creme) com tipografia editorial, cardápio por linha (gourmet, recheadas e petiscos), sabores da casa e uma seção de eventos. O destaque é o montador de pedido: o cliente escolhe linha, sabor e tamanho, vê o total e envia tudo formatado direto no WhatsApp da marca.',
    deliverables: ['Landing page', 'Cardápio & sabores', 'Montador de pedido', 'Integração com WhatsApp'],
    tools: 'Next.js, Tailwind CSS e Cloudflare Workers',
    images: [
      { src: 'assets/portfolio/pipocrunch-home.jpg', alt: 'Hero do site PipoCrunch com logo e chamada "Sinta o CRUNCH de verdade"' },
      { src: 'assets/portfolio/pipocrunch-cardapio.jpg', alt: 'Cardápio PipoCrunch — pipocas gourmet, recheadas e petiscos' },
      { src: 'assets/portfolio/pipocrunch-sabores.jpg', alt: 'Seção de sabores da casa' },
      { src: 'assets/portfolio/pipocrunch-pedido.jpg', alt: 'Montador de pedido com resumo e envio no WhatsApp' },
      { src: 'assets/portfolio/pipocrunch-mobile.jpg', alt: 'Versão mobile do site PipoCrunch' }
    ]
  },
  econoradar: {
    title: 'EconoRadar',
    tag: 'Criativos com IA',
    lead: 'Campanha de lançamento para um app de inteligência financeira.',
    description: 'Direção de arte em dark mode, mockups de produto e peças para redes. A ideia era transformar ruído de mercado em um radar único: indicadores, notícias e ativos com clareza visual — pronto para anúncio e perfil.',
    deliverables: ['Peças de campanha', 'Mockups de app', 'Direção de arte'],
    tools: 'IA generativa, Photoshop e direção de arte',
    images: [
      { src: 'assets/portfolio/econoradar-2.jpg', alt: 'Peça principal da campanha EconoRadar' },
      { src: 'assets/portfolio/econoradar-1.jpg', alt: 'Mockup do app EconoRadar com cards flutuantes' },
      { src: 'assets/portfolio/econoradar-3.jpg', alt: 'Peça de campanha EconoRadar — você no meio da informação' }
    ]
  },
  melbrasa: {
    title: 'Mel & Brasa',
    tag: 'Reel / Vídeo IA',
    lead: 'Reel gastronômico gerado com IA, no ritmo de anúncio.',
    description: 'Close-ups de fogo e selagem, gancho nos primeiros segundos e corte pensado para tráfego e redes. O objetivo era apetite imediato — sem parecer stock, sem perder a marca.',
    deliverables: ['Roteiro', 'Vídeo gerado com IA', 'Corte para redes'],
    tools: 'IA de vídeo, edição e direção criativa',
    images: [
      { src: 'assets/portfolio/mel-brasa.jpg', alt: 'Frame do reel Mel & Brasa' }
    ]
  },
  nectar: {
    title: 'Néctar Atelier',
    tag: 'Criativos com IA',
    lead: 'Campanha de skincare com stills editoriais gerados por IA.',
    description: 'Luz coral, paleta de marca e linguagem de revista. Peças pensadas para anúncio e feed — produto em destaque, sem cenário genérico, com a atmosfera de um atelier.',
    deliverables: ['Stills de produto', 'Paleta de campanha', 'Peças para feed e ads'],
    tools: 'IA generativa e direção de arte',
    images: [
      { src: 'assets/portfolio/nectar.jpg', alt: 'Still de produto da campanha Néctar Atelier' }
    ]
  },
  nyos: {
    title: 'The Lake Nyos Mystery',
    tag: 'Documentário IA',
    lead: 'Curta documental gerado com IA sobre o mistério do Lago Nyos.',
    description: 'Narração, atmosfera e motion graphics em formato de vídeo curto. Uma história real tratada como mistério cinematográfico — do conceito ao cut final, com IA no meio e curadoria humana no ritmo.',
    deliverables: ['Roteiro', 'Vídeo documental', 'Motion graphics'],
    tools: 'IA de vídeo, narração e edição',
    video: 'https://drive.google.com/file/d/1iMwef8uLu5_Qta_GYXAMztKbwLtXgSTH/preview',
    poster: 'assets/portfolio/nyos.jpg'
  }
};

function initPortfolioCarousel(projectModal) {
  const viewport = document.getElementById('carouselViewport');
  const track = document.getElementById('carouselTrack');
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');
  if (!viewport || !track || !prev || !next || !dotsWrap) return;

  const cards = [...track.querySelectorAll('.project-card')];
  if (!cards.length) return;

  let index = 0;
  let drag = { active: false, moved: false, startX: 0, startScroll: 0, pointerId: null };
  let snapTimer = 0;
  let suppressClickUntil = 0;
  const DRAG_THRESHOLD = 16;

  const maxScrollLeft = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  // Offsets reais de cada card (o card em destaque é mais largo que os demais).
  const cardOffset = (i) => cards[i].offsetLeft - cards[0].offsetLeft;

  const indexFromScroll = () => {
    const maxScroll = maxScrollLeft();
    const left = viewport.scrollLeft;
    if (maxScroll <= 1) return 0;
    if (left >= maxScroll - 4) return cards.length - 1;
    let best = 0;
    let bestDistance = Infinity;
    cards.forEach((_, i) => {
      const distance = Math.abs(cardOffset(i) - left);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  };

  const updateControls = () => {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, di) => {
      dot.classList.toggle('is-active', di === index);
      dot.setAttribute('aria-selected', di === index ? 'true' : 'false');
    });
    prev.toggleAttribute('disabled', index <= 0);
    next.toggleAttribute('disabled', index >= cards.length - 1);
  };

  const goTo = (nextIndex) => {
    index = Math.max(0, Math.min(cards.length - 1, nextIndex));
    const maxScroll = maxScrollLeft();
    const target = index >= cards.length - 1
      ? maxScroll
      : Math.min(maxScroll, cardOffset(index));

    viewport.classList.add('is-jumping');
    viewport.scrollTo({ left: target, behavior: 'smooth' });
    updateControls();

    window.clearTimeout(snapTimer);
    snapTimer = window.setTimeout(() => {
      viewport.classList.remove('is-jumping');
    }, 450);
  };

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir para o projeto ${i + 1}`);
    dot.addEventListener('click', (event) => {
      event.preventDefault();
      goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  prev.addEventListener('click', (event) => {
    event.preventDefault();
    goTo(index - 1);
  });
  next.addEventListener('click', (event) => {
    event.preventDefault();
    goTo(index + 1);
  });

  viewport.addEventListener('scroll', () => {
    if (drag.active || viewport.classList.contains('is-jumping')) return;
    index = indexFromScroll();
    updateControls();
  }, { passive: true });

  window.addEventListener('resize', () => {
    index = indexFromScroll();
    updateControls();
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('.carousel-btn, .carousel-dot')) return;
    drag.moved = false;
    if (event.target.closest('.project-card__cta, .project-card__link')) return;
    drag.active = true;
    drag.pointerId = event.pointerId;
    drag.startX = event.clientX;
    drag.startScroll = viewport.scrollLeft;
    viewport.classList.remove('is-jumping');
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < DRAG_THRESHOLD) return;
    if (!drag.moved) {
      drag.moved = true;
      viewport.classList.add('is-dragging');
      try { viewport.setPointerCapture(event.pointerId); } catch (err) { /* ignore */ }
    }
    viewport.scrollLeft = drag.startScroll - delta;
  });

  const endDrag = (event) => {
    if (!drag.active) return;
    if (event && event.pointerId !== drag.pointerId) return;
    const wasMoved = drag.moved;
    drag.active = false;
    drag.pointerId = null;
    viewport.classList.remove('is-dragging');
    if (wasMoved) {
      goTo(indexFromScroll());
      suppressClickUntil = Date.now() + 400;
    }
    return wasMoved;
  };

  viewport.addEventListener('pointerup', (event) => {
    const wasMoved = endDrag(event);
    if (wasMoved || !projectModal) return;
    if (event.target.closest('.project-card__link')) return;
    const card = event.target.closest('.project-card[data-project]');
    if (card) projectModal.open(card.dataset.project);
  });
  viewport.addEventListener('pointercancel', endDrag);

  viewport.addEventListener('click', (event) => {
    if (Date.now() > suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  updateControls();
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const stage = document.getElementById('projectModalStage');
  const titleEl = document.getElementById('projectModalTitle');
  const leadEl = document.getElementById('projectModalLead');
  const descEl = document.getElementById('projectModalDesc');
  const tagEl = document.getElementById('projectModalTag');
  const factsEl = document.getElementById('projectModalFacts');
  const thumbsEl = document.getElementById('projectModalThumbs');
  const countEl = document.getElementById('projectModalCount');
  const ctaEl = document.getElementById('projectModalCta');
  const linkEl = document.getElementById('projectModalLink');
  const prevBtn = document.getElementById('projectModalPrev');
  const nextBtn = document.getElementById('projectModalNext');
  const gallery = modal?.querySelector('.project-modal__gallery');
  if (!modal || !stage) return { open() {}, close() {} };

  const lightbox = initLightbox();
  let media = [];
  let index = 0;
  let lastFocus = null;
  let lastOpenAt = 0;
  let ignoreCloseUntil = 0;
  let swipe = { active: false, pointerId: null, startX: 0, startY: 0 };
  let suppressZoomUntil = 0;
  let swallowNextZoomClick = false;

  const renderFacts = (project) => {
    factsEl.innerHTML = '';
    if (project.client) {
      const fact = document.createElement('div');
      fact.className = 'project-modal__fact';
      const label = document.createElement('span');
      label.textContent = 'Cliente';
      const text = document.createElement('p');
      text.textContent = project.client;
      fact.append(label, text);
      factsEl.appendChild(fact);
    }
    if (project.deliverables?.length) {
      const fact = document.createElement('div');
      fact.className = 'project-modal__fact';
      const label = document.createElement('span');
      label.textContent = 'Entregas';
      const list = document.createElement('ul');
      list.className = 'project-modal__chips';
      project.deliverables.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      fact.append(label, list);
      factsEl.appendChild(fact);
    }
    if (project.tools) {
      const fact = document.createElement('div');
      fact.className = 'project-modal__fact';
      const label = document.createElement('span');
      label.textContent = 'Feito com';
      const text = document.createElement('p');
      text.textContent = project.tools;
      fact.append(label, text);
      factsEl.appendChild(fact);
    }
  };

  const renderThumbs = () => {
    thumbsEl.innerHTML = '';
    const show = media.length > 1 && media.every((item) => item.type === 'image');
    thumbsEl.hidden = !show;
    gallery?.classList.toggle('has-thumbs', show);
    if (!show) return;

    media.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'project-modal__thumb' + (i === index ? ' is-active' : '');
      btn.setAttribute('aria-label', `Ver imagem ${i + 1}`);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      btn.appendChild(img);
      btn.addEventListener('click', () => {
        index = i;
        render();
      });
      thumbsEl.appendChild(btn);
    });
  };

  const imageMedia = () => media.filter((item) => item.type === 'image');

  const openLightbox = () => {
    const images = imageMedia();
    if (!lightbox || !images.length) return;
    const current = media[index];
    const start = Math.max(0, images.indexOf(current));
    lightbox.open(images, start, {
      onChange: (i) => {
        const target = media.indexOf(images[i]);
        if (target >= 0 && target !== index) {
          index = target;
          render();
        }
      },
      returnFocus: () => stage.querySelector('.project-modal__zoom')
    });
  };

  const revealActiveThumb = () => {
    const active = thumbsEl.querySelector('.project-modal__thumb.is-active');
    if (!active || thumbsEl.hidden) return;
    const left = active.offsetLeft - (thumbsEl.clientWidth - active.offsetWidth) / 2;
    thumbsEl.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  };

  const render = () => {
    const item = media[index];
    stage.innerHTML = '';
    if (!item) return;

    if (item.type === 'video') {
      const frame = document.createElement('iframe');
      frame.src = item.src;
      frame.title = item.alt || 'Vídeo do projeto';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      stage.appendChild(frame);
      stage.classList.remove('is-zoomable');
    } else {
      const zoom = document.createElement('button');
      zoom.type = 'button';
      zoom.className = 'project-modal__zoom';
      zoom.setAttribute('aria-label', 'Ampliar imagem em tela cheia');
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      img.draggable = false;
      const badge = document.createElement('span');
      badge.className = 'project-modal__zoom-badge';
      badge.setAttribute('aria-hidden', 'true');
      badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Ampliar</span>';
      zoom.append(img, badge);
      zoom.addEventListener('click', (event) => {
        // O clique disparado logo após um swipe não deve abrir o lightbox.
        if (swallowNextZoomClick && Date.now() < suppressZoomUntil) {
          swallowNextZoomClick = false;
          event.preventDefault();
          return;
        }
        swallowNextZoomClick = false;
        openLightbox();
      });
      stage.appendChild(zoom);
      stage.classList.add('is-zoomable');
    }

    const many = media.length > 1;
    prevBtn.hidden = !many;
    nextBtn.hidden = !many;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= media.length - 1;

    if (many) {
      countEl.hidden = false;
      countEl.textContent = `${index + 1} / ${media.length}`;
    } else {
      countEl.hidden = true;
    }

    thumbsEl.querySelectorAll('.project-modal__thumb').forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === index);
    });
    revealActiveThumb();
  };

  const step = (delta) => {
    const nextIndex = Math.max(0, Math.min(media.length - 1, index + delta));
    if (nextIndex === index) return;
    index = nextIndex;
    render();
  };

  // Swipe horizontal direto no palco (mobile): distingue arrasto de toque simples.
  const SWIPE_THRESHOLD = 40;

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (media.length < 2 || media[index]?.type !== 'image') return;
    swipe = { active: true, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY };
  });

  const endSwipe = (event) => {
    if (!swipe.active || event.pointerId !== swipe.pointerId) return;
    swipe.active = false;
    const dx = event.clientX - swipe.startX;
    const dy = event.clientY - swipe.startY;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    swallowNextZoomClick = true;
    suppressZoomUntil = Date.now() + 250;
    step(dx < 0 ? 1 : -1);
  };
  stage.addEventListener('pointerup', endSwipe);
  stage.addEventListener('pointercancel', () => { swipe.active = false; });

  const open = (projectId) => {
    const project = PORTFOLIO_PROJECTS[projectId];
    if (!project) return;
    const now = Date.now();
    if (now - lastOpenAt < 350 && modal.classList.contains('is-open')) return;
    lastOpenAt = now;

    lastFocus = document.activeElement;
    titleEl.textContent = project.title;
    leadEl.textContent = project.lead || '';
    descEl.textContent = project.description;
    tagEl.textContent = project.tag;
    renderFacts(project);

    if (project.video) {
      media = [{ type: 'video', src: project.video, alt: project.title }];
    } else {
      media = (project.images || []).map((img) => ({ type: 'image', ...img }));
    }
    index = 0;
    renderThumbs();
    render();

    if (ctaEl) {
      const service = project.tag || '';
      ctaEl.setAttribute('data-whatsapp', service);
      ctaEl.href = whatsappHref(service);
    }

    if (linkEl) {
      if (project.url) {
        linkEl.href = project.url;
        linkEl.hidden = false;
        linkEl.firstChild.textContent = `${project.urlLabel || 'Visitar site'} `;
      } else {
        linkEl.hidden = true;
        linkEl.removeAttribute('href');
      }
    }

    modal.inert = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    ignoreCloseUntil = Date.now() + 500;
    modal.querySelector('.project-modal__close')?.focus();
  };

  const close = () => {
    if (Date.now() < ignoreCloseUntil) return;
    lightbox?.close({ silent: true });
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    stage.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.setAttribute('tabindex', '0');
    const openFromCard = () => open(card.dataset.project);
    card.addEventListener('click', (event) => {
      if (event.target.closest('.project-card__link')) return;
      openFromCard();
    });
    card.querySelector('.project-card__cta')?.addEventListener('click', (event) => {
      event.stopPropagation();
      openFromCard();
    });
    card.querySelector('.project-card__link')?.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    card.addEventListener('keydown', (event) => {
      if (event.target.closest('.project-card__link')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFromCard();
      }
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', close);
  });
  ctaEl?.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;
    if (event.defaultPrevented || lightbox?.isOpen()) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });

  return { open, close };
}

/**
 * Lightbox em tela cheia. A faixa usa rolagem nativa com scroll-snap, então
 * no toque o swipe tem inércia do próprio navegador; mouse ganha arrasto,
 * setas e teclado. O índice atual é devolvido via onChange para sincronizar
 * com quem abriu (o modal do projeto).
 */
function initLightbox() {
  const root = document.getElementById('lightbox');
  const track = document.getElementById('lightboxTrack');
  const countEl = document.getElementById('lightboxCount');
  const captionEl = document.getElementById('lightboxCaption');
  const dotsEl = document.getElementById('lightboxDots');
  const hintEl = document.getElementById('lightboxHint');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const closeBtn = root?.querySelector('.lightbox__close');
  if (!root || !track || !prevBtn || !nextBtn) return null;

  let items = [];
  let index = 0;
  let onChange = null;
  let returnFocus = null;
  let lastFocus = null;
  let previousOverflow = '';
  let settleTimer = 0;
  let hintTimer = 0;
  let clearTimer = 0;
  let suppressClickUntil = 0;
  let drag = { active: false, moved: false, pointerId: null, startX: 0, startScroll: 0 };
  const DRAG_THRESHOLD = 10;

  const isOpen = () => root.classList.contains('is-open');
  const clamp = (i) => Math.max(0, Math.min(items.length - 1, i));
  const slideWidth = () => track.clientWidth || 1;
  const indexFromScroll = () => clamp(Math.round(track.scrollLeft / slideWidth()));

  const scrollToIndex = (i, behavior) => {
    track.scrollTo({ left: i * slideWidth(), behavior });
  };

  const update = (nextIndex, { notify = true } = {}) => {
    const changed = nextIndex !== index;
    index = clamp(nextIndex);
    if (countEl) countEl.textContent = `${index + 1} / ${items.length}`;
    if (captionEl) captionEl.textContent = items[index]?.alt || '';
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= items.length - 1;
    dotsEl?.querySelectorAll('.lightbox__dot').forEach((dot, di) => {
      dot.classList.toggle('is-active', di === index);
      dot.setAttribute('aria-selected', di === index ? 'true' : 'false');
    });
    track.querySelectorAll('.lightbox__slide').forEach((slide, si) => {
      slide.classList.toggle('is-active', si === index);
    });
    if (changed && notify && typeof onChange === 'function') onChange(index);
  };

  const goTo = (i, behavior = 'smooth') => {
    update(i);
    scrollToIndex(index, behavior);
  };

  const render = () => {
    track.innerHTML = '';
    if (dotsEl) dotsEl.innerHTML = '';

    items.forEach((item, i) => {
      const slide = document.createElement('div');
      slide.className = 'lightbox__slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Imagem ${i + 1} de ${items.length}`);
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      img.draggable = false;
      img.decoding = 'async';
      img.loading = Math.abs(i - index) <= 1 ? 'eager' : 'lazy';
      slide.appendChild(img);
      track.appendChild(slide);

      if (dotsEl) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'lightbox__dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Ir para a imagem ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
      }
    });

    const many = items.length > 1;
    prevBtn.hidden = !many;
    nextBtn.hidden = !many;
    if (dotsEl) dotsEl.hidden = !many;
    if (countEl) countEl.hidden = !many;
  };

  const showHint = () => {
    if (!hintEl || items.length < 2) return;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    if (!coarse) return;
    hintEl.classList.add('is-visible');
    window.clearTimeout(hintTimer);
    hintTimer = window.setTimeout(() => hintEl.classList.remove('is-visible'), 2400);
  };

  const open = (list, start = 0, options = {}) => {
    if (!Array.isArray(list) || !list.length) return;
    items = list;
    onChange = options.onChange || null;
    returnFocus = options.returnFocus || null;
    index = Math.max(0, Math.min(items.length - 1, start));

    window.clearTimeout(clearTimer);
    render();

    lastFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    root.inert = false;
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');

    // Posiciona sem animação depois que a faixa já tem largura calculada.
    scrollToIndex(index, 'auto');
    update(index, { notify: false });
    requestAnimationFrame(() => {
      scrollToIndex(index, 'auto');
      update(index, { notify: false });
    });

    showHint();
    closeBtn?.focus({ preventScroll: true });
  };

  const close = (options = {}) => {
    if (!isOpen()) return;
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    root.inert = true;
    hintEl?.classList.remove('is-visible');
    document.body.style.overflow = previousOverflow;

    window.clearTimeout(clearTimer);
    clearTimer = window.setTimeout(() => {
      track.innerHTML = '';
      if (dotsEl) dotsEl.innerHTML = '';
    }, 320);

    if (options.silent) return;
    const target = (typeof returnFocus === 'function' && returnFocus()) || lastFocus;
    if (target && typeof target.focus === 'function') target.focus({ preventScroll: true });
  };

  track.addEventListener('scroll', () => {
    if (!isOpen() || drag.active) return;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => {
      const i = indexFromScroll();
      if (i !== index) update(i);
    }, 60);
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (isOpen()) scrollToIndex(index, 'auto');
  });

  // Arrasto com mouse (no toque a rolagem nativa já cuida do swipe).
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { active: true, moved: false, pointerId: event.pointerId, startX: event.clientX, startScroll: track.scrollLeft };
  });
  track.addEventListener('pointermove', (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < DRAG_THRESHOLD) return;
    if (!drag.moved) {
      drag.moved = true;
      track.classList.add('is-dragging');
      try { track.setPointerCapture(event.pointerId); } catch (err) { /* ignore */ }
    }
    track.scrollLeft = drag.startScroll - delta;
  });
  const endDrag = (event) => {
    if (!drag.active || (event && event.pointerId !== drag.pointerId)) return;
    const moved = drag.moved;
    const delta = event ? event.clientX - drag.startX : 0;
    drag.active = false;
    track.classList.remove('is-dragging');
    if (!moved) return;
    suppressClickUntil = Date.now() + 350;
    // Um arrasto curto ainda muda de slide na direção do gesto.
    const direction = Math.abs(delta) > 40 ? (delta < 0 ? 1 : -1) : 0;
    goTo(direction ? index + direction : indexFromScroll());
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // Toque fora da imagem (área escura do slide) fecha a galeria.
  track.addEventListener('click', (event) => {
    if (Date.now() < suppressClickUntil) return;
    if (event.target.classList.contains('lightbox__slide')) close();
  });

  root.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', () => close());
  });
  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  });

  return { open, close, isOpen };
}
