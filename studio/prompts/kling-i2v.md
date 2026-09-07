# Prompts — Kling 3.0 image-to-video

Receita: 2 takes de 12s, mesma still de referência, cortados no beat. Não peça 40s numa geração.

Via [klingai.com](https://klingai.com) ou fal.ai (`fal-ai/kling-video/v3/pro/image-to-video` — confirme o id atual no dashboard).

## Prompt de movimento (só ação + câmera)

```
The same 3D marmoset from the reference image dances happily in place,
soft bounce on the beat, knitted coral scarf fluttering, big friendly smile.
A tiny green parakeet with a blue beret joins and they hop together.
Slow gentle camera push-in, locked character identity, no face morph.
Kids animation, cheerful, golden hour. No people. No text.
```

## Settings

| Campo | Valor |
|---|---|
| Duração | 10–12s |
| Aspect | 9:16 |
| CFG / prompt strength | médio (identidade > invenção) |
| Negative | `morphing face, extra arms, photoreal baby, horror, duck, watermark, text` |
| Reference | still aprovada do episódio |

## Veo 3.1 (take herói)

Só se Kling derreter o rosto. Um take por episódio. Peça áudio nativo **mudo** ou ambiente leve — a música vem do Suno.

## Runway Gen-4.5

Só se precisar motion brush no cachecol. Não é o default.
