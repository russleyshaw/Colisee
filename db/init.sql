DROP TABLE IF EXISTS "log" CASCADE;
DROP TABLE IF EXISTS "client" CASCADE;
DROP TABLE IF EXISTS "schedule" CASCADE;
DROP TABLE IF EXISTS "match" CASCADE;

DROP TYPE IF EXISTS "log_severity_enum" CASCADE;
DROP TYPE IF EXISTS "schedule_type_enum" CASCADE;
DROP TYPE IF EXISTS "client_language_enum" CASCADE;
DROP TYPE IF EXISTS "match_status_enum" CASCADE;
DROP TYPE IF EXISTS "schedule_status_enum" CASCADE;

CREATE TYPE client_language_enum AS ENUM (
    'cpp', 'python', 'csharp', 'javascript', 'java'
);

CREATE TYPE log_severity_enum AS ENUM (
    'debug', 'info', 'warn', 'error'
);

CREATE TYPE schedule_type_enum AS ENUM (
    'random', 'single_elimination', 'triple_elimination', 'swiss', 'test'
);
CREATE TYPE  schedule_status_enum AS ENUM(
  'running','stopped'
);

CREATE TYPE match_status_enum AS ENUM (
    'playing', 'scheduled', 'finished', 'failed', 'sending'
);

CREATE TABLE "log" (
    id serial NOT NULL PRIMARY KEY,
    message character varying NOT NULL,
    location character varying,
    severity log_severity_enum NOT NULL DEFAULT 'debug',

    created_time timestamp NOT NULL DEFAULT now(),
    modified_time timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "client" (
    id serial NOT NULL PRIMARY KEY,
    name character varying NOT NULL UNIQUE,
    repo character varying,
    hash character varying,

    language client_language_enum,

    needs_build boolean NOT NULL DEFAULT false,
    build_success boolean,
    attempt_time timestamp,
    success_time timestamp,
    failure_time timestamp,

    created_time timestamp NOT NULL DEFAULT now(),
    modified_time timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "schedule" (
    id serial NOT NULL PRIMARY KEY,
    type schedule_type_enum NOT NULL,
    status schedule_status_enum NOT NULL DEFAULT 'stopped',

    created_time timestamp NOT NULL DEFAULT now(),
    modified_time timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "match" (
    id serial NOT NULL PRIMARY KEY,

    clients integer[] NOT NULL,
    reason character varying,

    winner integer,

    status match_status_enum NOT NULL DEFAULT 'scheduled',
    gamelog integer,

    created_time timestamp NOT NULL DEFAULT now(),
    modified_time timestamp NOT NULL DEFAULT now(),
    schedule_id integer NOT NULL REFERENCES schedule ON DELETE CASCADE
);

DELETE FROM "log";
DELETE FROM "client";
DELETE FROM "schedule";
DELETE FROM "match";

ALTER SEQUENCE "log_id_seq" RESTART WITH 1;
ALTER SEQUENCE "client_id_seq" RESTART WITH 1;
ALTER SEQUENCE "match_id_seq" RESTART WITH 1;
ALTER SEQUENCE "schedule_id_seq" RESTART WITH 1;