var request = require("request");
var config = require("config");
var child_process = require("child_process");
var path = require("path");

class Player {

    /**
     * Creates a new player
     * @param id
     * @param port
     */
    constructor() {
        this.id = (typeof id !== "undefined") ? id : 0;
        this.port = (typeof port !== "undefined") ? port : config.play_server.ports[this.id];
    }

    /**
     * @callback Player~initCallback
     * @param err
     */

    /**
     *
     * @param callback {Player~initCallback}
     */
    init(callback) {
        var repo = config.cerveau_repo;
        var hash = config.cerveau_hash;

        var cmd = `docker build -t player_image_${this.id} --build-arg REPO=${repo} --build-arg HASH=${hash} -f ${path.join(__dirname, "play.dockerfile")} .`;
        console.log(`Player - Running - ${cmd}`);
        child_process.exec(cmd, (err) => {
            console.log(`Player - Done - ${cmd}`);
            if(err) return callback(err);

        });
    }

    start(callback){
        var cmd = `docker run --name player_${this.id} -d -p 3000:${this.port} player_image_${this.id}`;
        console.log(`Player - Running - ${cmd}`);
        child_process.exec(cmd, (err) => {
            console.log(`Player - Done - ${cmd}`);
            if(err) return callback(err);

        });
    }

    stop(callback) {
        var cmd = `docker stop player_${this.id}`;
        console.log(`Player - Running - ${cmd}`);
        child_process.exec(cmd, (err) => {
            console.log(`Player - Done - ${cmd}`);
            if(err) return callback(err);

        });
    }

    getNextMatch(callback) {
        request.get(`http://${config.head_server.host}:${config.head_server.port}/api/v2/sched/next`, function(err, response, body){
            if(err) return callback(err);
            callback(null, body);
        });
    }
}


module.exports = Player;
