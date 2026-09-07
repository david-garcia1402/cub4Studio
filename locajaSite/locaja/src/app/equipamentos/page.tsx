import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
import type { CategoryId } from "@/data/equipment";

export const metadata: Metadata = {
  title: "Equipamentos",
  description:
    "Catálogo de locação Locajá: andaimes, betoneiras, rompedores, plataformas, geradores e mais de 150 modelos.",
};

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
        Catálogo
      </p>
      <h1 className="display mt-2 text-5xl font-black md:text-6xl">Equipamentos para locação</h1>
      <p className="mt-4 max-w-2xl text-steel">
        Busque, filtre por categoria e solicite o orçamento. Toda a linha sai
        revisada e com orientação técnica.
      </p>
      <div className="mt-8">
        <Catalog
          initialQuery={params.q ?? ""}
          initialCategory={params.categoria as CategoryId | undefined}
        />
      </div>
    </div>
  );
}
