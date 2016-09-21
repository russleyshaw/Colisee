# Colisee
*ACM SIG-Game NodeJS Arena*  
_Making the world a better place one MegaMinerAI at a time._

### Status
[![Build Status](https://travis-ci.org/russleyshaw/Colisee.svg?branch=master)](https://travis-ci.org/russleyshaw/Colisee) ![Dependencies](https://david-dm.org/russleyshaw/Colisee.svg) ![DevDependencies](https://img.shields.io/david/dev/russleyshaw/Colisee.svg)


### Setup
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

5) Setup normal and test databases
```
npm run db:setup
```

### Running tests
```
npm test
```

### Running services
```
npm run serve
npm run mock
```

### Other Important Scripts (not all of them though)
```
lint                    - runs linter on source code
fix                     - attempt to automatically fix some linting errors
doc                     - generates documentation pages from jsdoc comments

test                    - run all tests

db:setup                - reset, rebuild and rerun the normal and test databases

db:start                - start the normal database
testdb:start            - start the testing database

serve:head              - run the head server
serve:build             - run the build server
serve:gamelog           - run the gamelog server

serve:play              - run play server with id of 0
serve:play1             - run play server with id of 1
serve:play1             - run play server with id of 2

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
