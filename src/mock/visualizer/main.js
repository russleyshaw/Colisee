var express = require("express");
var fs = require("fs");

function main() {
    console.log("Running Mock Visualizer...");

    var app = express();


    app.get('/', function(req, res){
        res.sendFile(__dirname + "/index.html");
    });


    app.listen(3001);
}

main();