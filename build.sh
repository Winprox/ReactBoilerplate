#!/bin/bash
clear
git pull
NEW_VER="$(date '+%-m').$(date '+%-d').$(date '+%-H')"
OLD_VER=$(node -p "require('./package.json').version") 
sed -i "2s/${OLD_VER}/${NEW_VER}/" package.json

rm -r node_modules
rm -r package-lock.json

npm i --legacy-peer-deps
# sudo rsync -va patches/ node_modules/

rm -r dist
npm run build
