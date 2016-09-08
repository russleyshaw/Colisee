CREATE TABLE "Game_Result" (
    "Game_ID" integer PRIMARY KEY,
    "Client" integer[],
    hashes character varying[],
    "Winner" integer[],
    "Reason" character varying,
    "StartTime" timestamp with time zone,
    "FinishTime" timestamp with time zone,
    "GameLog" integer
);


ALTER TABLE "Game_Result" OWNER TO postgres;

CREATE SEQUENCE "Game_Result_Game_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Game_Result_Game_ID_seq" OWNER TO postgres;

ALTER SEQUENCE "Game_Result_Game_ID_seq" OWNED BY "Game_Result"."Game_ID";

ALTER TABLE ONLY "Game_Result" ALTER COLUMN "Game_ID" SET DEFAULT nextval('"Game_Result_Game_ID_seq"'::regclass);
