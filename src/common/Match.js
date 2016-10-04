var Db = require("./Db");

/**
 * Class to interface with match table in database
 */


class Match{
    static getById(match_id, callback){
        Db.queryOnce("SELECT * FROM match WHERE id = $1:integer", [match_id], function(err, result){
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found.");

            callback(null, result.rows[0]);
        });
    }

    static getRandom(limit, callback){
        Db.queryOnce("SELECT * FROM match ORDER BY RANDOM() LIMIT $1", [limit], function(err, result){
            if(err) return callback(err);

            callback(null, result.rows);
        });
    }

    static create(clients, tournament, hashes, reason, gamelog, callback){
        Db.queryOnce("INSERT INTO match(clients, tournament, hashes, reason, gamelog) VALUES ($1::integer, $2::integer, $3::text, $4::text, $5::integer) RETURNING *", [clients, tournament, hashes, reason, gamelog], function(err, result){
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found.");

            callback(null, result.rows[0]);
        });
    }
}

module.export = Match;

