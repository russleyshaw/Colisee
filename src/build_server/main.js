const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");
const child_process = require("child_process");

/** Main entry point for Colisee Build Server */
function main() {

    //TODO: Add other docker base images
    const cmd = "docker build -t cpp -f" + path.join(__dirname, "dockerfiles/base/cpp.dockerfile") + " .";
    console.log("Running cmd: " + cmd);
    child_process.execSync(cmd);
    console.log("Ran cmd!");

    const app = express();

    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({ extended: true }) );
    app.use( function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        next();
    });

    app.get("/api/v2/build/", function (req, res) {
        //TODO: Verify URL sent correctly
        const url = req.query.url;
        const urlReplaced = url.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

        //TODO: Handle if git repo doesnt exist
        res.sendFile( path.join(__dirname, "tarballs", urlReplaced+".tar") );
    });

    app.post("/api/v2/build/", function (req, res) {
        //TODO: Verify arguments are good
        //TODO: Capture language of repo

        res.send({success: true, message: "Building and saving client image."});

        const url = req.body.url;
        const urlReplaced = url.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const hash = req.body.hash;
        let cmd = "";

        //TODO: Determine if build failed
        //TODO: Capture build output
        //TODO: Select base image based on client language
        console.log("Building client image...");
        cmd = "docker build -t "+urlReplaced+" --build-arg git_repo="+url+" --build-arg git_hash="+hash+" -f "+path.join(__dirname, "dockerfiles/client/cpp.dockerfile")+" .";
        console.log("Running cmd: " + cmd);
        child_process.execSync(cmd);
        console.log("Ran cmd!");

        console.log("Saving client image...");
        cmd = "docker save -o"+path.join(__dirname, "tarballs", urlReplaced+".tar")+" "+ urlReplaced;
        console.log("Running cmd: " + cmd);
        child_process.execSync(cmd);
        console.log("Ran cmd!");

        //TODO: Alert head server when build completes or fails
    });

    console.log("Build Server listening on port " + config.build_server.port);
    app.listen(config.build_server.port);
}

main();
