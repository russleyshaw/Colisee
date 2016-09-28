var request = require("request");
var config = require("config");

class Player {

    constructor(id) {
        this.id = id;
    }

    init(callback) {
        var cmd = `docker build -t player --build-arg REPO=${client.repo} --build-arg HASH=${client.hash} -f ${path.join(__dirname, "play.dockerfile")} .`;

    }

    getNextMatch(callback) {
        request.get(`http://${config.head_server.host}:${config.head_server.port}/api/v2/sched/next`, function(err, response, body){
            if(err) return callback(err);
            callback(null, body);
        });
    }
}


module.exports = Player;
