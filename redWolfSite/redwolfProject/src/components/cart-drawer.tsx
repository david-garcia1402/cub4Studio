import { useState } from "react";
import { IconX } from "@/components/icons";
import { formatBRL, units } from "@/lib/brand";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const {
    drawerOpen,
    setDrawerOpen,
    lines,
    total,
    setQty,
    remove,
    unit,
    setUnit,
    checkoutWhatsApp,
    count,
  } = useCart();
  const [notes, setNotes] = useState("");

  if (!drawerOpen) return null;

  const selected = units[unit];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      onClick={() => setDrawerOpen(false)}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col border-l border-ember/25 bg-ink-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ember/20 px-5 py-4">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-ember-bright uppercase">
              Pedido piloto
            </p>
            <h2 id="cart-title" className="font-display text-3xl">
              Sacola
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar sacola"
            className="p-2 text-paper-dim hover:text-paper"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 py-4">
          {(Object.keys(units) as Array<keyof typeof units>).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setUnit(id)}
              className={`px-3 py-2 text-[11px] tracking-[0.14em] uppercase ${
                unit === id
                  ? "btn-ember"
                  : "border border-ember/25 text-paper-dim"
              }`}
            >
              {units[id].short}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {lines.length === 0 ? (
            <p className="mt-8 text-sm text-paper-dim">
              Sua sacola está vazia. Adicione pizzas ou burgers no cardápio.
            </p>
          ) : (
            <ul className="grid gap-4">
              {lines.map((line) => (
                <li
                  key={line.item.id}
                  className="flex items-start justify-between gap-3 border-b border-ember/15 pb-4"
                >
                  <div>
                    <p className="font-display text-xl">{line.item.name}</p>
                    <p className="text-sm text-ember-bright">
                      {formatBRL(line.item.price * line.qty)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center border border-ember/30"
                        onClick={() => setQty(line.item.id, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center border border-ember/30"
                        onClick={() => setQty(line.item.id, line.qty + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-2 text-xs text-paper-dim underline"
                        onClick={() => remove(line.item.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <label className="mt-6 grid gap-2 text-xs tracking-[0.14em] text-paper-dim uppercase">
            Observações
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              className="border border-ember/20 bg-ink px-3 py-3 text-sm tracking-normal text-paper normal-case outline-none focus:border-ember"
              placeholder="Sem cebola, troco, ponto da massa..."
            />
          </label>
        </div>

        <div className="border-t border-ember/20 px-5 py-5">
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-paper-dim">{count} itens</span>
            <span className="text-ember-bright">{formatBRL(total)}</span>
          </div>
          <a
            href={checkoutWhatsApp(notes)}
            target="_blank"
            rel="noreferrer"
            className="btn-ember block px-5 py-3.5 text-center text-[11px] font-semibold tracking-[0.2em] uppercase"
          >
            Enviar no WhatsApp · {selected.short}
          </a>
          <a
            href={selected.anota}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-center text-[11px] tracking-[0.16em] text-paper-dim uppercase hover:text-paper"
          >
            Ou abrir Anota AI
          </a>
        </div>
      </aside>
    </div>
  );
}
