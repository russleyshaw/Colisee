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
    static create(scheduler_type, callback){
        var sql = knex("schedule").insert("scheduler_type","*").toString();
        Db.queryOnce(sql,[],function(err,schedule){
            if(err)return console.error("queryOnce in schedule.create() returns an error");
            callback(null,schedule);
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