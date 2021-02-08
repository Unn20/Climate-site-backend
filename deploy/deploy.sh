#!/bin/bash

set -e

chmod +x ./deploy/update_restart.sh
ssh ubuntu@${DEPLOY_SERVER} 'bash' < ./deploy/update_restart.sh