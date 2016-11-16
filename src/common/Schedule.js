var Db = require("./Db");
var knex = require("knex")({
    dialect: "pg"
});

/**
 * Interface for schedule table in database
 */
class Schedule{
    /**
     * @callback Schedule~createCallback
     * @param err
     * @param schedule {Object} Updated schedule
     */

    /**
     * Creates a schedule when given a scheduler type
     * @param schedule {Object}
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

    //TODO: Delete in favor of Schedule.get
    static getAll(callback) {
        var sql = knex("schedule").toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);
            callback(null, result.rows);
        });
    }

    /**
     * @callback Schedule~getCallback
     * @param err
     * @param schedule {Object}
     */

     /**
     * Gets an array of clients that satisfies the given options parameters
     * @param options {Object}
     * @param callback {Schedule~getCallback}
     */
    static get(options, callback){
        var sql = knex("schedule").select();

        if(options.hasOwnProperty("id")) {
            if (Array.isArray(options.id)) sql = sql.whereIn("id", options.id);
            else sql = sql.where("id", options.id);
        }
        if(options.hasOwnProperty("status")) {
            if (Array.isArray(options.status))sql = sql.whereIn("status", options.status);
            else sql  = sql.where("status", options.status);
        }
        if(options.hasOwnProperty("type")){
            if(Array.isArray(options.type)) sql = sql.whereIn("type", options.type);
            else sql= sql.where("type", options.type);
        }
        sql = sql.toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);
            callback(null, result.rows);
        });
    }

    //TODO: Delete this is favor of general Schedule.get()
    static getByType(schedule_type, callback){
        var sql = knex("schedule").where("type",schedule_type).toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedule.getByType() returns an error");
            callback(null,result.rows[0]);
        });
    }

    //TODO: Delete this in favor of general Schedule.get() with a limit of 1
    static getByID(id, callback){
        var sql = knex("schedule").where("id", id).toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return console.error("queryOnce in schedule.getByID() returns an error");
            callback(null,result.rows[0]);
        });
    }

    /**
     * @callback Schedule~updateById
     * @param err
     * @param schedule {Object} Updated schedule
     */

    /**
     * Update a Schedule by its id
     * @param id
     * @param fields {Object}
     * @param callback {Schedule~updateById}
     */
    static updateById(id, fields, callback){
        if(fields.hasOwnProperty("id")) return callback("Cannot modify id.");
        if(fields.hasOwnProperty("type"))return callback("Cannot modify type.");
        if(fields.hasOwnProperty("modified_time"))return callback("Cannot modify the modified time.");
        if(fields.hasOwnProperty("created_time"))return callback("Canot modify the created time.");

        fields["modified_time"] = "now()";

        var sql = knex("schedule").where({id: id}).update(fields, "*").toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err) return callback(err);
            if(result.rows.length != 1) return callback(new Error(`Schedule with id ${id} not found.`));
            callback(null,result.rows[0]);
        });
    }
}


module.exports = Schedule;
