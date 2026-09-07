from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from beats import even_cuts  # noqa: E402
from pack_metadata import pack  # noqa: E402
from paths import EPISODES  # noqa: E402
from radar import analyze  # noqa: E402
from validate_brief import validate_brief_dict, validate_episode_dir  # noqa: E402


def test_all_production_briefs() -> None:
    briefs = sorted(p for p in EPISODES.glob("*/brief.json") if not p.parent.name.startswith("_"))
    assert len(briefs) >= 5
    for path in briefs:
        errors = validate_episode_dir(path.parent)
        assert errors == [], f"{path}: {errors}"


def test_forbidden_word_is_caught() -> None:
    brief = json.loads((EPISODES / "_template" / "brief.json").read_text(encoding="utf-8"))
    brief["title_options"] = ["Aprenda as cores", "Peppa dança", "Festa"]
    errors = validate_brief_dict(brief)
    assert any("proibida" in e for e in errors)


def test_even_cuts() -> None:
    assert even_cuts(24, 2) == [0.0, 12.0, 24.0]


def test_radar_kills_low_retention() -> None:
    report = analyze(
        {
            "channels": [
                {
                    "handle": "@Duck_Ai_Stuio",
                    "titles": ["Cute Baby Dancing with Ducks garden party"],
                }
            ],
            "keep_or_kill": [{"format": "clone-pato", "retention_pct": 32, "decision": "watch"}],
        },
        "2026-W36",
    )
    assert report["keep_or_kill"][0]["decision"] == "kill"
    assert any("bebê" in item.lower() or "baby" in item.lower() or "Ram Sam" in item for item in report["do_not_copy"])
    assert "dança em grupo / festa" in report["steal_patterns"] or "cena de jardim / prado" in report["steal_patterns"]


def test_pack_metadata(tmp_path: Path) -> None:
    episode = tmp_path / "ep"
    episode.mkdir()
    (episode / "brief.json").write_text(
        (EPISODES / "2026-09-07-festa-no-jardim" / "brief.json").read_text(encoding="utf-8"),
        encoding="utf-8",
    )
    payload = pack(episode)
    assert payload["madeForKids"] is True
    assert payload["auto_publish"] is False
    assert payload["privacyStatus"] == "private"


if __name__ == "__main__":
    test_all_production_briefs()
    test_forbidden_word_is_caught()
    test_even_cuts()
    test_radar_kills_low_retention()
    import tempfile

    with tempfile.TemporaryDirectory() as tmp:
        test_pack_metadata(Path(tmp))
    print("tests ok")
