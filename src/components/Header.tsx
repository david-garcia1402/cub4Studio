import { useEffect, useState } from "react";
import { navLinks } from "../data/site";
import { Brand } from "./ui/Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header" id="topo" style={{ boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.35)" : "none" }}>
      <div className="container header-inner">
        <Brand />
        <nav className={`nav${open ? " is-open" : ""}`} id="mainNav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="#contato" className="btn btn--primary btn--sm">
            Solicitar orçamento
          </a>
          <button
            className={`nav-toggle${open ? " is-open" : ""}`}
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mainNav"
            onClick={() => setOpen((value) => !value)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
