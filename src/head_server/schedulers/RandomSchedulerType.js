var BaseScheduler = require("./BaseSchedulerType");
var Client = require("../../common/Client");
var config = require("config");


class RandomSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * calls the Clients getRandom() and returns thier parsed IDs in an array.
     * @callback RandomSchedulerType ~genNextCallback
     */
    
    genNext(callback) {
        var options = {
            order_by : "random",
            limit : config.mock_web.num_clients
        };
        Client.get(options, (err, clients) => {
            if(err) return callback(err);
            if(clients.length < 2) console.warn("Got less than two clients.");
            var client_ids = clients.map(function (client) {
                return client.id;
            });
            callback(null, client_ids);
        });

    }
    getType(){
        return "random";
    }
}




module.exports = RandomSchedulerType;
