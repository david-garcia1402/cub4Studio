import { units, unitWhatsApp } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/reveal";

export function OrderHub() {
  const { unit, setDrawerOpen } = useCart();
  const selected = units[unit];

  return (
    <section id="pedir" className="border-t border-ember/15 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
            Central de pedidos
          </p>
          <h2 className="font-display mt-3 text-5xl md:text-6xl">
            Um clique. A unidade certa.
          </h2>
          <p className="mt-4 max-w-2xl text-paper-dim">
            Hoje o cliente pula de Linktree para Anota AI e WhatsApp. Neste
            piloto tudo mora aqui: sacola, mensagem pronta e delivery.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="glow-ring border border-ember/30 bg-ink p-6 text-left"
          >
            <p className="text-[11px] tracking-[0.2em] text-ember-bright uppercase">
              01
            </p>
            <h3 className="font-display mt-3 text-3xl">Montar sacola</h3>
            <p className="mt-2 text-sm text-paper-dim">
              Adicione pizzas e burgers. O total já vai no WhatsApp.
            </p>
          </button>
          <a
            href={unitWhatsApp(unit)}
            target="_blank"
            rel="noreferrer"
            className="border border-ember/20 bg-ink p-6"
          >
            <p className="text-[11px] tracking-[0.2em] text-ember-bright uppercase">
              02
            </p>
            <h3 className="font-display mt-3 text-3xl">WhatsApp</h3>
            <p className="mt-2 text-sm text-paper-dim">
              {selected.city} · {selected.whatsappDisplay}
            </p>
          </a>
          <a
            href={selected.anota}
            target="_blank"
            rel="noreferrer"
            className="border border-ember/20 bg-ink p-6"
          >
            <p className="text-[11px] tracking-[0.2em] text-ember-bright uppercase">
              03
            </p>
            <h3 className="font-display mt-3 text-3xl">Anota AI</h3>
            <p className="mt-2 text-sm text-paper-dim">
              Cardápio oficial da unidade {selected.short}.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
