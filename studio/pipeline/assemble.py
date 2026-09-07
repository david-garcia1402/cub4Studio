#!/usr/bin/env python3
"""Monta o Short local: concat dos takes + música + loudnorm + thumbs.

Não busca Pexels. Só material da pasta do episódio.
Por padrão recusa publicar se qa.json não estiver aprovado.
Use --draft para montar sem QA (preview).
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

from paths import EPISODES
from qa_gate import is_approved

W = 1080
H = 1920
FPS = 30


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def have_ffmpeg() -> bool:
    return shutil.which("ffmpeg") is not None and shutil.which("ffprobe") is not None


def list_takes(episode: Path) -> list[Path]:
    takes_dir = episode / "takes"
    files = sorted(takes_dir.glob("*.mp4"))
    if not files:
        raise FileNotFoundError(f"nenhum take em {takes_dir}")
    return files


def pick_song(episode: Path) -> Path | None:
    audio = episode / "audio"
    for name in ("song.wav", "song.mp3", "song.m4a"):
        path = audio / name
        if path.exists():
            return path
    extras = sorted(audio.glob("*.wav")) + sorted(audio.glob("*.mp3"))
    return extras[0] if extras else None


def write_concat(takes: list[Path], dest: Path) -> None:
    lines = [f"file '{take.resolve().as_posix()}'" for take in takes]
    dest.write_text("\n".join(lines) + "\n", encoding="utf-8")


def prefix_intro(intro: Path, body: Path, dest: Path) -> None:
    lst = dest.parent / "intro-concat.txt"
    lst.write_text(
        f"file '{intro.resolve().as_posix()}'\nfile '{body.resolve().as_posix()}'\n",
        encoding="utf-8",
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(lst),
            "-c",
            "copy",
            str(dest),
        ]
    )
    lst.unlink(missing_ok=True)


def assemble(episode: Path, *, draft: bool = False, intro: Path | None = None) -> Path:
    if not have_ffmpeg():
        raise RuntimeError("ffmpeg/ffprobe não encontrados no PATH")
    if not draft and not is_approved(episode):
        raise RuntimeError("QA não aprovado. Rode qa_gate.py ou use --draft para preview.")

    out = episode / "out"
    out.mkdir(exist_ok=True)
    takes = list_takes(episode)
    concat_list = out / "concat.txt"
    write_concat(takes, concat_list)
    raw = out / "raw.mp4"
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(concat_list),
            "-vf",
            f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS}",
            "-an",
            str(raw),
        ]
    )

    song = pick_song(episode)
    short = out / "short.mp4"
    if song:
        run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(raw),
                "-i",
                str(song),
                "-filter_complex",
                "[1:a]loudnorm=I=-14:LRA=11:TP=-1.5[a]",
                "-map",
                "0:v",
                "-map",
                "[a]",
                "-shortest",
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-c:a",
                "aac",
                "-b:a",
                "192k",
                "-movflags",
                "+faststart",
                str(short),
            ]
        )
    else:
        run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(raw),
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-movflags",
                "+faststart",
                str(short),
            ]
        )

    if intro and intro.exists():
        with_intro = out / "short-with-intro.mp4"
        prefix_intro(intro, short, with_intro)
        short = with_intro

    run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            "00:00:01",
            "-i",
            str(short),
            "-frames:v",
            "1",
            "-update",
            "1",
            str(out / "thumb-a.png"),
        ]
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-sseof",
            "-2",
            "-i",
            str(short),
            "-frames:v",
            "1",
            "-update",
            "1",
            str(out / "thumb-b.png"),
        ]
    )
    raw.unlink(missing_ok=True)
    concat_list.unlink(missing_ok=True)
    return short


def make_synthetic_take(path: Path, color: str, seconds: int, freq: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"color=c={color}:s={W}x{H}:d={seconds}:r={FPS}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency={freq}:duration={seconds}",
            "-shortest",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            str(path),
        ]
    )


def self_test(work: Path) -> Path:
    episode = work / "self-test"
    if episode.exists():
        shutil.rmtree(episode)
    (episode / "takes").mkdir(parents=True)
    (episode / "audio").mkdir()
    (episode / "out").mkdir()
    make_synthetic_take(episode / "takes" / "take-a.mp4", "0xE8583F", 3, 440)
    make_synthetic_take(episode / "takes" / "take-b.mp4", "0x5BA4E6", 3, 523)
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "sine=frequency=660:duration=8",
            str(episode / "audio" / "song.wav"),
        ]
    )
    brief = {
        "episode_id": "999",
        "slug": "self-test",
        "title_options": ["Teste", "Teste dois", "Teste três"],
        "hashtags": ["viladopulo", "teste", "pipeline"],
        "duration_sec": 15,
        "hook_0_3s": "Hook sintético de teste do assemble.",
        "beats": [
            {"t": "0-3s", "visual": "bloco coral", "music": "sine"},
            {"t": "3-6s", "visual": "bloco azul", "music": "sine"},
            {"t": "6-8s", "visual": "fim", "music": "sine"},
        ],
        "payoff": "Freeze sintético.",
        "camera": "estático teste",
        "motion_prompt": "synthetic color blocks for ffmpeg self-test only",
        "song_brief": {"style": "sine", "bpm": 100, "lyrics_pt": "teste do pipeline"},
        "scene": "jardim",
        "outfit": "canonico",
        "characters": ["pipoca", "nino"],
        "made_for_kids": True,
        "language": "pt-BR",
    }
    (episode / "brief.json").write_text(json.dumps(brief, ensure_ascii=False, indent=2), encoding="utf-8")
    return assemble(episode, draft=True)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Monta Short local com FFmpeg")
    parser.add_argument("episode", nargs="?", type=Path)
    parser.add_argument("--draft", action="store_true", help="monta sem exigir QA")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--with-intro", type=Path, default=None, help="mp4 de 1s da marca (Fase 3)")
    args = parser.parse_args(argv)
    if args.self_test:
        dest = self_test(EPISODES / "_self-test-work")
        print(dest)
        return 0
    if not args.episode:
        parser.error("informe a pasta do episódio ou --self-test")
    dest = assemble(args.episode, draft=args.draft, intro=args.with_intro)
    print(dest)
    return 0


if __name__ == "__main__":
    sys.exit(main())
