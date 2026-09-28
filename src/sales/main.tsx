import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { contentByLocale } from "./content";
import { SalesPage } from "./SalesPage";

const locale = document.documentElement.dataset.locale === "en" ? "en" : "pt-br";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SalesPage content={contentByLocale[locale]} />
  </StrictMode>,
);
