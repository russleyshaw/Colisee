var BaseScheduler = require("./BaseSchedulerType");
var Client = require("../../common/client");


class RandomSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     *
     * @param callback -invokes (error, client_ids)
     */
    genNext(callback) {
        //TODO: get 2 random client IDs from the database
        var clients = Client.getRandom(2, function(err, clients){
            if(err) return callback(err);

            //get clients ID
            var client_id_array = this.clients.map(function (individual_client) {
                return individual_client.id;
            });

            callback(null, client_id_array);
        });

    }
}




module.exports = RandomSchedulerType;
