import { useEffect, useRef, useState } from "react";
import { projects, projectById, type PortfolioImage, type PortfolioProject } from "../data/portfolio";
import { trackLead, whatsappHref } from "../lib/whatsapp";
import { Chevron, CloseIcon, ExternalIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

type Media = { type: "image" | "video"; src: string; alt: string };

export function Portfolio() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? projectById(openId) ?? null : null;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = [...viewport.querySelectorAll<HTMLElement>(".project-card")];
    if (!cards.length) return;

    const cardOffset = (i: number) => cards[i].offsetLeft - cards[0].offsetLeft;
    const maxScrollLeft = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const indexFromScroll = () => {
      const maxScroll = maxScrollLeft();
      const left = viewport.scrollLeft;
      if (maxScroll <= 1) return 0;
      if (left >= maxScroll - 4) return cards.length - 1;
      let best = 0;
      let bestDistance = Infinity;
      cards.forEach((_, i) => {
        const distance = Math.abs(cardOffset(i) - left);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      return best;
    };

    const goTo = (nextIndex: number) => {
      const next = Math.max(0, Math.min(cards.length - 1, nextIndex));
      const maxScroll = maxScrollLeft();
      const target = next >= cards.length - 1 ? maxScroll : Math.min(maxScroll, cardOffset(next));
      viewport.classList.add("is-jumping");
      viewport.scrollTo({ left: target, behavior: "smooth" });
      setIndex(next);
      window.setTimeout(() => viewport.classList.remove("is-jumping"), 450);
    };

    const onScroll = () => {
      if (viewport.classList.contains("is-jumping") || viewport.classList.contains("is-dragging")) return;
      setIndex(indexFromScroll());
    };

    let drag = { active: false, moved: false, startX: 0, startScroll: 0, pointerId: -1 };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const target = event.target as HTMLElement;
      if (target.closest(".project-card__link, .project-card__cta")) return;
      drag = { active: true, moved: false, startX: event.clientX, startScroll: viewport.scrollLeft, pointerId: event.pointerId };
      viewport.classList.remove("is-jumping");
    };
    const onMove = (event: PointerEvent) => {
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const delta = event.clientX - drag.startX;
      if (!drag.moved && Math.abs(delta) < 16) return;
      drag.moved = true;
      viewport.classList.add("is-dragging");
      viewport.scrollLeft = drag.startScroll - delta;
    };
    const onUp = (event: PointerEvent) => {
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const moved = drag.moved;
      drag.active = false;
      viewport.classList.remove("is-dragging");
      if (moved) goTo(indexFromScroll());
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const go = (delta: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = [...viewport.querySelectorAll<HTMLElement>(".project-card")];
    const next = Math.max(0, Math.min(cards.length - 1, index + delta));
    const cardOffset = cards[next].offsetLeft - cards[0].offsetLeft;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const target = next >= cards.length - 1 ? maxScroll : Math.min(maxScroll, cardOffset);
    viewport.classList.add("is-jumping");
    viewport.scrollTo({ left: target, behavior: "smooth" });
    setIndex(next);
    window.setTimeout(() => viewport.classList.remove("is-jumping"), 450);
  };

  return (
    <section className="section section--alt" id="portfolio">
      <div className="container">
        <div className="portfolio-head">
          <Reveal>
            <p className="section-tag">Portfólio</p>
            <h2 className="section-title">
              Projetos que <span className="text-gradient">mostram o estúdio</span>
            </h2>
            <p className="section-desc">
              Sites publicados, landing pages, criativos e vídeos gerados com IA — arraste o carrossel ou clique em um projeto para ver de perto.
            </p>
          </Reveal>
          <div className="carousel-controls">
            <button type="button" className="carousel-btn" aria-label="Projeto anterior" disabled={index <= 0} onClick={() => go(-1)}>
              <Chevron dir="left" />
            </button>
            <button type="button" className="carousel-btn" aria-label="Próximo projeto" disabled={index >= projects.length - 1} onClick={() => go(1)}>
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      </div>

      <div className="carousel-shell">
        <div className="carousel-viewport" ref={viewportRef}>
          <div className="carousel-track">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`project-card${project.featured ? " project-card--featured" : ""}`}
                tabIndex={0}
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest(".project-card__link")) return;
                  setOpenId(project.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setOpenId(project.id);
                  }
                }}
              >
                <div className={`project-card__media${project.portrait ? " project-card__media--portrait" : ""}`}>
                  <img src={project.images[0]?.src} alt={project.images[0]?.alt || project.title} />
                  <span className="project-card__tag">{project.tag}</span>
                  {project.live ? (
                    <span className="project-card__live">
                      <span className="project-card__live-dot" aria-hidden="true"></span> No ar
                    </span>
                  ) : null}
                  {project.play ? (
                    <span className="project-card__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7-11-7Z" />
                      </svg>
                    </span>
                  ) : null}
                </div>
                <div className="project-card__body">
                  {project.client ? <p className="project-card__client">{project.client}</p> : null}
                  <h3>{project.cardTitle}</h3>
                  <p>{project.summary}</p>
                  <div className="project-card__actions">
                    <button type="button" className="project-card__cta">
                      {project.cta || "Ver projeto"} <span aria-hidden="true">→</span>
                    </button>
                    {project.url && project.domain ? (
                      <a className="project-card__link" href={project.url} target="_blank" rel="noopener" aria-label={`Abrir ${project.domain} em nova aba`}>
                        {project.domain}
                        <ExternalIcon />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="carousel-dots" role="tablist" aria-label="Projetos do portfólio">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              className={`carousel-dot${i === index ? " is-active" : ""}`}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir para o projeto ${i + 1}`}
              onClick={() => go(i - index)}
            />
          ))}
        </div>
      </div>

      {open ? <ProjectModal key={open.id} project={open} onClose={() => setOpenId(null)} /> : null}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const media: Media[] = project.video
    ? [{ type: "video", src: project.video, alt: project.title }]
    : project.images.map((image) => ({ type: "image", src: image.src, alt: image.alt }));
  const current = media[mediaIndex];
  const images = media.filter((item) => item.type === "image");

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (!project || lightbox !== null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setMediaIndex((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight") setMediaIndex((value) => Math.min(media.length - 1, value + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, lightbox, media.length, onClose]);

  if (!current) return null;

  return (
    <>
      <div className="project-modal is-open" aria-hidden="false">
        <div className="project-modal__backdrop" onClick={onClose} />
        <div className="project-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
          <button ref={closeBtn} type="button" className="project-modal__close" aria-label="Fechar" onClick={onClose}>
            <CloseIcon />
          </button>
          <div className={`project-modal__gallery${images.length > 1 && !project.video ? " has-thumbs" : ""}`}>
            <div className={`project-modal__stage${current.type === "image" ? " is-zoomable" : ""}`}>
              {current.type === "video" ? (
                <iframe src={current.src} title={current.alt} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              ) : (
                <button type="button" className="project-modal__zoom" aria-label="Ampliar imagem em tela cheia" onClick={() => setLightbox(images.findIndex((item) => item.src === current.src))}>
                  <img src={current.src} alt={current.alt} draggable={false} />
                  <span className="project-modal__zoom-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Ampliar</span>
                  </span>
                </button>
              )}
            </div>
            {media.length > 1 ? (
              <>
                <button type="button" className="project-modal__nav project-modal__nav--prev" aria-label="Mídia anterior" disabled={mediaIndex <= 0} onClick={() => setMediaIndex((value) => value - 1)}>
                  <Chevron dir="left" />
                </button>
                <button type="button" className="project-modal__nav project-modal__nav--next" aria-label="Próxima mídia" disabled={mediaIndex >= media.length - 1} onClick={() => setMediaIndex((value) => value + 1)}>
                  <Chevron dir="right" />
                </button>
                <span className="project-modal__count">
                  {mediaIndex + 1} / {media.length}
                </span>
              </>
            ) : null}
            {images.length > 1 && !project.video ? (
              <div className="project-modal__thumbs">
                {images.map((image, i) => (
                  <button key={image.src} type="button" className={`project-modal__thumb${image.src === current.src ? " is-active" : ""}`} aria-label={`Ver imagem ${i + 1}`} onClick={() => setMediaIndex(i)}>
                    <img src={image.src} alt="" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <aside className="project-modal__info">
            <span className="badge">{project.tag}</span>
            <h3 id="projectModalTitle">{project.title}</h3>
            <p className="project-modal__lead">{project.lead}</p>
            <p className="project-modal__desc">{project.description}</p>
            <div className="project-modal__facts">
              {project.client ? (
                <div className="project-modal__fact">
                  <span>Cliente</span>
                  <p>{project.client}</p>
                </div>
              ) : null}
              <div className="project-modal__fact">
                <span>Entregas</span>
                <ul className="project-modal__chips">
                  {project.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="project-modal__fact">
                <span>Feito com</span>
                <p>{project.tools}</p>
              </div>
            </div>
            <div className="project-modal__actions">
              <a className="btn btn--primary" href={whatsappHref({ kind: "projeto", title: project.title, tag: project.tag })} target="_blank" rel="noopener" onClick={() => trackLead("whatsapp", project.title)}>
                Quero um projeto assim
              </a>
              {project.url ? (
                <a className="btn btn--ghost" href={project.url} target="_blank" rel="noopener">
                  {project.urlLabel || "Visitar site"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
      {lightbox !== null ? (
        <Lightbox images={images} start={lightbox} onClose={() => setLightbox(null)} onChange={(i) => setMediaIndex(i)} />
      ) : null}
    </>
  );
}

function Lightbox({
  images,
  start,
  onClose,
  onChange,
}: {
  images: PortfolioImage[];
  start: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(start);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const track = trackRef.current;
    const jump = () => {
      if (!track) return;
      track.scrollTo({ left: index * track.clientWidth, behavior: "auto" });
    };
    jump();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setIndex((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight") setIndex((value) => Math.min(images.length - 1, value + 1));
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", jump);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", jump);
    };
  }, [images.length, index, onClose]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * (track.clientWidth || 1), behavior: "smooth" });
    onChange(index);
  }, [index, onChange]);

  return (
    <div className="lightbox is-open" aria-hidden="false">
      <div className="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Galeria do projeto em tela cheia">
        <div className="lightbox__bar">
          <span className="lightbox__count">
            {index + 1} / {images.length}
          </span>
          <button type="button" className="lightbox__close" aria-label="Fechar galeria" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="lightbox__track" ref={trackRef} tabIndex={0} aria-live="polite">
          {images.map((image, i) => (
            <div key={image.src} className={`lightbox__slide${i === index ? " is-active" : ""}`} role="group" aria-label={`Imagem ${i + 1} de ${images.length}`}>
              <img src={image.src} alt={image.alt} draggable={false} />
            </div>
          ))}
        </div>
        {images.length > 1 ? (
          <>
            <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Imagem anterior" disabled={index <= 0} onClick={() => setIndex((value) => value - 1)}>
              <Chevron dir="left" />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Próxima imagem" disabled={index >= images.length - 1} onClick={() => setIndex((value) => value + 1)}>
              <Chevron dir="right" />
            </button>
          </>
        ) : null}
        <div className="lightbox__footer">
          <p className="lightbox__caption">{images[index]?.alt}</p>
        </div>
      </div>
    </div>
  );
}
