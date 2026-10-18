#!/usr/bin/env bash
# Publica saukcode.cl: sube las imágenes no versionadas al VPS y hace push,
# que dispara el deploy automático de GitHub Actions (pull + build + publicar).
# Si no hay commits nuevos (solo cambiaron imágenes), lanza el workflow a mano.
# Uso: ./deploy.sh   (con los cambios ya commiteados)
set -euo pipefail
cd "$(dirname "$0")"

VPS=root@69.62.91.38

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Hay cambios sin commitear — commitea antes de desplegar." >&2
  git status --short
  exit 1
fi

echo "== 1/2 Sincronizando imágenes (public/inacap) al VPS =="
rsync -az --info=stats1 public/inacap "$VPS":~/saukcode-astro/public/

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
