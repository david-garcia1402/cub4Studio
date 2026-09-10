import { Link } from "react-router-dom";
import { LogoFlow, LogoGrupoFVT, LogoTriton } from "../components/Logos";
import { GoogleReviews } from "../components/GoogleReviews";
import { ProductCard } from "../components/ProductCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import {
  CATALOG_URL,
  faqs,
  flowCategories,
  group,
  products,
  sectors,
  tritonCategories,
  waLink,
} from "../data";

const previewIds = ["cir-90", "mission-80", "bit-90", "bomba-4", "tri600", "perfuratriz", "bits-roscados", "coroas"];
const flowPreview = products.filter((p) => previewIds.includes(p.id) && p.brand === "flow");
const tritonPreview = products.filter((p) => previewIds.includes(p.id) && p.brand === "triton");

export function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <img
            src="/brand/banner.webp"
            alt=""
            className="h-full w-full object-cover object-center opacity-30"
            width={1920}
            height={1094}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/70" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 text-white sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-yellow">
              {group.name} · Itapema · Santa Catarina
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-gold/45 bg-navy shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
              <LogoGrupoFVT className="h-auto w-full max-w-xl" />
            </div>
            <h1 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
              Flow e Triton pertencem ao Grupo FVT
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              {group.mission.title} A Flow cuida de poços artesianos e DTH. A Triton entrega máquinas, compressores,
              mineração e sondagem.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/grupo-fvt" className="rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy">
                Conhecer o Grupo FVT
              </Link>
              <Link to="/flow" className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold">
                Flow
              </Link>
              <Link to="/triton" className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold">
                Triton
              </Link>
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:max-w-none">
            <img
              src="/images/claudio.webp"
              alt={`${group.founder}, ${group.founderRole} do Grupo FVT`}
              className="aspect-[3/4] h-auto w-full object-cover object-[center_18%] sm:aspect-[4/5] lg:aspect-[3/4]"
              width={1080}
              height={1440}
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy via-navy/75 to-transparent p-4 sm:p-6">
              <div>
                <p className="font-display text-lg tracking-wide sm:text-xl">{group.founder}</p>
                <p className="text-xs text-white/80 sm:text-sm">{group.founderRole}</p>
              </div>
              <LogoGrupoFVT variant="emblem" className="h-14 w-14 rounded-xl border border-gold/50 sm:h-16 sm:w-16" />
            </figcaption>
          </figure>
        </div>
      </section>

      <GoogleReviews />

      <section className="lg:grid lg:min-h-[78vh] lg:grid-cols-2" aria-label="Marcas">
        <article className="relative min-h-[70vh] overflow-hidden border-b border-navy/10 lg:border-b-0 lg:border-r">
          <img
            src="/brand/flow-hero.webp"
            alt="Compressor e bits Flow em operação de perfuração"
            className="absolute inset-0 h-full w-full object-cover"
            width={1400}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-white/55 to-white/30" />
          <div className="relative flex min-h-[70vh] flex-col justify-end p-6 sm:p-10">
            <div className="w-fit rounded-2xl bg-white/95 px-5 py-4 shadow-lg">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Marca do Grupo FVT</p>
              <LogoFlow className="h-16 w-auto sm:h-20 lg:h-24" />
            </div>
            <h2 className="mt-6 max-w-md font-display text-3xl text-navy sm:text-4xl">Equipamentos para poços artesianos</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-ink/80 sm:text-base">
              Martelos DTH, bits, brocas rotativas, hastes e motobombas. Estoque em Itapema e envio para todo o Brasil.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/flow" className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">
                Ver catálogo Flow
              </Link>
              <a href={CATALOG_URL} className="rounded-full border border-navy/20 bg-white/80 px-5 py-3 text-sm font-bold text-navy">
                PDF 2025
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-navy">
              {flowCategories.slice(1).map((c) => (
                <li key={c.id} className="rounded-full bg-white/80 px-3 py-1">
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="relative min-h-[70vh] overflow-hidden">
          <img
            src="/brand/triton-hero.webp"
            alt="Perfuratriz Triton em pedreira"
            className="absolute inset-0 h-full w-full object-cover"
            width={1400}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/15" />
          <div className="relative flex min-h-[70vh] flex-col justify-end p-6 text-white sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow">Marca do Grupo FVT</p>
            <LogoTriton variant="light" className="mt-2 h-20 w-auto sm:h-24 lg:h-28 drop-shadow-sm" />
            <h2 className="mt-6 max-w-md font-display text-3xl sm:text-4xl">Máquinas e compressores</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/85 sm:text-base">
              Perfuratrizes, compressores, ferramentas de desmonte, fundações e sondagem — a linha pesada da operação.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/triton" className="rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy">
                Ver catálogo Triton
              </Link>
              <WhatsAppButton
                href={waLink("Olá! Quero falar com a Triton sobre máquinas e compressores.")}
                variant="outline"
              >
                Falar com vendas
              </WhatsAppButton>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
              {tritonCategories.slice(1).map((c) => (
                <li key={c.id} className="rounded-full bg-white/15 px-3 py-1">
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Flow</p>
            <h2 className="mt-2 font-display text-3xl text-navy">Linha de poços e DTH</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {flowPreview.map((item) => (
                <ProductCard key={item.id} item={item} href="/flow" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper">Triton</p>
            <h2 className="mt-2 font-display text-3xl text-navy">Máquinas, mineração e sondagem</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tritonPreview.map((item) => (
                <ProductCard key={item.id} item={item} href="/triton" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Utilizadas nas áreas de</p>
          <h2 className="mt-2 font-display text-3xl text-navy">Onde a operação acontece</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <figure key={sector.title} className="overflow-hidden rounded-2xl border border-navy/10">
                <img src={sector.image} alt="" className="h-48 w-full object-cover" width={1080} height={720} />
                <figcaption className="bg-navy px-4 py-3 font-display text-sm tracking-wider text-white">
                  {sector.title.toUpperCase()}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["11+", "anos no mercado"],
            ["Brasil", "entrega nacional"],
            ["Estoque", "pronta entrega em Itapema"],
            ["Técnico", "suporte após a venda"],
          ].map(([k, v]) => (
            <div key={v} className="rounded-2xl border border-white/10 p-6">
              <p className="font-display text-4xl text-yellow">{k}</p>
              <p className="mt-2 text-sm text-white/75">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy">Dúvidas frequentes</h2>
          <div className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold text-navy marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-gold group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
