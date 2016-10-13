var express = require("express");
var config = require("config");
var body_parser = require("body-parser");
var path = require("path");
var HandlebarLoader = require("../common/HandlebarLoader");

var hb = HandlebarLoader({
    "index": path.join(__dirname, "index.html")
});

var clientApi= require("./client/api.js");

var app = express();

app.use("/lib/bootstrap", express.static(path.join(__dirname, "../../bower_components/bootstrap/dist")));
app.use("/lib/jquery", express.static(path.join(__dirname, "../../bower_components/jquery/dist")));
app.use("/lib/react", express.static(path.join(__dirname, "../../bower_components/react")));
app.use("/lib/babel", express.static(path.join(__dirname, "../../bower_components/babel")));

app.use( body_parser.json() );
app.use( body_parser.urlencoded({ extended: true }) );
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.use("/", clientApi);

app.get("/", (req, res) => {
    res.send(hb["index"]());
});

app.listen(config.head_server.port, () => {
    console.log(`Head server listening on port ${config.head_server.port}`);
});
