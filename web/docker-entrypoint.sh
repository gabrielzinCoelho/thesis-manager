#!/bin/sh
set -eu

API_URL=${API_URL:-${VITE_API_URL:-http://localhost:8000/api}}

cat <<EOF >/usr/share/nginx/html/env.js
window.__ENV_API_URL__ = "${API_URL}";
EOF

exec "$@"