#!/bin/bash
cd /home/luxoft/Downloads/KAP

WORKERS_FLAG=""

for arg in "$@"; do
  if [[ "$arg" == "--nohead" ]]; then
    export HEADLESS=1
  fi
  if [[ "$arg" == "--multiple-workers" ]]; then
    WORKERS_FLAG=""
  fi
done

if [[ -n "$HEADLESS" && -z "$WORKERS_FLAG" ]]; then
  WORKERS_FLAG="--workers=1"
fi

npx playwright test --reporter=html $WORKERS_FLAG
mail -r kapreports@janeri.com.br -s "Playwright Test Results" -a ./playwright-report/index.html janeri@gmail.com