import { Link } from "react-router-dom";
import { LogoFlow, LogoGrupoFVT, LogoTriton } from "../components/Logos";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Differentials } from "../components/Differentials";
import { ADDRESS, HOURS, catalogLink, categoriesByBrand, featuredByBrand, group, waLink, type Brand } from "../data";

function BrandCatalogPreview({ brand }: { brand: Brand }) {
  const dark = brand === "triton";
  const items = featuredByBrand(brand).slice(0, 3);
  return (
    <div className="mt-6">
      <ul className="grid gap-3 sm:grid-cols-3" aria-label={`Produtos ${dark ? "Triton" : "Flow"}`}>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={catalogLink(item)}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-yellow ${
                dark ? "border-white/15 bg-white/5" : "border-navy/10 bg-paper"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="aspect-square h-auto w-full bg-[#f7f4ee] object-cover object-center"
                width={480}
                height={480}
                loading="lazy"
                decoding="async"
              />
              <span className="p-3 font-display text-base leading-snug">{item.name}</span>
              <span className={`mt-auto px-3 pb-3 text-xs font-semibold ${dark ? "text-yellow" : "text-muted"}`}>Ver no catálogo →</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Linhas de produtos">
        {categoriesByBrand[brand].map((category) => (
          <li key={category.id}>
            <Link
              to={`/${brand}?categoria=${category.id}`}
              title={category.label}
              className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${
                dark ? "bg-white/10 text-white/90 hover:bg-white/20" : "bg-sand text-navy hover:bg-yellow"
              }`}
            >
              {category.shortLabel ?? category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GrupoFVT() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy text-white">
        <img
          src="/images/setor-mineracao.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          width={1080}
          height={720}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-navy" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow">Institucional · 11 anos</p>
            <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <LogoGrupoFVT className="h-40 w-40 shrink-0 drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)] sm:h-48 sm:w-48" />
              <div>
                <h1 className="max-w-xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  Um grupo. Três marcas. Uma operação.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                  O Grupo FVT reúne três marcas sob a mesma operação. Neste site, a Flow e a Triton concentram o
                  atendimento de perfuração, estoque e suporte técnico pós-venda.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-yellow">
              <a href="/logos/grupo-fvt-emblem.png" download="Grupo-FVT-emblema.png" className="underline decoration-yellow/40">
                Baixar logo PNG
              </a>
              <a href="/logos/grupo-fvt-emblem.svg" download="Grupo-FVT-emblema.svg" className="underline decoration-yellow/40">
                Baixar logo SVG (vetor)
              </a>
            </div>
          </div>
          {/*
            Fundador: recorte sem fundo (claudio-cutout.webp) ampliado sobre a fachada do galpão em Itapema.
            A fachada fica suavizada/escurecida para o corpo ganhar escala sem competir com o texto.
          */}
          <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-navy-2 sm:aspect-[4/5] lg:aspect-[3/4]">
            <img
              src="/images/galpao-itapema.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-105 object-cover object-[40%_top] opacity-70 blur-[1.5px]"
              width={763}
              height={936}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/35 to-navy" aria-hidden="true" />
            <img
              src="/images/claudio-cutout.webp"
              alt={`${group.founder}, ${group.founderRole} do Grupo FVT, com bit DTH em frente ao galpão de Itapema`}
              className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
              width={617}
              height={1039}
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy via-navy/80 to-transparent p-5">
              <div>
                <p className="font-display text-xl tracking-wide">{group.founder}</p>
                <p className="text-sm text-white/80">{group.founderRole}</p>
              </div>
              <LogoGrupoFVT className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20" />
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Direção estratégica</p>
          <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Missão, visão e valores</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              { label: "Missão", ...group.mission },
              { label: "Visão", ...group.vision },
              { label: "Valores", ...group.values },
            ].map((item) => (
              <article key={item.label} className="rounded-3xl bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{item.label}</p>
                <h3 className="mt-3 font-display text-2xl text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Arquitetura de marcas</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl text-navy sm:text-4xl">
            Flow e Triton operam sob o Grupo FVT
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            O cliente escolhe pela necessidade técnica. O grupo garante a mesma base: estoque em Itapema, envio nacional
            e suporte técnico pós-venda.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-navy/10 bg-white p-8">
              <div className="w-fit rounded-2xl bg-white">
                <LogoFlow className="h-16 w-auto sm:h-20" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold">Marca do grupo</p>
              <h3 className="mt-1 font-display text-3xl text-navy">Flow</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{group.brands[0].text}</p>
              <BrandCatalogPreview brand="flow" />
              <Link to="/flow" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">
                Ver catálogo Flow
              </Link>
            </article>
            <article className="rounded-3xl bg-navy p-8 text-white">
              <LogoTriton variant="light" className="h-20 w-auto sm:h-24" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-yellow">Marca do grupo</p>
              <h3 className="mt-1 font-display text-3xl">Triton</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{group.brands[1].text}</p>
              <BrandCatalogPreview brand="triton" />
              <Link to="/triton" className="mt-6 inline-flex rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy">
                Ver catálogo Triton
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Differentials layout="cards" className="border-t border-navy/10" />

      <section className="bg-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow">Sede</p>
            <h2 className="mt-2 font-display text-3xl">Itapema · Santa Catarina</h2>
            <p className="mt-3 max-w-xl text-white/80">{ADDRESS}</p>
            <p className="mt-1 text-sm text-white/65">{HOURS}</p>
          </div>
          <WhatsAppButton href={waLink("Olá! Quero falar com o Grupo FVT sobre um projeto.")} variant="yellow">
            Falar com o grupo
          </WhatsAppButton>
        </div>
      </section>
    </main>
  );
}

export const GrupoFTV = GrupoFVT;
