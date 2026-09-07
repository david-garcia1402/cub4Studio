import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dom Camilo | Rodízio e casa de almoço em Canoas",
  description:
    "Rodízio de carnes na brasa, buffet gaúcho e sobremesas caseiras no Niterói, Canoas. Nota 4,2 · R$ 20–40 · Rua José do Patrocínio, 122.",
  keywords: [
    "Dom Camilo",
    "restaurante Canoas",
    "rodízio Canoas",
    "churrasco Niterói",
    "buffet de almoço",
  ],
  openGraph: {
    title: "Restaurante Dom Camilo",
    description:
      "Carnes na brasa, mesa farta e casa informal em Canoas. 4,2 no Google.",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-linen font-sans text-ink">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
