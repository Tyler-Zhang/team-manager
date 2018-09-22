#!/bin/bash

# Build the static files locally
sudo docker build . -t team-manager-server

sudo docker tag team-manager-server tylerzhang/team-manager-server

sudo docker push tylerzhang/team-manager-server
