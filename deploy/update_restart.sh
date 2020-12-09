#!/bin/bash

set -e

rm -rf /home/ubuntu/backend/

mkdir /home/ubuntu/backend
cd /home/ubuntu/backend

git clone pawel.kryczka@https://gitlab.com/inzynierka3/backend.git

PATH=/home/ubuntu/node/bin:$PATH

# stop the previous pm2
pm2 kill
npm remove pm2 -g

#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
npm install pm2 -g
# starting pm2 daemon
pm2 status

cd /home/ubuntu/backend

#install npm packages
echo "Running npm install"
npm install

#Restart the node server
npm start
