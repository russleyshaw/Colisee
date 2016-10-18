var Db = require("./Db");
var knex = require("knex")({
    "dialect": "pg"
});

/**
 * Class to interface with match table in database
 */
class Match {

    static getAll(callback) {
        var sql = knex("match").toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);

            callback(null, result.rows);
        });
    }

    static get(options, callback){
        var sql = knex("match").select();

        if(options.hasOwnProperty("id")){
            if(Array.isArray(options.id)) sql = sql.whereIn("id", options.id);
            else sql = sql.where("id", options.id);
        }
        if(options.hasOwnProperty("clients")){
            if(Array.isArray(options.clients)) sql = sql.whereIn("clients", options.clients);
            else sql = sql.where("clients", options.clients);
        }
        if(options.hasOwnProperty("reason")){
            if(Array.isArray(options.reason)) sql = sql.whereIn("reason", options.reason);
            else sql = sql.where("reason", options.reason);
        }
        if(options.hasOwnProperty("status")){
            if(Array.isArray(options.status)) sql = sql.whereIn("status", options.status);
            else sql = sql.where("status", options.status);
        }
        if(options.hasOwnProperty("gamelog")){
            if(Array.isArray(options.gamelog)) sql = sql.whereIn("gamelog", options.gamelog);
            else sql = sql.where("gamelog", options.gamelog);
        }

        sql = sql.toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);
            callback(null, result.rows);
        });
    }

    static getById(match_id, callback) {
        var sql = knex("match").where("id", match_id).toString();
        Db.queryOnce(sql, [], function(err, result){
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found.");

            callback(null, result.rows[0]);
        });
    }

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
            if(err) return callback(err);
            if(result.rowCount != 1) return callback("No match found.");
            callback(null, result.rows[0]);
        });
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

