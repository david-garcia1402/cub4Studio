# Vídeos de anúncio (Reels 1080x1920)

Gerador dos anúncios "ganhar dinheiro com IA" do guia AI to Business. Cada vídeo abre com um
gancho, mostra um site real do portfólio sendo usado no celular (toques, menu, carrossel,
lightbox) e fecha com o CTA do guia.

```bash
cd videos
npm install
node render.mjs                        # todas as versões → out/<id>.mp4
node render.mjs v1-dinheiro-ia-lash    # só uma versão
node render.mjs v2-ia-so-pra-conversar --preview   # prancha de frames em out/preview-<id>.jpg
node render.mjs --recapture            # regrava os sites (use depois de mudar um site)
```

Requisitos: Node 20+, `ffmpeg` e Google Chrome (`CHROME_PATH` se não estiver em
`/usr/local/bin/google-chrome`).

- `projects.mjs`: roteiro de cada versão (ganchos, clipes, CTA). Marcação dos textos:
  `*vermelho*`, `[caixa vermelha]` e `|` para quebrar linha.
- `clips.mjs`: o que é feito em cada site (rolagem, toques, legendas no momento de cada ação).
- `compositor.html`: layout e animações do vídeo. Textos importantes ficam entre 200px e
  1300px de altura, fora da área coberta pela interface do Reels.
- `assets/music.m4a`: trilha do vídeo original da lash designer.

A gravação roda os sites em câmera lenta (3x) e captura frame a frame, então a rolagem e as
animações saem lisas a 30fps mesmo em máquina lenta. Gravações ficam em cache em `.cache/`.
