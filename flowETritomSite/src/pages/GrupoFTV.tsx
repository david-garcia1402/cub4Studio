import { Link } from "react-router-dom";
import { LogoFlow, LogoGrupoFVT, LogoTriton } from "../components/Logos";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ADDRESS, HOURS, group, waLink } from "../data";

export function GrupoFVT() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy text-white">
        <img src="/brand/banner.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-navy" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow">Institucional · 11 anos</p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-6xl">
              Um grupo. Três marcas. Uma operação.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              O Grupo FVT reúne três marcas sob a mesma operação. Neste site, a Flow e a Triton concentram o
              atendimento de perfuração, estoque e pós-venda.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-navy shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <LogoGrupoFVT className="h-auto w-full" />
            </div>
            <a
              href="/logos/grupo-fvt-navy.png"
              download="Grupo-FVT-navy.png"
              className="mt-4 inline-flex text-sm font-semibold text-yellow underline decoration-yellow/40"
            >
              Baixar logo PNG
            </a>
          </div>
          <figure className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src="/images/claudio.webp"
              alt={`${group.founder}, ${group.founderRole} do Grupo FVT, com bit DTH no estoque de Itapema`}
              className="h-full w-full object-cover object-[center_20%]"
              width={1080}
              height={1440}
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy via-navy/80 to-transparent p-5">
              <div>
                <p className="font-display text-xl tracking-wide">{group.founder}</p>
                <p className="text-sm text-white/80">{group.founderRole}</p>
              </div>
              <LogoGrupoFVT variant="emblem" className="h-16 w-16 rounded-xl border border-gold/40 sm:h-20 sm:w-20" />
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
            e suporte depois da venda.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-navy/10 bg-white p-8">
              <div className="w-fit rounded-2xl bg-white">
                <LogoFlow className="h-16 w-auto sm:h-20" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold">Marca do grupo</p>
              <h3 className="mt-1 font-display text-3xl text-navy">Flow</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{group.brands[0].text}</p>
              <Link to="/flow" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">
                Ver catálogo Flow
              </Link>
            </article>
            <article className="rounded-3xl bg-navy p-8 text-white">
              <LogoTriton variant="light" className="h-20 w-auto sm:h-24" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-yellow">Marca do grupo</p>
              <h3 className="mt-1 font-display text-3xl">Triton</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{group.brands[1].text}</p>
              <Link to="/triton" className="mt-6 inline-flex rounded-full bg-yellow px-5 py-3 text-sm font-bold text-navy">
                Ver catálogo Triton
              </Link>
            </article>
          </div>
        </div>
      </section>

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
