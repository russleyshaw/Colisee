var child_process = require("child_process");
var fs = require("fs");
var pg = require("pg");
var config = require("config");
var path = require("path");

class Builder {
    constructor() {
        //TODO: Add other docker base images
        var build_cmds = [
            "docker build -t cpp -f " + path.join(__dirname, "dockerfiles/base/cpp.dockerfile") + " .",
        ];

        for(var cmd of build_cmds) {
            child_process.execSync(cmd);
        }
    }

    build(client_id, callback) {
        var client = new pg.Client({
            user: config.database.username,
            database: config.database.db_name,
            password: config.database.password,
            port: config.database.port
        });
        
        pg.connect(function(err) {
            if(err) { callback(err); return; }

            client.query("SELECT * FROM CLIENT WHERE CLIENT.id=$1::number", [client_id], function (err, result) {
                if(err) { callback(err); return; }

                var git_repo = result.rows[0].git_repo;
                var git_hash = result.rows[0].git_hash;
                var language = result.rows[0].language;

                //TODO: Determine if build failed
                //TODO: Capture build output
                //TODO: Select base image based on client language
                var build_cmds = {
                    "cpp": "docker build -t "+client_id+" --build-arg git_repo="+git_repo+" --build-arg git_hash="+git_hash+" -f "+path.join(__dirname, "dockerfiles/client/cpp.dockerfile")+" .",
                    "js": "docker build -t "+client_id+" --build-arg git_repo="+git_repo+" --build-arg git_hash="+git_hash+" -f "+path.join(__dirname, "dockerfiles/client/js.dockerfile")+" .",
                };

                if(!(language in build_cmds)) {
                    callback("Language not supported!"); return;
                }

                child_process.execSync(build_cmds[language]);

                var save_cmd = "docker save -o "+path.join(__dirname, "tarballs", client_id+".tar")+" "+client_id;
                child_process.execSync(save_cmd);

                //TODO: Alert head server when build completes or fails

                client.end(function (err) {
                    if(err) { callback(err); return; }
                    callback(undefined);
                });
            });
        });
    }

    // @param callback
    get_tar(client_id, callback) {
        fs.readFile( path.join(__dirname, "tarballs", client_id+".tar") , function(err, data){
            if(err) { callback(err, undefined); return; }
            callback(undefined, data);
        });
    }
}

module.exports = new Builder();
