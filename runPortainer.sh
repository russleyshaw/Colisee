#!/bin/bash

docker stop portainer
docker rm -f portainer
docker run --name portainer -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer