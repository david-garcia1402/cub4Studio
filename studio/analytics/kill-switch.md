# Kill-switch de formato — Fase 4

Fonte: YouTube Analytics do **seu** canal (retenção média e % de replay). Não use view de concorrente como desculpa para copiar.

## Regra

- Retenção média **< 50%** em 3 Shorts do mesmo formato → `kill`
- 50–60% → `watch` (mude hook ou música, não o IP)
- \> 60% ou replay visível → `keep`

## Como registrar

1. Exporte ou anote no Notion o `retention_pct`
2. Atualize [radar-input.json](radar-input.json) em `keep_or_kill`
3. `python3 pipeline/radar.py analytics/radar-input.json`

O script força `kill` quando a retenção é < 50.

## O que matar de verdade

- Mesmo jardim com o mesmo passo 5 vezes
- Take com cara derretida que “passou” no QA
- Música que a criança não reconstitui (teste: você canta depois de 1 play?)

## O que nunca matar por métrica

- O personagem. IP se ajusta em still, não se troca no mês 2.
