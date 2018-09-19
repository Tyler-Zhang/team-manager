#!/bin/bash

# Build the static files locally
sudo docker build . -t team-manager-client

sudo docker tag team-manager-client tylerzhang/team-manager-client

sudo docker push tylerzhang/team-manager-client
