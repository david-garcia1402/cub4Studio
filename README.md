# cub4Studio — Site Institucional

Landing page institucional do **cub4Studio**, um estúdio de criação focado em:

- **Landing pages conversoras** integradas com Inteligência Artificial
- **Criativos** produzidos com apoio de IA generativa
- **Vídeos e reels** gerados por IA

Este repositório contém a primeira versão do site: uma página única (one-page) apresentando os serviços, os comprometimentos da marca e um espaço reservado para o portfólio, que será preenchido com projetos reais.

## Estrutura do projeto

```
cub4studio/
├── index.html          # Estrutura da página (hero, serviços, sobre, processo, portfólio, contato)
├── css/
│   └── style.css       # Design system (cores, tipografia, componentes, responsividade)
├── js/
│   └── main.js         # Menu mobile, animações de entrada e formulário de contato
├── assets/
│   └── img/
│       ├── icon-transparent.png    # Ícone do mascote (fundo transparente) — usado no header e footer
│       ├── logo-badge.jpg          # Logotipo completo (ícone + wordmark) — usado como decoração no hero e og:image
│       ├── favicon-32.png          # Favicon (32×32)
│       ├── favicon-64.png          # Favicon (64×64)
│       ├── favicon-192.png         # Favicon / ícone para dispositivos (192×192)
│       ├── favicon-512.png         # Favicon em alta resolução (512×512)
│       └── source/                 # Arquivo original enviado pelo cliente (referência)
└── README.md
```

Sem dependências, sem build step: HTML, CSS e JavaScript puros. Basta abrir `index.html` no navegador ou publicar em qualquer serviço de hospedagem estática (Vercel, Netlify, GitHub Pages, Cloudflare Pages etc.).

## Como visualizar localmente

```bash
cd cub4studio
python3 -m http.server 8080
# depois acesse http://localhost:8080
```

## Identidade visual

A logo oficial (mascote 3D vermelho/coral + wordmark "cub4Studio") foi recebida e já está integrada:

- **Header e footer**: ícone recortado com fundo transparente (`icon-transparent.png`) + wordmark em HTML/CSS (`cub` + `4` em coral + `Studio`), usando a fonte `Baloo 2` para o tom arredondado e amigável do mascote.
- **Favicons**: gerados a partir da logo original em vários tamanhos (32/64/192/512px), com cantos arredondados no estilo app icon.
- **Hero**: o mascote completo (`logo-badge.jpg`) aparece como elemento decorativo flutuante no canto direito (ocultado em telas menores para não competir com o texto).
- **Paleta de cores**: extraída da própria logo — coral/vermelho (`#e8583f`) como cor de destaque principal, fundo escuro com tom de roxo (`#0d0817`), substituindo a paleta genérica roxo/ciano da primeira versão.
- O arquivo original enviado está preservado em `assets/img/source/cub4studio-logo-original.jpg` como referência.

## Pendências / próximos passos

1. **Conteúdo do Instagram**: os textos de serviços e comprometimentos foram escritos com base na descrição fornecida pelo cliente. Ao ter acesso ao conteúdo real do perfil `@cub4studio` (confirmado como handle oficial), ajuste os textos das seções "Serviços" e "Sobre" para refletir a linguagem e o posicionamento já usados nas redes sociais.
2. **Portfólio**: a seção `#portfolio` está com cartões de espaço reservado ("Em breve"). Quando os criativos, landing pages e reels forem enviados pelo cliente, substitua os cartões por imagens/vídeos reais dos projetos.
3. **Formulário e WhatsApp**: os pedidos de orçamento vão para `cub4studio@gmail.com` via FormSubmit. O WhatsApp é o CTA principal (botão flutuante, hero, banner e contato), com mensagem pronta; o número fica só em `SITE.whatsapp` em `js/main.js` e não é exibido no site. Na primeira solicitação por e-mail, confirme o link de ativação do FormSubmit.
4. **Analytics**: o site dispara o evento `generate_lead` no envio do formulário e no clique do WhatsApp. Ative Web Analytics no projeto da Vercel. Para GA4 e Meta Pixel, cole os IDs em `SITE.ga4` e `SITE.metaPixel` em `js/main.js`.
5. **Domínio e SEO**: revisar `meta description` e a imagem de Open Graph (`og:image`, já configurada com `logo-badge.jpg`) ao definir o domínio final.

## Publicação em um repositório remoto (GitHub)

Este ambiente de agente não tem acesso a um repositório remoto nem a credenciais de Git/GitHub, então o repositório foi inicializado apenas localmente. Para publicar no GitHub:

```bash
cd cub4studio
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin cursor/cub4studio-site-f043
```

Ou, alternativamente, crie um repositório vazio no GitHub (ex.: `cub4studio`) e siga as instruções de "push an existing repository" fornecidas pelo GitHub.
