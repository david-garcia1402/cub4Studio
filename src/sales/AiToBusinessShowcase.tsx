import { useRef } from "react";
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
      };

  const scroll = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".sp-practice-card"));
    if (!cards.length) return;
    const current = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft - track.clientLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    const nextIndex = Math.max(0, Math.min(cards.length - 1, current.index + direction));
    const target = cards[nextIndex];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
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
            <button type="button" className="carousel-btn" aria-label={copy.prev} onClick={() => scroll(-1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="carousel-btn" aria-label={copy.next} onClick={() => scroll(1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sp-practice__viewport">
        <div className="sp-practice__track" ref={trackRef}>
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
    </section>
  );
}
