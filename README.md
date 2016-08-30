# Colisee
ACM SIG-Game NodeJS Arena

### Status
[![Build Status](https://travis-ci.org/russleyshaw/Colisee.svg?branch=master)](https://travis-ci.org/russleyshaw/Colisee)  

### Compiling
1) Install NVM - https://github.com/creationix/nvm/blob/master/README.markdown  

2) Install NodeJS v4.5.0 (LTS)
```
nvm install --lts
OR
nvm install v4.5.0
```

3) Install package.json dependencies
```
npm install
```

4) Install TypeScript typings
```
npm run typings
```

4) Compile project
```
npm run compile
```

5) Run a server
```
npm run head_server
OR
npm run build_server
OR
npm run play_server
```

### Saving NPM Packages
If the package is used in actual code:  
```
npm install <package> --save

EXAMPLE:
npm install express --save
```

If the package is used to aid in compiling or developing:
```
npm install <package> --save-dev

EXAMPLE:
npm install typings --save-dev
```

