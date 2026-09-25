import { navLinks, site } from "../data/site";
import { Brand, InstagramIcon, WhatsAppIcon } from "./ui/Icons";
import { whatsappHref } from "../lib/whatsapp";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Brand />
          <p>Estúdio de criação com Inteligência Artificial.</p>
        </div>
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-socials">
          <a className="footer-social" href={whatsappHref()} target="_blank" rel="noopener" aria-label="WhatsApp do cub4Studio">
            <WhatsAppIcon size={22} />
          </a>
          <a href={site.instagram} target="_blank" rel="noopener" className="footer-social" aria-label="Instagram do cub4Studio">
            <InstagramIcon size={22} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} cub4Studio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
