#!/bin/bash
clear
git pull

NEW_VER="$(date '+%-m').$(date '+%-d').$(date '+%-H')"
sed -i "" -e "2s/.*/\"version\": \"${NEW_VER}\",/" package.json

# rm -r node_modules
# rm -r package-lock.json
# rm -r yarn.lock

# yarn i
# sudo rsync -va patches/ node_modules/

rm -r dist
yarn b
