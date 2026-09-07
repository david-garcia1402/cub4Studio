import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Raven | Alta gastronomia mediterrânea em Porto Alegre",
  description:
    "Restaurante aconchegante na Cidade Baixa, com mezanino intimista, vinhos e pratos da alta gastronomia mediterrânea. 4,7 no Google · 1.864 avaliações.",
  keywords: [
    "The Raven",
    "restaurante Porto Alegre",
    "Cidade Baixa",
    "gastronomia mediterrânea",
    "jantar romântico",
  ],
  openGraph: {
    title: "The Raven Restaurant",
    description:
      "Alta gastronomia mediterrânea no coração da Cidade Baixa, Porto Alegre.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-paper">{children}</body>
    </html>
  );
}
