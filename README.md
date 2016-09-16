# Colisee
*ACM SIG-Game NodeJS Arena*  
_Making the world a better place one MegaMinerAI at a time._

### Status
[![Build Status](https://travis-ci.org/russleyshaw/Colisee.svg?branch=master)](https://travis-ci.org/russleyshaw/Colisee) ![Dependencies](https://david-dm.org/russleyshaw/Colisee.svg) ![DevDependencies](https://img.shields.io/david/dev/russleyshaw/Colisee.svg)[![Stories in Ready](https://badge.waffle.io/russleyshaw/Colisee.png?label=ready&title=Ready)](https://waffle.io/russleyshaw/Colisee)


### Setup & Execution
1) Install NVM - https://github.com/creationix/nvm/blob/master/README.markdown  
2) Install Docker - https://docs.docker.com/engine/installation/linux/ubuntulinux/

3) Install NodeJS v6.5.0
```
nvm install v6.5.0
OR
nvm install    (uses node version described in .nvmrc)
```

4) Install package.json dependencies
```
npm install
```

5) Install PostgreSQL
```
npm run db:build
npm run db:run
```

6) Run services
```
npm run serve
npm run mock
```

### Scripts
```
lint                    - runs linter on source code
watch:lint              - continuously monitors and lints code
doc                     - generates documentation pages from jsdoc comments
watch:doc               - continuously generates documentation pages

docker:stop             - stops all docker containers
docker:purge            - deletes all containers and images
docker:purge:containers - deletes all containers
docker:purge:images     - deletes all images

db:build                - build colisee database image from postgresql image
db:run                  - runs colisee database image as a container
db:start                - starts the colisee database
db:stop                 - stop the colisee database
db:rm                   - deletes the colisee database container
db:rmi                  - delete the colisee database image

serve                   - run all colisee services
serve:head              - run the head server
serve:build             - run the build server
serve:gamelog           - run the gamelog server

serve:play              - run play server with id of 0
serve:play1             - run play server with id of 1
serve:play1             - run play server with id of 2

mock                    - run all mock services locally
mock:vis                - run mock visualizer
mock:web                - run mock web server
```

### Saving NPM Packages
If the package is used in actual code:  
```
npm install <package> --save

EXAMPLE:
npm install express --save
```
