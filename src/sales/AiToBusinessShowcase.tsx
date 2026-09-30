import { useEffect, useRef, useState } from "react";
import { projects, type PortfolioProject } from "../data/portfolio";

const showcaseIds = ["grupofvt", "gabilazz", "pipocrunch", "guacamole", "raven"] as const;

const showcaseProjects = showcaseIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is PortfolioProject => Boolean(project));

type ShowcaseProps = {
  locale: "pt-br" | "en";
};

export function AiToBusinessShowcase({ locale }: ShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const isPt = locale === "pt-br";

  const copy = isPt
    ? {
        tag: "AI TO BUSINESS NA PRÁTICA",
        title: "Projetos reais. Entregas que saíram da ideia para a tela.",
        desc: "Sites e experiências digitais desenvolvidos no ecossistema cub4Studio. Alguns estão publicados para clientes; outros são projetos de portfólio. O ponto em comum é o processo: briefing, IA, direção humana, revisão e entrega.",
        prev: "Projetos anteriores",
        next: "Próximos projetos",
        live: "Publicado",
        concept: "Projeto de portfólio",
        visit: "Visitar projeto",
        deliverables: "Entregas",
        carousel: "Carrossel de projetos",
        goTo: (position: number) => `Ir para o projeto ${position}`,
      }
    : {
        tag: "AI TO BUSINESS IN PRACTICE",
        title: "Real projects. Work that moved from idea to screen.",
        desc: "Websites and digital experiences built across the cub4Studio ecosystem. Some are live client projects; others are portfolio builds. The common thread is the workflow: brief, AI, human direction, review, and delivery.",
        prev: "Previous projects",
        next: "Next projects",
        live: "Live",
        concept: "Portfolio project",
        visit: "Visit project",
        deliverables: "Deliverables",
        carousel: "Project carousel",
        goTo: (position: number) => `Go to project ${position}`,
      };

  const cardsOf = (track: HTMLElement) => Array.from(track.querySelectorAll<HTMLElement>(".sp-practice-card"));

  const indexFromScroll = (track: HTMLElement) => {
    const cards = cardsOf(track);
    if (!cards.length) return 0;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll <= 1) return 0;
    if (track.scrollLeft >= maxScroll - 4) return cards.length - 1;
    return cards.reduce(
      (best, card, i) => {
        const distance = Math.abs(card.offsetLeft - cards[0].offsetLeft - track.scrollLeft);
        return distance < best.distance ? { i, distance } : best;
      },
      { i: 0, distance: Number.POSITIVE_INFINITY },
    ).i;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setIndex(indexFromScroll(track));
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (nextIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = cardsOf(track);
    if (!cards.length) return;
    const next = Math.max(0, Math.min(cards.length - 1, nextIndex));
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const offset = cards[next].offsetLeft - cards[0].offsetLeft;
    const target = next >= cards.length - 1 ? maxScroll : Math.min(maxScroll, offset);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    setIndex(next);
  };

  return (
    <section className="section sp-section sp-practice" aria-labelledby="sp-practice-title">
      <div className="container">
        <div className="sp-practice__head">
          <div>
            <p className="section-tag">{copy.tag}</p>
            <h2 className="section-title" id="sp-practice-title">
              {copy.title}
            </h2>
            <p className="section-desc">{copy.desc}</p>
          </div>
          <div className="sp-practice__controls" aria-label={copy.tag}>
            <button
              type="button"
              className="carousel-btn"
              aria-label={copy.prev}
              disabled={index <= 0}
              onClick={() => goTo(index - 1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="carousel-btn"
              aria-label={copy.next}
              disabled={index >= showcaseProjects.length - 1}
              onClick={() => goTo(index + 1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sp-practice__viewport">
        <div className="sp-practice__track" ref={trackRef} tabIndex={0} role="group" aria-label={copy.carousel}>
          {showcaseProjects.map((project) => {
            const live = Boolean(project.live && project.url);
            const card = (
              <>
                <div className="sp-practice-card__visual">
                  <div className="sp-practice-card__browser" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <img
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    width={900}
                    height={560}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={`sp-practice-card__status${live ? " is-live" : ""}`}>
                    <span aria-hidden="true" />
                    {live ? copy.live : copy.concept}
                  </span>
                </div>
                <div className="sp-practice-card__body">
                  <div className="sp-practice-card__meta">
                    <span>{project.tag}</span>
                    {project.domain ? <span>{project.domain}</span> : null}
                  </div>
                  <h3>{project.cardTitle}</h3>
                  <p>{project.summary}</p>
                  <div className="sp-practice-card__deliverables" aria-label={copy.deliverables}>
                    {project.deliverables.slice(0, 3).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  {live ? <span className="sp-practice-card__link">{copy.visit} ↗</span> : null}
                </div>
              </>
            );

            return live ? (
              <a
                className="sp-practice-card"
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.visit}: ${project.title}`}
              >
                {card}
              </a>
            ) : (
              <article className="sp-practice-card" key={project.id}>
                {card}
              </article>
            );
          })}
        </div>
      </div>

      <div className="sp-practice__dots" role="tablist" aria-label={copy.carousel}>
        {showcaseProjects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            className={`carousel-dot${i === index ? " is-active" : ""}`}
            role="tab"
            aria-selected={i === index}
            aria-label={copy.goTo(i + 1)}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
