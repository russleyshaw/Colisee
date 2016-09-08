var express = require("express");
var config = require("config");
var path = require("path");


function main() {
    console.log("Starting Mock Visualizer...");

    var app = express();

    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, "index.html"));
    });

    console.log('Mock Visualizer listening on port ' + config.mock_vis.port);
    app.listen(config.mock_vis.port);
}

main();