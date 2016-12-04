FROM library/node:latest
MAINTAINER siggame

ADD . head-server
WORKDIR head-server

RUN [ -d node_modules ]
RUN [ -d bower_components ]

CMD ["npm", "start"]