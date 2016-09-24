FROM ubuntu

ARG git_repo
ARG git_hash

RUN apt-get -y update
RUN apt-get install -y nodejs npm

# Debian installs `node` as `nodejs`
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs
RUN alias node=nodejs

RUN mkdir client
RUN git clone ${git_repo} client

WORKDIR server/

RUN git reset --hard ${git_hash}
RUN npm install