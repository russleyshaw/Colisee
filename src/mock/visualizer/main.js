var express = require("express");
var fs = require("fs");

function main() {
    console.log("Running Mock Visualizer...");

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


    app.listen(3001);
}

main();