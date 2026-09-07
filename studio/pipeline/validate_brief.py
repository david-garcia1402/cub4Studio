#!/usr/bin/env python3
"""Valida brief.json contra o schema e as regras kids-safe."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator

from paths import FORBIDDEN_TITLE, SCHEMAS


def load_schema() -> dict:
    return json.loads((SCHEMAS / "brief.schema.json").read_text(encoding="utf-8"))


def extra_rules(brief: dict) -> list[str]:
    errors: list[str] = []
    blob = " ".join(
        [
            *brief.get("title_options", []),
            *brief.get("hashtags", []),
            brief.get("hook_0_3s", ""),
            brief.get("payoff", ""),
            brief.get("song_brief", {}).get("lyrics_pt", ""),
        ]
    ).lower()
    for word in FORBIDDEN_TITLE:
        if word in blob:
            errors.append(f"palavra proibida no brief: {word}")
    if not brief.get("made_for_kids", False):
        errors.append("made_for_kids precisa ser true")
    if "pipoca" not in brief.get("characters", []):
        errors.append("Pipoca precisa estar em characters")
    if brief.get("duration_sec", 0) > 40:
        errors.append("Short acima de 40s")
    return errors


def validate_brief_dict(brief: dict) -> list[str]:
    validator = Draft202012Validator(load_schema())
    errors = [f"{e.json_path}: {e.message}" for e in validator.iter_errors(brief)]
    errors.extend(extra_rules(brief))
    return errors


def validate_episode_dir(episode_dir: Path) -> list[str]:
    brief_path = episode_dir / "brief.json"
    if not brief_path.exists():
        return [f"faltando {brief_path}"]
    brief = json.loads(brief_path.read_text(encoding="utf-8"))
    return validate_brief_dict(brief)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Valida brief.json da Vila do Pulo")
    parser.add_argument("episode", type=Path, help="Pasta do episódio ou caminho do JSON")
    args = parser.parse_args(argv)
    target = args.episode
    if target.is_file():
        brief = json.loads(target.read_text(encoding="utf-8"))
        errors = validate_brief_dict(brief)
    else:
        errors = validate_episode_dir(target)
    if errors:
        print("BRIEF INVÁLIDO:")
        for err in errors:
            print(f"  - {err}")
        return 1
    print("brief ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())
