import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabalhe conosco",
  description: "Envie sua candidatura para a Locajá.",
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
