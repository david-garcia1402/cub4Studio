import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo";
import { branches } from "@/data/branches";
import { categories, featuredEquipment } from "@/data/equipment";

export const metadata: Metadata = {
  title: "A Locajá",
  description:
    "A Locajá nasceu em 2005 em Jaraguá do Sul para locar equipamentos de construção civil com seriedade, qualidade e transparência.",
};

const values = [
  {
    n: "01",
    title: "Missão",
    text: "Levar a solução para as empresas da construção civil através da locação de equipamentos, minimizando custos, com qualidade, rapidez e seriedade.",
  },
  {
    n: "02",
    title: "Visão",
    text: "Ser referência no mercado de locação de equipamentos em Jaraguá do Sul e região, com inovação e melhorias contínuas.",
  },
  {
    n: "03",
    title: "Valores",
    text: "Ética, transparência, competência e respeito ao cliente. Negociação clara e equipamentos sempre revisados.",
  },
];

const timeline = [
  { year: "2005", title: "A origem", text: "A Locajá nasce em Jaraguá do Sul para preencher uma lacuna na locação de equipamentos." },
  { year: "Expansão", title: "Vale e litoral", text: "O atendimento cresce para São Bento do Sul, Itapema, Itajaí, Porto Belo e Penha." },
  { year: "Hoje", title: "150+ modelos", text: "Frota revisada, entrega na obra e uma pessoa real no WhatsApp em até 15 minutos." },
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja">
          A empresa · desde janeiro de 2005
        </p>
        <h1 className="display mt-3 max-w-4xl text-5xl font-black md:text-7xl">
          Nascemos para a obra não depender de estoque.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-steel">
          A Locajá surgiu para preencher uma lacuna na locação de equipamentos
          em Jaraguá do Sul e cidades vizinhas. Os anos passaram e a empresa
          cresceu com seriedade, eficiência e transparência nas negociações.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 pb-16 sm:grid-cols-3">
        {timeline.map((item) => (
          <article key={item.year} className="rounded-[1.7rem] bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-locaja">{item.year}</p>
            <h2 className="display mt-3 text-3xl font-black">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja">
              Linha de locação
            </p>
            <h2 className="display mt-2 text-4xl font-black md:text-5xl">
              Alguns dos equipamentos que saem daqui
            </h2>
            <p className="mt-3 max-w-xl text-steel">
              Fotos oficiais do catálogo. Cada peça tem ficha, orçamento e
              unidade para retirada ou entrega.
            </p>
          </div>
          <Link
            href="/equipamentos"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featuredEquipment.map((item, index) => {
            const category = categories.find((entry) => entry.id === item.category);
            const wide = index === 0;
            return (
              <a
                key={item.slug}
                href={`/equipamentos/${item.slug}`}
                className={`group overflow-hidden rounded-[1.8rem] border border-ink/8 bg-paper shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
                  wide ? "sm:col-span-2 xl:col-span-2" : ""
                }`}
              >
                <div className={`photo-plate relative ${wide ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[4/3]"}`}>
                  <Photo
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">
                    {category?.name}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="display text-2xl font-black leading-tight">{item.name}</h3>
                    <p className="mt-1 text-sm text-steel">{item.short}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-locaja">Orçar →</span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja">Como trabalhamos</p>
        <h2 className="display mt-2 text-4xl font-black md:text-5xl">Missão, visão e valores</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="relative overflow-hidden rounded-[1.8rem] bg-paper p-7 shadow-sm">
              <p className="display text-6xl font-black text-locaja/20">{item.n}</p>
              <h3 className="display mt-2 text-3xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white">
          <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja">Presença</p>
              <h2 className="display mt-2 text-4xl font-black md:text-5xl">Seis unidades em Santa Catarina</h2>
              <p className="mt-4 max-w-xl text-white/70">
                Matriz em Jaraguá do Sul e filiais no Vale e no Litoral Norte.
                Atendemos as cidades vizinhas de cada base.
              </p>
              <Link
                href="/unidades"
                className="mt-6 inline-flex rounded-full bg-locaja px-5 py-3 text-sm font-semibold"
              >
                Ver mapas e horários
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {branches.map((branch) => (
                <li key={branch.id} className="rounded-2xl bg-white/6 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-locaja">{branch.kind}</p>
                  <p className="font-semibold">{branch.city}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
