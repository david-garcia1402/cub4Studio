# Character sheet — pedido de stills canônicos

Gere estas 10 stills **antes** de qualquer Short. Aprove com olho humano. Salve em `studio/ip/refs/`.

Nomes de arquivo obrigatórios:

| # | Arquivo | Shot |
|---|---|---|
| 1 | `pipoca-front.png` | Pipoca de frente, corpo inteiro, fundo neutro creme |
| 2 | `pipoca-three-quarter.png` | 3/4 esquerda, sorriso leve |
| 3 | `pipoca-side.png` | Perfil direito, cauda visível |
| 4 | `pipoca-back.png` | Costas, cachecol e anéis da cauda |
| 5 | `pipoca-joy.png` | Close, olhos semicerrados de risada |
| 6 | `pipoca-wow.png` | Close, boca aberta de surpresa feliz |
| 7 | `pipoca-dance.png` | Corpo inteiro, um pé no ar, braços abertos |
| 8 | `nino-front.png` | Nino de frente, boina no lugar |
| 9 | `nino-three-quarter.png` | Nino 3/4, asa meio aberta |
| 10 | `duo-hero.png` | Pipoca + Nino no ombro, plano médio, jardim desfocado |

## Prompt-base (cole + linha do shot)

```
{STYLE_LOCK}

Character: Pipoca, a tiny stylized 3D golden-honey marmoset with a cream face,
amber eyes, a soft white neck collar, a knitted coral scarf #E8583F,
and a long ringed golden tail. Cute, rounded, kids animation hero.

{SHOT_LINE}

Neutral cream backdrop unless the shot is duo-hero.
No text, no watermark, no extra characters.
```

`STYLE_LOCK` = bloco canônico de [style-lock.md](style-lock.md).

## Checklist de aprovação (humano)

- [ ] Mesmo rosto nas 7 stills de Pipoca
- [ ] Cachecol coral presente e do mesmo tamanho
- [ ] Sem dente afiado, sem olho realista
- [ ] Nino reconhecível nas 2 stills + duo
- [ ] `duo-hero.png` serve de referência principal para Kling
- [ ] Nenhuma still parece um bebê humano

Quando as 10 passarem, copie `duo-hero.png` e `pipoca-dance.png` para cada novo episódio em `stills/`.
