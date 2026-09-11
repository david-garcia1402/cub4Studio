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
  brandThumbnails,
  catalogLink,
  featuredByBrand,
  flowCategories,
  group,
  sectors,
  tritonCategories,
  waLink,
} from "../data";

const flowPreview = featuredByBrand("flow");
const tritonPreview = featuredByBrand("triton");

/**
 * Seção "Sobre o grupo" — imagem principal de cada marca (slot para as fotos que o cliente está separando)
 * + miniaturas de produto. Trocar `feature.src` quando as imagens definitivas chegarem.
 */
const brandMedia = {
  flow: {
    // Imagem de IA autorizada pelo cliente — linha CIR em campo. Foto de cena: preenche o quadro (cover).
    feature: {
      src: "/images/martelo-cir-capa.webp",
      alt: "Martelos DTH Flow linha CIR em frente à perfuratriz",
      fit: "cover" as const,
      position: "object-[center_42%]",
      width: 800,
      height: 800,
    },
    thumbs: brandThumbnails.flow,
  },
  triton: {
    feature: {
      src: "/images/triton-tri600-compressor.webp",
      alt: "Compressor portátil Triton TRI600A-18G2",
      fit: "cover" as const,
      position: "object-center",
      width: 1216,
      height: 840,
    },
    thumbs: brandThumbnails.triton,
  },
};

type FeatureImageProps = {
  src: string;
  alt: string;
  fit: "cover" | "contain";
  position: string;
  width: number;
  height: number;
};

function FeatureImage({ src, alt, fit, position, width, height }: FeatureImageProps) {
  const contain = fit === "contain";
  return (
    <div className={`-mx-5 -mt-5 overflow-hidden rounded-t-3xl sm:-mx-6 sm:-mt-6 ${contain ? "bg-[#f3f3f3]" : ""}`}>
      <img
        src={src}
        alt={alt}
        className={`aspect-[16/10] h-auto w-full ${contain ? "object-contain p-2 sm:p-3" : "object-cover"} ${position} sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10]`}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function ThumbStrip({ items, ring }: { items: { src: string; alt: string; href: string }[]; ring: string }) {
  return (
    <ul className="mt-5 grid grid-cols-3 gap-2">
      {items.map((t) => (
        <li key={t.src} className={`overflow-hidden rounded-xl border ${ring} bg-white`}>
          <Link to={t.href} className="block focus-visible:outline-2 focus-visible:outline-yellow" aria-label={`Ver catálogo: ${t.alt}`}>
            <img src={t.src} alt={t.alt} className="aspect-square h-auto w-full bg-[#f7f4ee] object-cover object-center transition-transform duration-300 hover:scale-[1.03]" width={300} height={300} loading="lazy" decoding="async" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Home() {
  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* HERO — painéis Flow | Triton, emblema do Grupo FVT no centro         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-navy" aria-label="Grupo FVT — Flow e Triton">
        <div className="relative grid lg:min-h-[86vh] lg:grid-cols-2">
          {/*
            As artes de fundo (flow-hero / triton-hero, 1400x1597) já trazem a logo de cada marca na faixa
            central da imagem — por isso não repetimos a logo por cima.
            Mobile: a arte ocupa os 58% superiores do painel (inteira, sem corte da logo) e o conteúdo fica no
            terço inferior sobre navy. Desktop: a arte preenche o painel, deslocada para fora do centro
            (translate de 8%, sem zoom, para preservar as máquinas) para a logo não ficar atrás do emblema FVT; um vignette escurece a costura.
          */}
          {/* FLOW */}
          <article className="relative min-h-[88vh] overflow-hidden bg-navy sm:min-h-[80vh] lg:min-h-0">
            <img
              src="/brand/flow-hero.webp"
              alt="Flow — soluções para perfuração de rocha: compressor e bits DTH"
              className="absolute inset-x-0 top-0 h-[58%] w-full object-cover object-[70%_center] lg:inset-0 lg:h-full lg:-translate-x-[8%] lg:object-[center_40%]"
              width={1400}
              height={1597}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy from-42% via-navy/85 via-52% to-transparent to-62% lg:from-0% lg:via-navy/75 lg:via-28% lg:to-58%" aria-hidden="true" />
            <div className="absolute inset-y-0 right-0 hidden w-[24%] bg-gradient-to-r from-transparent to-navy to-60% lg:block" aria-hidden="true" />
            <div className="relative flex h-full min-h-[88vh] flex-col justify-end p-6 pb-28 text-white sm:min-h-[80vh] sm:p-10 sm:pb-32 lg:min-h-[86vh] lg:pb-12 lg:pr-36 xl:pr-44">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow">Marca do Grupo FVT</p>
              <h2 className="mt-2 max-w-md font-display text-3xl sm:text-4xl">Equipamentos para poços artesianos</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/flow" className="rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy hover:bg-[#ffd54a]">
                  Ver catálogo Flow
                </Link>
                <a href={CATALOG_URL} className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                  PDF 2025
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                {flowCategories.map((c) => (
                  <li key={c.id} className="rounded-full bg-white/15 px-3 py-1">
                    {c.shortLabel ?? c.label}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* EMBLEMA DO GRUPO FVT — no mobile fica entre os painéis; no desktop, centro exato entre as marcas */}
          <div className="relative z-10 -mb-10 -mt-24 flex flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <div className="rounded-full bg-navy/40 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-gold/40 backdrop-blur-sm">
              <Link to="/grupo-fvt" aria-label="Conhecer o Grupo FVT">
                <LogoGrupoFVT className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64" />
              </Link>
            </div>
            <h1 className="mt-4 rounded-full bg-navy/80 px-4 py-2 font-display text-sm tracking-[0.12em] text-white shadow-lg ring-1 ring-white/10 backdrop-blur sm:text-base">
              Flow e Triton. <span className="text-yellow">Um só grupo.</span>
            </h1>
          </div>

          {/* TRITON */}
          <article className="relative min-h-[88vh] overflow-hidden bg-navy sm:min-h-[80vh] lg:min-h-0">
            <img
              src="/brand/triton-hero.webp"
              alt="Triton — máquinas e compressores: perfuratriz em pedreira"
              className="absolute inset-x-0 top-0 h-[58%] w-full object-cover object-[30%_center] lg:inset-0 lg:h-full lg:translate-x-[8%] lg:object-[center_40%]"
              width={1400}
              height={1597}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy from-42% via-navy/85 via-52% to-transparent to-62% lg:from-0% lg:via-navy/75 lg:via-28% lg:to-58%" aria-hidden="true" />
            <div className="absolute inset-y-0 left-0 hidden w-[24%] bg-gradient-to-l from-transparent to-navy to-60% lg:block" aria-hidden="true" />
            {/* Mobile: funde o topo da arte Triton com o emblema que fica na costura entre os painéis */}
            <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-navy via-navy/70 to-transparent lg:hidden" aria-hidden="true" />
            <div className="relative flex h-full min-h-[88vh] flex-col justify-end p-6 pt-28 text-white sm:min-h-[80vh] sm:p-10 sm:pt-32 lg:min-h-[86vh] lg:pl-36 lg:pt-10 xl:pl-44">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow">Marca do Grupo FVT</p>
              <h2 className="mt-2 max-w-md font-display text-3xl sm:text-4xl">Máquinas e compressores</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/triton" className="rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy hover:bg-[#ffd54a]">
                  Ver catálogo Triton
                </Link>
                <WhatsAppButton href={waLink("Olá! Quero falar com a Triton sobre máquinas e compressores.")} variant="outline">
                  Falar com vendas
                </WhatsAppButton>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                {tritonCategories.map((c) => (
                  <li key={c.id} className="rounded-full bg-white/15 px-3 py-1">
                    {c.shortLabel ?? c.label}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Divisor central (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/70 to-transparent lg:block" aria-hidden="true" />
        </div>
      </section>

      {/* Diferenciais em barra (alta visibilidade, logo abaixo do banner) */}
      <Differentials layout="strip" />

      {/* ------------------------------------------------------------------ */}
      {/* SOBRE O GRUPO — Flow | FVT | Triton com foto de fundo segmentada     */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy text-white" aria-labelledby="sobre-grupo-title">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2" aria-hidden="true">
          {/* Lado Flow: perfuração de poço artesiano. Lado Triton: perfuratriz e compressor em pedreira. */}
          <img
            src="/images/setor-pocos.webp"
            alt=""
            className="hidden h-full w-full object-cover object-center opacity-45 lg:block"
            width={1080}
            height={720}
            loading="lazy"
          />
          <img
            src="/images/setor-mineracao.webp"
            alt=""
            className="h-full w-full object-cover object-center opacity-45"
            width={1080}
            height={720}
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,31,51,0.45)_0%,rgba(11,31,51,0.82)_65%,rgba(11,31,51,0.95)_100%)]" aria-hidden="true" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/60 to-transparent lg:block" aria-hidden="true" />

        {/*
          Container fluido (até 1760px): os cards das marcas ocupam o espaço lateral que sobrava,
          com uma imagem principal grande no topo — slot para as fotos que o cliente está separando.
        */}
        <div className="relative mx-auto max-w-[1760px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-yellow sm:text-xs">
            Sobre o grupo · Itapema<span className="hidden sm:inline"> · Santa Catarina</span> · 11 anos
          </p>

          <div className="mt-8 grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-[1.25fr_minmax(300px,0.72fr)_1.25fr] lg:gap-6 xl:gap-10">
            {/* FLOW */}
            <article className="order-2 rounded-3xl bg-white/95 p-5 text-navy shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6 lg:order-1">
              <FeatureImage {...brandMedia.flow.feature} />
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Marca do Grupo FVT</p>
              <LogoFlow className="mt-2 h-12 w-auto sm:h-14" />
              <h3 className="mt-4 font-display text-2xl leading-tight xl:text-3xl">Poços artesianos e perfuração DTH</h3>
              <p className="mt-2 text-sm leading-6 text-ink/75">
                Martelos, bits, brocas, hastes, coroas e bombas — perfuração DTH, rotativa, horizontal, Top Hammer, sondagens e
                bombeamento.
              </p>
              <ThumbStrip items={brandMedia.flow.thumbs} ring="border-navy/10" />
              <ul className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy">
                {flowCategories.map((c) => (
                  <li key={c.id} className="rounded-full bg-sand px-2.5 py-1">
                    {c.shortLabel ?? c.label}
                  </li>
                ))}
              </ul>
              <Link to="/flow" className="mt-5 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-2">
                Ver produtos Flow
              </Link>
            </article>

            {/* GRUPO FVT */}
            <div className="order-1 flex flex-col items-center text-center sm:col-span-2 lg:order-2 lg:col-span-1">
              <LogoGrupoFVT className="h-44 w-44 drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)] sm:h-52 sm:w-52 lg:h-64 lg:w-64 xl:h-72 xl:w-72" loading="lazy" />
              <h2 id="sobre-grupo-title" className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                {group.name}: <span className="text-yellow">{group.mission.title}</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                Flow e Triton pertencem ao Grupo FVT. Equipamentos para perfuração, bombeamento e operação de campo — da ferramenta à
                máquina, com estoque em Itapema, envio para todo o Brasil e suporte técnico pós-venda.
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
              <FeatureImage {...brandMedia.triton.feature} />
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow">Marca do Grupo FVT</p>
              <LogoTriton variant="light" className="mt-2 h-14 w-auto sm:h-16" />
              <h3 className="mt-4 font-display text-2xl leading-tight xl:text-3xl">Máquinas e compressores</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Perfuratrizes para poços artesianos, HDD e mineração. Compressores a diesel para poços, pedreiras e construção civil; elétricos para fundações e saneamento.
              </p>
              <ThumbStrip items={brandMedia.triton.thumbs} ring="border-white/15" />
              <ul className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-semibold uppercase tracking-wide">
                {tritonCategories.map((c) => (
                  <li key={c.id} className="rounded-full bg-white/12 px-2.5 py-1">
                    {c.shortLabel ?? c.label}
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

      {/* ------------------------------------------------------------------ */}
      {/* VÍDEO — produto FVT trabalhando                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-navy-2 px-4 py-16 text-white sm:px-6" aria-labelledby="video-title">
        <div className="absolute inset-0 opacity-15" aria-hidden="true">
          <img src="/images/flow-build.webp" alt="" className="h-full w-full object-cover" width={1400} height={800} loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-2 via-navy-2/90 to-navy-2/70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 xl:grid-cols-[1fr_1.1fr]">
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
              {["Estoque próprio em Itapema-SC", "Expedição para todo o Brasil", "Orientação técnica antes da compra", "Suporte técnico pós-venda"].map((t) => (
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
          <div className="grid w-full gap-6 sm:grid-cols-2">
            <div>
              <VideoPlayer video={VIDEOS.flowBemVindo} mode="player" />
              <p className="mt-4 text-center text-sm font-semibold text-white/85">Conheça a Flow</p>
            </div>
            <div>
              <VideoPlayer video={VIDEOS.perfuratrizDemonstracao} mode="player" />
              <p className="mt-4 text-center text-sm font-semibold text-white/85">Perfuratriz · demonstração real</p>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* ------------------------------------------------------------------ */}
      {/* PRODUTOS — prévia                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-paper px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Flow</p>
            <h2 className="mt-2 font-display text-3xl text-navy">Destaques Flow</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {flowPreview.map((item) => (
                <ProductCard key={item.id} item={item} href={catalogLink(item)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper">Triton</p>
            <h2 className="mt-2 font-display text-3xl text-navy">Destaques Triton</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tritonPreview.map((item) => (
                <ProductCard key={item.id} item={item} href={catalogLink(item)} />
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
