import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** Fotos em tamanho cheio (não as versões /cards). */
  images: string[];
  index: number;
  title: string;
  onIndex: (next: number) => void;
  onClose: () => void;
};

/**
 * Modal de zoom das fotos do produto. Navegação por setas do teclado, botões laterais, miniaturas e
 * clique no fundo para fechar. Renderiza em portal (o card tem transform/overflow que quebraria `fixed`).
 */
export function Lightbox({ images, index, title, onIndex, onClose }: Props) {
  const count = images.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next]);

  // Pré-carrega vizinhas para a troca ser instantânea.
  useEffect(() => {
    [images[(index + 1) % count], images[(index - 1 + count) % count]].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images, index, count]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${title}`}
      className="fixed inset-0 z-[100] flex flex-col bg-navy/95 text-white backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
      }}
    >
      {/* Topo: título + contador + fechar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="truncate font-display text-lg tracking-wide sm:text-xl">{title}</p>
          <p className="text-xs text-white/60">
            Foto {index + 1} de {count}
            <span className="hidden sm:inline"> · use ← → para navegar · Esc para fechar</span>
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Foto */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 pb-2 sm:px-20">
        <img
          key={images[index]}
          src={images[index]}
          alt={`${title} — foto ${index + 1}`}
          className="max-h-full max-w-full rounded-2xl bg-[#f7f4ee] object-contain p-2 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-3"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          draggable={false}
        />
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-yellow hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow sm:left-6"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-yellow hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow sm:right-6"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : null}
      </div>

      {/* Miniaturas */}
      {count > 1 ? (
        <ul className="flex justify-center gap-2 px-4 pb-4 pt-2 sm:pb-6" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`Ir para a foto ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`block h-14 w-14 overflow-hidden rounded-xl border-2 bg-white transition sm:h-16 sm:w-16 ${
                  i === index ? "border-yellow" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-contain" loading="lazy" draggable={false} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>,
    document.body,
  );
}
