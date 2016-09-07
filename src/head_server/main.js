var express = require("express");
var config = require("config");

var statusApp = require("./status/status.js");
var bracketApp = require("./bracket/bracket.js");
var logApp = require("./log/log.js");

function main() {
    console.log("Starting Head Server...");

    var currentVisGame = 1;

    var app = express();

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

        var body = {
            "gamelog": currentVisGame
        };
        currentVisGame++;

        res.send(JSON.stringify(body));
    });

    // WEB SERVER API
    app.get("/api/v1/web/client", function(req, res){
        var body = {
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
        var body = {
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