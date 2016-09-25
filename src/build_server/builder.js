var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var async = require("async");
var Client = require("../common/client");
var Db = require("../common/db");

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
        var cmds = [
            `docker build -t cpp -f ${ path.join(__dirname, "dockerfiles/base/cpp.dockerfile")} . > ${path.join(__dirname, "build_logs/cpp.log")}`,
            `docker build -t js -f ${path.join(__dirname, "dockerfiles/base/js.dockerfile")} . > ${path.join(__dirname, "build_logs/js.log")}`,
        ];

        async.map(cmds, function(cmd, cb) {
            console.log(`Running: ${cmd}`);
            child_process.exec(cmd, function(err) {
                if(err) return cb(err);
                console.log(`Done: ${cmd}`);
                cb();
            });
        }, function(err){
            if(err) return callback(err);
            callback();
        });
    }

    /**
     * Builds client based on client id and database git repo, hash and language
     * @param client_id
     * @param callback function(err, succeeded)
     */
    build(client_id, callback) {

        Client.getById(client_id, function(err, client) {
            if(err) return callback(err);

            var BUILD_CMDS = {
                "cpp": `docker build --no-cache -t ${client.id} --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "dockerfiles/client/cpp.dockerfile")} . > ${path.join(__dirname, `build_logs/${client.id}.log`)}`,
                "js": `docker build --no-cache -t ${client.id} --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "dockerfiles/client/js.dockerfile")} . > ${path.join(__dirname, `build_logs/${client.id}.log`)}`,
            };
            var SAVE_CMD = `docker save -o ${path.join(__dirname, "tarballs", `${client.id}.tar`)} ${client.id}`;
            if(!(client.language in BUILD_CMDS)) return callback("Language not supported!");
            var BUILD_CMD = BUILD_CMDS[client.language];

            console.log(`Running: ${BUILD_CMD}`);
            child_process.exec(BUILD_CMD, function(err){
                console.log(`Done: ${BUILD_CMD}`);

                if(err){
                    Db.queryOnce("UPDATE client SET build_success = FALSE, last_failure_time = now(), last_modified_time = now() WHERE id = $1",[client.id], function(err){
                        if(err) return callback(err);
                        callback(null, false);
                    });
                    return;
                }

                console.log(`Running: ${SAVE_CMD}`);
                child_process.exec(SAVE_CMD, function(err){
                    console.log(`Done: ${SAVE_CMD}`);
                    if(err) return callback(err);

                    Db.queryOnce("UPDATE client SET build_success = TRUE, last_success_time = now(), last_modified_time = now() WHERE id = $1", [client.id], function(err){
                        if(err) return callback(err);
                        callback(null, true);
                    });
                });
            });
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

module.exports = Builder;
