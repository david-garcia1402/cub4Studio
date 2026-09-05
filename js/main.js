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
  initShowreel();
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
  vertice: {
    title: 'Casa Vértice',
    tag: 'Landing Page',
    lead: 'Landing conversora para um residencial de alto padrão.',
    description: 'Hero cinematográfico, prova social e um fluxo curto até o agendamento de visita. Visual de penthouse ao entardecer, paleta quente e copy pensada para desejo — não para catálogo imobiliário.',
    deliverables: ['Landing page', 'Copy de conversão', 'Visual cinematográfico'],
    tools: 'Direção de arte, IA generativa e front-end',
    images: [
      { src: 'assets/portfolio/casa-vertice.jpg', alt: 'Visual da landing page Casa Vértice' }
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
  triton: {
    title: 'Triton Máquinas',
    tag: 'Catálogo & Produto',
    lead: 'Fichas técnicas padronizadas para a linha de compressores.',
    description: 'Foto de produto, especificações e identidade industrial em um sistema visual único. Três modelos, mesma linguagem — para o comercial vender com clareza e a marca parecer uma linha, não peças soltas.',
    deliverables: ['Fichas técnicas', 'Padronização visual', 'Fotos de produto'],
    tools: 'IA de produto, Photoshop e identidade visual',
    images: [
      { src: 'assets/portfolio/triton-1.jpg', alt: 'Ficha técnica Triton TRI600A' },
      { src: 'assets/portfolio/triton-2.jpg', alt: 'Ficha técnica Triton TRI860A' },
      { src: 'assets/portfolio/triton-3.jpg', alt: 'Ficha técnica Triton TRI1100A' }
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

  const cardStep = () => {
    const width = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return width + gap;
  };

  const indexFromScroll = () => {
    const maxScroll = maxScrollLeft();
    const left = viewport.scrollLeft;
    if (maxScroll <= 1) return 0;
    if (left >= maxScroll - 4) return cards.length - 1;
    const step = cardStep();
    if (step <= 0) return 0;
    return Math.min(cards.length - 1, Math.max(0, Math.round(left / step)));
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
      : Math.min(maxScroll, index * cardStep());

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
    if (event.target.closest('.project-card__cta')) return;
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
  const prevBtn = document.getElementById('projectModalPrev');
  const nextBtn = document.getElementById('projectModalNext');
  const gallery = modal?.querySelector('.project-modal__gallery');
  if (!modal || !stage) return { open() {}, close() {} };

  let media = [];
  let index = 0;
  let lastFocus = null;
  let lastOpenAt = 0;
  let ignoreCloseUntil = 0;

  const renderFacts = (project) => {
    factsEl.innerHTML = '';
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
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      stage.appendChild(img);
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
  };

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

    modal.inert = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    ignoreCloseUntil = Date.now() + 500;
    modal.querySelector('.project-modal__close')?.focus();
  };

  const close = () => {
    if (Date.now() < ignoreCloseUntil) return;
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
    card.addEventListener('click', openFromCard);
    card.querySelector('.project-card__cta')?.addEventListener('click', (event) => {
      event.stopPropagation();
      openFromCard();
    });
    card.addEventListener('keydown', (event) => {
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
  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    render();
  });
  nextBtn.addEventListener('click', () => {
    index = Math.min(media.length - 1, index + 1);
    render();
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') prevBtn.click();
    if (event.key === 'ArrowRight') nextBtn.click();
  });

  return { open, close };
}

const SHOWREEL_DURATION = 28000;
const SHOWREEL_CHAPTERS = [
  { id: 'brand', label: 'Estúdio', start: 0 },
  { id: 'about', label: 'Sobre', start: 3200 },
  { id: 'solutions', label: 'Soluções', start: 7600 },
  { id: 'portfolio', label: 'Portfólio', start: 13200 },
  { id: 'cta', label: 'Contato', start: 25200 }
];

const SHOWREEL_SCENES = [
  {
    id: 'brand',
    start: 0,
    end: 3200,
    kind: 'brand',
    kicker: 'Estúdio de criação impulsionado por IA',
    title: 'cub<span>4</span>Studio',
    text: 'Landing pages, criativos e vídeos que convertem — com curadoria humana.'
  },
  {
    id: 'about',
    start: 3200,
    end: 7600,
    kind: 'about',
    kicker: 'Sobre o cub4Studio',
    title: 'Criamos experiências digitais que convertem',
    text: 'Unimos estratégia, design e IA generativa para vender mais — sem perder identidade de marca.',
    collage: [
      'assets/portfolio/econoradar-2.jpg',
      'assets/portfolio/casa-vertice.jpg',
      'assets/portfolio/mel-brasa.jpg',
      'assets/portfolio/nectar.jpg'
    ]
  },
  {
    id: 'solutions',
    start: 7600,
    end: 13200,
    kind: 'solutions',
    kicker: 'Serviços',
    title: 'Tudo que sua marca precisa para vender mais com IA',
    services: [
      { title: 'Landing Pages Conversoras', text: 'Copy, UI/UX e integração com IA.' },
      { title: 'Criativos com IA', text: 'Peças para Ads com direção de arte.' },
      { title: 'Vídeos & Reels IA', text: 'Gancho nos primeiros segundos.' },
      { title: 'Estratégia & Automação', text: 'Funis, agentes e dashboards.' }
    ]
  },
  {
    id: 'econoradar',
    start: 13200,
    end: 15200,
    kind: 'project',
    kicker: 'Criativos com IA',
    title: 'EconoRadar',
    text: 'Campanha de lançamento em dark mode — o radar das finanças.',
    image: 'assets/portfolio/econoradar-2.jpg'
  },
  {
    id: 'vertice',
    start: 15200,
    end: 17200,
    kind: 'project',
    kicker: 'Landing Page',
    title: 'Casa Vértice',
    text: 'Residencial de alto padrão. Desejo, prova social e visita.',
    image: 'assets/portfolio/casa-vertice.jpg'
  },
  {
    id: 'melbrasa',
    start: 17200,
    end: 19200,
    kind: 'project',
    kicker: 'Reel / Vídeo IA',
    title: 'Mel & Brasa',
    text: 'Close cinematográfico e gancho nos primeiros segundos.',
    image: 'assets/portfolio/mel-brasa.jpg'
  },
  {
    id: 'triton',
    start: 19200,
    end: 21200,
    kind: 'project',
    kicker: 'Catálogo & Produto',
    title: 'Triton Máquinas',
    text: 'Fichas técnicas padronizadas para a linha de compressores.',
    image: 'assets/portfolio/triton-1.jpg',
    contain: true
  },
  {
    id: 'nectar',
    start: 21200,
    end: 23200,
    kind: 'project',
    kicker: 'Criativos com IA',
    title: 'Néctar Atelier',
    text: 'Stills editoriais de skincare — luz coral e paleta de marca.',
    image: 'assets/portfolio/nectar.jpg'
  },
  {
    id: 'nyos',
    start: 23200,
    end: 25200,
    kind: 'project',
    kicker: 'Documentário IA',
    title: 'The Lake Nyos Mystery',
    text: 'Curta documental gerado com IA — atmosfera e narrativa.',
    image: 'assets/portfolio/nyos.jpg',
    portrait: true
  },
  {
    id: 'cta',
    start: 25200,
    end: 28000,
    kind: 'cta',
    kicker: 'Vamos criar juntos?',
    title: 'Pronto para criar sua próxima landing page com IA?',
    text: 'Chame no WhatsApp e receba os próximos passos do orçamento.'
  }
];

function initShowreel() {
  const root = document.getElementById('showreel');
  const viewport = document.getElementById('showreelViewport');
  const chaptersEl = document.getElementById('showreelChapters');
  const bar = document.getElementById('showreelBar');
  const clock = document.getElementById('showreelClock');
  const playBtn = document.getElementById('showreelPlay');
  const replayBtn = document.getElementById('showreelReplay');
  const closeBtn = document.getElementById('showreelClose');
  if (!root || !viewport || !chaptersEl) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFocus = null;
  let playing = false;
  let elapsed = 0;
  let startedAt = 0;
  let raf = 0;
  let ended = false;

  const formatTime = (ms) => {
    const total = Math.max(0, Math.min(SHOWREEL_DURATION, ms));
    const seconds = Math.floor(total / 1000);
    return `0:${String(seconds).padStart(2, '0')}`;
  };

  const build = () => {
    viewport.innerHTML = SHOWREEL_SCENES.map((scene) => {
      if (scene.kind === 'brand') {
        return `<section class="showreel-scene showreel-scene--brand" data-scene="${scene.id}">
          <div class="showreel-scene__copy">
            <img class="showreel-badge" src="assets/img/logo-badge.jpg" alt="cub4Studio">
            <p class="showreel-scene__kicker">${scene.kicker}</p>
            <p>${scene.text}</p>
          </div>
        </section>`;
      }
      if (scene.kind === 'about') {
        const frames = scene.collage.map((src) => `<img src="${src}" alt="">`).join('');
        return `<section class="showreel-scene showreel-scene--about" data-scene="${scene.id}">
          <div class="showreel-collage">${frames}</div>
          <div class="showreel-scene__veil"></div>
          <div class="showreel-scene__copy">
            <p class="showreel-scene__kicker">${scene.kicker}</p>
            <h2>${scene.title}</h2>
            <p>${scene.text}</p>
          </div>
        </section>`;
      }
      if (scene.kind === 'solutions') {
        const cards = scene.services.map((item, i) => `<article class="showreel-service" data-service="${i}">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>`).join('');
        return `<section class="showreel-scene showreel-scene--solutions" data-scene="${scene.id}">
          <div class="showreel-scene__media"><img src="assets/portfolio/mel-brasa.jpg" alt=""></div>
          <div class="showreel-scene__veil"></div>
          <div class="showreel-scene__copy">
            <p class="showreel-scene__kicker">${scene.kicker}</p>
            <h2>${scene.title}</h2>
          </div>
          <div class="showreel-services">${cards}</div>
        </section>`;
      }
      if (scene.kind === 'cta') {
        return `<section class="showreel-scene showreel-scene--cta" data-scene="${scene.id}">
          <div class="showreel-scene__copy">
            <img class="showreel-cta-icon" src="assets/img/icon-transparent.png" alt="">
            <p class="showreel-scene__kicker">${scene.kicker}</p>
            <h2>${scene.title}</h2>
            <p>${scene.text}</p>
            <a class="btn btn--primary btn--lg" data-whatsapp="Landing Page Conversora" target="_blank" rel="noopener">Falar no WhatsApp</a>
          </div>
        </section>`;
      }
      const fit = scene.contain ? ' showreel-scene__media--contain' : '';
      const portrait = scene.portrait ? ' showreel-scene__media--portrait' : '';
      return `<section class="showreel-scene showreel-scene--project" data-scene="${scene.id}">
        <div class="showreel-scene__media${fit}${portrait}"><img src="${scene.image}" alt=""></div>
        <div class="showreel-scene__veil"></div>
        <div class="showreel-scene__copy">
          <p class="showreel-scene__kicker">${scene.kicker}</p>
          <h2>${scene.title}</h2>
          <p>${scene.text}</p>
        </div>
      </section>`;
    }).join('');

    chaptersEl.innerHTML = SHOWREEL_CHAPTERS.map((chapter) => `<button type="button" class="showreel__chapter" data-chapter="${chapter.id}" aria-label="${chapter.label}">
      <span></span>
    </button>`).join('');

    const cta = viewport.querySelector('.showreel-scene--cta a[data-whatsapp]');
    if (cta) cta.href = whatsappHref('Landing Page Conversora');
  };

  const render = (time) => {
    const t = Math.max(0, Math.min(SHOWREEL_DURATION, time));
    SHOWREEL_SCENES.forEach((scene) => {
      const el = viewport.querySelector(`[data-scene="${scene.id}"]`);
      if (!el) return;
      const isLast = scene.end >= SHOWREEL_DURATION;
      const on = t >= scene.start && (t < scene.end || (isLast && t >= scene.start));
      const wasOn = el.classList.contains('is-on');
      el.classList.toggle('is-on', on);
      if (on && !wasOn && !reducedMotion) {
        el.querySelectorAll('img').forEach((img) => {
          img.style.animation = 'none';
          void img.offsetWidth;
          img.style.animation = '';
        });
      }
    });

    const solutions = SHOWREEL_SCENES.find((scene) => scene.kind === 'solutions');
    if (solutions) {
      const span = solutions.end - solutions.start;
      const local = t - solutions.start;
      const index = local < 0 || local >= span ? -1 : Math.min(3, Math.floor(local / (span / 4)));
      viewport.querySelectorAll('.showreel-service').forEach((card, i) => {
        card.classList.toggle('is-lit', i === index || (index >= 0 && i <= index));
      });
    }

    SHOWREEL_CHAPTERS.forEach((chapter, i) => {
      const next = SHOWREEL_CHAPTERS[i + 1];
      const end = next ? next.start : SHOWREEL_DURATION;
      const button = chaptersEl.querySelector(`[data-chapter="${chapter.id}"]`);
      if (!button) return;
      const done = t >= end;
      const active = t >= chapter.start && t < end;
      button.classList.toggle('is-done', done);
      button.classList.toggle('is-active', active);
      const fill = done ? 100 : active ? ((t - chapter.start) / (end - chapter.start)) * 100 : 0;
      button.style.setProperty('--fill', `${fill}%`);
    });

    if (bar) bar.style.width = `${(t / SHOWREEL_DURATION) * 100}%`;
    if (clock) clock.textContent = `${formatTime(t)} / 0:28`;
  };

  const stopRaf = () => {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  };

  const tick = (now) => {
    if (!playing) return;
    elapsed = now - startedAt;
    if (elapsed >= SHOWREEL_DURATION) {
      elapsed = SHOWREEL_DURATION;
      playing = false;
      ended = true;
      root.classList.remove('is-playing');
      playBtn.setAttribute('aria-label', 'Assistir de novo');
      if (replayBtn) replayBtn.hidden = false;
      render(elapsed);
      stopRaf();
      return;
    }
    render(elapsed);
    raf = window.requestAnimationFrame(tick);
  };

  const playFrom = (ms) => {
    elapsed = Math.max(0, Math.min(SHOWREEL_DURATION - 1, ms));
    ended = false;
    playing = true;
    startedAt = performance.now() - elapsed;
    root.classList.add('is-playing');
    playBtn.setAttribute('aria-label', 'Pausar');
    if (replayBtn) replayBtn.hidden = true;
    stopRaf();
    render(elapsed);
    raf = window.requestAnimationFrame(tick);
  };

  const pause = () => {
    if (!playing) return;
    playing = false;
    root.classList.remove('is-playing');
    playBtn.setAttribute('aria-label', 'Reproduzir');
    stopRaf();
  };

  const toggle = () => {
    if (ended) {
      playFrom(0);
      return;
    }
    if (playing) pause();
    else playFrom(elapsed);
  };

  const open = () => {
    lastFocus = document.activeElement;
    root.inert = false;
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playFrom(0);
    closeBtn?.focus();
  };

  const close = () => {
    pause();
    ended = false;
    elapsed = 0;
    root.classList.remove('is-open', 'is-playing');
    root.setAttribute('aria-hidden', 'true');
    root.inert = true;
    document.body.style.overflow = '';
    render(0);
    if (replayBtn) replayBtn.hidden = true;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  build();
  render(0);

  document.querySelectorAll('[data-showreel-open]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
  });
  closeBtn?.addEventListener('click', close);
  playBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggle();
  });
  replayBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    playFrom(0);
  });
  chaptersEl.addEventListener('click', (event) => {
    const chapter = event.target.closest('[data-chapter]');
    if (!chapter) return;
    const data = SHOWREEL_CHAPTERS.find((item) => item.id === chapter.dataset.chapter);
    if (data) playFrom(data.start);
  });
  viewport.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    toggle();
  });

  document.addEventListener('keydown', (event) => {
    if (!root.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === ' ') {
      event.preventDefault();
      toggle();
    }
    if (event.key === 'ArrowRight') {
      const next = SHOWREEL_CHAPTERS.find((chapter) => chapter.start > elapsed + 40);
      playFrom(next ? next.start : SHOWREEL_DURATION - 1);
    }
    if (event.key === 'ArrowLeft') {
      const prev = [...SHOWREEL_CHAPTERS].reverse().find((chapter) => chapter.start < elapsed - 400);
      playFrom(prev ? prev.start : 0);
    }
  });

  if (window.location.hash === '#apresentacao') {
    window.setTimeout(open, 280);
  }
}
