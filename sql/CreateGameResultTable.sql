CREATE TABLE "game_result" (
    "game_id" integer PRIMARY KEY,
    hashes character varying[],
    "reason" character varying,
    "starttime" timestamp with time zone,
    "finishtime" timestamp with time zone,
    "gamelog" integer
);


--ALTER TABLE "game_result" OWNER TO postgres;

CREATE SEQUENCE "game_result_game_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE "Game_Result_Game_ID_seq" OWNER TO postgres;

--ALTER SEQUENCE "Game_Result_Game_ID_seq" OWNED BY "Game_Result"."Game_ID";

--ALTER TABLE ONLY "Game_Result" ALTER COLUMN "Game_ID" SET DEFAULT nextval('"Game_Result_Game_ID_seq"'::regclass);
