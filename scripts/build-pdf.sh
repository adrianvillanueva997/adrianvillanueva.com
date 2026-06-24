#!/bin/bash
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
docker run --rm -v "$REPO_ROOT/resume:/resume" ghcr.io/typst/typst:0.14.2 \
  typst compile cv.typ cv.pdf >/dev/null 2>&1 && \
  cp "$REPO_ROOT/resume/cv.pdf" "$REPO_ROOT/public/resume.pdf" && \
  echo "✓ PDF compiled via Docker -> public/resume.pdf" || \
  { cp "$REPO_ROOT/resume/cv_villanueva_adrian.pdf" "$REPO_ROOT/public/resume.pdf" 2>/dev/null && \
    echo "⚠ Docker unavailable or failed, using pre-compiled PDF" || \
    echo "⚠ No PDF available. Skipping."; }
