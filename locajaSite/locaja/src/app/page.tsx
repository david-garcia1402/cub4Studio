import Link from "next/link";
import { EquipmentCard } from "@/components/equipment-card";
import { FaqList } from "@/components/faq-list";
import { IconArrow, IconCheck, IconClock, IconPin, IconStar } from "@/components/icons";
import { Photo } from "@/components/photo";
import { SearchBox } from "@/components/search-box";
import { branches, defaultWhatsApp } from "@/data/branches";
import { categories, equipment, featuredEquipment } from "@/data/equipment";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import { whatsappLink } from "@/lib/whatsapp";

const heroPhotos = [
  "/equipment/plataforma-tipo-tesoura.jpg",
  "/equipment/betoneira-250-litros.jpg",
  "/equipment/compactador-de-solo-a-gasolina.jpg",
  "/equipment/andaimes-tubolares.jpg",
  "/equipment/guincho-de-coluna-400kg-trifasico.jpg",
  "/equipment/gerador.jpg",
];

const stats = [
  { value: "2005", label: "Ano de fundação" },
  { value: "6", label: "Unidades em SC" },
  { value: "150+", label: "Modelos em linha" },
  { value: "15 min", label: "Resposta no WhatsApp" },
];

const reasons = [
  "Máquinas revisadas e com segurança em dia",
  "Entrega na obra e retirada no prazo",
  "Substituição rápida se houver defeito",
  "Atendimento humano, sem robô",
  "Orientação para escolher o equipamento certo",
  "Prazos flexíveis: diário, semanal ou mensal",
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <div className="grid h-full grid-cols-2 gap-3 p-6 pt-28">
            {heroPhotos.map((src, index) => (
              <div
                key={src}
                className={`photo-plate relative overflow-hidden rounded-3xl ${
                  index === 0 ? "row-span-2" : ""
                }`}
              >
                <Photo
                  src={src}
                  alt="Equipamento oficial Locajá"
                  priority={index < 2}
                  className="h-full w-full object-contain p-4"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32">
          <div className="lg:max-w-[52%]">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.22em] text-safety">
            Vale do Itajaí · Litoral Norte
          </p>
          <h1 className="display max-w-4xl text-5xl font-black leading-[0.92] sm:text-7xl lg:text-8xl">
            Sua obra não para.
            <span className="text-locaja"> A Locajá entrega.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Desde 2005 locamos equipamentos para construção civil com qualidade,
            rapidez e seriedade. Mais de 150 modelos prontos para sair hoje.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchBox variant="dark" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/equipamentos"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
            >
              Ver catálogo <IconArrow size={16} />
            </Link>
            <a
              href={whatsappLink(defaultWhatsApp, "Olá! Quero um orçamento urgente.")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/8"
            >
              <WhatsAppMark size={18} />
              Orçamento no WhatsApp
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2 lg:hidden">
            {heroPhotos.slice(0, 3).map((src) => (
              <div key={src} className="photo-plate relative aspect-square overflow-hidden rounded-2xl">
                <Photo src={src} alt="" className="h-full w-full object-contain p-2" />
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px border-t border-white/10 bg-white/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink px-5 py-8">
              <p className="display text-4xl font-black text-locaja">{stat.value}</p>
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
              Categorias
            </p>
            <h2 className="display mt-2 text-4xl font-black md:text-5xl">Tudo para o canteiro</h2>
          </div>
          <Link href="/equipamentos" className="hidden text-sm font-semibold text-locaja-dark md:inline-flex">
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/equipamentos?categoria=${category.id}`}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="photo-plate relative aspect-[4/3]">
                <Photo
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="display text-2xl font-bold">{category.name}</p>
                <p className="text-xs text-white/70">{category.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
              Destaques
            </p>
            <h2 className="display mt-2 text-4xl font-black md:text-5xl">Os mais pedidos da semana</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredEquipment.map((item) => (
              <EquipmentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
            Por que locar
          </p>
          <h2 className="display mt-2 text-4xl font-black md:text-5xl">
            Menos custo parado. Mais obra andando.
          </h2>
          <p className="mt-4 text-steel">
            A Locajá nasceu em Jaraguá do Sul para preencher uma lacuna na
            locação de equipamentos. Hoje somos referência no Vale e no litoral,
            com ética, transparência e respeito ao cliente.
          </p>
          <ul className="mt-6 grid gap-3">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-locaja/15 text-locaja-dark">
                  <IconCheck size={14} />
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            {equipment.slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                href={`/equipamentos/${item.slug}`}
                className="photo-plate relative aspect-square overflow-hidden rounded-3xl"
              >
                <Photo
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain p-5"
                />
              </Link>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-paper p-5 shadow-sm">
            <div className="flex items-center gap-2 text-locaja">
              {Array.from({ length: 5 }).map((_, index) => (
                <IconStar key={index} size={16} />
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-steel">
              Tempo e confiança são o que a obra precisa. Variedade, entrega e
              uma pessoa real no WhatsApp — sem obra parada.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink">
              Compromisso Locajá · desde 2005
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja">
                Unidades
              </p>
              <h2 className="display mt-2 text-4xl font-black md:text-5xl">Perto da sua obra</h2>
            </div>
            <Link href="/unidades" className="text-sm font-semibold text-white/70 hover:text-white">
              Ver mapas e horários
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <article key={branch.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-safety">{branch.kind}</p>
                <h3 className="display mt-1 text-2xl font-bold">{branch.city}</h3>
                <p className="mt-3 flex items-start gap-2 text-sm text-white/70">
                  <IconPin size={16} />
                  {branch.address} · {branch.neighborhood}
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm text-white/70">
                  <IconClock size={16} />
                  {branch.hours}
                </p>
                <p className="mt-4 text-sm font-semibold text-locaja">
                  {branch.mobile ?? branch.phone}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="display text-4xl font-black md:text-5xl">Perguntas frequentes</h2>
        <div className="mt-8">
          <FaqList />
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-locaja px-6 py-12 text-white md:px-12">
          <p className="display text-4xl font-black md:text-6xl">Obra parada é prejuízo.</p>
          <p className="mt-3 max-w-xl text-white/85">
            Solicite o orçamento agora e receba atendimento prioritário no WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contato"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
            >
              Pedir orçamento
            </Link>
            <Link
              href="/equipamentos"
              className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold"
            >
              Escolher equipamento
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
