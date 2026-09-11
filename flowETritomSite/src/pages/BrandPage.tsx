import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { LogoFlow, LogoTriton } from "../components/Logos";
import { ProductCard } from "../components/ProductCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { CATALOG_URL, categoriesByBrand, contactLink, products, waLink, type Brand } from "../data";

type Props = { brand: Brand };

export function BrandPage({ brand }: Props) {
  const isFlow = brand === "flow";
  const cats = categoriesByBrand[brand];
  const [params, setParams] = useSearchParams();
  const requestedCategory = params.get("categoria");
  const cat = cats.some((c) => c.id === requestedCategory) ? requestedCategory! : "todos";
  const [q, setQ] = useState("");
  const selected = cats.find((c) => c.id === cat);
  const { hash, search } = useLocation();

  useEffect(() => {
    setQ("");
  }, [brand, hash, search]);

  // Vindo da home (/flow#martelos-cir): rola até o card do produto depois do ScrollTop global e destaca-o.
  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-yellow", "rounded-3xl");
      window.setTimeout(() => el.classList.remove("ring-4", "ring-yellow"), 2200);
    }, 80);
    return () => window.clearTimeout(t);
  }, [hash, brand, cat]);

  const items = useMemo(() => {
    return products.filter((p) => {
      if (p.brand !== brand) return false;
      if (cat !== "todos" && p.category !== cat) return false;
      if (q.trim()) {
        const hay = `${p.name} ${p.summary} ${p.specs} ${cats.find((c) => c.id === p.category)?.label ?? ""}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [brand, cat, q, cats]);

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
              ? "Perfuração DTH, rotativa e horizontal, Top Hammer, mineração e desmonte, sondagens e bombeamento. Filtre por categoria e peça orçamento."
              : "Perfuratrizes para poços artesianos, HDD e mineração; compressores a diesel e elétricos. Selecione a aplicação para conhecer os equipamentos."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {[{ id: "todos", label: "Todos" }, ...cats].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => {
                    setQ("");
                    setParams(c.id === "todos" ? {} : { categoria: c.id });
                  }}
                  aria-pressed={cat === c.id}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    cat === c.id ? "bg-navy text-white" : "bg-sand text-navy hover:bg-yellow"
                  }`}
                >
                  {"shortLabel" in c && c.shortLabel ? c.shortLabel : c.label}
                </button>
              ))}
            </div>
            {selected ? (
              <p className="mt-3 text-center text-sm text-muted sm:text-left">
                <span className="font-semibold text-navy">{selected.label}</span> inclui:{" "}
                {selected.includes.map((i, idx) => (
                  <span key={i}>
                    {idx > 0 ? " · " : ""}
                    {i}
                  </span>
                ))}
              </p>
            ) : null}
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
          <div className="mt-10 text-center">
            <p className="text-muted">
              {selected && !q.trim()
                ? `Consulte a equipe sobre ${selected.label.toLowerCase()}. Vamos ajudar a definir o equipamento adequado para sua operação.`
                : "Nenhum item com esse filtro. Tente outra busca."}
            </p>
            <Link
              to={contactLink({ brand, category: selected?.id, type: "Orçamento" })}
              className="mt-4 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navy-2"
            >
              Pedir orçamento{selected ? ` — ${selected.label}` : ""}
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} id={item.id} className="h-full scroll-mt-28 transition-shadow">
                <ProductCard item={item} />
              </div>
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
