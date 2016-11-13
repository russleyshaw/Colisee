var config = require("config");
var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var async = require("async");
var tar = require("tar");

const log_dir = path.join(__dirname, "../../tmp/build/log/");
const tar_dir = path.join(__dirname, "../../tmp/build/tar/");
const hash_dir = path.join(__dirname, "../../tmp/build/hash/");

/**
 * Manager of building and accessing client docker images
 */
class BuildWorker {

    constructor(callback) {
        var cmds = [
            `docker build -t base_cpp -f ${ path.join(__dirname, "dockerfiles/base_cpp.dockerfile")} . > ${path.join(this.log_dir, "base_cpp.log")}`,
        ];

        // build each base image
        async.map(cmds, function(cmd, cb) {
            child_process.exec(cmd, function(err) {
                if(err) return cb(err);
                cb();
            });
        }, function(err){
            if(err) return callback(err);
            callback();
        });
    }

    /**
     * @callback BuildWorker~buildCallback
     * @param err
     * @param success {boolean} if build was successful
     * @param tar {file|null} build image tar file; null if build fail
     * @param log {file} build log file
     */

    /**
     * Builds a client based on given parameters
     * @param client
     * @param callback {BuildWorker~buildCallback}
     */
    build(client, callback) {
        const cmds = {
            "cpp": `docker build -t client_${clidnt.id} --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "dockerfiles/client_cpp.dockerfile")} . > ${path.join(log_dir, `client_${client.id}.log`)}`,
        };

        if(!(client.language in cmds)) return callback(new Error(`Language ${client.language} not supported!`));
        const build_cmd = cmds[client.language];

        child_process.exec(build_cmd, (err) => {
            if(err) {
                fs.readFile(`${path.join(log_dir, `client_${client_id}.log`)}`, (err, file) => {
                    if(err) return callback(err);
                    return callback(null, false, null, file);
                });
            }
            else {
                const save_cmd = `docker save client_${client_id} -o ${path.join(tar_dir, `client_${client_id}.tar`)}`;
                child_process.exec(save_cmd, (err) => {
                    if(err) return callback(err); // unable to save

                });
            }
        });
    }
}

module.exports = BuildWorker;
