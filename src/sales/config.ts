/*
 * Configuração comercial do AI to Business.
 * Valor vazio ("") = dado não confirmado: a interface esconde o trecho correspondente e,
 * sem checkout, a versão do idioma não mostra botões de compra.
 *
 * Conferido em 28/09/2026 nos checkouts públicos:
 * - Kiwify  jzd2pf2      → "AI to Business — Edição Brasil", 1899 BRL.
 * - Hotmart N107802184S  → 9.99 USD (+ impostos aplicáveis), garantia de 7 dias.
 */

export const CHECKOUT_BR_URL = "https://pay.kiwify.com.br/jzd2pf2";
export const CHECKOUT_EN_URL = "https://pay.hotmart.com/N107802184S";

export const PRODUCT_PRICE_BR = 18.99;
export const PRODUCT_PRICE_EN = 9.99;
export const PRODUCT_CURRENCY_BR = "BRL";
export const PRODUCT_CURRENCY_EN = "USD";

/*
 * Faixa promocional no topo. Preço "de" 0 = a faixa mostra só o preço atual, sem valor riscado.
 * PROMO_ENDS_AT vazio = o cronômetro conta até a meia-noite local e reinicia a cada dia.
 * Com data ISO (ex.: "2026-10-15T23:59:59-03:00"), a faixa some quando o prazo acaba.
 */
export const COMPARE_AT_PRICE_BR = 129.99;
export const COMPARE_AT_PRICE_EN = 0;
export const PROMO_ENDS_AT = "";

/* IDs públicos do Meta Pixel. Vazio = pixel não carrega. Use o mesmo ID configurado na Kiwify/Hotmart. */
export const META_PIXEL_ID_BR = "1653975569638320";
export const META_PIXEL_ID_EN = "";

export const SUPPORT_CONTACT = "cub4studio@gmail.com";

/* Texto exibido no FAQ e na oferta. Vazio = a página remete às condições mostradas no checkout. */
export const GUARANTEE_TERMS_BR = "";
export const GUARANTEE_TERMS_EN =
  "Hotmart lists a 7-day guarantee for this product. Refund requests are handled by Hotmart under its purchase terms.";

/* Parâmetros de atribuição aceitos por cada plataforma (documentação oficial, set/2026). */
export const TRACKING_PARAMS_BR = ["src", "sck", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "s1", "s2", "s3"] as const;
export const TRACKING_PARAMS_EN = ["src", "sck", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export const PAGE_URL_BR = "https://cub4studio.com/pt-br/ai-to-business/";
export const PAGE_URL_EN = "https://cub4studio.com/en/ai-to-business/";
