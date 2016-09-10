
DROP TABLE public.client;

CREATE TABLE public.client
(
  id integer NOT NULL DEFAULT nextval('client_id_seq'::regclass),
  name character varying NOT NULL,
  git_repo character varying NOT NULL,
  git_hash character varying NOT NULL,
  language character varying NOT NULL,
  CONSTRAINT "PK_ID" PRIMARY KEY (id)
);