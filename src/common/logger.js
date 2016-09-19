var pg = require("pg");
var config = require("config");

/**
 * Class to interface with log table in database
 */
class Logger {

    /**
     * Deletes all rows in log table
     * @param callback function(err)
     */
    static purge(callback) {
        var pgclient = new pg.Client({
            user: config.database.username,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port,
            host: config.database.host
        });
        pgclient.connect(function(err) {
            if(err) throw err;

            pgclient.query("DELETE FROM log", [], function (err) {
                if(err) throw err;

                pgclient.end(function (err) {
                    if(err) throw err;
                    callback();
                });
            });
        });
    }

    /**
     * Gets a single log from the database
     * @param log_id
     * @param callback function(err, log)
     */
    static get(log_id, callback) {

        var pgclient = new pg.Client({
            user: config.database.username,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port,
            host: config.database.host
        });

        pgclient.connect(function(err) {
            if(err) throw err;

            pgclient.query("SELECT * FROM log WHERE id = $1::integer", [log_id], function (err, result) {
                if(err) throw err;
                if(result.rowCount != 1) { callback("No match found", undefined); return; }

                var data = {
                    id: result.rows[0].id,
                    message: result.rows[0].message,
                    location: result.rows[0].location,
                    severity: result.rows[0].severity,
                    time_created: result.rows[0].time_created,
                };

                pgclient.end(function (err) {
                    if(err) throw err;
                    callback(undefined, data);
                });
            });
        });
    }

    /**
     * Create a log with the given parameters
     * @param message
     * @param location
     * @param severity
     * @param time_created
     * @param callback function(err, created_log)
     */
    static create(message, location, severity, time_created, callback) {

        var pgclient = new pg.Client({
            user: config.database.username,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port,
            host: config.database.host
        });

        pgclient.connect(function(err) {
            if(err) { callback(err); return; }

            pgclient.query("INSERT INTO log (message, location, severity, time_created) VALUES ($1::text, $2::text, $3, current_timestamp() ) RETURNING *", [message, location, severity, time_created], function (err, result) {
                if(err) { callback(err); return; }
                if(result.rowCount != 1) { callback("No match found"); return; }

                var data = {
                    id: result.rows[0].id,
                    message: result.rows[0].message,
                    location: result.rows[0].location,
                    severity: result.rows[0].severity,
                    time_created: result.rows[0].time_created,
                };

                pgclient.end(function (err) {
                    if(err) { callback(err); return; }
                    callback(undefined, data);
                });
            });
        });
    }
    static latest() {
        return 1;
        }
}

module.exports = Logger;
