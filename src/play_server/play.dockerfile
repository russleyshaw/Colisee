FROM ubuntu

ARG git_repo
ARG git_hash

RUN apt-get -y update
RUN apt-get install -y nodejs npm

# Debian installs `node` as `nodejs`
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs

RUN mkdir client
RUN git clone ${REPO} server

WORKDIR server/

RUN git reset --hard ${HASH}
RUN npm install

CMD ["node", "./api.js"]

EXPOSE 3000