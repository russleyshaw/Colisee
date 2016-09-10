var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var Client = require("../common/client");

/**
 * Manager of building and accessing client docker images
 */
class Builder {
    /**
     * Creates a new Builder object
     */
    constructor() {
        //TODO: Add other docker base images
        var build_cmds = [
            "docker build -t cpp -f " + path.join(__dirname, "dockerfiles/base/cpp.dockerfile") + " .",
            "docker build -t js -f " + path.join(__dirname, "dockerfiles/base/js.dockerfile") + " .",
        ];

        for(var cmd of build_cmds) {
            console.log("Build Server - RUNNING - "+cmd);
            child_process.execSync(cmd);
            console.log("Build Server - FINISHED - "+cmd);
        }

        //TODO: alert head server when finished with initialization
        //TODO: update status when finished with initialization
        console.log("Build Server - Completed initialization");
    }

    /**
     * Builds client based on client id and database git repo, hash and language
     * @param client_id
     * @param callback function(err, tar_url)
     */
    build(client_id, callback) {

        Client.get(client_id, function(err, client) {
            if(err) throw err;

            //TODO: Determine if build failed
            //TODO: Capture build output
            //TODO: Select base image based on client language
            var build_cmds = {
                "cpp": "docker build -t "+client.id+" --build-arg git_repo="+client.git_repo+" --build-arg git_hash="+client.git_hash+" -f "+path.join(__dirname, "dockerfiles/client/cpp.dockerfile")+" .",
                "js": "docker build -t "+client.id+" --build-arg git_repo="+client.git_repo+" --build-arg git_hash="+client.git_hash+" -f "+path.join(__dirname, "dockerfiles/client/js.dockerfile")+" .",
            };

            if(!(client.language in build_cmds)) {
                callback("Language not supported!", undefined); return;
            }

            // Build docker image
            var cmd = build_cmds[client.language];
            console.log("Build Server - RUNNING - "+cmd);
            child_process.execSync(cmd);
            console.log("Build Server - FINISHED - "+cmd);

            // Save docker image
            cmd = "docker save -o "+path.join(__dirname, "tarballs", client.id+".tar")+" "+client.id;
            console.log("Build Server - RUNNING - "+cmd);
            child_process.execSync(cmd);
            console.log("Build Server - FINISHED - "+cmd);

            //TODO: Alert head server when build completes or fails
        });
    }

    /**
     * Gets a tar image from the file system
     * @param client_id
     * @param callback function(err, tar_data)
     */
    get_tar(client_id, callback) {
        fs.readFile( path.join(__dirname, "tarballs", client_id+".tar") , function(err, data){
            if(err) {callback(err, undefined); return; }
            callback(undefined, data);
        });
    }
}

module.exports = new Builder();
