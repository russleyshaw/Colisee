var Db = require("./Db");
var knex = require("knex")({
    dialect: "pg"
});
/**
 * Class to interface with scheduler table in database
 */

class Schedule{
    /**
     * @callback Schedule~createCallback
     * @param err
     * @param schedule {Object} updated schedule
     */

    /**
     * Creates a schedule when given a scheduler type
     * @param scheduler type
     * @param callback {Schedule~createCallback}
     */
    static create(schedule, callback){
        if(schedule.hasOwnProperty("id")) return callback("schedule ids are created automatically");
        if(schedule.hasOwnProperty("created_time")) return callback("Cannot create with created time");
        if(schedule.hasOwnProperty("modified_time")) return callback("Cannot create with modified time");

        schedule.created_time = "now()";
        schedule.modified_time = "now()";


        var sql = knex("schedule").insert(schedule,"*").toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedule.create() returns an error");
            callback(null,result.rows[0]);
        });

    }



}

module.exports = Schedule;
