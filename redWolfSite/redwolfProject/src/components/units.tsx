import { units, unitWhatsApp, type UnitId } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/reveal";

export function Units() {
  const { unit, setUnit } = useCart();

  return (
    <section id="unidades" className="border-t border-ember/15 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-28">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
            Duas tocas
          </p>
          <h2 className="font-display mt-3 text-5xl md:text-6xl">
            Escolha a unidade
          </h2>
          <p className="mt-4 max-w-xl text-paper-dim">
            O WhatsApp e o Anota AI mudam conforme a cidade. O pedido da sacola
            já sai no número certo.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {(Object.keys(units) as UnitId[]).map((id, index) => {
            const item = units[id];
            const active = unit === id;
            return (
              <Reveal key={id} delay={index * 0.08}>
                <article
                  className={`border p-6 transition-colors md:p-8 ${
                    active
                      ? "border-ember bg-ink glow-ring"
                      : "border-ember/20 bg-ink"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] tracking-[0.22em] text-ember-bright uppercase">
                        {item.note}
                      </p>
                      <h3 className="font-display mt-2 text-3xl">{item.city}</h3>
                      <p className="mt-2 text-sm text-paper-dim">
                        {item.address}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUnit(id)}
                      className={`shrink-0 px-4 py-2 text-[11px] tracking-[0.16em] uppercase ${
                        active
                          ? "btn-ember"
                          : "border border-ember/30 text-paper-dim"
                      }`}
                    >
                      {active ? "Selecionada" : "Usar esta"}
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={unitWhatsApp(id)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ember px-5 py-3 text-[11px] font-semibold tracking-[0.16em] uppercase"
                    >
                      WhatsApp {item.short}
                    </a>
                    <a
                      href={item.anota}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-ember/40 px-5 py-3 text-[11px] tracking-[0.16em] uppercase hover:border-ember"
                    >
                      Pedir no Anota AI
                    </a>
                    <a
                      href={item.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 text-[11px] tracking-[0.16em] text-paper-dim uppercase hover:text-paper"
                    >
                      Rotas
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
