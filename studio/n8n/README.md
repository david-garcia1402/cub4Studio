# n8n — Fase 2

Cadência: 3 Shorts/semana. O workflow **gera e para no QA**. Upload continua humano.

## Importar

1. Suba n8n self-hosted (`docker compose` no `docker-compose.yml` desta pasta, opcional)
2. Settings → Import from file:
   - `generate-episode.json`
   - `weekly-radar.json`
3. Credenciais: Header Auth `fal.ai` (`Authorization: Key $FAL_KEY`), Notion, webhook

## Quadro Notion

Crie um database com estas propriedades (ver [notion-board.md](notion-board.md)):

| Propriedade | Tipo |
|---|---|
| Name | title |
| Status | select: Ideia / Gerando / QA / Publicado / Morto |
| episode_id | rich_text |
| slug | rich_text |
| retention_pct | number |
| pasta | url/rich_text |

## Disparo pelo Cursor

Com o MCP `n8n-mcp` ligado, peça: “gera episódio 012 a partir de `studio/episodes/.../brief.json`”.

O agente deve **só** chamar o webhook. Não pular o QA.
