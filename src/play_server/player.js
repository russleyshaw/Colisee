var request = require("request");
var config = require("config");

class Player {

    constructor(id) {
        this.id = id;
    }

    init() {
        //var BUILD_CMD = `docker build --no-cache -t ${client.id} --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "dockerfiles/client/cpp.dockerfile")} . > ${path.join(__dirname, `build_logs/${client.id}.log`)}`;
    }

    getNextMatch(callback) {
        request.get(`http://${config.head_server.host}:${config.head_server.port}/api/v2/sched/next`, function(err, response, body){
            if(err) return callback(err);
            callback(null, body);
        });
    }
}


module.exports = Player;
