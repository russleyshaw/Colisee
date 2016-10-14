#!/bin/bash

#NOTE: This should be ran from the root directory
#NOTE: This should NOT be ran directly from the db/ folder

echo "SETTING UP NORMAL DEVELOPMENT DATABASE"
docker stop colisee_db
docker rm --force colisee_db
docker rmi --force colisee_image
docker build -f db/db.dockerfile -t colisee_image db/
docker run --name colisee_db -d -p 5432:5432 colisee_image
docker start colisee_db

echo "SETTING UP TESTING DEVELOPMENT DATABASE"
docker stop colisee_test_db
docker rm --force colisee_test_db
docker rmi --force colisee_test_image
docker build -f db/test_db.dockerfile -t colisee_test_image db/
docker run --name colisee_test_db -d -p 5433:5432 colisee_test_image
docker start colisee_test_db