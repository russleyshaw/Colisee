let BaseScheduler = require("./BaseSchedulerType");
let Client = require("../../common/Client");
let config = require("config");
let winston = require("winston");

class RandomSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * calls the Clients getRandom() and returns thier parsed IDs in an array.
     * @callback RandomSchedulerType ~genNextCallback
     */

    genNext(callback) {
        Client.get({
            order_by : "random",
            limit : config.num_clients
        }, (err, clients) => {
            if(err) return callback(err);
            if(clients.length < config.num_clients) return winston.warn(`Got less than ${config.num_clients} clients.`);
            let client_ids = clients.map((client) => {
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
