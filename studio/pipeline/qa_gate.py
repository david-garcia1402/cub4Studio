#!/usr/bin/env python3
"""Porta humana: sem qa.json passed=true o assemble recusa publicar."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

CHECKS = (
    "same_character",
    "no_human",
    "no_third_party_ip",
    "no_scare",
    "honest_title",
    "original_music",
    "arc_clear",
    "face_stable",
)


def ask_yes(prompt: str) -> bool:
    raw = input(f"{prompt} [s/N] ").strip().lower()
    return raw in {"s", "sim", "y", "yes"}


def write_qa(episode_dir: Path, reviewer: str, watched: bool, checks: dict[str, bool], notes: str) -> Path:
    passed = watched and all(checks.values())
    payload = {
        "episode_id": json.loads((episode_dir / "brief.json").read_text(encoding="utf-8"))["episode_id"],
        "reviewer": reviewer,
        "watched_full": watched,
        "passed": passed,
        "decided_at": datetime.now(timezone.utc).isoformat(),
        "notes": notes,
        "checks": checks,
    }
    dest = episode_dir / "qa.json"
    dest.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return dest


def is_approved(episode_dir: Path) -> bool:
    qa_path = episode_dir / "qa.json"
    if not qa_path.exists():
        return False
    data = json.loads(qa_path.read_text(encoding="utf-8"))
    return bool(data.get("passed") and data.get("watched_full") and all(data.get("checks", {}).values()))


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="QA humano do Short")
    parser.add_argument("episode", type=Path)
    parser.add_argument("--reviewer", default="humano")
    parser.add_argument("--auto-fail", action="store_true", help="grava qa.json reprovado (CI)")
    parser.add_argument("--auto-pass", action="store_true", help="só para testes sintéticos")
    args = parser.parse_args(argv)
    episode = args.episode
    if args.auto_fail:
        checks = {key: False for key in CHECKS}
        path = write_qa(episode, args.reviewer, False, checks, "auto-fail")
        print(f"reprovado → {path}")
        return 1
    if args.auto_pass:
        checks = {key: True for key in CHECKS}
        path = write_qa(episode, args.reviewer, True, checks, "auto-pass (teste)")
        print(f"aprovado (teste) → {path}")
        return 0
    print("Assista o clipe INTEIRO no celular antes de responder.")
    watched = ask_yes("Assistiu o Short inteiro em 1x?")
    checks = {
        "same_character": ask_yes("É o mesmo Pipoca/Nino do sheet?"),
        "no_human": ask_yes("Zero humano/bebê na imagem?"),
        "no_third_party_ip": ask_yes("Zero personagem de terceiro?"),
        "no_scare": ask_yes("Zero susto, ferimento ou água perigosa?"),
        "honest_title": ask_yes("Título honesto (não promete aula falsa)?"),
        "original_music": ask_yes("Música original com license.txt?"),
        "arc_clear": ask_yes("Tem hook, meio e payoff?"),
        "face_stable": ask_yes("Rosto estável, sem derreter?"),
    }
    notes = input("Notas (opcional): ").strip()
    path = write_qa(episode, args.reviewer, watched, checks, notes)
    if not is_approved(episode):
        print(f"REPROVADO → {path} — não publique")
        return 1
    print(f"APROVADO → {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
