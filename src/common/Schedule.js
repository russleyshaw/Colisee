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


        var sql = knex("schedule").insert("scheduler_type","*").toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedule.create() returns an error");
            callback(null,result.id);
        });

    }

    // static getByID(schedule_id, callback){
    //     var sql = knex("schedule").
    // }
    //
    // static getTypeById(schedule_id, callback){
    //     var sql = knex("schedule")
    // }
    //
    // static getStatusById(schedule_id, callback){
    //     var sql = knex("schedule")
    // }
    //
    // static getCreatedTimeById(schedule_id, callback){
    //     var sql = knex("schedule")
    // }
    //
    // static getModifiedTimeById(schedule_id, callback){
    //     var sql = knex("schedule")
    // }
    //
    // static updateById(schedule_id, fields, callback){
    //     var sql = knex("schedule")
    // }
    //
    // static getAll(callback){
    //     var sql = knex("schedule")
    // }


}

module.exports = Schedule;
