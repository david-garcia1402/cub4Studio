import Link from "next/link";
import { branches, defaultWhatsApp } from "@/data/branches";
import { whatsappLink } from "@/lib/whatsapp";
import { IconFacebook, IconInstagram } from "./icons";
import { Logo } from "./logo";
import { WhatsAppMark } from "./whatsapp-mark";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-16 w-auto" />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
            Desde 2005 locando equipamentos para construção civil no Vale do
            Itajaí e Litoral Norte de Santa Catarina. Mais de 150 modelos,
            seis unidades e atendimento humano.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://www.instagram.com/locajalocadora/"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/8 hover:bg-locaja"
              aria-label="Instagram"
            >
              <IconInstagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/locajaequipamentos"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/8 hover:bg-locaja"
              aria-label="Facebook"
            >
              <IconFacebook size={18} />
            </a>
            <a
              href={whatsappLink(defaultWhatsApp, "Olá! Vim pelo novo site da Locajá.")}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white"
              aria-label="WhatsApp"
            >
              <WhatsAppMark size={40} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-locaja">
            Navegação
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/equipamentos" className="hover:text-white">
              Equipamentos
            </Link>
            <Link href="/unidades" className="hover:text-white">
              Unidades
            </Link>
            <Link href="/sobre" className="hover:text-white">
              A empresa
            </Link>
            <Link href="/contato" className="hover:text-white">
              Orçamento
            </Link>
            <Link href="/trabalhe-conosco" className="hover:text-white">
              Trabalhe conosco
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-locaja">
            Unidades
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            {branches.map((branch) => (
              <Link key={branch.id} href="/unidades" className="hover:text-white">
                {branch.city}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Locajá Locadora de Equipamentos. Todos os direitos reservados.</p>
          <p>Jaraguá do Sul · São Bento do Sul · Itapema · Itajaí · Porto Belo · Penha</p>
        </div>
      </div>
    </footer>
  );
}
