# MCP no Cursor — ordem de ligar

Não ligue 12 servidores no dia 1.

## 1. filesystem (já nativo)

Aponte o agente para `studio/`.

## 2. n8n-mcp (Fase 2)

No `~/.cursor/mcp.json` ou `.cursor/mcp.json` (veja [mcp.json.example](mcp.json.example)):

```json
"n8n-mcp": {
  "command": "npx",
  "args": ["-y", "n8n-mcp"],
  "env": {
    "N8N_API_URL": "http://localhost:5678",
    "N8N_API_KEY": "xxx"
  }
}
```

Prompt padrão: “dispara o webhook vila-do-pulo-generate com o brief do episódio 012”.

## 3. fal.ai via HTTP no n8n

Não depende de MCP. Uma `FAL_KEY` no n8n cobre Flux + Kling + Veo.

## 4. ElevenLabs MCP (opcional)

Só se o brief tiver uma frase adulta.

## 5. YouTube transcript (Fase 4)

Para o radar: cole títulos/transcrições em `analytics/radar-input.json`. O script `radar.py` não precisa de scrape automático no mês 1.

## 6. Notion MCP (opcional)

Útil para o agente mover cards. O n8n já escreve o status.

## Skill

A skill `kids-short-brief` vive em `.cursor/skills/kids-short-brief/SKILL.md`. O agente deve lê-la ao criar brief.
