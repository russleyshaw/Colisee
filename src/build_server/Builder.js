var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var async = require("async");
var Client = require("../common/Client");
var Db = require("../common/Db");

/**
 * Manager of building and accessing client docker images
 */
class Builder {

    /**
     * Callback invoked when the builder is finished initializing
     * @callback Builder~initCallback
     * @param err
     */

    /**
     * Initializes the builder
     * @desc Initializes the builder by building docker images for each supported language
     * @param callback {Builder~initCallback}
     */
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
     * Callback invoked when the client code has finished building
     * @callback Builder~buildCallback
     * @param err
     * @param built {boolean} True if the client code was built successfully
     */

    /**
     * Builds client based on client id and database git repo, hash and language
     * @param client_id {number} Integer id of individual client in database
     * @param callback {Builder~buildCallback}
     */
    build(client_id, callback) {

        Client.getById(client_id, function(err, client) {
            if(err) return callback(err);

            var BUILD_CMDS = {
                "cpp": `docker build --no-cache --force-rm -t ${client.id} --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "dockerfiles/client/cpp.dockerfile")} . > ${path.join(__dirname, `build_logs/${client.id}.log`)}`,
                "js": `docker build --no-cache --force-rm -t ${client.id} --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "dockerfiles/client/js.dockerfile")} . > ${path.join(__dirname, `build_logs/${client.id}.log`)}`,
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
     * Callback invoked when finished retrieving the tar file
     * @callback Builder~getTarCallback
     * @param err
     * @param tar_data
     */

    /**
     * Gets a tar image from the file system
     * @param client_id {integer} Integer id of individual client in database
     * @param callback {Builder~getTarCallback}
     */
    getTar(client_id, callback) {
        fs.readFile( path.join(__dirname, "tarballs", client_id+".tar") , function(err, data){
            if(err) return callback(err);
            callback(null, data);
        });
    }

    /**
     * Callback invoked when finished retrieving build log
     * @callback Builder~getLogCallback
     * @param err
     * @param log_data
     */

    /**
     * Gets the build log from the file system
     * @param client_id {integer} Integer id of individual client in database
     * @param callback {Builder~getLogCallback}
     */
    getLog(client_id, callback) {
        fs.readFile( path.join(__dirname, `build_logs/${client_id}.log`) , function(err, data){
            if(err) return callback(err);
            callback(null, data);
        });
    }
}

module.exports = Builder;
