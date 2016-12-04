let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
});

let _ = require("lodash");


/**
 * Class to interface with match table in database
 */
class Match {

    static get(options, callback){
        let sql = knex("match").select();

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
        if(options.hasOwnProperty("schedule_id")){
            if(Array.isArray(options.schedule_id)) sql = sql.whereIn("schedule_id", options.schedule_id);
            else sql = sql.where("schedule_id", options.schedule_id);
        }
        sql.asCallback( (err, rows) => {
            if(err) return callback(err);
            callback(null, rows);
        });
    }

    static getById(match_id, callback) {
        knex("match").where("id", match_id).asCallback( (err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error("No match found.") );

            callback(null, rows[0]);
        });
    }

    /**
     *
     * @param {json} match holds a  ClientID array
     * @param callback
     * @returns nothing
     */
    static create(match, callback) {
        if(match.hasOwnProperty("id")) return callback(new Error("Cannot create a match with a given id"));
        if(match.hasOwnProperty("created_time")) return callback(new Error("Cannot create a match with a given created_time"));
        if(match.hasOwnProperty("modified_time")) return callback(new Error("Cannot create a match with a given modified_time"));
        //if(match.hasOwnProperty("schedule_id")) return callback(new Error("Cannot create a match with a given schedule_id"));
        if(match.clients.length < 2) return callback(new Error("Cannot create a match with less than 2 clients"));

        var uniqClients = _.uniq(match.clients);
        knex("client").whereIn("id",uniqClients).asCallback( (err, rows) => {
            if(err)return callback(new Error("Query failed"));
            if(rows.length == uniqClients.length) {

                if (match.hasOwnProperty("clients")) {
                    match.clients = `{${match.clients.toString()}}`;
                }

                match.created_time = "now()";
                match.modified_time = "now()";

                knex("match").insert(match, "*").asCallback( (err, rows) => {
                    if(err)return callback(err);
                    if(rows.length != 1) return callback( new Error("No match found.") );
                    callback(null, rows[0]);
                });
            }
            else return callback(new Error("The clients must exist in the database to be used in a match."));
        });


    }

    static updateById(id, fields, callback) {
        if(fields.hasOwnProperty("id")) return callback("Cannot update a match id");
        if(fields.hasOwnProperty("created_time")) return callback("Cannot update a match created_time");
        if(fields.hasOwnProperty("modified_time")) return callback("Cannot update a match modified_time");
        if(fields.hasOwnProperty("schedule_id")) return callback("Cannot update a match schedule_id");

        if(fields.hasOwnProperty("clients")) {
            fields.clients = `{${fields.clients.toString()}}`;
        }

        fields.modified_time = "now()";

        knex("match").where("id", id).update(fields).asCallback( (err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error("No match found.") );

            callback(null, rows[0]);
        });
    }
}

module.exports = Match;

