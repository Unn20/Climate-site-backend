#!/bin/bash

set -e

echo "$BACKEND_KEY" | tr -d '\r' | ssh-add - > /dev/null

DEPLOY_SERVER=$DEPLOY_SERVER

chmod +x./deploy/update_restart.sh
ssh ubuntu@${DEPLOY_SERVER} 'bash' < ./deploy/update_restart.sh