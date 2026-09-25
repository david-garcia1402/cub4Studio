#!/usr/bin/env python3
"""Marca cortes no tempo. Sem librosa, usa fatias iguais. Com librosa, onset."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def even_cuts(duration: float, pieces: int = 2) -> list[float]:
    if pieces < 1:
        raise ValueError("pieces")
    step = duration / pieces
    return [round(step * i, 3) for i in range(pieces + 1)]


def librosa_onsets(audio_path: Path, max_cuts: int = 6) -> list[float] | None:
    try:
        import librosa  # type: ignore
    except ImportError:
        return None
    y, sr = librosa.load(str(audio_path), sr=22050)
    times = librosa.times_like(librosa.onset.onset_strength(y=y, sr=sr), sr=sr)
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    frames = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr)
    beats = [0.0] + [float(times[i]) for i in frames][: max_cuts - 1]
    beats.append(float(librosa.get_duration(y=y, sr=sr)))
    return [round(t, 3) for t in beats]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Sugere cortes no beat")
    parser.add_argument("audio", type=Path)
    parser.add_argument("--pieces", type=int, default=2)
    args = parser.parse_args(argv)
    cuts = librosa_onsets(args.audio) or even_cuts(24.0, args.pieces)
    print(json.dumps({"cuts": cuts}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
