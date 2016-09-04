var express = require("express");
var config = require("config");

function main() {
    if( process.argv.length < 3 ) {
        console.error("Must give Play Server ID as argument!");
        return;
    }
    var play_server_id = process.argv[2];

    console.log("Starting Play Server " + play_server_id + "...");

    var app = express();

    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    console.log("Play Server " + play_server_id + " listening on port " + config.play_server.ports[play_server_id]);
    app.listen(config.play_server.ports[play_server_id]);
}

main();