
DROP TYPE IF EXISTS client_language_enum CASCADE;
CREATE TYPE client_language_enum AS ENUM (
    'cpp',
    'python',
    'csharp',
    'javascript',
    'java'
);

DROP TABLE IF EXISTS client;
CREATE TABLE client
(
  id serial NOT NULL,
  name character varying NOT NULL,
  git_repo character varying NOT NULL,
  git_hash character varying NOT NULL,
  language client_language_enum NOT NULL,
  CONSTRAINT "CLIENT_PK_ID" PRIMARY KEY (id)
  CONSTRAINT "CLIENT_UNIQUE_NAME" UNIQUE (name)
);

DROP TABLE IF EXISTS game_result;
CREATE TABLE game_result
(
    id serial NOT NULL,
    clients integer[] NOT NULL,
    hashes character varying[] NOT NULL,
    reason character varying NOT NULL,
    time_started timestamp with time zone NOT NULL,
    time_finished timestamp with time zone NOT NULL,
    gamelog_id integer NOT NULL,
    CONSTRAINT "GAME_RESULT_PK_ID" PRIMARY KEY (id)
);

DROP TYPE IF EXISTS log_severity_enum CASCADE;
CREATE TYPE log_severity_enum AS ENUM (
    'debug',
    'info',
    'warn',
    'error',
    'critical'
);

DROP TABLE IF EXISTS log;
CREATE TABLE log
(
    id serial NOT NULL,
    message character varying,
    location character varying,
    severity log_severity_enum NOT NULL,
    time_created timestamp with time zone NOT NULL,
    CONSTRAINT "LOG_PK_ID" PRIMARY KEY (id)
);