import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "../data/site";
import { Brand, Chevron, InstagramIcon } from "../components/ui/Icons";
import { Lightbox, type LightboxImage } from "../components/ui/Lightbox";
import { Reveal } from "../components/ui/Reveal";
import { PROMO_ENDS_AT, SUPPORT_CONTACT } from "./config";
import { AiToBusinessShowcase } from "./AiToBusinessShowcase";
import type { SalesContent } from "./content";
import { buildCheckoutUrl, initSalesTracking, trackCheckoutClick } from "./tracking";

type CtaProps = { content: SalesContent; href: string; position: string; label: string; size?: "lg" | "md" };

function CheckoutCta({ content, href, position, label, size = "lg" }: CtaProps) {
  if (!href) return <p className="sp-unavailable">{content.unavailable}</p>;
  return (
    <a
      className={`btn btn--primary sp-cta${size === "lg" ? " btn--lg" : ""}`}
      href={href}
      rel="noopener"
      data-position={position}
      onClick={() => trackCheckoutClick(content, position)}
    >
      {label}
      <span aria-hidden="true" className="sp-cta__arrow">
        →
      </span>
    </a>
  );
}

function nextDeadline() {
  if (PROMO_ENDS_AT) {
    const fixed = Date.parse(PROMO_ENDS_AT);
    return Number.isNaN(fixed) ? 0 : fixed;
  }
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

function useCountdown() {
  const [deadline, setDeadline] = useState(nextDeadline);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (!PROMO_ENDS_AT && current >= deadline) setDeadline(nextDeadline());
    }, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);
  return Math.max(0, deadline - now);
}

function PromoBar({ content, href }: { content: SalesContent; href: string }) {
  const remaining = useCountdown();
  if (!href || !content.priceLabel || remaining <= 0) return null;
  const { promo } = content;
  const total = Math.floor(remaining / 1000);
  const parts = [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60];
  return (
    <div className="sp-promo">
      <a className="container sp-promo__inner" href={href} rel="noopener" data-position="promo" onClick={() => trackCheckoutClick(content, "promo")}>
        <span className="sp-promo__label">
          <span className="sp-promo__pulse" aria-hidden="true" />
          {promo.label}
        </span>
        <span className="sp-promo__price">
          {content.compareAtLabel ? (
            <>
              {promo.from} <s>{content.compareAtLabel}</s>{" "}
            </>
          ) : null}
          {promo.to} <strong>{content.priceLabel}</strong>
        </span>
        <span className="sp-promo__timer" role="timer" aria-live="off">
          <span className="sp-promo__ends">{promo.endsIn}</span>
          <span className="sp-promo__clock">
            {parts.map((value, i) => (
              <span key={promo.units[i]} className="sp-promo__unit">
                <b>{String(value).padStart(2, "0")}</b>
                {promo.units[i]}
              </span>
            ))}
          </span>
        </span>
        <span className="sp-promo__cta" aria-hidden="true">
          {promo.cta} →
        </span>
      </a>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SalesPage({ content }: { content: SalesContent }) {
  const search = typeof window === "undefined" ? "" : window.location.search;
  const checkoutHref = useMemo(() => buildCheckoutUrl(content.checkoutUrl, content.trackingParams, search), [content, search]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  const pages: LightboxImage[] = useMemo(
    () => [
      { src: `${content.assets}/${content.cover}.webp`, alt: content.hero.coverAlt, caption: content.hero.coverAlt },
      ...content.inside.items.map((item) => ({ src: `${content.assets}/${item.file}.webp`, alt: item.alt, caption: `${item.title}: ${item.caption}` })),
    ],
    [content],
  );

  useEffect(() => {
    initSalesTracking(content);
  }, [content]);

  useEffect(() => {
    if (!checkoutHref || !("IntersectionObserver" in window)) return;
    const seen = new Map<Element, boolean>();
    const hero = heroCtaRef.current;
    const blockers = [offerRef.current, closingRef.current, document.querySelector(".sp-footer")].filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => seen.set(entry.target, entry.isIntersecting));
      const heroPassed = hero ? !seen.get(hero) && hero.getBoundingClientRect().bottom < 0 : false;
      const blocked = blockers.some((el) => seen.get(el));
      setStickyVisible(heroPassed && !blocked);
    });
    if (hero) observer.observe(hero);
    blockers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [checkoutHref]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft;
        let best = 0;
        cards.forEach((card, i) => {
          if (Math.abs(card.offsetLeft - track.offsetLeft - left) < Math.abs(cards[best].offsetLeft - track.offsetLeft - left)) best = i;
        });
        setSlide(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goToSlide = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const total = content.inside.items.length;
  const switcherHref = `${content.alternateUrl}${search}`;
  const homeLabel = content.locale === "en" ? "cub4Studio - home" : "cub4Studio - início";

  return (
    <>
      <a className="sp-skip" href="#conteudo">
        {content.skipLink}
      </a>
      <div className="bg-glow bg-glow--one sp-glow" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <header className="site-header sp-header">
        <PromoBar content={content} href={checkoutHref} />
        <div className="container header-inner">
          <Brand href="/" label={homeLabel} />
          <nav className="sp-lang" aria-label={content.switcherLabel}>
            <span className="sp-lang__item is-current" aria-current="page" lang={content.htmlLang}>
              {content.locale === "en" ? "EN" : "PT-BR"}
            </span>
            <a className="sp-lang__item" href={switcherHref} hrefLang={content.locale === "en" ? "pt-BR" : "en-US"} lang={content.locale === "en" ? "pt-BR" : "en-US"}>
              {content.alternateLabel}
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="sp-hero">
          <div className="container sp-hero__grid">
            <div className="sp-hero__copy">
              <p className="eyebrow">
                <span className="dot"></span> {content.hero.eyebrow}
              </p>
              <h1>{content.hero.title}</h1>
              <p className="sp-lead">{content.hero.lead}</p>
              <div className="sp-tools">
                <span className="sp-tools__label">{content.tools.label}</span>
                <ul className="sp-tools__list">
                  {content.tools.items.map((tool) => (
                    <li key={tool.name}>
                      <img src={tool.logo} width={20} height={20} alt="" decoding="async" />
                      <span>{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sp-peek">
                <button type="button" className="sp-peek__cover" onClick={() => setLightbox(0)} aria-label={`${content.inside.open}: ${content.hero.coverAlt}`}>
                  <img src={`${content.assets}/${content.cover}-480.webp`} width={480} height={723} alt="" decoding="async" />
                </button>
                <p className="sp-peek__text">
                  <strong>{content.hero.badge}</strong>
                  <span>{content.hero.peek}</span>
                </p>
              </div>
              <ul className="sp-bullets">
                {content.hero.bullets.map((bullet) => (
                  <li key={bullet}>
                    <CheckIcon />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="sp-hero__cta" ref={heroCtaRef}>
                <CheckoutCta content={content} href={checkoutHref} position="hero" label={content.hero.cta} />
                {checkoutHref ? (
                  <p className="sp-cta-note">
                    {content.priceLabel && content.compareAtLabel ? <s className="sp-was">{content.compareAtLabel}</s> : null}
                    {content.priceLabel ? <strong>{content.priceLabel}</strong> : null}
                    {content.priceLabel && content.offer.taxes ? ` ${content.offer.taxes}` : null}
                    {content.priceLabel ? " · " : null}
                    {content.hero.note}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="sp-hero__visual">
              <button type="button" className="sp-cover" onClick={() => setLightbox(0)} aria-label={`${content.inside.open}: ${content.hero.coverAlt}`}>
                <img
                  src={`${content.assets}/${content.cover}-480.webp`}
                  srcSet={`${content.assets}/${content.cover}-480.webp 480w, ${content.assets}/${content.cover}-720.webp 720w`}
                  sizes="(max-width: 560px) 72vw, (max-width: 960px) 360px, 420px"
                  width={480}
                  height={723}
                  alt={content.hero.coverAlt}
                  fetchPriority="high"
                  decoding="async"
                />
              </button>
              <span className="sp-cover__badge">{content.hero.badge}</span>
            </div>
          </div>
        </section>

        <AiToBusinessShowcase locale={content.locale} />

        <div className="sp-facts">
          <ul className="container sp-facts__list">
            {content.facts.map((fact) => (
              <li key={fact.label}>
                <span className="sp-facts__value">{fact.value}</span>
                <span className="sp-facts__label">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <section className="section sp-section" aria-labelledby="sp-tracks">
          <div className="container">
            <Reveal>
              <p className="section-tag">{content.tracks.tag}</p>
              <h2 className="section-title" id="sp-tracks">
                {content.tracks.title}
              </h2>
              <p className="section-desc">{content.tracks.desc}</p>
            </Reveal>
            <ul className="sp-tracks">
              {content.tracks.items.map((track) => (
                <li key={track.code} className={`sp-track${track.highlight ? " is-highlight" : ""}`}>
                  <div className="sp-track__head">
                    <span className="sp-track__code" aria-hidden="true">
                      {track.code}
                    </span>
                    <span className="sp-track__level">{track.level}</span>
                  </div>
                  <h3>{track.title}</h3>
                  <p>{track.text}</p>
                </li>
              ))}
            </ul>
            <p className="sp-footnote">{content.tracks.note}</p>
          </div>
        </section>

        <section className="section section--alt sp-section" aria-labelledby="sp-inside">
          <div className="container">
            <div className="sp-inside__head">
              <div>
                <p className="section-tag">{content.inside.tag}</p>
                <h2 className="section-title" id="sp-inside">
                  {content.inside.title}
                </h2>
                <p className="section-desc">{content.inside.desc}</p>
              </div>
              <div className="sp-inside__controls">
                <button type="button" className="carousel-btn" aria-label={content.inside.prev} disabled={slide <= 0} onClick={() => goToSlide(slide - 1)}>
                  <Chevron dir="left" />
                </button>
                <button type="button" className="carousel-btn" aria-label={content.inside.next} disabled={slide >= total - 1} onClick={() => goToSlide(slide + 1)}>
                  <Chevron dir="right" />
                </button>
              </div>
            </div>
          </div>
          <div className="sp-inside__viewport">
            <div
              className="sp-inside__track"
              ref={trackRef}
              tabIndex={0}
              role="region"
              aria-label={content.inside.title}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  goToSlide(Math.min(total - 1, slide + 1));
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  goToSlide(Math.max(0, slide - 1));
                }
              }}
            >
              {content.inside.items.map((item, i) => (
                <figure key={item.file} className="sp-page">
                  <button type="button" className="sp-page__open" onClick={() => setLightbox(i + 1)} aria-label={`${content.inside.open}: ${item.title}`}>
                    <img src={`${content.assets}/${item.file}-crop.webp`} alt={item.alt} width={720} height={500} loading="lazy" decoding="async" />
                    <span className="sp-page__zoom" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                        <path d="m16 16 4 4M11 8.5v5M8.5 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="sp-inside__dots" aria-hidden="true">
              {content.inside.items.map((item, i) => (
                <span key={item.file} className={`sp-inside__dot${i === slide ? " is-active" : ""}`} />
              ))}
            </div>
            <p className="sp-footnote">{content.inside.fictional}</p>
          </div>
        </section>

        <section className="section sp-section" aria-labelledby="sp-receive">
          <div className="container">
            <Reveal>
              <p className="section-tag">{content.receive.tag}</p>
              <h2 className="section-title" id="sp-receive">
                {content.receive.title}
              </h2>
              <p className="section-desc">{content.receive.desc}</p>
            </Reveal>
            <ul className="sp-receive">
              {content.receive.items.map((item) => (
                <li key={item.title}>
                  <span className="sp-receive__icon">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sp-notes">
              <p>{content.receive.rights}</p>
              <p>{content.receive.notIncluded}</p>
            </div>
          </div>
        </section>

        <section className="section section--alt sp-section" id="oferta" aria-labelledby="sp-offer" ref={offerRef}>
          <div className="container">
            <div className="sp-offer">
              <div className="sp-offer__intro">
                <p className="section-tag">{content.offer.tag}</p>
                <h2 className="section-title" id="sp-offer">
                  {content.offer.title}
                </h2>
                <p className="sp-offer__name">{content.offer.name}</p>
                <ul className="sp-offer__list">
                  {content.offer.includes.map((line) => (
                    <li key={line}>
                      <CheckIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sp-offer__card">
                <img
                  className="sp-offer__cover"
                  src={`${content.assets}/${content.cover}-480.webp`}
                  width={480}
                  height={723}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {content.priceLabel ? (
                  <div className="sp-price">
                    <span className="sp-price__caption">{content.offer.priceCaption}</span>
                    {content.compareAtLabel ? (
                      <span className="sp-price__was">
                        {content.promo.from} <s>{content.compareAtLabel}</s>
                      </span>
                    ) : null}
                    <span className="sp-price__value">{content.priceLabel}</span>
                    {content.offer.taxes ? <span className="sp-price__taxes">{content.offer.taxes}</span> : null}
                  </div>
                ) : null}
                <CheckoutCta content={content} href={checkoutHref} position="offer" label={content.offer.cta} />
                {content.guarantee ? <p className="sp-offer__guarantee">{content.guarantee}</p> : null}
                <p className="sp-offer__note">{content.offer.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section sp-section" aria-labelledby="sp-faq">
          <div className="container sp-faq__wrap">
            <p className="section-tag">{content.faq.tag}</p>
            <h2 className="section-title" id="sp-faq">
              {content.faq.title}
            </h2>
            <div className="sp-faq">
              {content.faq.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-closing" aria-labelledby="sp-closing" ref={closingRef}>
          <div className="container sp-closing__inner">
            <h2 id="sp-closing">{content.closing.title}</h2>
            <p>{content.closing.text}</p>
            <CheckoutCta content={content} href={checkoutHref} position="closing" label={content.closing.cta} />
            {checkoutHref && content.priceLabel ? (
              <p className="sp-cta-note">
                <strong>{content.priceLabel}</strong>
                {content.offer.taxes ? ` ${content.offer.taxes}` : null} · {content.hero.note}
              </p>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="site-footer sp-footer">
        <div className="container sp-footer__inner">
          <div className="sp-footer__brand">
            <Brand href="/" label={homeLabel} />
            <p>
              {content.footer.developed} ·{" "}
              <a href={site.instagram} target="_blank" rel="noopener" className="sp-footer__ig">
                <InstagramIcon size={16} /> {site.instagramHandle}
              </a>
            </p>
          </div>
          <div className="sp-footer__meta">
            {SUPPORT_CONTACT ? (
              <p>
                {content.footer.support}:{" "}
                <a href={`mailto:${SUPPORT_CONTACT}`} className="sp-footer__link">
                  {SUPPORT_CONTACT}
                </a>
              </p>
            ) : null}
            <p>{content.footer.legal}</p>
            <p>{content.tools.disclaimer}</p>
            <ul className="sp-footer__links">
              {content.footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener" className="sp-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} {content.footer.rights}
          </p>
        </div>
      </footer>

      {checkoutHref ? (
        <div className={`sp-sticky${stickyVisible ? " is-visible" : ""}`} aria-hidden={!stickyVisible} inert={!stickyVisible}>
          <a className="btn btn--primary sp-sticky__btn" href={checkoutHref} rel="noopener" tabIndex={stickyVisible ? 0 : -1} onClick={() => trackCheckoutClick(content, "sticky")}>
            <span>{content.sticky}</span>
            {content.priceLabel ? (
              <span className="sp-sticky__price">
                {content.compareAtLabel ? <s className="sp-sticky__was">{content.compareAtLabel}</s> : null}
                {content.priceLabel}
              </span>
            ) : null}
          </a>
        </div>
      ) : null}

      {lightbox !== null ? <Lightbox images={pages} start={lightbox} onClose={closeLightbox} labels={content.lightbox} zoomable /> : null}
    </>
  );
}
