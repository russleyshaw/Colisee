let express = require("express");
let config = require("config");
let commandLineArgs = require('command-line-args');

let Player = require("./Player");

const options_definitions = [
    { name: "port", alias: "p", type: Number },
    { name: "head_server", alias: "h", type: String }
];
const options = commandLineArgs(options_definitions);

let app = express();
let player = Player();

app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.listen(options.port);
