let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
});

class Client {

    static get(options, callback){
        let sql = knex("client").select();

        if(options.hasOwnProperty("id")) {
            if(Array.isArray(options.id)) sql = sql.whereIn("id", options.id);
            else sql = sql.where("id", options.id);
        }
        if(options.hasOwnProperty("name")) {
            if(Array.isArray(options.name)) sql = sql.whereIn("name", options.name);
            else sql = sql.where("name", options.name);
        }
        if(options.hasOwnProperty("repo")) {
            if(Array.isArray(options.repo)) sql = sql.whereIn("repo", options.repo);
            else sql = sql.where("repo", options.repo);
        }
        if(options.hasOwnProperty("hash")) {
            if(Array.isArray(options.hash)) sql = sql.whereIn("hash", options.hash);
            else sql = sql.where("hash", options.hash);
        }
        if(options.hasOwnProperty("needs_build")) {
            if(Array.isArray(options.needs_build)) sql = sql.whereIn("needs_build", options.needs_build);
            else sql = sql.where("needs_build", options.needs_build);
        }
        if(options.hasOwnProperty("order_by")) {
            if(options.order_by==="random") sql = sql.orderByRaw("RANDOM()");
        }
        if(options.hasOwnProperty("limit")) {
            sql = sql.limit(options.limit);
        }

        sql.asCallback((err, rows) => {
            if(err) return callback(err);
            callback(null, rows);
        });

    }

    /**
     * Retrieve <code>limit</code> random number of clients
     * @param limit {number} Number of random clients (without replacement) to select
     * @param callback
     */

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
        if(client.hasOwnProperty("id")) return callback( new Error("client ids are created automatically") );
        if(client.hasOwnProperty("created_time")) return callback( new Error("Cannot create with created time") );
        if(client.hasOwnProperty("modified_time")) return callback( new Error("Cannot create with modified time") );

        knex("client").insert(client, "*").asCallback((err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error("Inserted row not returned") );
            callback(null, rows[0]);
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
        if(fields.hasOwnProperty("id")) return callback(new Error("Cannot update id") );
        if(fields.hasOwnProperty("created_time")) return callback( new Error("Cannot update created time") );
        if(fields.hasOwnProperty("modified_time")) return callback( new Error("Cannot update modified time") );

        fields["modified_time"] = "now()";

        knex("client").where({id: id}).update(fields, "*").asCallback((err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error("Query resulted in invalid number of rows") );

            callback(null, rows[0]);
        });
    }
}

module.exports = Client;

