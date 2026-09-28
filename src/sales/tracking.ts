import { initAnalytics, type AnalyticsWindow } from "../lib/analytics";
import type { SalesContent } from "./content";

export function buildCheckoutUrl(base: string, allowed: readonly string[], search: string) {
  if (!base) return "";
  const url = new URL(base);
  const incoming = new URLSearchParams(search);
  for (const key of allowed) {
    const value = incoming.get(key);
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value.slice(0, 255));
  }
  return url.toString();
}

export function initSalesTracking(content: SalesContent) {
  initAnalytics({ metaPixel: content.pixelId });
  const w = window as AnalyticsWindow;
  const item = { item_id: `ai-to-business-${content.locale}`, item_name: content.offer.title, price: content.price };
  w.gtag?.("event", "view_item", { currency: content.currency, value: content.price, items: [item], language: content.locale });
  w.fbq?.("track", "ViewContent", {
    content_ids: [item.item_id],
    content_name: content.offer.title,
    content_type: "product",
    value: content.price,
    currency: content.currency,
  });
}

/* Clique de saída, não entrada no checkout: InitiateCheckout e Purchase ficam com o pixel da Kiwify/Hotmart. */
export function trackCheckoutClick(content: SalesContent, position: string) {
  const w = window as AnalyticsWindow;
  const params = { language: content.locale, position, platform: content.platform.toLowerCase() };
  w.gtag?.("event", "checkout_click", { ...params, transport_type: "beacon" });
  w.fbq?.("trackCustom", "CheckoutClick", params);
}
