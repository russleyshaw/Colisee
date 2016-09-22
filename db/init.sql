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
    'play', 'stopped', 'paused', 'succeeded', 'failed'
);

CREATE TABLE "log" (
    id serial NOT NULL PRIMARY KEY,
    message character varying,
    location character varying,
    severity log_severity_enum NOT NULL,

    time_created timestamp with time zone NOT NULL DEFAULT now(),
    time_modified timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE "client" (
    id serial NOT NULL PRIMARY KEY,
    name character varying NOT NULL UNIQUE,
    git_repo character varying NOT NULL,
    git_hash character varying NOT NULL,

    language client_language_enum NOT NULL,

    time_created timestamp with time zone NOT NULL DEFAULT now(),
    time_modified timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE "tournament" (
    id serial NOT NULL PRIMARY KEY,
    type tournament_type_enum NOT NULL,

    time_created timestamp with time zone NOT NULL DEFAULT now(),
    time_modified timestamp with time zone NOT NULL DEFAULT now(),
    time_finished timestamp with time zone
);

CREATE TABLE "match" (
    id serial NOT NULL PRIMARY KEY,
    clients integer[] NOT NULL,
    tournament integer NOT NULL REFERENCES tournament,

    hashes character varying[] NOT NULL,
    reason character varying,
    gamelog integer UNIQUE,

    time_scheduled timestamp with time zone NOT NULL,
    time_started timestamp with time zone,
    time_finished timestamp with time zone
);

DELETE FROM "log";
DELETE FROM "client";
DELETE FROM "tournament";
DELETE FROM "match";

ALTER SEQUENCE "log_id_seq" RESTART WITH 1;
ALTER SEQUENCE "client_id_seq" RESTART WITH 1;
ALTER SEQUENCE "match_id_seq" RESTART WITH 1;
ALTER SEQUENCE "tournament_id_seq" RESTART WITH 1;
