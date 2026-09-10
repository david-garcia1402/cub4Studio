import { useMemo, useState } from "react";
import { LogoFlow, LogoTriton } from "../components/Logos";
import { ProductCard } from "../components/ProductCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import {
  CATALOG_URL,
  flowCategories,
  products,
  tritonCategories,
  waLink,
  type Brand,
} from "../data";

type Props = { brand: Brand };

export function BrandPage({ brand }: Props) {
  const isFlow = brand === "flow";
  const cats = isFlow ? flowCategories : tritonCategories;
  const [cat, setCat] = useState("todos");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    return products.filter((p) => {
      if (p.brand !== brand) return false;
      if (cat !== "todos" && p.category !== cat) return false;
      if (q.trim()) {
        const hay = `${p.name} ${p.summary} ${p.specs}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [brand, cat, q]);

  return (
    <main>
      <section className={`relative min-h-[36vh] overflow-hidden ${isFlow ? "bg-paper" : "bg-navy"}`}>
        <img
          src={isFlow ? "/brand/flow-hero.webp" : "/brand/triton-hero.webp"}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${isFlow ? "opacity-50" : "opacity-45"}`}
        />
        <div className={`absolute inset-0 ${isFlow ? "bg-white/45" : "bg-navy/55"}`} />
        <div className={`relative mx-auto max-w-7xl px-4 py-14 sm:px-6 ${isFlow ? "text-navy" : "text-white"}`}>
          {isFlow ? (
            <div className="w-fit rounded-2xl bg-white/95 px-5 py-4 shadow-lg">
              <LogoFlow className="h-16 w-auto sm:h-20" />
            </div>
          ) : (
            <LogoTriton variant="light" className="h-20 w-auto sm:h-24" />
          )}
          <h1 className="mt-6 max-w-2xl font-display text-4xl sm:text-5xl">
            {isFlow ? "Catálogo Flow" : "Catálogo Triton"}
          </h1>
          <p className={`mt-3 max-w-xl text-base ${isFlow ? "text-ink/80" : "text-white/85"}`}>
            {isFlow
              ? "Ferramentas para poços artesianos: DTH, rotativa, hastes e bombeamento. Filtre por linha e peça orçamento."
              : "Máquinas, compressores, desmonte, fundações e sondagem. A linha pesada da operação em pedreira e obra."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {cats.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  cat === c.id ? "bg-navy text-white" : "bg-sand text-navy hover:bg-yellow"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <label className="mx-auto block w-full max-w-md lg:mx-0 lg:w-80">
            <span className="sr-only">Buscar</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar modelo, diâmetro, linha..."
              className="w-full rounded-full border border-navy/15 bg-white px-4 py-3 text-sm outline-none ring-yellow focus:ring-2"
            />
          </label>
        </div>

        <p className="mt-6 text-center text-sm text-muted sm:text-left">
          {items.length} {items.length === 1 ? "item" : "itens"} nesta visão
        </p>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-muted">Nenhum item com esse filtro. Tente outra busca.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={CATALOG_URL} className="rounded-full border border-navy px-5 py-3 text-sm font-bold text-navy">
            Baixar catálogo PDF
          </a>
          <WhatsAppButton href={waLink()} variant="yellow">
            WhatsApp comercial
          </WhatsAppButton>
        </div>
      </section>
    </main>
  );
}
