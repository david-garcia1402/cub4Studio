# Vila do Pulo — fábrica de Shorts infantis

Pasta de produção do cub4Studio para Shorts 9:16 em PT-BR no formato do nicho Duck_SR: personagem travado, dança/música grudenta e loop visual. **Não copia o IP de ninguém.** O motor visual é gerativo (still → image-to-video). O MoneyPrinterTurbo entra só na montagem, com material local.

## IP

| Peça | Nome |
|---|---|
| Canal | **Vila do Pulo** |
| Handle sugerido | `@viladopulo` |
| Protagonista | **Pipoca** (sagui-de-coleira 3D) |
| Sidekick | **Nino** (periquito verde-limão) |
| Mundo | Sítio colorido sem humanos |

Leia primeiro:

1. [ip/bible.md](ip/bible.md)
2. [ip/safety.md](ip/safety.md)
3. [ip/made-for-kids.md](ip/made-for-kids.md)
4. [prompts/kids-short-brief.md](prompts/kids-short-brief.md)

## Princípio

- 80–90% automático (ideia → still → motion → áudio → assemble → pack)
- 10–20% humano (IP, segurança, take aprovado, título/thumb)
- Cadência inicial: **3–5 Shorts/semana**, nunca 20
- Sem auto-publish no mês 1

## Como produzir um episódio (Fase 1, manual)

```bash
cd studio
python3 pipeline/new_episode.py --slug festa-no-jardim --title "Festa no jardim"
# preencha episodes/<data>-festa-no-jardim/brief.json
# gere stills, takes Kling e música Suno para as pastas do episódio
python3 pipeline/validate_brief.py episodes/<pasta>
python3 pipeline/qa_gate.py episodes/<pasta>   # porta humana
python3 pipeline/assemble.py episodes/<pasta>
python3 pipeline/pack_metadata.py episodes/<pasta>
```

Dry-run da montagem (gera takes sintéticos e monta um Short de teste):

```bash
cd studio
python3 pipeline/assemble.py --self-test
```

## Estrutura

```
studio/
├── ip/                 # bible, sheet, outfits, mundo, segurança
├── prompts/            # system prompts (roteiro, still, Kling, Suno, Wan)
├── schemas/            # JSON Schema dos artefatos
├── pipeline/           # CLI Python (brief, QA, assemble, radar)
├── n8n/                # workflows importáveis
├── mcp/                # mcp.json de exemplo + setup
├── episodes/           # um card = um Short
├── series/             # outfits extras, intro, thumb A/B, dance drivers
├── analytics/          # kill-switch, LoRA, segundo canal EN
└── moneyprinter/       # como usar MPT só como compositor
```

## Stack (ordem de ligar)

1. Cursor + skill `kids-short-brief` (já neste repo)
2. fal.ai (Flux/Nano Banana + Kling 3.0)
3. Suno v5 (música original PT-BR)
4. FFmpeg / MoneyPrinterTurbo local
5. n8n + Notion (Fase 2)
6. ElevenLabs só se houver uma frase de narração adulta
7. Wan 2.2 Animate (Fase 3)
8. Radar semanal (Fase 4)

Chaves ficam em `studio/.env` (nunca commitado). Modelo: [`.env.example`](.env.example).
