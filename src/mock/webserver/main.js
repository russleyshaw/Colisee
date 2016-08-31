var express = require("express");
var fs = require("fs");

function main() {
    console.log("Running Mock Web Server...");

    var app = express();

    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.get('/', function(req, res){
        res.sendFile(__dirname + "/index.html");
    });

    // WEB API for Colisee
    app.get('/api/v1/client', function(req, res){
        var body = {
            "name": "NAME",
            "git_repo": "GIT_REPO",
            "git_hash": "GIT_HASH",
            "eligible": true,
            "language": "python"
        };
        res.send(JSON.stringify(body));
    });


    app.listen(3002);
}

main();