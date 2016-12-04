# Colisee
*ACM SIG-Game NodeJS Arena*  
_Making the world a better place one MegaMinerAI at a time._  
https://russleyshaw.github.io/Colisee/

### Status
[![Build Status](https://travis-ci.org/russleyshaw/Colisee.svg?branch=master)](https://travis-ci.org/russleyshaw/Colisee)


### Setup Colisee
1) Install Docker - https://docs.docker.com/engine/installation/linux/ubuntulinux/  
```curl -sSL https://get.docker.com/ | sh```  
 
2) Install Docker Compose - https://docs.docker.com/compose/install/  
`pip install docker-compose`  

3) Run `npm install` on each service using installAll script  
`./installAll.sh`  

### Run Colisee  
4) Build images  
`docker-compose build`  

5) Run images  
`docker-compose up`    

### Test Colisee  
4) Run test command  
`./test.sh`  
