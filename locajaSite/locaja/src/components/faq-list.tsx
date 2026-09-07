"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";

export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-black/8 overflow-hidden rounded-3xl border border-black/5 bg-paper">
      {faqs.map((item, index) => {
        const active = open === index;
        return (
          <button
            key={item.q}
            type="button"
            onClick={() => setOpen(active ? -1 : index)}
            className="w-full px-5 py-5 text-left md:px-7"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="display text-lg font-bold md:text-xl">{item.q}</p>
              <span className="text-locaja">{active ? "–" : "+"}</span>
            </div>
            {active ? (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-steel">{item.a}</p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
