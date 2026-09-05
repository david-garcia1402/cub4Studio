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
  let drag = { active: false, moved: false, startX: 0, startScroll: 0 };
  let snapTimer = 0;

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
    drag.active = true;
    drag.moved = false;
    drag.card = event.target.closest('.project-card[data-project]');
    drag.startX = event.clientX;
    drag.startScroll = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    viewport.classList.remove('is-jumping');
    try { viewport.setPointerCapture(event.pointerId); } catch (err) { /* ignore */ }
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!drag.active) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 8) drag.moved = true;
    viewport.scrollLeft = drag.startScroll - delta;
  });

  const endDrag = () => {
    if (!drag.active) return;
    drag.active = false;
    viewport.classList.remove('is-dragging');
    goTo(indexFromScroll());
  };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  viewport.addEventListener('click', (event) => {
    if (drag.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.moved = false;
      drag.card = null;
      return;
    }
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
    modal.querySelector('.project-modal__close')?.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    stage.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.addEventListener('click', () => open(card.dataset.project));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(card.dataset.project);
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
