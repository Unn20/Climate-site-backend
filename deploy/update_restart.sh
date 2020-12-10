#!/bin/bash

set -e

pm2 stop server.js

pm2 delete server.js

rm -rf /home/ubuntu/backend/

cd /home/ubuntu/

git clone git@gitlab.com:inzynierka3/backend.git

PATH=/home/ubuntu/node/bin:$PATH

cd /home/ubuntu/backend

npm install

pm2 start server.js

#Restart the node server
npm start
