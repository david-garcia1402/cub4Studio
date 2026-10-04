// Same receiving address as the existing institutional contact form.
const ENDPOINT = 'https://formsubmit.co/ajax/cub4studio@gmail.com';
const LABELS = {name:'Nome',phone:'WhatsApp',email:'email',company:'Empresa',city:'Cidade',segment:'Segmento',decision:'Responsável pela decisão',current:'Presença atual',project:'Projeto',timing:'Prazo desejado',budget:'Investimento previsto',goal:'Objetivo'};

export function validPhone(value) {
  const digits = value.replace(/\D/g, '');
  const local = digits.length > 11 && digits.startsWith('55') ? digits.slice(2) : digits;
  return /^[1-9]\d\d{8,9}$/.test(local);
}
export function confirmedDelivery(result) {
  return !!result && (result.success === true || result.success === 'true') && !/activat|confirm.*e.?mail|check.*e.?mail|ativar/i.test(String(result.message || ''));
}
export function attribution(search) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].filter(key => params.has(key)).map(key => [key, params.get(key).slice(0, 200)]));
}
export function whatsappLink(values) {
  // No email or phone in a query string; these are already in the submitted lead.
  const text = `Olá! Enviei meu pedido pelo site da cub4Studio. Minha empresa é ${values.company}. Tenho interesse em ${values.project}. Podemos conversar sobre a proposta?`;
  return `https://wa.me/5547999940399?text=${encodeURIComponent(text)}`;
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('#lead-form');
  const status = document.querySelector('#form-status');
  const button = document.querySelector('#submit');
  let submitted = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled || submitted || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('website_confirm')) return;
    const values = Object.fromEntries(Object.keys(LABELS).map(key => [key, String(data.get(key) || '').trim()]));
    if (!validPhone(values.phone)) {
      status.textContent = 'Confira seu WhatsApp: informe o DDD e o número completo.';
      form.elements.namedItem('phone').focus();
      return;
    }
    if (!values.name || !values.company || !values.city) {
      status.textContent = 'Preencha seu nome, empresa e cidade.';
      return;
    }
    button.disabled = true;
    button.textContent = 'Enviando seu pedido…';
    status.textContent = '';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const body = new FormData();
      for (const [key, label] of Object.entries(LABELS)) body.append(label, values[key]);
      body.append('Consentimento', 'Autorizou contato sobre este pedido');
      body.append('Página', `${location.origin}${location.pathname}`);
      for (const [key, value] of Object.entries(attribution(location.search))) body.append(key, value);
      body.append('_subject', `Solicitação de site — ${values.company}`);
      body.append('_template', 'table');
      body.append('_replyto', values.email);
      const response = await fetch(ENDPOINT, {method:'POST', headers:{Accept:'application/json'}, body, signal:controller.signal});
      const result = await response.json();
      if (!response.ok || !confirmedDelivery(result)) throw new Error('delivery');
      submitted = true;
      document.querySelector('#whatsapp').href = whatsappLink(values);
      document.querySelector('#form-content').hidden = true;
      const success = document.querySelector('#success');
      success.hidden = false;
      success.focus();
      success.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'center'});
      // Optional Pixel is injected only after a confirmed receipt. This page does
      // not reuse the unrelated AI-to-Business product's Pixel.
      if (typeof window.fbq === 'function') window.fbq('track','Lead',{content_name:'Orçamento de site cub4Studio'});
    } catch {
      status.textContent = 'Não conseguimos confirmar o envio. Seus campos foram mantidos. Tente novamente ou fale diretamente com a cub4Studio pelo WhatsApp.';
      const direct = document.createElement('a');
      direct.textContent = ' Abrir WhatsApp ↗';
      direct.href = whatsappLink(values);
      direct.target = '_blank';
      direct.rel = 'noopener';
      status.append(direct);
    } finally {
      clearTimeout(timer);
      button.disabled = false;
      button.textContent = 'Quero uma proposta para meu site ↗';
    }
  });
}
