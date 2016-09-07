const express = require("express");
const config = require("config");

const statusApp = require("./status/status.js");
const bracketApp = require("./bracket/bracket.js");
const logApp = require("./log/log.js");

function main() {
    console.log("Starting Head Server...");

    let currentVisGame = 1;

    const app = express();

    app.use( function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        next();
    });

    app.use("/", statusApp);
    app.use("/", bracketApp);
    app.use("/", logApp);

    app.get("/api/v1/vis/next", function(req, res){

        const body = {
            "gamelog": currentVisGame
        };
        currentVisGame++;

        res.send(JSON.stringify(body));
    });

    // WEB SERVER API
    app.get("/api/v1/web/client", function(req, res){
        const body = {
            "name": "a",
            "tag": "a",
            "repo": "REPO",
            "hash": "HASH",
            "embargoed": false,
            "embargo_reason": "EMBARGO_REASON",
            "eligible": true,
            "rating": 10,
            "missing": false,
            "language": "python",
            "last_game_played": 0
        };
        res.send(JSON.stringify(body));
    });

    app.get("/api/v1/web/game", function(req, res){
        const body = {
            "players": ["a", "b"],
            "winners": ["a"],
            "losers": ["b"],
            "reason": "Player A was faster",
            "visualized": false,
            "completion_time": 0,
            "status": "running",
            "gamelog": "1.glog",
            "interestingness": 0
        };
        res.send(JSON.stringify(body));
    });

    console.log("Head Server listening on port " + config.head_server.port);
    app.listen(config.head_server.port);
}

main();
