import { useEffect, useRef, useState } from "react";
import {
  campaignCaption,
  campaignChips,
  campaignKicker,
  campaignNiches,
  campaignPhotos,
  campaignSites,
} from "../data/campaign";
import { trackLead, whatsappHref } from "../lib/whatsapp";
import { Chevron } from "./ui/Icons";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Campaign() {
  const [nicheIndex, setNicheIndex] = useState(0);
  const [siteIndex, setSiteIndex] = useState(0);
  const sitesRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const niche = campaignNiches[nicheIndex];

  useEffect(() => {
    const prev = document.title;
    document.title = `cub4Studio — ${niche.niche}`;
    return () => {
      document.title = prev;
    };
  }, [niche.niche]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setNicheIndex((i) => Math.min(campaignNiches.length - 1, i + 1));
      if (event.key === "ArrowLeft") setNicheIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goNiche = (next: number) => {
    setNicheIndex(Math.max(0, Math.min(campaignNiches.length - 1, next)));
  };

  const scrollRow = (row: HTMLDivElement | null, dir: -1 | 1) => {
    if (!row) return;
    const card = row.querySelector<HTMLElement>("[data-snap]");
    const delta = (card?.offsetWidth ?? row.clientWidth * 0.72) + 12;
    row.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  useEffect(() => {
    const row = sitesRef.current;
    if (!row) return;
    const cards = [...row.querySelectorAll<HTMLElement>("[data-snap]")];
    const onScroll = () => {
      const left = row.scrollLeft;
      let best = 0;
      let bestDistance = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft - left);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setSiteIndex(best);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="campaign">
      <p className="campaign-note">
        Protótipo de anúncio · Stories 9:16. O rodapé fica acima da faixa que o Instagram cobre no celular.
      </p>

      <div className="campaign-phone">
        <div className="campaign-story">
          <div className="campaign-bars" aria-hidden="true">
            {campaignNiches.map((item, i) => (
              <span key={item.id} className={i <= nicheIndex ? "is-on" : undefined} />
            ))}
          </div>

          <header className="campaign-top">
            <a className="campaign-brand" href="/" aria-label="cub4Studio">
              <img src="/img/icon-transparent.png" alt="" />
              <span>
                cub<span>4</span>Studio
              </span>
            </a>
            <p className="campaign-count">
              {pad(nicheIndex + 1)} / {pad(campaignNiches.length)}
            </p>
          </header>

          <div className="campaign-copy">
            <p className="campaign-kicker">{campaignKicker}</p>
            <h1>{niche.niche}</h1>
          </div>

          <section className="campaign-sites" aria-label="Previews de sites do portfólio">
            <div className="campaign-rowhead">
              <p>Portfólio selecionado</p>
              <div className="campaign-rownav">
                <button type="button" aria-label="Site anterior" onClick={() => scrollRow(sitesRef.current, -1)}>
                  <Chevron dir="left" />
                </button>
                <button type="button" aria-label="Próximo site" onClick={() => scrollRow(sitesRef.current, 1)}>
                  <Chevron dir="right" />
                </button>
              </div>
            </div>
            <div className="campaign-scroller" ref={sitesRef}>
              {campaignSites.map((site, i) => (
                <article className="campaign-browser" data-snap key={site.src} aria-current={i === siteIndex}>
                  <div className="campaign-browser__bar">
                    <span />
                    <span />
                    <span />
                    <small>{site.domain}</small>
                  </div>
                  <img src={site.src} alt={site.alt} />
                  <p>{site.name}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="campaign-photos" aria-label="Fotos dos projetos">
            <div className="campaign-rowhead">
              <p>Por trás do site</p>
              <div className="campaign-rownav">
                <button type="button" aria-label="Foto anterior" onClick={() => scrollRow(photosRef.current, -1)}>
                  <Chevron dir="left" />
                </button>
                <button type="button" aria-label="Próxima foto" onClick={() => scrollRow(photosRef.current, 1)}>
                  <Chevron dir="right" />
                </button>
              </div>
            </div>
            <div className="campaign-scroller campaign-scroller--photos" ref={photosRef}>
              {campaignPhotos.map((photo) => (
                <figure data-snap key={photo.src}>
                  <img src={photo.src} alt={photo.alt} />
                </figure>
              ))}
            </div>
          </section>

          <footer className="campaign-foot">
            <ul className="campaign-chips">
              {campaignChips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
            <a
              className="campaign-cta"
              href={whatsappHref(niche.cta)}
              target="_blank"
              rel="noopener"
              onClick={() => trackLead("campanha", niche.niche)}
            >
              {niche.cta} <span aria-hidden="true">→</span>
            </a>
            <p className="campaign-caption">{campaignCaption}</p>
            <div className="campaign-dots" role="tablist" aria-label="Segmento do anúncio">
              {campaignNiches.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === nicheIndex}
                  aria-label={item.niche}
                  onClick={() => goNiche(i)}
                />
              ))}
            </div>
          </footer>

          <div className="campaign-unsafe" aria-hidden="true">
            <span>botão do Instagram</span>
          </div>
        </div>
      </div>

      <div className="campaign-switch">
        <button type="button" onClick={() => goNiche(nicheIndex - 1)} disabled={nicheIndex === 0}>
          Segmento anterior
        </button>
        <button type="button" onClick={() => goNiche(nicheIndex + 1)} disabled={nicheIndex === campaignNiches.length - 1}>
          Próximo segmento
        </button>
      </div>
    </div>
  );
}
