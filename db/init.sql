DROP TABLE IF EXISTS "log" CASCADE;
DROP TABLE IF EXISTS "client" CASCADE;
DROP TABLE IF EXISTS "tournament" CASCADE;
DROP TABLE IF EXISTS "match" CASCADE;

DROP TYPE IF EXISTS "log_severity_enum" CASCADE;
DROP TYPE IF EXISTS "tournament_type_enum" CASCADE;
DROP TYPE IF EXISTS "tournament_status_enum" CASCADE;
DROP TYPE IF EXISTS "client_language_enum" CASCADE;
DROP TYPE IF EXISTS "match_status_enum" CASCADE;

CREATE TYPE client_language_enum AS ENUM (
    'cpp', 'python', 'csharp', 'javascript', 'java'
);

CREATE TYPE log_severity_enum AS ENUM (
    'debug', 'info', 'warn', 'error', 'critical'
);

CREATE TYPE tournament_type_enum AS ENUM (
    'random', 'single_elimination', 'triple_elimination', 'swiss', 'test'
);

CREATE TYPE tournament_status_enum AS ENUM (
    'scheduling', 'stopped', 'paused', 'succeeded', 'failed'
);

CREATE TYPE match_status_enum AS ENUM (
<<<<<<< HEAD
    'playing', 'scheduled', 'sending', 'finished', 'failed'
=======
    'playing', 'scheduled', 'sending', 'succeeded', 'failed'
>>>>>>> master
);

CREATE TABLE "log" (
    id serial NOT NULL PRIMARY KEY,
    message character varying NOT NULL,
    location character varying NOT NULL,
    severity log_severity_enum NOT NULL,

    time_created timestamp NOT NULL DEFAULT now(),
    time_modified timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "client" (
    id serial NOT NULL PRIMARY KEY,
    name character varying NOT NULL UNIQUE,
    repo character varying,
    hash character varying,

    language client_language_enum,

    needs_build boolean NOT NULL DEFAULT false,
    build_success boolean,
    last_attempt_time timestamp,
    last_success_time timestamp,
    last_failure_time timestamp,

    created_time timestamp NOT NULL DEFAULT now(),
    last_modified_time timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "tournament" (
    id serial NOT NULL PRIMARY KEY,
    type tournament_type_enum NOT NULL
);

CREATE TABLE "match" (
    id serial NOT NULL PRIMARY KEY,
    clients integer[] NOT NULL,


    reason character varying,
    gamelog integer UNIQUE,

<<<<<<< HEAD
    scheduled_time timestamp NOT NULL DEFAULT now(),
=======
    last_scheduled_time timestamp NOT NULL DEFAULT now()
>>>>>>> master
);

DELETE FROM "log";
DELETE FROM "client";
DELETE FROM "tournament";
DELETE FROM "match";

ALTER SEQUENCE "log_id_seq" RESTART WITH 1;
ALTER SEQUENCE "client_id_seq" RESTART WITH 1;
ALTER SEQUENCE "match_id_seq" RESTART WITH 1;
ALTER SEQUENCE "tournament_id_seq" RESTART WITH 1;
