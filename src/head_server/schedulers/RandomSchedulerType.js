var BaseScheduler = require("./BaseSchedulerType");
var Client = require("../../common/Client");



class RandomSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * calls the Clients getRandom() and returns thier parsed IDs in an array.
     * @callback RandomSchedulerType ~genNextCallback
     */
    
    genNext(callback) {
        Client.getRandom(2, (err, clients) => {
            if(err) return callback(err);
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
