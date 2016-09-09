CREATE TABLE "game_clients" (
	"client" integer REFERENCES client(client_id),
	"game" integer REFERENCES game_result(game_id),
	PRIMARY KEY( "game", "client" )
);
