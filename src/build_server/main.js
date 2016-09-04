var express = require("express");
var config = require("config");
var bodyParser = require('body-parser');

function main() {
    console.log("Starting Build Server...");
    var app = express();

    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.post('/api/v2/build/', function (req, res, next) {
        if(typeof req.body.url !== "string" || req.body.url !== "") {
            res.send({success: false, error: "Body did not contain url"});
            return;
        }
        else if(typeof req.body.hash !== "string" || req.body.url !== "") {
            res.send({success: false, error: "Body did not contain url"});
            return;
        }

        res.send({success: true});
    });

    console.log("Build Server listening on port " + config.build_server.port);
    app.listen(config.build_server.port);
}

main();