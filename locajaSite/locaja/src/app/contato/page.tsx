import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view";

export const metadata: Metadata = {
  title: "Contato e orçamento",
  description: "Solicite orçamento de locação de equipamentos Locajá pelo WhatsApp da filial.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      <ContactView />
    </div>
  );
}
