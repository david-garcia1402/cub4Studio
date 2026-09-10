import { useEffect, useRef } from "react";

type Video = { src: string; poster: string; title: string };

type Props = {
  video: Video;
  className?: string;
  /**
   * "player": controles, som disponível, carrega só metadados até o clique.
   * "ambient": mudo, em loop, sem controles; só começa a carregar/tocar quando entra na tela.
   */
  mode?: "player" | "ambient";
};

/**
 * Vídeo vertical (9:16) em moldura. Otimizado: 720p, poster em WebP, `preload` conservador,
 * e no modo ambient só toca quando visível (economiza dados e bateria no mobile).
 */
export function VideoPlayer({ video, className = "", mode = "player" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const ambient = mode === "ambient";

  useEffect(() => {
    const el = ref.current;
    if (!el || !ambient) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ambient]);

  return (
    <figure className={`relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-white/15 bg-navy shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        title={video.title}
        playsInline
        preload={ambient ? "none" : "metadata"}
        controls={!ambient}
        muted={ambient}
        loop={ambient}
        autoPlay={false}
        controlsList="nodownload"
      >
        Seu navegador não suporta vídeo HTML5.
      </video>
      {ambient ? (
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
          Flow em operação
        </span>
      ) : null}
    </figure>
  );
}
