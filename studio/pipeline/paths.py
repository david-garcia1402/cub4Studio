from __future__ import annotations

from pathlib import Path

STUDIO_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = STUDIO_ROOT.parent
SCHEMAS = STUDIO_ROOT / "schemas"
EPISODES = STUDIO_ROOT / "episodes"
TEMPLATE = EPISODES / "_template"
IP_REFS = STUDIO_ROOT / "ip" / "refs"
FORBIDDEN_TITLE = (
    "peppa",
    "bluey",
    "cocomelon",
    "donald",
    "bebê",
    "bebe",
    "baby",
    "aprenda",
    "educativo",
    "terror",
    "challenge",
    "slime",
    "vairalvideo",
    "ducklingspro",
)
