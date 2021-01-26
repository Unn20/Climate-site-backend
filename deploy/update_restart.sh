#!/bin/bash

set -e

pm2 stop backend 2 > /dev/null || true

cd /home/ubuntu/backend/

git checkout -- .
git checkout master
git pull git@gitlab.com:inzynierka3/backend.git master

PATH=/home/ubuntu/node/bin:$PATH

npm install

(pm2 restart backend --watch) || ( (pm2 delete backend 2 > /dev/null) && (pm2 start server.js --name backend --watch) )
