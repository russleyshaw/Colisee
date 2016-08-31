var express = require("express");
var fs = require("fs");

function main() {
    var currentVisGame = 0;

    var app = express();
    

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