# MoneyPrinterTurbo — só compositor

O MPT escreve roteiro, busca Pexels e monta. Neste nicho **desligue busca de stock**.

## O que reaproveitar

- FFmpeg / concat / legendas coloridas / loudness
- Batch e CLI
- `video_source=local` + lista de takes gerados

## O que não usar

- Pexels, Pixabay, Coverr
- Script automático sem a bible da Vila do Pulo
- Publish cruzado TikTok/Shorts sem QA

## Fluxo

1. Gere stills + Kling + Suno nesta fábrica
2. Salve em `episodes/<pasta>/takes` e `audio`
3. `python3 studio/pipeline/assemble.py episodes/<pasta>`
4. **Ou** aponte o MPT:

```bash
# exemplo — ajuste ao CLI local do seu clone
uv run python cli.py \
  --video-subject "Vila do Pulo — não gerar roteiro novo" \
  --video-source local \
  --video-materials "./take-a.mp4,./take-b.mp4"
```

Se o MPT insistir em gerar termos de busca, não rode. Use o `assemble.py` desta pasta — ele já faz o trabalho de compositor.
