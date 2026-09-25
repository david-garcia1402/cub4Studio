#!/usr/bin/env python3
"""Radar semanal: lê títulos de concorrentes e devolve padrões vs. o que não copiar.

Não baixa vídeo. Cole títulos (e transcrições, se tiver) num JSON de entrada.
A decisão keep/kill de formatos próprios entra depois, com retenção do Analytics.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from datetime import date
from pathlib import Path

DO_NOT_COPY = [
    "personagens do Duck_SR / patos + bebê",
    "música A Ram Sam Sam e nursery rhymes clássicas",
    "hashtag stuffing (#vairalvideo, #ducklingspro)",
    "bebê ou criança gerada por IA",
    "título que promete aula falsa",
]

PATTERN_HINTS = {
    "danca": "dança em grupo / festa",
    "dance": "dança em grupo / festa",
    "festa": "dança em grupo / festa",
    "jardim": "cena de jardim / prado",
    "garden": "cena de jardim / prado",
    "fazenda": "cena de fazenda / celeiro",
    "farm": "cena de fazenda / celeiro",
    "baby": "NÃO USAR — bebê",
    "bebe": "NÃO USAR — bebê",
}


def tokenize(text: str) -> list[str]:
    return re.findall(r"[a-zà-ú0-9#]+", text.lower())


def analyze(payload: dict, week: str) -> dict:
    titles: list[str] = []
    for channel in payload.get("channels", []):
        titles.extend(channel.get("titles", []))
    bag = Counter()
    steal: set[str] = set()
    for title in titles:
        for token in tokenize(title):
            bag[token] += 1
            if token in PATTERN_HINTS and not PATTERN_HINTS[token].startswith("NÃO"):
                steal.add(PATTERN_HINTS[token])
    keep_or_kill = payload.get("keep_or_kill", [])
    for row in keep_or_kill:
        if row.get("retention_pct", 100) < 50:
            row["decision"] = "kill"
        elif row.get("decision") not in {"keep", "kill", "watch"}:
            row["decision"] = "watch"
    return {
        "week": week,
        "channels": payload.get("channels", []),
        "top_tokens": bag.most_common(12),
        "steal_patterns": sorted(steal) or ["dança em grupo / festa"],
        "do_not_copy": DO_NOT_COPY,
        "keep_or_kill": keep_or_kill,
        "prompt_fixo": (
            "Quais padrões viralizam (dança em grupo, chase, festa na fazenda) "
            "e quais músicas/personagens eu NÃO posso usar."
        ),
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Radar semanal de concorrentes")
    parser.add_argument("input", type=Path, help="JSON com channels[].titles")
    parser.add_argument("--week", default=date.today().isoformat())
    parser.add_argument("-o", "--out", type=Path, default=None)
    args = parser.parse_args(argv)
    payload = json.loads(args.input.read_text(encoding="utf-8"))
    report = analyze(payload, args.week)
    text = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(text, encoding="utf-8")
    print(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
