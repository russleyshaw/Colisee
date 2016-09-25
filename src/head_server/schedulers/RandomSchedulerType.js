var BaseScheduler = require("./BaseSchedulerType");
var Client = require("../../src/common/client");


class RandomScheduler extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * Generate the next match to be played
     */
    genNext(callback) {
        //TODO: get 2 random client IDs from the database
            var clients = Client.getRandom(2, function(err, clients){
                if(err) return callback(err);

                callback(null, clients);
            })
        }

    }
    getMatch(clients)
            //get clients ID
{
            var client_id_array = clients.map(function (client) {
                return client.id;
            });
}




module.exports = RandomScheduler;
