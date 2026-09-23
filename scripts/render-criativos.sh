#!/usr/bin/env bash
# Exporta criativos HTML em 1080px (feed / retrato / stories) via Chrome headless.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/criativos"
PORT="${PORT:-8080}"
CHROME="${CHROME:-google-chrome}"
DATA_DIR="${TMPDIR:-/tmp}/chrome-criativos-render"

mkdir -p "$OUT" "$DATA_DIR"

declare -A SIZE=(
  [feed]="1080,1080"
  [retrato]="1080,1350"
  [stories]="1080,1920"
)

IDS=("$@")
if [[ ${#IDS[@]} -eq 0 ]]; then
  IDS=(ad-odonto ad-imob ad-advocacia ad-estetica ad-restaurantes)
fi

if ! curl -sf "http://127.0.0.1:${PORT}/criativos.html" >/dev/null; then
  echo "Suba o site antes: python3 -m http.server ${PORT}" >&2
  exit 1
fi

for id in "${IDS[@]}"; do
  for format in feed retrato stories; do
    dest="$OUT/${id}-${format}.jpg"
    tmp="${DATA_DIR}/${id}-${format}.png"
    echo "→ $dest"
    timeout 18 "$CHROME" \
      --headless=new \
      --disable-gpu \
      --no-sandbox \
      --hide-scrollbars \
      --force-device-scale-factor=1 \
      --remote-debugging-port=0 \
      --user-data-dir="${DATA_DIR}/${id}-${format}" \
      --window-size="${SIZE[$format]}" \
      --virtual-time-budget=4000 \
      --screenshot="$tmp" \
      "http://127.0.0.1:${PORT}/criativos.html?render=${id}&formato=${format}" \
      >/dev/null 2>&1 || true
    ffmpeg -y -i "$tmp" -q:v 2 "$dest" >/dev/null 2>&1
    rm -f "$tmp"
  done
done

echo "Pronto."
