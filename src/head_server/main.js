var express = require("express");
var fs = require("fs");

function main() {
    console.log("Running Head Server...");

    var currentVisGame = 0;

    var app = express();

    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.get('/api/vis/next', function(req, res){

        var body = {
            "gamelog": currentVisGame
        };
        currentVisGame++;

        res.send(JSON.stringify(body));
    });


    app.listen(3000);
}

main();