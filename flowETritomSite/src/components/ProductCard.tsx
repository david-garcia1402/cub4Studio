import { useState } from "react";
import { Link } from "react-router-dom";
import { Lightbox } from "./Lightbox";
import { WhatsAppButton } from "./WhatsAppButton";
import { categoryLabel, contactLink, waLink, type Product } from "../data";

type Props = {
  item: Product;
  href?: string;
};

function cardSrc(src: string) {
  const file = src.split("/").pop() || src;
  if (src.includes("/reais-fvt/") || src.includes("/setor-") || src.includes("claudio") || src.includes("sobre-equipe")) return src;
  return `/images/cards/${file}`;
}

function ZoomIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

export function ProductCard({ item, href }: Props) {
  const brandName = item.brand === "flow" ? "Flow" : "Triton";
  const quote = waLink(`Olá! Quero orçamento de ${item.name} (${brandName}).`);
  const gallery = item.images && item.images.length > 0 ? item.images : [item.image];
  const hasGallery = gallery.length > 1;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const current = gallery[active];

  const contain = item.coverFit === "contain";
  const picture = (
    <img
      key={current}
      src={cardSrc(current)}
      alt={item.name}
      className={`h-full w-full object-center ${contain ? "object-contain" : "object-cover"}`}
      width={900}
      height={900}
      loading="lazy"
    />
  );

  const inner = (
    <>
      {href ? (
        <div className="aspect-square w-full shrink-0 overflow-hidden bg-[#f7f4ee]">
          {picture}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Ampliar foto de ${item.name}`}
          className="group/zoom relative aspect-square w-full shrink-0 cursor-zoom-in overflow-hidden bg-[#f7f4ee] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
        >
          {picture}
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 transition group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100">
            <ZoomIcon /> Ampliar
          </span>
        </button>
      )}
      {hasGallery && !href ? (
        <ul className="flex justify-center gap-2 bg-[#f7f4ee] px-5 pb-4" aria-label={`Fotos de ${item.name}`}>
          {gallery.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Foto ${i + 1} de ${gallery.length}`}
                aria-pressed={i === active}
                className={`block h-14 w-14 overflow-hidden rounded-xl border-2 bg-[#f7f4ee] transition ${
                  i === active ? "border-navy" : "border-transparent hover:border-gold/60"
                }`}
              >
                <img
                  src={cardSrc(src)}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  width={900}
                  height={900}
                  loading="lazy"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-1 flex-col items-center px-5 pb-5 pt-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-copper">
          {categoryLabel[item.category] ?? item.category}
        </p>
        <h3 className="mt-2 min-h-[3.25rem] font-display text-xl leading-tight text-navy sm:text-2xl">{item.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-[3rem] text-sm leading-6 text-muted">{item.summary}</p>
        <p className="mt-2 min-h-[1.5rem] text-sm font-semibold text-navy">{item.specs}</p>
        {href ? null : (
          <div className="mt-auto w-full pt-4">
            <WhatsAppButton href={quote} variant="navy" className="w-full">
              Solicitar orçamento
            </WhatsAppButton>
            <Link
              to={contactLink({ brand: item.brand, category: item.category, product: item.name })}
              className="mt-2 inline-block text-xs font-semibold text-muted underline decoration-gold/50 underline-offset-2 hover:text-navy"
            >
              ou enviar pelo formulário
            </Link>
          </div>
        )}
      </div>
    </>
  );

  const frame =
    "flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_8px_24px_rgba(11,31,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(11,31,51,0.12)]";

  if (href) {
    return (
      <Link to={href} className={frame}>
        {inner}
      </Link>
    );
  }

  return (
    <article className={frame}>
      {inner}
      {open ? (
        <Lightbox images={gallery} index={active} title={item.name} onIndex={setActive} onClose={() => setOpen(false)} />
      ) : null}
    </article>
  );
}
