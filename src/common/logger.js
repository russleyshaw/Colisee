var Db = require("./db");

class Logger {

    /**
     * Gets a single log from the database
     * @param log_id
     * @param callback function(err, log)
     */
    static get(log_id, callback) {

        var pgclient = Db.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            pgclient.query("SELECT * FROM log WHERE id = $1::integer", [log_id], function(err, result) {
                if(err) return callback(err);
                if(result.rowCount != 1) return callback("No match found");

                var data = {
                    id: result.rows[0].id,
                    message: result.rows[0].message,
                    location: result.rows[0].location,
                    severity: result.rows[0].severity,
                    time_created: result.rows[0].time_created
                };

                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, data);
                });
            });
        });
    }

    /**
     * Create a log with the given parameters
     * @param message
     * @param location
     * @param severity
     * @param callback - function(err, created_log)
     */
    static create(message, location, severity, callback) {
        var pgclient = Db.newPgClient();

        pgclient.connect(function(err){
            if(err) return callback(err);

            pgclient.query("INSERT INTO log (message, location, severity, time_created) VALUES ($1::text, $2::text, $3, now() ) RETURNING *", [message, location, severity], function (err, result) {
                if(err) return callback(err);
                if(result.rowCount != 1) { callback("No match found"); return; }

                var data = {
                    id: result.rows[0].id,
                    message: result.rows[0].message,
                    location: result.rows[0].location,
                    severity: result.rows[0].severity,
                    time_created: result.rows[0].time_created
                };

                pgclient.end(function(err){
                    if(err) return callback(err);
                    callback(null, data);
                });
            });
        });
    }
    static latest() {
        return 1;
        //TODO: latest() should get the 10 latest logs, based on creation timeim ba
    }
}




module.exports = Logger;
