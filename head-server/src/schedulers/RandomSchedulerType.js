let BaseScheduler = require("./BaseSchedulerType");
let Client = require("../../common/Client");

class RandomSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * calls the Clients getRandom() and returns thier parsed IDs in an array.
     * @callback RandomSchedulerType ~genNextCallback
     */
    
    genNext(callback) {
        const options = {
            order_by : "random",
            limit : 2
        };
        Client.get(options, (err, clients) => {
            if(err) return callback(err);
            if(clients.length < 2) console.warn("Got less than two clients.");
            let client_ids = clients.map(function (client) {
                return client.id;
            });
            callback(null, client_ids);
        });

    }

    getType() {
        return "random";
    }
}




module.exports = RandomSchedulerType;
