import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { branches } from "@/data/branches";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Locajá | Locação de equipamentos para construção civil",
    template: "%s | Locajá",
  },
  description:
    "Desde 2005, a Locajá loca mais de 150 equipamentos para construção civil em Jaraguá do Sul, São Bento do Sul, Itapema, Itajaí, Porto Belo e Penha. Orçamento rápido no WhatsApp.",
  metadataBase: new URL("https://www.locaja.com.br"),
  openGraph: {
    title: "Locajá | Locação de equipamentos para construção civil",
    description:
      "Mais de 150 máquinas revisadas, 6 unidades em Santa Catarina e resposta em até 15 minutos.",
    locale: "pt_BR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Locajá",
  url: "https://www.locaja.com.br",
  foundingDate: "2005",
  areaServed: "Santa Catarina",
  sameAs: [
    "https://www.instagram.com/locajalocadora/",
    "https://www.facebook.com/locajaequipamentos",
  ],
  department: branches.map((branch) => ({
    "@type": "LocalBusiness",
    name: `Locajá ${branch.city}`,
    telephone: branch.mobile ?? branch.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: "SC",
      addressCountry: "BR",
    },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
