#!/usr/bin/env bash
# Publica saukcode.cl: sube los archivos no versionados de public/ al VPS y hace push,
# que dispara el deploy automático de GitHub Actions (pull + build + publicar).
# Si no hay commits nuevos (solo cambiaron imágenes), lanza el workflow a mano.
# Uso: ./deploy.sh   (con los cambios ya commiteados)
set -euo pipefail
cd "$(dirname "$0")"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Hay cambios sin commitear — commitea antes de desplegar." >&2
  git status --short
  exit 1
fi

echo "== 1/2 Sincronizando archivos no versionados de public/ al VPS =="
scripts/sync-assets.sh

echo "== 2/2 Desplegando =="
git fetch -q origin master
if [ -n "$(git log origin/master..master --oneline)" ]; then
  git push
else
  echo "Sin commits nuevos; lanzando el workflow manualmente para reconstruir."
  gh workflow run deploy.yml
fi

echo
echo "Listo. Sigue el despliegue con: gh run watch"
