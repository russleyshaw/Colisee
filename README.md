# Colisee
ACM SIG-Game NodeJS Arena

### Status
[![Build Status](https://travis-ci.org/russleyshaw/Colisee.svg?branch=master)](https://travis-ci.org/russleyshaw/Colisee) ![Dependencies](https://david-dm.org/russleyshaw/Colisee.svg) ![DevDependencies](https://img.shields.io/david/dev/russleyshaw/Colisee.svg) [![Code Climate](https://codeclimate.com/github/russleyshaw/Colisee/badges/gpa.svg)](https://codeclimate.com/github/russleyshaw/Colisee)


### Setup & Execution
1) Install NVM - https://github.com/creationix/nvm/blob/master/README.markdown  
2) Install Docker - https://docs.docker.com/engine/installation/linux/ubuntulinux/

3) Install NodeJS v6.5.0
```
nvm install v6.5.0
```

4) Install package.json dependencies
```
npm install
```

5) Run a server or mock interface
```
npm run lint # Checks javascript syntax

npm run serve # Runs all serve scripts in parallel & checks syntax
npm run mock # Runs all mock scripts in parallel & checks syntax

# Run individual services
npm run serve:head
npm run serve:build
npm run serve:play
npm run serve:gamelog
npm run mock:vis
npm run mock:web
```

### Saving NPM Packages
If the package is used in actual code:  
```
npm install <package> --save

EXAMPLE:
npm install express --save
```
