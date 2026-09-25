import { site } from "../data/site";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Fbq;
  _fbq?: Fbq;
};

export function initAnalytics() {
  const w = window as AnalyticsWindow;

  if (site.ga4 && !w.gtag) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${site.ga4}`;
    document.head.appendChild(script);
    w.dataLayer = w.dataLayer || [];
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args);
    };
    w.gtag("js", new Date());
    w.gtag("config", site.ga4);
  }

  if (!site.metaPixel || w.fbq) return;

  const fbq = function pixel(this: Fbq, ...args: unknown[]) {
    const api = pixel as Fbq;
    if (api.callMethod) api.callMethod(...args);
    else api.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  w.fbq = fbq;
  w._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", site.metaPixel);
  fbq("track", "PageView");
}
