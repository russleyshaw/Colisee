const express = require("express");
const fs = require("fs");
const config = require("config");
const handlebars = require("handlebars");
const path = require("path");

function main() {
    console.log("Starting Mock Web Server...");

    const app = express();

    const indexHtmlTemplate = fs.readFileSync(path.join(__dirname,"index.html"));
    const indexFunc = handlebars.compile(indexHtmlTemplate.toString());

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
        const body = {
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
}

main();
