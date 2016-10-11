var BaseScheduler = require("./BaseSchedulerType");
var Db = require("../../common/Db");
var Client = require("../../common/Client");
var knex = require("knex")({
    dialect: "pg"
});


class RandomSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * calls the Clients getRandom() and returns thier parsed IDs in an array.
     * @param callback
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

    /**
     * creates a schedule of type "random" , with generated ID and status "stopped"
     * @param callback
     */
    schedDbId(callback){
        var sched = {
            type:"random"
        };
        var sql = knex("schedule").insert(sched,"*").toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedDbId returns an error");
            callback(null,result.rows[0].count);
        });
    }

}




module.exports = RandomSchedulerType;
