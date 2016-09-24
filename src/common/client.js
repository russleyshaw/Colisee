var Db = require("./db");

/**
 * Class to interface with client table in database
 */
class Client {

    static getById(client_id, callback) {
        Db.queryOnce("SELECT * FROM client WHERE id = $1::integer", [client_id], function (err, result) {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found");

            callback(null, result.rows[0]);
        });
    }

    static getByName(client_name, callback) {

        Db.queryOnce("SELECT * FROM client WHERE name = $1::text", [client_name], function (err, result) {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found", undefined);

            callback(null, result.rows[0]);
        });
    }


    static getRandom(limit, callback) {
        Db.queryOnce("SELECT * FROM client ORDER BY RANDOM() LIMIT $1", [limit], function(err, result) {
            if(err) return callback(err);

            callback(null, result.rows);
        });
    }

    /**
     * Create a client with the given parameters
     * @param name
     * @param repo
     * @param hash
     * @param language
     * @param callback function(err, created_client)
     */
    static create(name, repo, hash, language, callback) {

        Db.queryOnce("INSERT INTO client (name, repo, hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *",
            [name, repo, hash, language], function (err, result) {
                if(err) return callback(err);
                if(result.rows.length != 1) return callback("No match found");

                callback(null, result.rows[0]);
            });
    }
}

module.exports = Client;

