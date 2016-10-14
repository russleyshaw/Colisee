var Db = require("./Db");
var knex = require("knex")({
    dialect: "pg"
});

/**
 * Class to interface with log table in database
 */
class Logger {

    static getById(log_id, callback) {
        var sql = knex("log").where("id", log_id).toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found");

            callback(null, result.rows[0]);
        });
    }

    /**
     * @callback Logger~createCallback
     * @param err
     * @param log {Object} newly created log
     */

    /**
     * Creates a log from the given object
     * @param log {Object}
     * @param callback {Logger~createCallback}
     */
    static create(log, callback) {
        if(log.hasOwnProperty("id")) return callback("log ids are created automatically");
        if(log.hasOwnProperty("created_time")) return callback("Cannot create with created time");
        if(log.hasOwnProperty("modified_time")) return callback("Cannot create with modified time");

        log.created_time = "now()";
        log.modified_time = "now()";

        var sql = knex("log").insert(log, "*").toString();
        Db.queryOnce(sql, [], function(err, result) {
            if(err) return callback(err);
            if(result.rowCount != 1) return callback("Inserted row not returned");
            callback(null, result.rows[0]);
        });
    }

    /**
     * @callback Logger~updateByIdCallback
     * @param err
     * @param log {Object} Updated log
     */

    /**
     * Update log given the id and fields to update
     * @param id {number} Logger database id
     * @param fields {Object} JSON of fields to update
     * @param callback {Logger~updateByIdCallback}
     */
    static updateById(id, fields, callback) {
        if(fields.hasOwnProperty("id")) return callback("Cannot update id");
        if(fields.hasOwnProperty("created_time")) return callback("Cannot update created time");
        if(fields.hasOwnProperty("modified_time")) return callback("Cannot update modified time");

        fields["modified_time"] = "now()";

        var sql = knex("log").where({id: id}).update(fields, "*").toString();
        Db.queryOnce(sql, [], (err, result) => {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("Query resulted in invalid number of rows");

            callback(null, result.rows[0]);
        });
    }

    /**
     * Options for Logger.getLatest function
     * @typedef Logger~getLatest~options
     * @property limit {number} The max number of logs requested. Default = 10
     * @property severity {string} The minimum severity log to get. Default = "warn"
     */

    /**
     * Retrieve <code>limit</code> latest number of logs
     * @param options {Logger~getLatest~options} Options object for function
     * @param callback
     */
    static getLatest(options, callback) {
        if(!options.hasOwnProperty("limit")) options.limit = 10;
        if(!options.hasOwnProperty("severity")) options.severity = "debug";
        var sql = knex("log").where("severity", ">=", options.severity).orderBy("created_time").limit(options.limit).toString();
        Db.queryOnce(sql, [], function(err, result) {
            if(err) return callback(err);
            if(result.rowCount > options.limit) return callback("Returned too many logs");
            callback(null, result.rows);
        });
    }
}




module.exports = Logger;
