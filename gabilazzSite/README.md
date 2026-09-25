# Gabrieli Lazzarotto · Lash Designer

Site institucional (landing page) de **Gabrieli Lazzarotto — Lash Designer**, Jaraguá do Sul - SC.
100% estático, mobile first, pronto para deploy na Cloudflare.

## Stack

- [Vite 8](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (tema com as cores da marca: vinho, dourado e creme)
- [Motion](https://motion.dev) (animações e reveals)
- [Embla Carousel](https://www.embla-carousel.com) (carrossel do catálogo, com autoplay e arraste)
- [Lucide](https://lucide.dev) (ícones)

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # serve o build localmente
```

## Deploy na Cloudflare

### Workers (Import a repository) — recomendado

Em **Workers & Pages → Create → Workers → Import a repository**, selecione este repositório e preencha:

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler preview` |
| Path (Advanced settings) | `/` |
| API token | crie um token novo para este projeto |

O `wrangler.jsonc` já aponta os assets para `./dist` e inclui o bloco `previews` (pode ficar vazio). Sem esse bloco, o Wrangler 4.135+ recusa o comando `npx wrangler preview`. Cada push na branch principal publica em produção; pushes em outras branches geram uma URL de preview isolada. O arquivo `public/_headers` define cache e headers de segurança.

Deploy manual pela linha de comando (requer `npx wrangler login`):

```bash
npm run deploy:workers   # build + `wrangler deploy`
```

### Cloudflare Pages (alternativa)

Em **Pages → Connect to Git**: framework preset **Vite**, build command `npm run build`, output directory `dist`.

## Estrutura

```
src/
  data/site.ts        # contato, endereço, serviços/preços, avaliações, políticas
  components/         # seções da página (Hero, About, Catalog, Reviews, Studio, Faq, Cta, Footer)
  components/ui/      # Button, Reveal, SectionHeading, WhatsAppIcon
  assets/             # fotos reais do catálogo (WebP) e logo
public/               # favicon, manifest, _headers, robots, sitemap, og-image
```

## Atualizando conteúdo

Todo o conteúdo editável (telefone, endereço, preços, descrições, depoimentos, políticas) fica em `src/data/site.ts`.
As fotos dos procedimentos ficam em `src/assets/services/` e são referenciadas no mesmo arquivo.
