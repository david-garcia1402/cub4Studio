import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { Ephesis, Fraunces, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const ephesis = Ephesis({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ephesis",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.description} ${site.rating} estrelas e ${site.reviews.toLocaleString("pt-BR")} avaliações em Petrópolis, Porto Alegre.`,
  openGraph: {
    title: `${site.name} — ${site.city}`,
    description: site.description,
    locale: "pt_BR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: "Mexicana",
  priceRange: site.priceRange,
  telephone: "+55-51-99361-9797",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "Porto Alegre",
    addressRegion: "RS",
    postalCode: "90470-120",
    addressCountry: "BR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    reviewCount: site.reviews,
  },
  openingHours: "Mo-Su 19:00-00:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${fraunces.variable} ${ephesis.variable} h-full`}
    >
      <body className={`${outfit.className} min-h-full bg-night text-paper antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappFloat />
      </body>
    </html>
  );
}
