#!/bin/bash

set -e

eval $(ssh-agent -s)
echo "$BACKEND_KEY" | tr -d '\r' | ssh-add - > /dev/null

chmod +777 ./deploy/disable_host_checking.sh
./deploy/disable_host_checking.sh

DEPLOY_SERVER=$DEPLOY_SERVER

chmod +777 ./deploy/update_restart.sh
ubuntu${DEPLOY_SERVER} 'bash' < ./deploy/update_restart.sh