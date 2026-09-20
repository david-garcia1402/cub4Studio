---
name: mobile-responsive
description: Garante que toda alteração de UI do site cub4Studio (HTML/CSS/JS puros) seja 100% responsiva e mobile-first. Use sempre que criar, editar ou revisar qualquer trecho de index.html, css/style.css ou js/main.js que afete layout, componentes, modais, carrosséis, formulários ou tipografia.
---

# Responsividade mobile-first — cub4Studio

O site é uma one-page estática (HTML + CSS + JS puros, sem build). A maior parte do tráfego vem
do Instagram e do WhatsApp, ou seja, de celular. **Toda alteração visual é considerada incompleta
até funcionar bem em 360px de largura.**

## Quando usar

- Ao criar ou alterar qualquer seção, componente, modal, carrossel, formulário ou botão.
- Ao ajustar tipografia, espaçamentos, grids ou imagens.
- Ao revisar um PR que toque em `index.html`, `css/style.css` ou `js/main.js`.

## Regras do projeto

### Breakpoints (já existentes em `css/style.css`)

| Largura        | Uso                                                   |
| -------------- | ----------------------------------------------------- |
| `≤ 960px`      | Tablets: grids de 2 → 1 coluna, modal em 1 coluna     |
| `≤ 760px`      | Menu hambúrguer, modal em tela cheia, inputs 16px     |
| `≤ 560px`      | Celulares: header menor, CTAs em largura total        |
| `≤ 1180px`     | Só esconde o mascote do hero                          |

Não invente novos breakpoints sem necessidade. Se precisar, adicione **dentro** dos blocos
`@media` que já existem no fim do arquivo, na ordem decrescente (960 → 760 → 560).

### Layout

- Nunca use larguras fixas em `px` para blocos de conteúdo. Prefira `%`, `min()`, `clamp()`,
  `flex`/`grid` com `minmax()` e `max-width`.
- Nada pode gerar rolagem horizontal na página. Ao usar `100vw`, lembre da barra de rolagem:
  prefira `100%` do container. Carrosséis horizontais precisam de `overflow-x: auto` **dentro** de
  um wrapper com `overflow: hidden`.
- Grids com várias colunas devem colapsar para 1 coluna em `≤ 960px` (ou `≤ 760px` se forem
  2 colunas curtas).
- Altura de tela: use `100dvh` com fallback `100vh` na linha anterior (barras do Safari iOS).
- Elementos fixos nas bordas (botões de fechar, barras, rodapé de modal) devem somar
  `env(safe-area-inset-*, 0px)` ao padding/posição (o `viewport-fit=cover` já está na meta).
- Variáveis globais: `--container-w`, `--header-h`, `--radius-*`. Use `var(--header-h)` para
  qualquer offset relacionado ao header fixo (o `scroll-padding-top` do `html` já depende dela).

### Toque e interação

- Alvo mínimo de toque: **44×44px** para botões primários, **32px** para controles secundários
  (dots, chips). Nunca menos que isso.
- Todo carrossel/galeria precisa funcionar com **swipe** no toque, botões e teclado (setas/Esc).
  Prefira rolagem nativa com `scroll-snap-type: x mandatory` — o navegador cuida da inércia.
  Para arrasto com mouse, use Pointer Events e ignore `pointerType === 'touch'`.
- Use `touch-action` de forma explícita em áreas com gesto customizado (`pan-y` para swipe
  horizontal em JS, `pan-x pinch-zoom` em faixas roláveis).
- Não dependa de `:hover` para revelar informação ou ações. Hover só como reforço visual.
- `-webkit-tap-highlight-color: transparent` em botões customizados.
- `white-space: nowrap` em botões só no desktop; em `≤ 560px` volte para `normal` ou faça o
  botão ocupar 100% da largura.

### Formulários

- Inputs, selects e textareas com `font-size: 16px` em `≤ 760px` para evitar o zoom automático
  do iOS ao focar.
- Labels sempre visíveis (não só placeholder). Botão de envio em largura total no mobile.

### Imagens e mídia

- `img { max-width: 100%; display: block; }` já é global — não sobrescreva com largura fixa.
- Use `aspect-ratio` no contêiner e `object-fit` na imagem em vez de alturas fixas.
- Miniaturas/thumbs em linha precisam de `overflow-x: auto` + `flex: 0 0 auto` nos filhos.
- Imagens que o usuário precisa "ver de perto" devem abrir no lightbox existente
  (`initLightbox()` em `js/main.js`): passe `[{ src, alt }]`, o índice inicial e um `onChange`.
- Vídeos incorporados: `iframe` com `width: 100%` e `aspect-ratio`, nunca `height` fixa.

### Tipografia

- Títulos com `clamp()` (ex.: `clamp(1.9rem, 8.4vw, 2.4rem)` no hero em celulares).
- Evite `<br>` para quebrar títulos; se existir, esconda em `≤ 760px` (`.hero h1 br { display: none }`).
- Corpo de texto nunca abaixo de `0.85rem` (~13.6px) no mobile.

### Modais e overlays

- Em `≤ 760px` o modal vira uma folha em tela cheia (`height: 100dvh`, sem borda arredondada).
- Botão de fechar deve permanecer acessível mesmo com o conteúdo rolado
  (`position: fixed` dentro do overlay ou `position: sticky` no topo).
- Bloqueie a rolagem do `body` enquanto o overlay estiver aberto e restaure ao fechar.
- Use `inert` + `aria-hidden` no overlay fechado e devolva o foco ao elemento que abriu.

## Checklist antes de concluir

Rode local: `python3 -m http.server 8080` e abra `http://localhost:8080`.
Teste no DevTools (Ctrl/Cmd+Shift+M) nestas larguras, com **touch simulado**:

- [ ] **360×740** (Android compacto), **390×844** (iPhone 12–15), **430×932** (iPhone Pro Max),
      **768×1024** (tablet) e **1280+** (desktop).
- [ ] Sem rolagem horizontal em nenhuma largura (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] Nenhum texto cortado, sobreposto ou botão saindo do contêiner.
- [ ] Menu hambúrguer abre/fecha e os links rolam para a seção correta (sem ficar sob o header).
- [ ] Carrossel de projetos: swipe, setas e dots funcionam; clique no card abre o modal.
- [ ] Modal: rola em tela cheia, botão fechar sempre visível, swipe no palco troca a imagem,
      toque na imagem abre o lightbox; Esc fecha só o lightbox primeiro, depois o modal.
- [ ] Lightbox: swipe com inércia, setas, teclado, contador e legenda; fechar devolve o modal
      na mesma imagem.
- [ ] Formulário: sem zoom ao focar (iOS), botões em largura total, mensagem de status visível.
- [ ] Alvos de toque ≥ 44px nos controles principais.
- [ ] Ao alterar `css/style.css` ou `js/main.js`, incremente o `?v=` nas duas tags em
      `index.html` para invalidar o cache.

## Como testar via linha de comando (Chrome headless)

```bash
python3 -m http.server 8080 &
google-chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=390,844 --screenshot=/tmp/mobile.png http://localhost:8080
```

Para checar overflow horizontal:

```bash
google-chrome --headless=new --disable-gpu --window-size=360,740 \
  --virtual-time-budget=3000 --dump-dom http://localhost:8080 >/dev/null
```

(ou, com um navegador de verdade, no console: `document.documentElement.scrollWidth - window.innerWidth` deve ser `0`).
