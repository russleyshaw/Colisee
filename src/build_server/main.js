var express = require("express");
var config = require("config");
var body_parser = require("body-parser");

var builder = require("./builder");

var app = express();

app.use( body_parser.json() );
app.use( body_parser.urlencoded({ extended: true }) );
app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.get("/api/v2/build/", function (req, res) {
    const client_id = req.query.client_id;

    builder.get_tar(client_id, function(err, tar){
        if(err) { res.send(404); return; }
        res.send(tar);
    });
});

app.post("/api/v2/build/", function (req, res) {
    //TODO: Verify arguments are good
    //TODO: Capture language of repo

    res.send({success: true, message: "Building and saving client image."});

    var client_id = req.body.client_id;

    builder.build(client_id, function(){
        //TODO: Send success/failure to head server
    });
});

console.log("Build Server listening on port " + config.build_server.port);
app.listen(config.build_server.port);

