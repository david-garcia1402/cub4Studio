import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { categories, equipment, getEquipment } from "@/data/equipment";

export function generateStaticParams() {
  return equipment.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getEquipment(slug);
  if (!item) return { title: "Equipamento" };
  return {
    title: item.name,
    description: item.short,
  };
}

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getEquipment(slug);
  if (!item) notFound();

  const category = categories.find((entry) => entry.id === item.category);
  const related = equipment
    .filter((entry) => entry.category === item.category && entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      <Link href="/equipamentos" className="text-sm font-semibold text-locaja-dark">
        ← Voltar ao catálogo
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] bg-paper">
          <div className="photo-plate relative aspect-square">
            <Photo
              src={item.image}
              alt={item.name}
              priority
              className="h-full w-full object-contain p-8"
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
            {category?.name}
          </p>
          <h1 className="display mt-2 text-4xl font-black md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg text-steel">{item.short}</p>
          <p className="mt-4 text-sm leading-relaxed text-steel">{item.description}</p>
          <ul className="mt-6 grid gap-2 text-sm">
            <li>Disponível para diária, semana, quinzena ou mês</li>
            <li>Frete opcional até o canteiro</li>
            <li>Manutenção em dia e substituição em caso de defeito</li>
          </ul>
        </div>
      </div>

      <section className="mt-14 rounded-[2rem] bg-paper p-6 md:p-8">
        <h2 className="display text-3xl font-black">Peça este equipamento</h2>
        <p className="mt-2 text-sm text-steel">
          O formulário abre o WhatsApp da Locajá com os dados do orçamento.
        </p>
        <div className="mt-6">
          <QuoteForm preset={item.name} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="display text-3xl font-black">Na mesma linha</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.slug}
                href={`/equipamentos/${entry.slug}`}
                className="rounded-3xl bg-paper p-5 hover:shadow-lg"
              >
                <p className="display text-xl font-bold">{entry.name}</p>
                <p className="mt-2 text-sm text-steel">{entry.short}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
