#!/bin/bash

set -e

pm2 delete backend 2 > /dev/null || true

rm -rf /home/ubuntu/backend/

cd /home/ubuntu/

git clone git@gitlab.com:inzynierka3/backend.git

PATH=/home/ubuntu/node/bin:$PATH

cd /home/ubuntu/backend

npm install

pm2 start server.js --name backend --watch

#Restart the node server
npm start
