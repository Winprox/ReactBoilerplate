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
  rm -r node_modules
  rm -r package-lock.json
  rm -r yarn.lock
  yarn i
fi

rm -r dist
yarn b
