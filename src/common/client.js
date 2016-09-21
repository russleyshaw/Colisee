var Db = require("./db");

/**
 * Class to interface with client table in database
 */
class Client {


    static getById(client_id, callback) {

        Db.queryOnce("SELECT * FROM client WHERE id = $1::integer", [client_id], function (err, result) {
            if(err) return callback(err);
            if(result.rowCount != 1) return callback("No match found", undefined);

            var data = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                git_repo: result.rows[0].git_repo,
                git_hash: result.rows[0].git_hash,
                language: result.rows[0].language,
            };

            callback(null, data);
        });
    }

    static getByName(client_name, callback) {

        Db.queryOnce("SELECT * FROM client WHERE name = $1::text", [client_name], function (err, result) {
            if(err) return callback(err);
            if(result.rowCount != 1) return callback("No match found", undefined);

            var data = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                git_repo: result.rows[0].git_repo,
                git_hash: result.rows[0].git_hash,
                language: result.rows[0].language
            };

            callback(null, data);
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

        Db.queryOnce("INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *",
            [name, git_repo, git_hash, language], function (err, result) {
                if(err) return callback(err);
                if(result.rowCount != 1) return callback("No match found");

                var data = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    git_repo: result.rows[0].git_repo,
                    git_hash: result.rows[0].git_hash,
                    language: result.rows[0].language,
                };

                callback(null, data);
            });
    }
}

module.exports = Client;

