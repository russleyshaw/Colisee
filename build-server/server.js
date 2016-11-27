var express = require("express");
var config = require("config");
var path = require("path");
var bodyParser = require("body-parser");
let winston = require("winston");

winston.level = config.logging;

var Builder = require("./Builder");

var app = express();
var builder = new Builder();

builder.init((err) => {
    if(err) return console.error(err);
    builder.start();
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.listen(config.port, () => {
    winston.info(`Listening on port ${config.port}...`);
});

