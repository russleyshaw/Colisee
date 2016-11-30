let knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
});

/**
 * Class to interface with log table in database
 */
class Logger {

    static getById(log_id, callback) {
        knex("log").where("id", log_id).asCallback( (err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback(new Error("No match found") );
            callback(null, rows[0]);
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
        if(log.hasOwnProperty("id")) return callback( new Error("log ids are created automatically") );
        if(log.hasOwnProperty("created_time")) return callback( new Error("Cannot create with created time") );
        if(log.hasOwnProperty("modified_time")) return callback( new Error("Cannot create with modified time") );

        knex("log").insert(log, "*").asCallback( (err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error("Inserted row not returned") );
            callback(null, rows[0]);
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
        if(fields.hasOwnProperty("id")) return callback( new Error("Cannot update id") );
        if(fields.hasOwnProperty("created_time")) return callback( new Error("Cannot update created time") );
        if(fields.hasOwnProperty("modified_time")) return callback( new Error("Cannot update modified time") );

        fields["modified_time"] = "now()";

        knex("log").where({id: id}).update(fields, "*").asCallback( (err, result) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error("Query resulted in invalid number of rows") );
            callback(null, rows[0]);
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
        knex("log").where("severity", ">=", options.severity).orderBy("created_time", "desc").limit(options.limit).asCallback( (err, rows) => {
            if(err) return callback(err);
            if(rows.length > options.limit) return callback("Returned too many logs");
            callback(null, rows);
        });
    }
}




module.exports = Logger;
