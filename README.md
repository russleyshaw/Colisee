# Colisee
*ACM SIG-Game NodeJS Arena*  
_Making the world a better place one MegaMinerAI at a time._  
https://russleyshaw.github.io/Colisee/

### Status
[![Build Status](https://travis-ci.org/russleyshaw/Colisee.svg?branch=master)](https://travis-ci.org/russleyshaw/Colisee) ![Dependencies](https://david-dm.org/russleyshaw/Colisee.svg) ![DevDependencies](https://img.shields.io/david/dev/russleyshaw/Colisee.svg)


### Setup
1) Install NVM - https://github.com/creationix/nvm/blob/master/README.markdown  
2) Install Docker - https://docs.docker.com/engine/installation/linux/ubuntulinux/

3) Install NodeJS v6.7.0
```
nvm install
```

4a) Install package.json dependencies
```
npm install
```

4b) Install bower.json dependencies
```
bower install
```

4c) Setup normal and test databases
```
npm run setup:db
```

OR

4abc) Run setup script
```
npm run setup
```

### Running tests
```
npm test
```

### Other Important Scripts (not all of them though)
```
lint                - Run javascript linting
fix                 - Attempt to fix trivial linter errors
docs                - Run javascript & API documentation generator

portainer           - Run docker web admin at http://localhost:9000

test                - Run all tests and linter
test:unit           - Run unit tests
test:integration    - Run integration tests

setup               - Run npm, bower and db setup
setup:db            - Run database setup script

run:head            - Run head server
watch:head          - Run head server and restart on file changes
```
