/* eslint-disable */
//TODO: enable linting

var pg = require("pg");
var path = require("path");
var fs = require("fs");
var process = require("process");
var config = require("config");
var async = require("async");

class Db {

    static newPgClient() {
        return new pg.Client({
            user: config.database.username,
            database: config.database.database,
            password: config.database.password,
            port: config.database.port,
            host: config.database.host
        });
    }

    /**
     * Resets the entire database by running the db/init.sql script
     * @param callback invokes (err)
     */
    static reset(callback) {
        var init_sql = fs.readFileSync( path.join(__dirname, "../../db/init.sql") );
        var sqls = init_sql.toString();

        Db.queryOnce(sqls, [], function(err) {
           if(err) return callback(err);
            callback();
        });
    }

    /**
     * Perform an individual SQL query on the database
     * @param sql
     * @param args - [arg1, arg2, ...]
     * @param callback - invokes (err, result)
     */
    static queryOnce(sql, args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            pgclient.query(sql, args, function (err, result) {
                if(err) return callback(err);

                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, result);
                });
            });
        });
    }

    /**
     * Perform multiple SQL queries in series
     * @param sql_args - [ [sql, [arg1, arg2, ...]], [sql, [arg1, arg2, ...]], ... ]
     * @param callback - function(err, results)
     */
    static queryLotsSeries(sql_args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            async.mapSeries(sql_args, function(sqlarg, cb){
                pgclient.query(sqlarg[0], sqlarg[1], function (err, result) {
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
     * Perform multiple SQL queries in parallel
     * @param sql_args - [ [sql, [arg1, arg2, ...]], [sql, [arg1, arg2, ...]], ... ]
     * @param callback - function(err, results)
     */
    static queryLots(sql_args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            async.map(sql_args, function(sqlarg, cb){
                pgclient.query(sqlarg[0], sqlarg[1], function (err, result) {
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

}

module.exports = Db;