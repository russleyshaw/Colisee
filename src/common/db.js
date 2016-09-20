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

    static reset(callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            var init_sql = fs.readFileSync( path.join(__dirname, "../../db/init.sql") );
            var sqls = init_sql.toString().split(";");

            async.mapSeries(sqls, function(sql, cb){
                pgclient.query(sql, [], function (err, result) {
                    cb(err, result);
                });

            }, function(err, results){
                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback();
                });
            });
        });
    }

    /**
     *
     * @param sql
     * @param args - [arg1, arg2, ...]
     * @param callback - function(err, result)
     */
    static query_once(sql, args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            pgclient.query(sql, [], function (err, result) {
                if(err) return callback(err);

                pgclient.end(function (err) {
                    if(err) return callback(err);
                    callback(null, result);
                });
            });
        });
    }

    /**
     *
     * @param sql_args - [ [sql, [arg1, arg2, ...]], [sql, [arg1, arg2, ...]], ... ]
     * @param callback - function(err, results)
     */
    static query_lots(sql_args, callback) {
        var pgclient = this.newPgClient();

        pgclient.connect(function(err) {
            if(err) return callback(err);

            async.mapSeries(sql_args, function(sqlarg, cb){
                pgclient.query(sqlarg[0], sqlarg[1], function (err, result) {
                    cb(err, result);
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