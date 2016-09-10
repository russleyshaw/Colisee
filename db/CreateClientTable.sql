CREATE TYPE client_language AS ENUM (
    'cpp',
    'python',
    'csharp',
    'javascript',
    'java'
);

--ALTER TYPE client_language OWNER TO postgres;

CREATE TABLE "client" (
    "client_id" integer PRIMARY KEY,
    "Name" character varying,
    language client_language,
    git_url character varying,
    git_hash character varying
);

--ALTER TABLE "client" OWNER TO postgres;

--ALTER TABLE ONLY "client"
--    ADD CONSTRAINT "client_pkey" PRIMARY KEY ("client_id");
