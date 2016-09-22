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

app.get("/api/v2/build/:id", function (req, res) {
    var id = req.params.id;

    builder.get_tar(id, function(err, tar){
        if(err) return res.send(404);
        res.send(tar);
    });
});

app.post("/api/v2/build/:id", function (req, res) {
    var id = req.params.id;

    //TODO: Verify arguments are good
    //TODO: Capture language of repo

    res.send({success: true, message: "Building and saving client image."});

    builder.build(id, function(){
        //TODO: Send success/failure to head server
    });
});

console.log("Build Server - LISTENING - port " + config.build_server.port);
app.listen(config.build_server.port);

