// cub4Studio — interações básicas do site

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

  initContactForm();
  initPortfolioCarousel();
  initPortfolioLightbox();
});

const CONTACT_EMAIL = 'cub4studio@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

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

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 12000);
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      window.clearTimeout(timeoutId);

      const result = await response.json().catch(() => null);
      const success = Boolean(result && (result.success === true || result.success === 'true'));
      const message = result && typeof result.message === 'string' ? result.message : '';
      const needsActivation = /confirm your e-?mail|please confirm|activation link|ativar o e-?mail/i.test(message);

      if (success) {
        form.reset();
        setNote(`Obrigado, ${nome}! Seu orçamento chegou no estúdio. Respondemos em breve.`, 'success');
        setBusy(false);
        return;
      }

      if (needsActivation) {
        setNote('Quase lá: confirme o e-mail de ativação enviado para cub4studio@gmail.com (só precisa fazer isso uma vez). Depois os orçamentos chegam direto na caixa de entrada.', 'success');
        setBusy(false);
        return;
      }

      form.submit();
    } catch (error) {
      form.submit();
    }
  });
}

const PORTFOLIO_PROJECTS = {
  econoradar: {
    title: 'EconoRadar',
    tag: 'Criativos com IA',
    description: 'Campanha de lançamento para um app de inteligência financeira. Mockups, peças de anúncio e direção de arte em dark mode — informação demais, clareza de menos, tudo em um radar só.',
    images: [
      { src: 'assets/portfolio/econoradar-2.jpg', alt: 'Peça principal da campanha EconoRadar' },
      { src: 'assets/portfolio/econoradar-1.jpg', alt: 'Mockup do app EconoRadar com cards flutuantes' },
      { src: 'assets/portfolio/econoradar-3.jpg', alt: 'Peça de campanha EconoRadar — você no meio da informação' }
    ]
  },
  vertice: {
    title: 'Casa Vértice',
    tag: 'Landing Page',
    description: 'Landing page conversora para um residencial de alto padrão. Hero cinematográfico, prova social e um fluxo curto até o agendamento de visita.',
    images: [
      { src: 'assets/portfolio/casa-vertice.jpg', alt: 'Visual da landing page Casa Vértice' }
    ]
  },
  melbrasa: {
    title: 'Mel & Brasa',
    tag: 'Reel / Vídeo IA',
    description: 'Reel gastronômico gerado com IA: close-ups de fogo e selagem, ritmo de anúncio e gancho nos primeiros segundos para tráfego e redes.',
    images: [
      { src: 'assets/portfolio/mel-brasa.jpg', alt: 'Frame do reel Mel & Brasa' }
    ]
  },
  triton: {
    title: 'Triton Máquinas',
    tag: 'Catálogo & Produto',
    description: 'Série de fichas técnicas padronizadas para compressores industriais — foto de produto, especificações e identidade visual da marca.',
    images: [
      { src: 'assets/portfolio/triton-1.jpg', alt: 'Ficha técnica Triton TRI600A' },
      { src: 'assets/portfolio/triton-2.jpg', alt: 'Ficha técnica Triton TRI860A' },
      { src: 'assets/portfolio/triton-3.jpg', alt: 'Ficha técnica Triton TRI1100A' }
    ]
  },
  nectar: {
    title: 'Néctar Atelier',
    tag: 'Criativos com IA',
    description: 'Campanha de skincare com stills de produto gerados por IA. Linguagem editorial, luz coral e uma paleta pensada para anúncios e feed.',
    images: [
      { src: 'assets/portfolio/nectar.jpg', alt: 'Still de produto da campanha Néctar Atelier' }
    ]
  },
  nyos: {
    title: 'The Lake Nyos Mystery',
    tag: 'Documentário IA',
    description: 'Curta documental gerado com IA sobre o mistério do Lago Nyos. Narração, atmosfera e motion graphics em formato de vídeo curto.',
    video: 'https://drive.google.com/file/d/1iMwef8uLu5_Qta_GYXAMztKbwLtXgSTH/preview',
    poster: 'assets/portfolio/nyos.jpg'
  }
};

function initPortfolioCarousel() {
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

  track.addEventListener('click', (event) => {
    if (drag.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.moved = false;
    }
  }, true);

  updateControls();
}

function initPortfolioLightbox() {
  const lightbox = document.getElementById('portfolioLightbox');
  const stage = document.getElementById('lightboxStage');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const tagEl = document.getElementById('lightboxTag');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  if (!lightbox || !stage) return;

  let media = [];
  let index = 0;
  let lastFocus = null;

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
  };

  const open = (projectId) => {
    const project = PORTFOLIO_PROJECTS[projectId];
    if (!project) return;

    lastFocus = document.activeElement;
    titleEl.textContent = project.title;
    descEl.textContent = project.description;
    tagEl.textContent = project.tag;

    if (project.video) {
      media = [{ type: 'video', src: project.video, alt: project.title }];
    } else {
      media = (project.images || []).map((img) => ({ type: 'image', ...img }));
    }
    index = 0;
    render();

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox__close')?.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    stage.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    const openFromCard = () => open(card.dataset.project);
    card.addEventListener('click', openFromCard);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFromCard();
      }
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', close);
  });
  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    render();
  });
  nextBtn.addEventListener('click', () => {
    index = Math.min(media.length - 1, index + 1);
    render();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') prevBtn.click();
    if (event.key === 'ArrowRight') nextBtn.click();
  });
}
