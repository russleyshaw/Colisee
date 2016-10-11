var Db = require("./Db");
var knex = require("knex")({
    "dialect": "pg"
});
//var Logger = require("./logger");


/**
 * Class to interface with match table in database
 */
class Match {
    static getById(match_id, callback) {
        var sql = knex("match").where("id", match_id).toString();
        Db.queryOnce(sql, [], function(err, result){
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found.");

            callback(null, result.rows[0]);
        });
    }

    /**
     *
     * @param match is a json
     * @param callback
     * @returns nothing
     */
    static create(match, callback) {
        if(match.hasOwnProperty("id")) return callback("Cannot create a match with a given id");
        if(match.hasOwnProperty("created_time")) return callback("Cannot create a match with a given created_time");
        if(match.hasOwnProperty("modified_time")) return callback("Cannot create a match with a given modified_time");

        if(match.hasOwnProperty("clients")) {
            match.clients = `{${match.clients.toString()}}`;
        }

        match.created_time = "now()";
        match.modified_time = "now()";

        var sql = knex("match").insert(match, "*").toString();
        Db.queryOnce(sql, [], (err, result) => {
            if(err)return callback(err);
            // if(err) {
            //     var log = {
            //         message: "Match.create() error",
            //         severity: "error"
            //     };
            //     Logger.create(log, (err, log) => {
            //         if (err) console.error("Logger.create() error");
            //         callback(null, log);
            //     });
            //     return callback(err);
            // }
            if(result.rowCount != 1) return callback("No match found.");
            callback(null, result.rows[0]);
        });
        //var sql1 = knex("match").where("clients", match.clients).insert("status","scheduled").toString();
        //console.log("this is sql1"+ sql1);
        // Db.queryOnce(sql1, [], (err, result) => {
        //     if (err) return callback(err);
        //     if (result.rowCount != 1) return callback("No match found.");
        //     console.log("This is matchIDs hopefully: " + match.clients);
        //     callback(null, result.rows[0]);
        // });
    }

    static updateById(id, fields, callback) {
        if(fields.hasOwnProperty("id")) return callback("Cannot update a match id");
        if(fields.hasOwnProperty("created_time")) return callback("Cannot update a match created_time");
        if(fields.hasOwnProperty("modified_time")) return callback("Cannot update a match modified_time");

        if(fields.hasOwnProperty("clients")) {
            fields.clients = `{${fields.clients.toString()}}`;
        }

        fields.modified_time = "now()";

        var sql = knex("match").where("id", id).update(fields).toString();
        Db.queryOnce(sql, [], function(err, result){
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found.");

            callback(null, result.rows[0]);
        });
    }
}

module.exports = Match;

