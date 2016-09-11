var pg = require("pg");
var config = require("config");

/**
 * Class to interface with client table in database
 */
class Client {

    /**
     * Deletes all rows in client table
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

            pgclient.query("DELETE FROM client", [], function (err) {
                if(err) throw err;

                pgclient.end(function (err) {
                    if(err) throw err;
                    callback();
                });
            });
        });
    }

    /**
     * Gets a client from the databse
     * @param client_id
     * @param callback function(err, client)
     */
    static get(client_id, callback) {

        var pgclient = new pg.Client({
            user: config.database.username,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port,
            host: config.database.host
        });

        pgclient.connect(function(err) {
            if(err) throw err;

            pgclient.query("SELECT * FROM client WHERE id = $1::integer", [client_id], function (err, result) {
                if(err) throw err;
                if(result.rowCount != 1) { callback("No match found", undefined); return; }

                var data = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    git_repo: result.rows[0].git_repo,
                    git_hash: result.rows[0].git_hash,
                    language: result.rows[0].language,
                };

                pgclient.end(function (err) {
                    if(err) throw err;
                    callback(undefined, data);
                });
            });
        });
    }

    /**
     * Create a client with the given parameters
     * @param name
     * @param git_repo
     * @param git_hash
     * @param language
     * @param callback function(err, created_client)
     */
    static create(name, git_repo, git_hash, language, callback) {

        var pgclient = new pg.Client({
            user: config.database.username,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port,
            host: config.database.host
        });

        pgclient.connect(function(err) {
            if(err) { callback(err); return; }

            pgclient.query("INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", [name, git_repo, git_hash, language], function (err, result) {
                if(err) { callback(err); return; }
                if(result.rowCount != 1) { callback("No match found"); return; }

                var data = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    git_repo: result.rows[0].git_repo,
                    git_hash: result.rows[0].git_hash,
                    language: result.rows[0].language,
                };

                pgclient.end(function (err) {
                    if(err) { callback(err); return; }
                    callback(undefined, data);
                });
            });
        });
    }
}

module.exports = Client;

