import { useEffect, useState } from "react";
import { IconMenu, IconX } from "@/components/icons";
import { WolfMark } from "@/components/wolf-mark";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#unidades", label: "Unidades" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#promos", label: "Promoções" },
  { href: "#avaliacoes", label: "Clientes" },
  { href: "#visitar", label: "Horários" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setDrawerOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-ember/20 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#topo" className="flex items-center gap-3 text-paper">
          <WolfMark className="h-9 w-9" />
          <span className="font-display text-lg tracking-[0.18em]">REDWOLF</span>
        </a>

        <nav className="hidden items-center gap-8 text-[11px] tracking-[0.22em] text-paper-dim uppercase lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ember-bright"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative border border-ember/35 px-4 py-2 text-[11px] tracking-[0.16em] uppercase hover:border-ember"
          >
            Sacola
            {count > 0 && (
              <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center bg-ember px-1 text-[10px] font-semibold">
                {count}
              </span>
            )}
          </button>
          <a
            href="#pedir"
            className="btn-ember hidden px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase sm:inline-flex"
          >
            Pedir
          </a>
          <button
            type="button"
            className="p-2 text-paper lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-ember/20 px-5 py-4 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm tracking-[0.18em] text-paper-dim uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
