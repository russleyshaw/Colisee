var express = require("express");
var fs = require("fs");
var config = require("config");
var handlebars = require("handlebars");
var path = require("path");

var app = express();

var indexHtmlTemplate = fs.readFileSync(path.join(__dirname,"index.html"));
var indexFunc = handlebars.compile(indexHtmlTemplate.toString());

app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

app.get("/", function(req, res){
    res.send(indexFunc(config));
});

// WEB API for Colisee
app.get("/api/v1/client", function(req, res){
    var body = {
        "name": "NAME",
        "git_repo": "GIT_REPO",
        "git_hash": "GIT_HASH",
        "eligible": true,
        "language": "python"
    };
    res.send(JSON.stringify(body));
});

console.log("Mock Web Server listening on port " + config.mock_web.port);
app.listen(config.mock_web.port);
