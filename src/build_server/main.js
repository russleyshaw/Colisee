var express = require("express");
var config = require("config");
var body_parser = require("body-parser");

var builder = require("./Builder");

var app = express();

app.use( body_parser.json() );
app.use( body_parser.urlencoded({ extended: true }) );
app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

/**
 * @apiName Get Build
 * @apiGroup Builder
 * @api {get} /api/v2/build/:id
 * @apiParam {number} id Database client id
 */
app.get("/api/v2/build/:id", function (req, res) {
    var id = req.params.id;

    builder.getTar(id, function(err, tar){
        if(err) return res.send(404);
        res.send(tar);
    });
});

/**
 * @apiName Get Build Log
 * @apiGroup Builder
 * @api {get} /api/v2/build/:id/log
 * @apiParam {number} id Database client id
 */
app.get("/api/v2/build/:id/log", function (req, res) {
    var id = req.params.id;

    builder.getLog(id, function(err, log){
        if(err) return res.send(404);
        res.send(log);
    });
});

/**
 * @apiName Build
 * @apiGroup Builder
 * @api {post} /api/v2/build/:id
 * @apiParam {number} id
 */
app.post("/api/v2/build/:id", function (req, res) {
    var id = req.params.id;

    res.send({message: "Building and saving client image."});

    builder.build(id, function(){

    });
});

console.log("Build Server - LISTENING - port " + config.build_server.port);
app.listen(config.build_server.port);

