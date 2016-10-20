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
     * @param schedule {Object}
     * @callback {Schedule~createCallback}
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

    /**
     * @callback
     * @param err
     * @param Schedule {Object}
     *
     *
     * Retreives a schedule by its ID#
     * @param a schedule id
     * @callback {Schedule ~getByIDcallback}
     */
    static getByID(schedule_id, callback){
        var sql = knex("schedule").where("id",schedule_id).toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedule.getByID() returns an error");
            callback(null,result.rows[0]);
        });
    }

    /**
     * @callback
     * @param err
     * @param Schedule {Object}
     *
     *
     *
     * @param a schedule type
     * @callback {Schedule ~getByTypeCallback}
     */
    static getByType(schedule_type, callback){
        var sql = knex("schedule").where("type",schedule_type).toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedule.getByType() returns an error");
            callback(null,result.rows[0]);
        });
    }
    // static updateById(schedule_id, fields, callback){
    //     var sql = knex("schedule")
    // }
    //
    // static getAll(callback){
    //     var sql = knex("schedule")
    // }



}

module.exports = Schedule;
