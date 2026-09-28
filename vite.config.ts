import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssMinify: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        salesPtBr: resolve(root, "pt-br/ai-to-business/index.html"),
        salesEn: resolve(root, "en/ai-to-business/index.html"),
      },
    },
  },
});
