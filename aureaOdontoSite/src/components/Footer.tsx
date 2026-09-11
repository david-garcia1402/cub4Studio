import { clinic } from "../data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-sand bg-cream px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {clinic.address} — {clinic.neighborhood}, {clinic.city} - {clinic.state}
            <br />
            RT {clinic.rt} · {clinic.cro} · {clinic.epao}
          </p>
        </div>
        <div className="text-sm text-muted">
          <p>Fotos reais da clínica no Google Maps.</p>
          <p className="mt-1">© {new Date().getFullYear()} {clinic.name}</p>
        </div>
      </div>
    </footer>
  );
}
