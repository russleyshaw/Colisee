const express       = require("express");
const config        = require("config");
const bodyParser    = require("body-parser");
const path          = require("path");
const winston       = require("winston");

winston.level = config.logging;

let clientApi       = require("./client_api");
let matchApi        = require("./match_api");
let logApi          = require("./log_api");
let scheduleApi     = require("./schedule_api");
let playApi         = require("./play_api");

let app = express();

app.use("/", express.static(path.join(__dirname, "../static/")));
app.use("/lib/bootstrap", express.static(path.join(__dirname, "../bower_components/bootstrap/dist")));
app.use("/lib/jquery", express.static(path.join(__dirname, "../bower_components/jquery/dist")));
app.use("/lib/react", express.static(path.join(__dirname, "../bower_components/react")));
app.use("/lib/babel", express.static(path.join(__dirname, "../bower_components/babel")));

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.use("/api/v2/client",   clientApi);
app.use("/api/v2/match",    matchApi);
app.use("/api/v2/log",      logApi);
app.use("/api/v2/schedule", scheduleApi);
app.use("/api/v2/play",     playApi);

app.listen(config.port, () => {
    winston.info(`Listening on port ${config.port}`);
});
