let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
    }
});

/**
 * Interface for schedule table in database
 */
class Schedule{
    /**
     * @callback Schedule~createCallback
     * @param err
     * @param schedule {Object} Updated schedule
     */

    /**
     * Creates a schedule when given a scheduler type
     * @param schedule {Object}
     * @param callback {Schedule~createCallback}
     */
    static create(schedule, callback){
        if(schedule.hasOwnProperty("id")) return callback( new Error("schedule ids are created automatically") );
        if(schedule.hasOwnProperty("created_time")) return callback( new Error("Cannot create with created time") );
        if(schedule.hasOwnProperty("modified_time")) return callback( new Error("Cannot create with modified time") );

        knex("schedule").insert(schedule,"*").asCallback(( err, rows) => {
            if(err) return console.error("queryOnce in schedule.create() returns an error");
            if(rows.length != 1) return console.error("Unable to insert into database");
            callback(null, rows[0]);
        });
    }

    /**
     * @callback Schedule~getCallback
     * @param err
     * @param schedule {Object}
     */

     /**
     * Gets an array of clients that satisfies the given options parameters
     * @param options {Object}
     * @param callback {Schedule~getCallback}
     */
    static get(options, callback){
        let sql = knex("schedule").select();

        if(options.hasOwnProperty("id")) {
            if (Array.isArray(options.id)) sql = sql.whereIn("id", options.id);
            else sql = sql.where("id", options.id);
        }
        if(options.hasOwnProperty("status")) {
            if (Array.isArray(options.status))sql = sql.whereIn("status", options.status);
            else sql  = sql.where("status", options.status);
        }
        if(options.hasOwnProperty("type")){
            if(Array.isArray(options.type)) sql = sql.whereIn("type", options.type);
            else sql= sql.where("type", options.type);
        }
        sql.asCallback( (err, rows) => {
            if(err) return callback(err);
            callback(null, rows);
        });
    }

    /**
     * @callback Schedule~updateById
     * @param err
     * @param schedule {Object} Updated schedule
     */

    /**
     * Update a Schedule by its id
     * @param id
     * @param fields {Object}
     * @param callback {Schedule~updateById}
     */
    static updateById(id, fields, callback){
        if(fields.hasOwnProperty("id")) return callback( new Error("Cannot modify id") );
        if(fields.hasOwnProperty("type"))return callback( new Error("Cannot modify type.") );
        if(fields.hasOwnProperty("modified_time"))return callback( new Error( "Cannot modify the modified time.") );
        if(fields.hasOwnProperty("created_time"))return callback( new Error("Canot modify the created time.") );

        fields["modified_time"] = "now()";

        knex("schedule").where({id: id}).update(fields, "*").asCallback( (err, rows) => {
            if(err) return callback(err);
            if(rows.length != 1) return callback( new Error(`Schedule with id ${id} not found.`) );
            callback(null, rows[0]);
        });
    }
}


module.exports = Schedule;
