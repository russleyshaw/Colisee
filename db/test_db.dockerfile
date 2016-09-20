FROM library/postgres

ENV POSTGRES_USER colisee
ENV POSTGRES_PASSWORD colisee
ENV POSTGRES_DB colisee_test

ADD init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432