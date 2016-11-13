var express = require("express");
var config = require("config");
var path = require("path");
var body_parser = require("body-parser");
let commandLineArgs = require('command-line-args');

var BuildWorker = require("./build_worker");

const options_definitions = [
    { name: "port", alias: "p", type: Number },
    { name: "head_server", alias: "h", type: String }
];
const options = commandLineArgs(options_definitions);

let app = express();
let build_worker = new BuildWorker((err) => {
    if(err) return console.warn(err);
});

app.use( body_parser.json() );
app.use( body_parser.urlencoded({ extended: true }) );
app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.post("/api/v2/build/worker/", function(req, res) {
    if(!req.query.hasOwnProperty("client_id") || typeof req.query.client_id != "number") return res.status(400).send("client_id not passed as query parameter");
    if(!req.query.hasOwnProperty("repo") || typeof req.query.repo != "string") return res.status(400).send("repo not passed as query parameter");
    if(!req.query.hasOwnProperty("hash") || typeof req.query.hash != "string") return res.status(400).send("hash not passed as query parameter");
    if(!req.query.hasOwnProperty("language") || typeof req.query.language != "string") return res.status(400).send("language not passed as query parameter");

    var client = {
        id: req.query.client_id,
        repo: req.query.repo,
        hash: req.query.hash,
        language: req.query.hash
    };
    build_worker.build(client, (err, success, tar, log) => {

    });

});

app.listen(options.port);

