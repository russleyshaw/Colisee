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
    constructor() {}

    init(callback) {
        //TODO: Add other docker base images
        var build_cmds = [
            "docker build -t cpp -f " + path.join(__dirname, "dockerfiles/base/cpp.dockerfile") + " .",
            "docker build -t js -f " + path.join(__dirname, "dockerfiles/base/js.dockerfile") + " .",
        ];

        for(var cmd of build_cmds) {
            child_process.execSync(cmd);
        }

        callback();
    }

    /**
     * Builds client based on client id and database git repo, hash and language
     * @param client_id
     * @param callback function(err, tarUrl)
     */
    build(client_id, callback) {

        Client.get(client_id, function(err, client) {
            if(err) return callback(err);

            //TODO: Determine if build failed
            //TODO: Capture build output
            var build_cmds = {
                "cpp": "docker build -t "+client.id+" --build-arg git_repo="+client.git_repo+" --build-arg git_hash="+client.git_hash+" -f "+path.join(__dirname, "dockerfiles/client/cpp.dockerfile")+" .",
                "js": "docker build -t "+client.id+" --build-arg git_repo="+client.git_repo+" --build-arg git_hash="+client.git_hash+" -f "+path.join(__dirname, "dockerfiles/client/js.dockerfile")+" .",
            };

            if(!(client.language in build_cmds)) {
                callback("Language not supported!", undefined); return;
            }

            //TODO: Build
            // Build docker image
            var cmd = build_cmds[client.language];
            child_process.execSync(cmd);

            //TODO: Save docker image using docker component
            // Save docker image
            cmd = "docker save -o "+path.join(__dirname, "tarballs", client.id+".tar")+" "+client.id;
            child_process.execSync(cmd);

            callback();
        });
    }

    /**
     * Gets a tar image from the file system
     * @param client_id
     * @param callback function(err, tar_data)
     */
    getTar(client_id, callback) {
        fs.readFile( path.join(__dirname, "tarballs", client_id+".tar") , function(err, data){
            if(err) return callback(err);
            callback(null, data);
        });
    }
}

module.exports = new Builder();
