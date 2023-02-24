#!/bin/bash
clear
git pull

REFRESH_MODULES='false'
while getopts ':i' o; do
  case ${o} in
    'i')
      REFRESH_MODULES='true'
      ;;
  esac
done

NEW_VER="$(date '+%-m').$(date '+%-d').$(date '+%-H')"
sed -i "" -e "2s/.*/\"version\": \"${NEW_VER}\",/" package.json

if ${REFRESH_MODULES}; then
  rm -rf node_modules
  rm -f package-lock.json
  rm -f yarn.lock
  yarn install
fi

rm -r dist
yarn build
