#!/bin/bash

set -e

eval $(ssh-agent -s)
echo "$BACKEND_KEY" | tr -d '\r' | ssh-add - > /dev/null

./deploy/disable_host_checking.sh

DEPLOY_SERVER=$DEPLOY_SERVER

ubuntu${DEPLOY_SERVER} 'bash' < ./deploy/update_restart.sh