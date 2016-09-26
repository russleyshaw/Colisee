/* eslint-env node, mocha */

var should = require("should");
var async = require("async");

var Db = require("../../src/common/Db");
var Builder = require("../../src/build_server/Builder");
var Player = require("../../src/play_server/player.js");

var Scheduler = require("../../src/head_server/schedulers/Scheduler");
var RandomSchedulerType = require("../../src/head_server/schedulers/Scheduler");

describe.skip("Player",function() {

    var builder = new Builder();
    var sched = new Scheduler();
    var player = new Player(0);

    function setupDb(callback){
        Db.reset(function(err){
            if(err) return callback(err);
            Db.queryLots([
                [ "INSERT INTO client (name, repo, hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "ca3803e2a120668b1715ba29cafbad3fed4b10ce", "cpp"]],
                [ "INSERT INTO client (name, repo, hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test2", "https://github.com/russleyshaw/Joueur.cpp.git", "ca3803e2a120668b1715ba29cafbad3fed4b10ce", "cpp"]],
            ], function(err, results) {
                if(err) return callback(err);
                callback(null, results);
            });
        });
    }

    function setupBuilder(callback) {
        builder.init(function(err){
            if(err) return callback(err);

            async.map([1, 2], function(item, cb){
                builder.build(item, function(err, built){
                    if(err) return cb(err);
                    if(!built) return cb(`Client ${item} was not built`);
                    cb();
                });
            }, function(err){
                if(err) return callback(err);
                callback();
            });
        });
    }

    function setupScheduler(callback) {
        sched.switchTo( new RandomSchedulerType() );
        sched.start();
        callback();
    }

    before("Reset database and insert test data", function(done){
        this.timeout(0); //TODO: set an actual timeout
        
        
        setupDb(function () {
            setupBuilder(function () {
                setupScheduler(function () {
                    
                });
            });
        });
        
        
        async.series([
            setupDb,
            setupBuilder,
            setupScheduler
        ], function(err) {
            should(err).not.be.ok();
            done();
        });
    });

    describe("getNextMatch", function() {
        it("should get the next scheduled match", function(done) {
            var next_match = sched.peekNext();

            player.getNextMatch(function(err, match){
                should(err).not.be.ok();
                should(match).be.equal(next_match);
                done();
            });
        });
    });
});
