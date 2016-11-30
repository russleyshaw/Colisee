FROM library/node:latest
MAINTAINER siggame

ADD . head-server
WORKDIR head-server

RUN npm install

CMD ["npm", "start"]