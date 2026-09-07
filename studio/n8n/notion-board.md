# Quadro Notion — Vila do Pulo

Um card = um episódio. Status é a fila.

```
Ideia → Gerando → QA → Publicado
                 ↘ Morto
```

## Campos

- **Name:** título escolhido
- **Status:** Ideia / Gerando / QA / Publicado / Morto
- **episode_id:** 001
- **slug:** festa-no-jardim
- **pasta:** `studio/episodes/2026-09-07-festa-no-jardim`
- **retention_pct:** preencher na Fase 4 (YouTube Analytics, 0–3s e replay)
- **custo_usd:** opcional
- **notas_qa:** texto do `qa.json`

## Automação mínima

- Webhook `generate-episode` cria o card em **Gerando**
- Quando `qa_gate.py` grava `passed: true`, mova para **QA** (humano clica Publicado)
- Radar semanal cria um card “Radar YYYY-Www” em Ideia, só com padrões, sem copiar título alheio
