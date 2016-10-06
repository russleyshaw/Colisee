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
     * Retrieve <code>limit</code> latest number of logs
     * @param limit {number} Number of latest logs to select
     * @param callback
     */
    static get_latest(limit, callback) {
        var sql = knex("log").orderBy("created_time").limit(limit).toString();
        Db.queryOnce(sql, [], function(err, result) {
            if(err) return callback(err);
            if(result.rowCount != limit) return callback("Inserted rows not fully returned");
            callback(null, result.rows);
        });
        //TODO: latest() should get the 10 latest logs, based on creation timeim ba
    }
}




module.exports = Logger;
