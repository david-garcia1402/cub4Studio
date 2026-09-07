"use client";

import { useMemo, useState } from "react";
import { categories, searchEquipment, type CategoryId } from "@/data/equipment";
import { EquipmentCard } from "./equipment-card";

const PAGE_SIZE = 12;

export function Catalog({
  initialQuery = "",
  initialCategory,
}: {
  initialQuery?: string;
  initialCategory?: CategoryId;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId | "todas">(initialCategory ?? "todas");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const items = useMemo(() => {
    const found = searchEquipment(query);
    return category === "todas" ? found : found.filter((item) => item.category === category);
  }, [query, category]);

  const shown = items.slice(0, visible);

  return (
    <div>
      <div className="rounded-3xl border border-black/5 bg-paper p-4 shadow-sm md:p-5">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Busque por nome ou categoria..."
          className="field"
        />
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Chip
            active={category === "todas"}
            onClick={() => {
              setCategory("todas");
              setVisible(PAGE_SIZE);
            }}
          >
            Todas
          </Chip>
          {categories.map((entry) => (
            <Chip
              key={entry.id}
              active={category === entry.id}
              onClick={() => {
                setCategory(entry.id);
                setVisible(PAGE_SIZE);
              }}
            >
              {entry.name}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-steel">
        {items.length} equipamentos · mostrando {shown.length}
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((item) => (
          <EquipmentCard key={item.slug} item={item} />
        ))}
      </div>
      {visible < items.length ? (
        <button
          type="button"
          onClick={() => setVisible((count) => count + PAGE_SIZE)}
          className="mx-auto mt-8 block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Ver mais equipamentos
        </button>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
        active ? "bg-ink text-white" : "bg-sand text-ink hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}
