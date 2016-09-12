FROM js

ARG git_repo
ARG git_hash

RUN mkdir client
RUN git clone ${git_repo} client
RUN cd client && git reset --hard ${git_hash}
RUN cd client && make