var Db = require("./Db");
var knex = require("knex")({
    dialect: "pg"
});

/**
 * Class to interface with client table in database
 */
class Client {

    static getAll(callback) {
        var sql = knex("client").toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);

            callback(null, result.rows);
        });
    }

    static getById(client_id, callback) {
        var sql = knex("client").where("id", client_id).toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found");

            callback(null, result.rows[0]);
        });
    }

    static getByName(client_name, callback) {
        var sql = knex("client").where("name", client_name).toString();
        Db.queryOnce(sql, [], function (err, result) {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("No match found");

            callback(null, result.rows[0]);
        });
    }

    /**
     * Retrieve <code>limit</code> random number of clients
     * @param limit {number} Number of random clients (without replacement) to select
     * @param callback
     */
    static getRandom(limit, callback) {
        var sql = knex("client").orderByRaw("random()").limit(limit).toString();
        Db.queryOnce(sql, [], function(err, result) {
            if(err) return callback(err);
            if(result.rowCount != limit) return callback("Inserted rows not fully returned");
            callback(null, result.rows);
        });
    }

    /**
     * @callback Client~createCallback
     * @param err
     * @param client {Object} newly created client
     */

    /**
     * Creates a client from the given object
     * @param client {Object}
     * @param callback {Client~createCallback}
     */
    static create(client, callback) {
        if(client.hasOwnProperty("id")) return callback("client ids are created automatically");
        if(client.hasOwnProperty("created_time")) return callback("Cannot create with created time");
        if(client.hasOwnProperty("modified_time")) return callback("Cannot create with modified time");

        client.created_time = "now()";
        client.modified_time = "now()";

        var sql = knex("client").insert(client, "*").toString();
        Db.queryOnce(sql, [], function(err, result) {
            if(err) return callback(err);
            if(result.rowCount != 1) return callback("Inserted row not returned");
            callback(null, result.rows[0]);
        });
    }

    /**
     * @callback Client~updateByIdCallback
     * @param err
     * @param client {Object} Updated client
     */

    /**
     * Update client given the id and fields to update
     * @param id {number} Client database id
     * @param fields {Object} JSON of fields to update
     * @param callback {Client~updateByIdCallback}
     */
    static updateById(id, fields, callback) {
        if(fields.hasOwnProperty("id")) return callback("Cannot update id");
        if(fields.hasOwnProperty("created_time")) return callback("Cannot update created time");
        if(fields.hasOwnProperty("modified_time")) return callback("Cannot update modified time");

        fields["modified_time"] = "now()";

        var sql = knex("client").where({id: id}).update(fields, "*").toString();
        Db.queryOnce(sql, [], (err, result) => {
            if(err) return callback(err);
            if(result.rows.length != 1) return callback("Query resulted in invalid number of rows");

            callback(null, result.rows[0]);
        });
    }
}

module.exports = Client;

