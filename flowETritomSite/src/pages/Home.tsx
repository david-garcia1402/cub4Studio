import { Link } from "react-router-dom";
import { LogoFlow, LogoGrupoFVT, LogoTriton } from "../components/Logos";
import { GoogleReviews } from "../components/GoogleReviews";
import { Differentials } from "../components/Differentials";
import { ProductCard } from "../components/ProductCard";
import { VideoPlayer } from "../components/VideoPlayer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import {
  CATALOG_URL,
  VIDEOS,
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

/** Miniaturas de produto que aparecem no banner para já sugerir o catálogo de cada marca. */
const heroThumbs = {
  flow: [
    { src: "/images/cards/martelo-cir-90.webp", alt: "Martelo DTH CIR 90" },
    { src: "/images/cards/bit-90-mm-cir-90.webp", alt: "Bit 90 mm" },
    { src: "/images/cards/produto-7755.webp", alt: "Motobomba submersa 4 polegadas" },
  ],
  triton: [
    { src: "/brand/compressor.webp", alt: "Compressor portátil Triton" },
    { src: "/images/cards/img-7101.webp", alt: "Hastes e perfuratriz pneumática" },
    { src: "/images/cards/img-7391.webp", alt: "Bits roscados para desmonte" },
  ],
};

function ThumbStrip({ items, ring }: { items: { src: string; alt: string }[]; ring: string }) {
  return (
    <ul className="mt-5 grid grid-cols-3 gap-2">
      {items.map((t) => (
        <li key={t.src} className={`overflow-hidden rounded-xl border ${ring} bg-white`}>
          <img src={t.src} alt={t.alt} className="aspect-square h-auto w-full object-cover" width={300} height={300} loading="eager" decoding="async" />
        </li>
      ))}
    </ul>
  );
}

export function Home() {
  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* HERO — Flow | Grupo FVT | Triton, com foto de fundo segmentada       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy text-white" aria-label="Grupo FVT — Flow e Triton">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2" aria-hidden="true">
          {/* Lado Flow: perfuração de poço artesiano. Lado Triton: perfuratriz e compressor em pedreira. */}
          <img
            src="/images/setor-pocos.webp"
            alt=""
            className="hidden h-full w-full object-cover object-center opacity-45 lg:block"
            width={1080}
            height={720}
            fetchPriority="high"
          />
          <img
            src="/images/setor-mineracao.webp"
            alt=""
            className="h-full w-full object-cover object-center opacity-45"
            width={1080}
            height={720}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,31,51,0.45)_0%,rgba(11,31,51,0.82)_65%,rgba(11,31,51,0.95)_100%)]" aria-hidden="true" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/60 to-transparent lg:block" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-yellow sm:text-xs">
            {group.name} · Itapema · Santa Catarina · 11 anos
          </p>

          <div className="mt-8 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(280px,0.9fr)_1fr] lg:gap-8">
            {/* FLOW */}
            <article className="order-2 rounded-3xl bg-white/95 p-5 text-navy shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6 lg:order-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Marca do Grupo FVT</p>
              <LogoFlow className="mt-2 h-12 w-auto sm:h-14" />
              <h2 className="mt-4 font-display text-2xl leading-tight">Poços artesianos e perfuração DTH</h2>
              <p className="mt-2 text-sm leading-6 text-ink/75">Martelos DTH, bits, brocas rotativas, hastes e motobombas.</p>
              <ThumbStrip items={heroThumbs.flow} ring="border-navy/10" />
              <ul className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy">
                {flowCategories.slice(1).map((c) => (
                  <li key={c.id} className="rounded-full bg-sand px-2.5 py-1">
                    {c.label}
                  </li>
                ))}
              </ul>
              <Link to="/flow" className="mt-5 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-2">
                Ver produtos Flow
              </Link>
            </article>

            {/* GRUPO FVT */}
            <div className="order-1 flex flex-col items-center text-center sm:col-span-2 lg:order-2 lg:col-span-1">
              <LogoGrupoFVT className="h-44 w-44 drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)] sm:h-52 sm:w-52 lg:h-64 lg:w-64 xl:h-72 xl:w-72" />
              <h1 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                Flow e Triton. <span className="text-yellow">Um só grupo.</span>
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                {group.mission.title} Equipamentos para perfuração, bombeamento e operação de campo — da ferramenta à máquina, com estoque
                em Itapema e envio para todo o Brasil.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/grupo-fvt" className="rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy hover:bg-[#ffd54a]">
                  Conhecer o Grupo FVT
                </Link>
                <WhatsAppButton href={waLink("Olá! Quero um orçamento Flow & Triton.")} variant="outline">
                  Pedir orçamento
                </WhatsAppButton>
              </div>
            </div>

            {/* TRITON */}
            <article className="order-3 rounded-3xl border border-white/15 bg-navy/75 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow">Marca do Grupo FVT</p>
              <LogoTriton variant="light" className="mt-2 h-14 w-auto sm:h-16" />
              <h2 className="mt-4 font-display text-2xl leading-tight">Máquinas e compressores</h2>
              <p className="mt-2 text-sm leading-6 text-white/80">Perfuratrizes, compressores, desmonte de rocha, fundações e sondagem.</p>
              <ThumbStrip items={heroThumbs.triton} ring="border-white/15" />
              <ul className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold uppercase tracking-wide">
                {tritonCategories.slice(1).map((c) => (
                  <li key={c.id} className="rounded-full bg-white/12 px-2.5 py-1">
                    {c.label}
                  </li>
                ))}
              </ul>
              <Link to="/triton" className="mt-5 inline-flex rounded-full bg-yellow px-5 py-2.5 text-sm font-bold text-navy hover:bg-[#ffd54a]">
                Ver produtos Triton
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Diferenciais em barra (alta visibilidade, logo abaixo do banner) */}
      <Differentials layout="strip" />

      {/* ------------------------------------------------------------------ */}
      {/* VÍDEO — produto FVT trabalhando (antes das avaliações)              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy px-4 py-16 text-white sm:px-6" aria-labelledby="video-title">
        <div className="absolute inset-0 opacity-15" aria-hidden="true">
          <img src="/brand/compressor.webp" alt="" className="h-full w-full object-cover" width={1400} height={800} loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow">Grupo FVT em operação</p>
            <h2 id="video-title" className="mt-2 font-display text-3xl sm:text-4xl">
              Veja o equipamento trabalhando
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
              Estoque, expedição e produto em campo. É assim que a Flow atende poços artesianos e perfuração DTH em todo o Brasil —
              com o mesmo padrão que a Triton leva para máquinas e compressores.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {["Estoque próprio em Itapema-SC", "Expedição para todo o Brasil", "Orientação técnica antes da compra", "Suporte após a venda"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton href={waLink("Olá! Vi o vídeo no site e quero um orçamento.")} variant="yellow">
                Falar com a equipe
              </WhatsAppButton>
              <a href={CATALOG_URL} className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10">
                Catálogo PDF 2025
              </a>
            </div>
          </div>
          <VideoPlayer video={VIDEOS.flowBemVindo} mode="player" />
        </div>
      </section>

      <GoogleReviews />

      {/* ------------------------------------------------------------------ */}
      {/* MARCAS — painéis Flow / Triton                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="lg:grid lg:min-h-[78vh] lg:grid-cols-2" aria-label="Marcas">
        <article className="relative min-h-[70vh] overflow-hidden border-b border-navy/10 lg:border-b-0 lg:border-r">
          <img
            src="/brand/flow-hero.webp"
            alt="Compressor e bits Flow em operação de perfuração"
            className="absolute inset-0 h-full w-full object-cover"
            width={1400}
            height={800}
            loading="lazy"
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
            loading="lazy"
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

      {/* ------------------------------------------------------------------ */}
      {/* PRODUTOS — prévia                                                    */}
      {/* ------------------------------------------------------------------ */}
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

      {/* ------------------------------------------------------------------ */}
      {/* ÁREAS DE ATUAÇÃO (metade) + VÍDEO/PRODUTO (metade)                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6" aria-labelledby="areas-title">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow">Utilizadas nas áreas de</p>
            <h2 id="areas-title" className="mt-2 font-display text-3xl sm:text-4xl">
              Onde a operação acontece
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">
              Do poço artesiano à mineração: os equipamentos Flow e Triton estão em campo nos principais segmentos de perfuração do
              país.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {sectors.map((sector) => (
                <li key={sector.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 pr-4">
                  <img
                    src={sector.image}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded-xl object-cover"
                    width={1080}
                    height={720}
                    loading="lazy"
                  />
                  <span className="font-display text-sm tracking-wider">{sector.title.toUpperCase()}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/flow" className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10">
                Flow
              </Link>
              <Link to="/triton" className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10">
                Triton
              </Link>
              <WhatsAppButton href={waLink("Olá! Quero indicação de equipamento para a minha área de atuação.")} variant="yellow">
                Qual equipamento usar?
              </WhatsAppButton>
            </div>
          </div>
          <VideoPlayer video={VIDEOS.flowBemVindo} mode="ambient" />
        </div>
      </section>

      {/* Diferenciais completos (texto) — reforço antes do rodapé */}
      <Differentials layout="cards" />
    </main>
  );
}
