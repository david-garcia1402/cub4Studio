# cub4Studio — Site institucional

Landing page do **cub4Studio**: landing pages conversoras, criativos e vídeos/reels com IA.

O site é um app estático em **Vite + React + TypeScript**, no mesmo padrão dos outros projetos do estúdio (Gabilazz, Áurea, Flow). A publicação prevista é no **Cloudflare Workers** com assets estáticos.

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/
npm run preview   # serve o build
npm run deploy:workers
```

No painel da Cloudflare (Workers → Import a repository):

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output: `dist` (já apontado em `wrangler.jsonc`)

## Estrutura

```
src/
  components/     # seções da página (hero, portfólio, contato…)
  data/           # textos, serviços e projetos do portfólio
  styles/site.css # design system e responsividade
public/           # favicon, logo e prints do portfólio
```

O portfólio publicado hoje: Grupo FVT, Gabrieli Lazzarotto, PipoCrunch, Guacamole Cocina Mexicana, The Raven, EconoRadar, Mel & Brasa, Néctar Atelier e The Lake Nyos Mystery. Para incluir um projeto, edite `src/data/portfolio.ts` e coloque as imagens em `public/portfolio/`.

## Contato

Orçamentos vão para `cub4studio@gmail.com` via FormSubmit. O WhatsApp `(47) 99994-0399` é o CTA principal. GA4 e Meta Pixel ficam opcionais em `src/data/site.ts` (`ga4` e `metaPixel`). A hospedagem do site é Cloudflare Workers.
