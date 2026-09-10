import { WhatsAppButton } from "./WhatsAppButton";
import { categoryLabel, waLink, type Product } from "../data";

type Props = {
  item: Product;
  href?: string;
};

function cardSrc(src: string) {
  const file = src.split("/").pop() || src;
  if (src.includes("/setor-") || src.includes("claudio") || src.includes("sobre-equipe")) return src;
  return `/images/cards/${file}`;
}

export function ProductCard({ item, href }: Props) {
  const brandName = item.brand === "flow" ? "Flow" : "Triton";
  const quote = waLink(`Olá! Quero orçamento de ${item.name} (${brandName}).`);

  const inner = (
    <>
      <div className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden bg-[#f7f4ee] px-5 py-5">
        <img
          src={cardSrc(item.image)}
          alt={item.name}
          className="h-full w-full object-contain object-center"
          width={900}
          height={900}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col items-center px-5 pb-5 pt-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-copper">
          {categoryLabel[item.category] ?? item.category}
        </p>
        <h3 className="mt-2 min-h-[3.25rem] font-display text-xl leading-tight text-navy sm:text-2xl">{item.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-[3rem] text-sm leading-6 text-muted">{item.summary}</p>
        <p className="mt-2 min-h-[1.5rem] text-sm font-semibold text-navy">{item.specs}</p>
        {href ? null : (
          <WhatsAppButton href={quote} variant="navy" className="mt-auto w-full">
            Solicitar orçamento
          </WhatsAppButton>
        )}
      </div>
    </>
  );

  const frame =
    "flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_8px_24px_rgba(11,31,51,0.06)] transition duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(11,31,51,0.12)]";

  if (href) {
    return (
      <a href={href} className={frame}>
        {inner}
      </a>
    );
  }

  return <article className={frame}>{inner}</article>;
}
