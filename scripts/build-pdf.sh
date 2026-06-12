#!/bin/bash
# Build the resume PDF using Typst via Docker (preferred) or copy pre-compiled fallback.
# In production Docker build, this is done in the Dockerfile's resume-builder stage.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if command -v docker &>/dev/null && docker info &>/dev/null 2>&1; then
  docker run --rm -v "$REPO_ROOT/resume:/resume" ghcr.io/typst/typst:0.14.2 \
    typst compile cv.typ cv.pdf >/dev/null 2>&1
  cp "$REPO_ROOT/resume/cv.pdf" "$REPO_ROOT/public/resume.pdf"
  echo "✓ PDF compiled via Docker -> public/resume.pdf"
else
  if [ -f "$REPO_ROOT/resume/cv_villanueva_adrian.pdf" ]; then
    cp "$REPO_ROOT/resume/cv_villanueva_adrian.pdf" "$REPO_ROOT/public/resume.pdf"
    echo "⚠ Docker unavailable, using pre-compiled PDF -> public/resume.pdf"
  else
    echo "⚠ Docker unavailable and no pre-compiled PDF found. Skipping PDF build."
  fi
fi
