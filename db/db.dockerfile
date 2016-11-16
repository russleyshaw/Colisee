FROM library/postgres:9.4

ENV POSTGRES_USER colisee
ENV POSTGRES_PASSWORD colisee
ENV POSTGRES_DB colisee

ADD init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432