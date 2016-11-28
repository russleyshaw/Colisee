FROM library/node:latest
MAINTAINER siggame

RUN curl -sSL https://get.docker.com/ | bash
RUN usermod -aG docker node

ADD . build-server
WORKDIR build-server

RUN ./setupTmpDirs.sh
RUN npm install

CMD ["npm", "start"]