var express = require("express");

function main() {
    console.log("Running Colisee Build Server...");

    var app = express();

    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.post('/api/build/:repo/:hash/', function (req, res) {
        //Build git repo for specified git hash

        res.send("{status: true}");
    });

    app.get('/api/build/:repo/', function(req, res){
        //Get current build for repo

        res.sendFile(__dirname + "/index.html");
    });


    app.listen(3003);
}

main();