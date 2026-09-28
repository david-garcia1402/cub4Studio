import { useEffect, useRef, useState } from "react";
import { Chevron, CloseIcon } from "./Icons";

export type LightboxImage = { src: string; alt: string; caption?: string };

export type LightboxLabels = {
  dialog: string;
  close: string;
  prev: string;
  next: string;
  hint: string;
  dots: string;
  slide: (current: number, total: number) => string;
  goTo: (index: number) => string;
  zoomIn?: string;
  zoomOut?: string;
};

export const lightboxLabelsPt: LightboxLabels = {
  dialog: "Galeria do projeto em tela cheia",
  close: "Fechar galeria",
  prev: "Imagem anterior",
  next: "Próxima imagem",
  hint: "Arraste para o lado para ver mais",
  dots: "Imagens do projeto",
  slide: (current, total) => `Imagem ${current} de ${total}`,
  goTo: (index) => `Ir para a imagem ${index}`,
};

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export function Lightbox({
  images,
  start,
  onClose,
  onChange,
  labels = lightboxLabelsPt,
  zoomable = false,
}: {
  images: LightboxImage[];
  start: number;
  onClose: () => void;
  onChange?: (index: number) => void;
  labels?: LightboxLabels;
  zoomable?: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(start);
  const [zoomed, setZoomed] = useState(false);
  const [hint, setHint] = useState(() => Boolean(window.matchMedia?.("(pointer: coarse)").matches && images.length > 1));
  const indexRef = useRef(start);
  const zoomedRef = useRef(false);
  const programmatic = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    zoomedRef.current = zoomed;
  }, [zoomed]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => opener?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const track = trackRef.current;
    const jump = () => {
      if (!track) return;
      programmatic.current = true;
      track.scrollTo({ left: indexRef.current * track.clientWidth, behavior: "auto" });
      window.setTimeout(() => {
        programmatic.current = false;
      }, 80);
    };
    jump();
    const hintTimer = window.setTimeout(() => setHint(false), 2400);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoomedRef.current) setZoomed(false);
        else onClose();
      }
      if (event.key === "ArrowLeft" && !zoomedRef.current) setIndex((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight" && !zoomedRef.current) setIndex((value) => Math.min(images.length - 1, value + 1));
      if (event.key === "Tab" && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", jump);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", jump);
      window.clearTimeout(hintTimer);
    };
  }, [images.length, onClose]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    programmatic.current = true;
    setZoomed(false);
    track.scrollTo({ left: index * (track.clientWidth || 1), behavior: "smooth" });
    const timer = window.setTimeout(() => {
      programmatic.current = false;
    }, 420);
    onChange?.(index);
    return () => window.clearTimeout(timer);
  }, [index, onChange]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let settle = 0;
    const onScroll = () => {
      if (programmatic.current || zoomedRef.current) return;
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        const next = Math.max(0, Math.min(images.length - 1, Math.round(track.scrollLeft / (track.clientWidth || 1))));
        setIndex((value) => (value === next ? value : next));
      }, 60);
    };
    let drag = { active: false, moved: false, pointerId: -1, startX: 0, startScroll: 0 };
    const onDown = (event: PointerEvent) => {
      if (zoomedRef.current || event.pointerType !== "mouse" || event.button !== 0) return;
      drag = { active: true, moved: false, pointerId: event.pointerId, startX: event.clientX, startScroll: track.scrollLeft };
    };
    const onMove = (event: PointerEvent) => {
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const delta = event.clientX - drag.startX;
      if (!drag.moved && Math.abs(delta) < 10) return;
      drag.moved = true;
      track.classList.add("is-dragging");
      programmatic.current = true;
      track.scrollLeft = drag.startScroll - delta;
    };
    const onUp = (event: PointerEvent) => {
      if (!drag.active || event.pointerId !== drag.pointerId) return;
      const moved = drag.moved;
      const delta = event.clientX - drag.startX;
      drag.active = false;
      track.classList.remove("is-dragging");
      programmatic.current = false;
      if (!moved) return;
      const direction = Math.abs(delta) > 40 ? (delta < 0 ? 1 : -1) : 0;
      const next = direction
        ? Math.max(0, Math.min(images.length - 1, indexRef.current + direction))
        : Math.max(0, Math.min(images.length - 1, Math.round(track.scrollLeft / (track.clientWidth || 1))));
      setIndex(next);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    return () => {
      window.clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, [images.length]);

  const current = images[index];

  return (
    <div className={`lightbox is-open${zoomable ? " lightbox--document" : ""}${zoomed ? " is-zoomed" : ""}`} aria-hidden="false">
      <div className="lightbox__dialog" role="dialog" aria-modal="true" aria-label={labels.dialog} ref={dialogRef}>
        <div className="lightbox__bar">
          <span className="lightbox__count">
            {index + 1} / {images.length}
          </span>
          <div className="lightbox__tools">
            {zoomable && labels.zoomIn && labels.zoomOut ? (
              <button type="button" className="lightbox__zoom" aria-pressed={zoomed} onClick={() => setZoomed((value) => !value)}>
                {zoomed ? labels.zoomOut : labels.zoomIn}
              </button>
            ) : null}
            <button type="button" className="lightbox__close" aria-label={labels.close} onClick={onClose} ref={closeRef}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="lightbox__track" ref={trackRef} tabIndex={0} aria-live="polite">
          {images.map((image, i) => (
            <div
              key={image.src}
              className={`lightbox__slide${i === index ? " is-active" : ""}`}
              role="group"
              aria-label={labels.slide(i + 1, images.length)}
              onClick={(event) => {
                if (event.target === event.currentTarget && !zoomed) onClose();
              }}
            >
              <img src={image.src} alt={image.alt} draggable={false} loading={Math.abs(i - index) > 1 ? "lazy" : "eager"} decoding="async" />
            </div>
          ))}
        </div>
        {images.length > 1 && !zoomed ? (
          <>
            <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label={labels.prev} disabled={index <= 0} onClick={() => setIndex((value) => value - 1)}>
              <Chevron dir="left" />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" aria-label={labels.next} disabled={index >= images.length - 1} onClick={() => setIndex((value) => value + 1)}>
              <Chevron dir="right" />
            </button>
          </>
        ) : null}
        <p className={`lightbox__hint${hint ? " is-visible" : ""}`} aria-hidden="true">
          {labels.hint}
        </p>
        <div className="lightbox__footer">
          <p className="lightbox__caption">{current?.caption ?? current?.alt}</p>
          {images.length > 1 ? (
            <div className="lightbox__dots" role="tablist" aria-label={labels.dots}>
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  className={`lightbox__dot${i === index ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={labels.goTo(i + 1)}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
