// cub4Studio — kit de criativos (criativos.html)
// Depende de js/main.js (initLightbox, SITE) carregado antes.

const CREATIVE_FORMATS = {
  feed: { label: 'Feed 1:1', width: 1080, height: 1080 },
  retrato: { label: 'Retrato 4:5', width: 1080, height: 1350 },
  stories: { label: 'Stories 9:16', width: 1080, height: 1920 }
};
const DEFAULT_FORMAT = 'retrato';
const EXPORT_DIR = 'assets/criativos';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('render')) {
    setupRenderMode(params.get('render'), params.get('formato'));
    return;
  }
  initCreativeKit();
});

function exportPath(id, format, card) {
  if (card?.dataset.static) return `${EXPORT_DIR}/${id}-1080.jpg`;
  return `${EXPORT_DIR}/${id}-${format}.jpg`;
}

function initCreativeKit() {
  const grid = document.getElementById('kitGrid');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('.creative-card')];
  const formatBtns = [...document.querySelectorAll('[data-format-btn]')];
  const filterBtns = [...document.querySelectorAll('[data-filter]')];
  const countEl = document.getElementById('kitCount');
  const lightbox = typeof initLightbox === 'function' ? initLightbox() : null;

  let format = DEFAULT_FORMAT;
  let filter = 'todos';

  const visibleCards = () => cards.filter((card) => !card.hidden);

  const applyFormat = () => {
    const spec = CREATIVE_FORMATS[format];
    cards.forEach((card) => {
      const id = card.dataset.id;
      card.querySelectorAll('.creative-frame').forEach((frame) => {
        frame.dataset.format = format;
      });
      const link = card.querySelector('[data-download]');
      if (link) {
        const file = exportPath(id, format, card);
        link.href = file;
        link.setAttribute('download', `cub4studio-${id}-${card.dataset.static ? 'retrato' : format}.jpg`);
        link.setAttribute('aria-label', `Baixar criativo ${card.dataset.title || id} em ${spec.width}×${spec.height}`);
      }
      const label = card.querySelector('[data-download-label]');
      if (label) label.textContent = `Baixar ${spec.width}×${spec.height}`;
    });
    formatBtns.forEach((btn) => {
      const active = btn.dataset.formatBtn === format;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const applyFilter = () => {
    cards.forEach((card) => {
      const groups = (card.dataset.group || '').split(/\s+/);
      card.hidden = filter !== 'todos' && !groups.includes(filter);
    });
    filterBtns.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (countEl) {
      const total = visibleCards().length;
      countEl.textContent = `${total} ${total === 1 ? 'criativo' : 'criativos'} · ${CREATIVE_FORMATS[format].label} · ${CREATIVE_FORMATS[format].width}×${CREATIVE_FORMATS[format].height}px`;
    }
  };

  formatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      format = btn.dataset.formatBtn in CREATIVE_FORMATS ? btn.dataset.formatBtn : DEFAULT_FORMAT;
      applyFormat();
      applyFilter();
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter || 'todos';
      applyFilter();
      btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  });

  cards.forEach((card) => {
    const copyBtn = card.querySelector('[data-copy]');
    const captionEl = card.querySelector('[data-caption]');
    if (copyBtn && captionEl) {
      const idleHtml = copyBtn.innerHTML;
      copyBtn.addEventListener('click', async () => {
        const ok = await copyText(captionEl.textContent.trim());
        copyBtn.classList.toggle('is-done', ok);
        copyBtn.textContent = ok ? 'Legenda copiada!' : 'Não foi possível copiar';
        window.setTimeout(() => {
          copyBtn.classList.remove('is-done');
          copyBtn.innerHTML = idleHtml;
        }, 1800);
      });
    }

    const expandBtn = card.querySelector('[data-expand]');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        const list = visibleCards().map((item) => ({
          src: exportPath(item.dataset.id, format, item),
          alt: `${item.dataset.title || item.dataset.id} · ${CREATIVE_FORMATS[format].label}`
        }));
        const start = visibleCards().indexOf(card);
        if (lightbox) {
          lightbox.open(list, Math.max(0, start), { returnFocus: () => expandBtn });
        } else {
          window.open(exportPath(card.dataset.id, format, card), '_blank', 'noopener');
        }
      });
    }
  });

  applyFormat();
  applyFilter();
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) { /* cai no fallback */ }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch (err) {
    return false;
  }
}

/**
 * Isola um único criativo em 1080px de largura para a captura pelo
 * scripts/render-criativos.mjs. Expõe window.__creativoReady, que resolve
 * quando fontes e imagens do criativo terminaram de carregar.
 */
function setupRenderMode(id, formatParam) {
  const format = formatParam in CREATIVE_FORMATS ? formatParam : DEFAULT_FORMAT;
  const card = document.querySelector(`.creative-card[data-id="${id}"]`);
  const frame = card?.querySelector('.creative-frame');

  if (!frame) {
    window.__creativoReady = Promise.reject(new Error(`Criativo "${id}" não encontrado`));
    return;
  }

  frame.dataset.format = format;
  const stage = document.createElement('div');
  stage.className = 'render-stage';
  stage.appendChild(frame);
  document.body.appendChild(stage);
  document.body.classList.add('is-render');

  const images = [...frame.querySelectorAll('img')].map((img) => {
    if (img.complete && img.naturalWidth) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  });

  window.__creativoReady = Promise.all([document.fonts ? document.fonts.ready : Promise.resolve(), ...images])
    .then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    .then(() => ({ id, format, ...CREATIVE_FORMATS[format] }));
}
