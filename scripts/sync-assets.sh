#!/usr/bin/env bash
# Sube al VPS todo lo que hay en public/ y NO está versionado (según .gitignore:
# hoy public/inacap). Lo versionado llega al VPS con git pull.
# Lo usan deploy.sh y el hook pre-push. Sin --delete: nunca borra en el servidor.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

VPS=root@69.62.91.38
DESTINO='~/saukcode-astro/'

# Rutas ignoradas bajo public/ (directorios completos o archivos sueltos)
mapfile -t rutas < <(git ls-files --others --ignored --exclude-standard --directory public/)

if [ ${#rutas[@]} -eq 0 ]; then
  echo "sync-assets: no hay archivos no versionados en public/."
  exit 0
fi

echo "sync-assets: ${rutas[*]}"
# -R conserva la ruta relativa (public/…) bajo el destino
rsync -azR --info=stats1 "${rutas[@]}" "$VPS:$DESTINO"
