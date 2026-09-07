import { categories, type Equipment } from "@/data/equipment";
import { IconArrow } from "./icons";
import { Photo } from "./photo";

export function EquipmentCard({ item }: { item: Equipment }) {
  const category = categories.find((entry) => entry.id === item.category);

  return (
    <a
      href={`/equipamentos/${item.slug}`}
      className="group overflow-hidden rounded-3xl border border-ink/8 bg-paper shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="photo-plate relative aspect-square overflow-hidden">
        <Photo
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-medium text-white">
          {category?.name}
        </span>
      </div>
      <div className="p-5">
        <h3 className="display text-xl font-bold leading-tight">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-steel">{item.short}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-locaja">
          Ver e orçar
          <IconArrow size={16} />
        </p>
      </div>
    </a>
  );
}
