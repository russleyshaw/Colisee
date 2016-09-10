CREATE TYPE severity AS ENUM (
        'debug',
	     'info',
        'warn',
        'error',
        'critical'
);

ALTER TYPE severity OWNER TO postgres;--might not be necessary

CREATE TABLE "Log" (

    "Log_ID" integer PRIMARY KEY,

    "Message" character varying,

    "Location" character varying,

    LogSeverity severity,

    "DateTime" timestamp with time zone

);

ALTER TABLE "Log" OWNER TO postgres;--might not be necessary

CREATE SEQUENCE "Log_Log_ID_seq"

        START WITH 1

        INCREMENT BY 1

        NO MINVALUE

        NO MAXVALUE

        CACHE 1;
        
ALTER TABLE "Log_Log_ID_seq" OWNER TO postgres;--might not be necessary, I think this is just PostgreSQL backend syntax auto-generated stuff
ALTER SEQUENCE "Log_Log_ID_seq" OWNED BY "Log"."Log_ID";

ALTER TABLE ONLY "Log" ALTER COLUMN "LOG_ID" SET DEFAULT nextval('"Log_Log_ID_seq"'::regclass);--might not be necessary, caused an error
