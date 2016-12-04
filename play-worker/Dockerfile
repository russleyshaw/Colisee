FROM library/node:latest
MAINTAINER siggame

RUN curl -sSL https://get.docker.com/ | sh

ADD . play-worker
WORKDIR play-worker

RUN [ -d node_modules ]

CMD ["npm", "start"]