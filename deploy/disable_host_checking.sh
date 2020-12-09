#!/bin/bash

set -e 
mkdir -p ~/.ssh
touch ~/.ssh/config
echo -e "host *\n\tStrictHostKeyChecking no \n\n" >> ~/.ssh/config
