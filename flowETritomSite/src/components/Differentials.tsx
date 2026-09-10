import { differentials } from "../data";

type IconProps = { className?: string };

function TruckIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ReceiptIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

function HelmetIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2.5 15h19M10 7.5V10M14 7.5V10" />
      <path d="M12 4v3" />
    </svg>
  );
}

const icons = {
  envios: TruckIcon,
  transporte: ShieldIcon,
  garantia: ReceiptIcon,
  seguranca: HelmetIcon,
} as const;

type Props = {
  /** "strip" = barra compacta logo abaixo do hero; "cards" = seção completa com texto. */
  layout?: "strip" | "cards";
  tone?: "light" | "dark";
  className?: string;
};

export function Differentials({ layout = "cards", tone = "light", className = "" }: Props) {
  const dark = tone === "dark";

  if (layout === "strip") {
    return (
      <section
        aria-label="Diferenciais do Grupo FVT"
        className={`${dark ? "bg-navy-2 text-white" : "bg-yellow text-navy"} ${className}`}
      >
        <ul className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-navy/10 px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4">
          {differentials.map((item) => {
            const Icon = icons[item.id];
            return (
              <li key={item.id} className="flex items-center gap-3 py-3 sm:py-4 lg:justify-center">
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${dark ? "bg-yellow text-navy" : "bg-navy text-yellow"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold leading-tight sm:text-[15px]">{item.title}</span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="diferenciais-title"
      className={`px-4 py-14 sm:px-6 ${dark ? "bg-navy text-white" : "bg-white text-navy"} ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <p className={`text-xs font-bold uppercase tracking-[0.25em] ${dark ? "text-yellow" : "text-gold"}`}>Por que comprar do Grupo FVT</p>
        <h2 id="diferenciais-title" className="mt-2 font-display text-3xl sm:text-4xl">
          Diferenciais que fazem a operação andar
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item) => {
            const Icon = icons[item.id];
            return (
              <article
                key={item.id}
                className={`rounded-3xl border p-6 ${dark ? "border-white/10 bg-white/5" : "border-navy/10 bg-paper"}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${dark ? "bg-yellow text-navy" : "bg-navy text-yellow"}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className={`font-display text-2xl ${dark ? "text-yellow" : "text-gold"}`}>{item.kicker}</span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-tight">{item.title}</h3>
                <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/75" : "text-muted"}`}>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
