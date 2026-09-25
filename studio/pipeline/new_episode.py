#!/usr/bin/env python3
"""Cria a pasta de um episódio a partir do template."""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import date
from pathlib import Path

from paths import EPISODES, TEMPLATE


def next_episode_id() -> str:
    ids: list[int] = []
    for path in EPISODES.glob("*/brief.json"):
        if path.parent.name.startswith("_"):
            continue
        try:
            ids.append(int(json.loads(path.read_text(encoding="utf-8"))["episode_id"]))
        except (KeyError, ValueError, json.JSONDecodeError):
            continue
    return f"{(max(ids) + 1) if ids else 1:03d}"


def create_episode(slug: str, title: str, day: date | None = None) -> Path:
    day = day or date.today()
    dest = EPISODES / f"{day.isoformat()}-{slug}"
    if dest.exists():
        raise FileExistsError(dest)
    dest.mkdir(parents=True)
    for sub in ("stills", "takes", "audio", "out"):
        (dest / sub).mkdir()
    brief = json.loads((TEMPLATE / "brief.json").read_text(encoding="utf-8"))
    brief["episode_id"] = next_episode_id()
    brief["slug"] = slug
    brief["title_options"] = [title, f"{title} — Pipoca", f"{title} — Nino"]
    (dest / "brief.json").write_text(
        json.dumps(brief, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    shutil.copy(TEMPLATE / "README.md", dest / "README.md")
    (dest / "audio" / "license.txt").write_text(
        "Cole aqui: data, prompt Suno, plano, URL do export.\n", encoding="utf-8"
    )
    return dest


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Cria pasta de episódio")
    parser.add_argument("--slug", required=True)
    parser.add_argument("--title", required=True)
    parser.add_argument("--date", default=None, help="YYYY-MM-DD (default: hoje)")
    args = parser.parse_args(argv)
    day = date.fromisoformat(args.date) if args.date else date.today()
    dest = create_episode(args.slug, args.title, day)
    print(dest)
    return 0


if __name__ == "__main__":
    sys.exit(main())
