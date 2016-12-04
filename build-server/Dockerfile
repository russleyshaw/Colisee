FROM library/node:latest
MAINTAINER siggame

RUN curl -sSL https://get.docker.com/ | bash
RUN usermod -aG docker node

ADD . build-server
WORKDIR build-server

RUN [ -d node_modules ]
RUN [ -d tmp ]

CMD ["npm", "start"]