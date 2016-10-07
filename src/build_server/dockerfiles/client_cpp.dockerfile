FROM base_cpp

ARG REPO
ARG HASH

RUN mkdir client
RUN git clone ${REPO} client

WORKDIR client/

RUN git reset --hard ${HASH}
RUN make