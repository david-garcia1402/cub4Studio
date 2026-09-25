# Prompts — stills (Flux / Nano Banana / Gemini Image / Midjourney)

Referência: `studio/ip/refs/duo-hero.png` + `pipoca-dance.png`. Sempre anexe a imagem.

## Flux / fal.ai (fal-ai/flux/dev ou kontext)

```
stylized 3D CGI Pixar-adjacent kids animation, soft subsurface scattering,
{CHARACTER_FROM_REFERENCE}, same face and coral scarf as the reference image,
{SCENE_FROM_BRIEF}, golden hour, vertical 9:16, 1080x1920,
cheerful Brazilian toy-farm, no people, no text, no watermark
```

Negativo:

```
photoreal, baby, human child, duck, copyrighted character, horror, extra limbs,
melted face, text, watermark, logo
```

## Nano Banana / Gemini Image

Envie `duo-hero.png` e peça:

```
Keep these exact two characters. Place them in {SCENE}.
Pipoca leads a cute dance step, Nino on his shoulder or flying a small circle.
Stylized 3D kids film, 9:16. Do not change face, scarf, beret or colors.
```

## Midjourney (stills de campanha, não API)

```
{scene} --oref <duo-hero.png> --ow 80 --ar 9:16 --stylize 80 --v 7
```

## Por episódio

Gere 4 stills: hook, dança A, dança B (ângulo novo), payoff. Aprove 1–2. Jogue o resto fora. Não publique still “quase”.
