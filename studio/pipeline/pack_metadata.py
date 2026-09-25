#!/usr/bin/env python3
"""Gera metadata de upload (Made for Kids). Não publica sozinho."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from paths import FORBIDDEN_TITLE


def pack(episode: Path) -> dict:
    brief = json.loads((episode / "brief.json").read_text(encoding="utf-8"))
    title = brief["title_options"][0]
    low = title.lower()
    for word in FORBIDDEN_TITLE:
        if word in low:
            raise ValueError(f"título proibido: {title}")
    tags = ["vila do pulo", "pipoca e nino", *brief["hashtags"]][:5]
    description = (
        f"{title} — Pipoca e Nino na Vila do Pulo.\n"
        "Short infantil original em 3D. Música original.\n"
        "Made for Kids."
    )
    payload = {
        "title": title,
        "description": description,
        "tags": tags,
        "categoryId": "1",
        "madeForKids": True,
        "privacyStatus": "private",
        "language": "pt-BR",
        "auto_publish": False,
        "thumb_candidates": ["out/thumb-a.png", "out/thumb-b.png"],
        "note": "Revise no YouTube Studio. Mês 1: sem auto-publish.",
    }
    dest = episode / "out"
    dest.mkdir(exist_ok=True)
    (dest / "metadata.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return payload


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Pacote de metadata YouTube")
    parser.add_argument("episode", type=Path)
    args = parser.parse_args(argv)
    payload = pack(args.episode)
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
