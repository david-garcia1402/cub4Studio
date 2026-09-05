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

  // Formulário de contato (placeholder até integração real, ex.: WhatsApp/CRM/e-mail)
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const nome = data.get('nome');
      const email = data.get('email');
      const servico = data.get('servico');
      const mensagem = data.get('mensagem');

      // TODO: substituir por integração real (endpoint de e-mail, WhatsApp API ou CRM)
      console.log('Novo contato cub4Studio:', { nome, email, servico, mensagem });

      if (formNote) {
        formNote.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e em breve entraremos em contato.`;
      }
      form.reset();
    });
  }
});
