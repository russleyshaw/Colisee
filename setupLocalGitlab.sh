#!/bin/bash

docker stop gitlab gitlab-runner
docker rm -f gitlab gitlab-runner

docker run --detach \
    --hostname gitlab.example.com \
    --publish 443:443 --publish 80:80 --publish 22:22 \
    --name gitlab \
    --restart always \
    --volume gitlab_config:/etc/gitlab \
    --volume gitlab_logs:/var/log/gitlab \
    --volume gitlab_data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest

docker run --detach \
    --name gitlab-runner \
    --restart always \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume gitlab_runner_config:/etc/gitlab-runner \
    gitlab/gitlab-runner:latest

echo "Your gitlab-ci coordinator URL should be http://<docker0 interface ip/ci"
default_url=$(ip addr show docker0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)
echo "Go to http://localhost/admin/runners to get your gitlab-ci token"
docker exec --interactive --tty gitlab-runner gitlab-runner register \
    --name runner1 \
    --url "http://$default_url/ci" \
    --tags mmai \
    --executor docker