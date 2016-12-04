/**
 * Database interaction and utilies
 * @file Db.js
 */

let pg = require("pg");
let path = require("path");
let fs = require("fs");
let config = require("config");
let async = require("async");

let _DEBUG = false;

/**
 * Database interaction and utilities class
 * @class Db
 */
class Db {

    /**
     * Create a new postgresql database client
     * @returns {pg.Client} returns a new postgresql client instance
     */
    static newPgClient() {
        return new pg.Client({
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        });
    }

    /**
     * Resets the entire database using the init.sql
     * @param callback {function(err)}
     */
    static reset(callback) {
        let init_sql = fs.readFileSync( path.join(__dirname, "../../db/init.sql") );
        let sqls = init_sql.toString();

        let pgclient = this.newPgClient();

        pgclient.connect((err) => {
            if(err) return callback(err);

            pgclient.query(sqls, [], function (err, result) {
                if(err) return callback(err);

                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, result);
                });
            });
        });
    }

    /**
     * This callback is invoked when queryOnce finishes executing
     * @callback Db~queryOnceCallback
     * @param error
     * @param result
     */

    /**
     * Perform an individual SQL query on the database
     * @param sql
     * @param args
     * @param callback {Db~queryOnceCallback}
     */
    static queryOnce(sql, args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect((err) => {
            if(err) return callback(err);

            if(Db.DEBUG) console.log(`Running SQL - ${sql.toString()}`);
            pgclient.query(sql, args, function (err, result) {
                if(Db.DEBUG) console.log(`Result - ${JSON.stringify(result)}`);
                if(Db.DEBUG) console.log(`Error - ${JSON.stringify(err)}`);
                if(err) return callback(err);

                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, result);
                });
            });
        });
    }

    /**
     * @callback Db~queryLotsSeriesCallback
     * @param err
     * @aram results
     */

    /**
     * Perform multiple SQL queries in series
     * @param sql_args
     * @param callback {Db~queryLotsSeriesCallback}
     */
    static queryLotsSeries(sql_args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            async.mapSeries(sql_args, function(sqlarg, cb){
                if(Db.DEBUG) console.log(`Running SQL - ${sqlarg[0].toString()}`);
                pgclient.query(sqlarg[0], sqlarg[1], function (err, result) {
                    if(Db.DEBUG) console.log(`Result - ${JSON.stringify(result)}`);
                    if(Db.DEBUG) console.log(`Error - ${JSON.stringify(err)}`);
                    if(err) return cb(err);
                    cb(null, result);
                });
            }, function(err, results){
                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, results);
                });
            });
        });
    }

    /**
     * @callback Db~queryLotsCallback
     * @param err
     * @aram results
     */

    /**
     * Perform multiple SQL queries in parallel
     * @param sql_args - [ [sql, [arg1, arg2, ...]], [sql, [arg1, arg2, ...]], ... ]
     * @param callback {Db~queryLotsCallback}
     */
    static queryLots(sql_args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            async.map(sql_args, function(sqlarg, cb){
                if(Db.DEBUG) console.log(`Running SQL - ${sqlarg[0].toString()}`);
                pgclient.query(sqlarg[0], sqlarg[1], function (err, result) {
                    if(Db.DEBUG) console.log(`Result - ${JSON.stringify(result)}`);
                    if(Db.DEBUG) console.log(`Error - ${JSON.stringify(err)}`);
                    if(err) return cb(err);
                    cb(null, result);
                });
            }, function(err, results){
                if(err) return callback(err);
                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, results);
                });
            });
        });
    }

    /**
     * Getter for database debug printing
     * @returns {boolean}
     */
    static get DEBUG() {
        return _DEBUG;
    }

    /**
     * Setter for database debug printing
     * @param val {boolean}
     */
    static set DEBUG(val) {
        _DEBUG = val;
    }

}

module.exports = Db;