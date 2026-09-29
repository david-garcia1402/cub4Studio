import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

export const VIEWPORT = { width: 390, height: 760 };
const FPS = 30;
// Slow motion while capturing: CSS animations and JS timers run SLOWMO times slower than the
// wall clock, so every screenshot fits inside its frame budget and motion stays smooth at 30fps.
const SLOWMO = 3;
const DPR = 2.5;

const TIME_DILATION = `(() => {
  const realPerf = performance.now.bind(performance);
  const realDate = Date.now;
  let rate = 1, realBase = 0, virtBase = 0, dateBase = 0;
  const virt = () => virtBase + (realPerf() - realBase) * rate;
  const perfOffset = realDate() - realPerf();
  performance.now = () => virt();
  Date.now = () => Math.round(dateBase ? dateBase + (virt() - virtBase) : realDate());
  const rawTimeout = window.setTimeout.bind(window), rawInterval = window.setInterval.bind(window);
  window.setTimeout = (fn, ms = 0, ...a) => rawTimeout(fn, (Number(ms) || 0) / rate, ...a);
  window.setInterval = (fn, ms = 0, ...a) => rawInterval(fn, (Number(ms) || 0) / rate, ...a);
  const rawRaf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => rawRaf(() => cb(virt()));
  window.__dilate = (r) => {
    virtBase = virt(); realBase = realPerf(); dateBase = virtBase + perfOffset; rate = r;
  };

  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const animateScroll = (el, left, top) => {
    const sx = el.scrollLeft, sy = el.scrollTop, t0 = performance.now(), d = 420;
    const snap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / d), e = ease(k);
      el.scrollLeft = sx + (left - sx) * e;
      el.scrollTop = sy + (top - sy) * e;
      if (k < 1) requestAnimationFrame(step); else el.style.scrollSnapType = snap;
    };
    requestAnimationFrame(step);
  };
  const target = (el) => (el === window || el === document.documentElement || el === document.body ? document.scrollingElement : el);
  const smooth = (o) => o && typeof o === "object" && o.behavior === "smooth";
  const patch = (proto, isWin) => {
    const rawTo = proto.scrollTo, rawBy = proto.scrollBy;
    proto.scrollTo = function (a, b) {
      if (!smooth(a)) return rawTo.call(this, a, b);
      const el = target(isWin ? window : this);
      animateScroll(el, a.left ?? el.scrollLeft, a.top ?? el.scrollTop);
    };
    proto.scrollBy = function (a, b) {
      if (!smooth(a)) return rawBy.call(this, a, b);
      const el = target(isWin ? window : this);
      animateScroll(el, el.scrollLeft + (a.left || 0), el.scrollTop + (a.top || 0));
    };
  };
  patch(Element.prototype, false);
  patch(window, true);
  const rawIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (o) {
    if (!smooth(o)) return rawIntoView.call(this, o);
    let p = this.parentElement;
    while (p && !(p.scrollWidth > p.clientWidth + 2 && /auto|scroll/.test(getComputedStyle(p).overflowX))
      && !(p.scrollHeight > p.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(p).overflowY))) p = p.parentElement;
    const sc = p || document.scrollingElement;
    const r = this.getBoundingClientRect(), pr = p ? p.getBoundingClientRect() : { left: 0, top: 0 };
    const inline = o.inline || "nearest", block = o.block || "start";
    let left = sc.scrollLeft, top = sc.scrollTop;
    if (p && p.scrollWidth > p.clientWidth + 2) left += r.left - pr.left - (inline === "center" ? (p.clientWidth - r.width) / 2 : 0);
    else top += r.top - pr.top - (block === "center" ? (innerHeight - r.height) / 2 : 0);
    animateScroll(sc, left, top);
  };
  const rawFocus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function (o) {
    return rawFocus.call(this, { ...(o || {}), preventScroll: true });
  };
  window.open = () => null;
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (/^(https?:|mailto:|tel:)/.test(href) && !href.startsWith(location.origin)) e.preventDefault();
  }, true);
  const style = () => {
    const s = document.createElement("style");
    s.textContent = "html,body,*{scroll-behavior:auto!important}::-webkit-scrollbar{display:none}";
    document.documentElement.appendChild(s);
  };
  if (document.documentElement) style(); else document.addEventListener("DOMContentLoaded", style);
})();`;

const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export async function captureClip(browser, name, clip, outDir) {
  const dir = join(outDir, name);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  );
  await page.setViewport({ ...VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true });
  await page.evaluateOnNewDocument(TIME_DILATION);
  if (clip.setup) await page.evaluateOnNewDocument(clip.setup);
  const cdp = await page.createCDPSession();
  await page.goto(clip.url, { waitUntil: "networkidle2", timeout: 90000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const h = document.scrollingElement.scrollHeight;
    for (let y = 0; y < h; y += 500) {
      document.scrollingElement.scrollTop = y;
      await new Promise((r) => setTimeout(r, 60));
    }
    document.scrollingElement.scrollTop = 0;
    await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
  });
  if (clip.prepare) await clip.prepare(page);
  await new Promise((r) => setTimeout(r, 1200));

  await cdp.send("Animation.enable");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 / SLOWMO });
  await page.evaluate((r) => window.__dilate(r), 1 / SLOWMO);

  const cues = [];
  const taps = [];
  const writes = [];
  let frame = 0;
  const frameWall = (1000 / FPS) * SLOWMO;
  let start = 0;

  const shot = async () => {
    if (!start) start = performance.now();
    const due = start + frame * frameWall;
    const wait = due - performance.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 90, optimizeForSpeed: true });
    frame += 1;
    writes.push(writeFile(join(dir, `${String(frame).padStart(5, "0")}.jpg`), Buffer.from(data, "base64")));
  };

  const scrollY = () => page.evaluate(() => document.scrollingElement.scrollTop);
  // "text=Rótulo" busca botões/links pelo texto; seletores CSS preferem o primeiro elemento visível.
  const elInfo = (sel) =>
    page.evaluate((s) => {
      const all = s.startsWith("text=")
        ? [...document.querySelectorAll("button, a, [role=button], label")].filter((e) => e.textContent.trim().replace(/\s+/g, " ").includes(s.slice(5)))
        : [...document.querySelectorAll(s)];
      const visible = (e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
      };
      const el = all.find(visible) || all[0];
      if (!el) return null;
      document.querySelectorAll("[data-captarget]").forEach((e) => e.removeAttribute("data-captarget"));
      el.setAttribute("data-captarget", "");
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top + scrollY, h: r.height };
    }, sel);

  const api = {
    page,
    get frame() {
      return frame;
    },
    async wait(sec) {
      const n = Math.round(sec * FPS);
      for (let i = 0; i < n; i++) await shot();
    },
    async scroll(to, sec = 1.2, { offset = 0 } = {}) {
      let y1 = to;
      if (typeof to === "string") {
        const info = await elInfo(to);
        if (!info) throw new Error(`scroll target not found: ${to}`);
        y1 = info.top + offset;
      }
      const y0 = await scrollY();
      const n = Math.max(1, Math.round(sec * FPS));
      for (let i = 1; i <= n; i++) {
        const y = y0 + (y1 - y0) * easeInOut(i / n);
        await page.evaluate((v) => (document.scrollingElement.scrollTop = v), y);
        await shot();
      }
    },
    async hswipe(sel, dx, sec = 0.7) {
      const start = await page.evaluate((s, d) => {
        const el = document.querySelector(s);
        el.dataset.snap = getComputedStyle(el).scrollSnapType;
        el.style.scrollSnapType = "none";
        return { x0: el.scrollLeft, x1: Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + d) };
      }, sel, dx);
      const info = await elInfo(sel);
      const n = Math.max(1, Math.round(sec * FPS));
      taps.push({ f: frame, x: info.x + 90, y: info.y, swipe: -1, dur: sec });
      for (let i = 1; i <= n; i++) {
        const x = start.x0 + (start.x1 - start.x0) * easeInOut(i / n);
        await page.evaluate((s, v) => (document.querySelector(s).scrollLeft = v), sel, x);
        await shot();
      }
      await page.evaluate((s) => {
        const el = document.querySelector(s);
        el.style.scrollSnapType = "";
      }, sel);
    },
    async tap(target, { click = true, lead = 0.2 } = {}) {
      const info = typeof target === "string" ? await elInfo(target) : target;
      if (!info) throw new Error(`tap target not found: ${target}`);
      taps.push({ f: frame, x: info.x, y: info.y });
      cues.push({ f: frame, type: "sfx", value: "tap" });
      await api.wait(lead);
      if (click) {
        if (typeof target === "string") await page.evaluate(() => document.querySelector("[data-captarget]").click());
        else await page.touchscreen.tap(info.x, info.y);
      }
    },
    caption(value) {
      cues.push({ f: frame, type: "caption", value });
    },
    zoom(scale = 1, focus = 0.5) {
      cues.push({ f: frame, type: "zoom", value: { scale, focus } });
    },
    async key(name) {
      await page.keyboard.press(name);
    },
    eval: (fn, ...args) => page.evaluate(fn, ...args),
  };

  await clip.steps(api);
  await Promise.all(writes);
  await page.close();
  const meta = { name, url: clip.url, fps: FPS, frames: frame, viewport: VIEWPORT, dpr: DPR, cues, taps };
  await writeFile(join(dir, "meta.json"), JSON.stringify(meta, null, 2));
  return meta;
}
