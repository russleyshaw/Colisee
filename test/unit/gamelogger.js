/* eslint-env node, mocha */

var should = require("should");
var async = require("async");

var Gamelogger = require("../../src/gamelog_server/Gamelogger");

describe("Gamelogger",function() {

    var glogger = new Gamelogger();

    before("Reset gamelogger", function(done){
        glogger.reset((err) => {
            should(err).not.be.ok();
        });
    });

    describe("save", function() {
        it("should save a new gamelog", function(done) {
            var glog = {
                "match": 109,
                "players": ["dude", "dudette"],
            };
            glogger.save(glog, (err, id) => {
                should(err).not.be.ok();
                should(id).equal(1);
                done();
            });
        });
        it("should save another new gamelog", function(done){
            var glog = {
                "match": 109,
                "players": ["dude", "dudette"],
            };
            glogger.save(glog, (err, id) => {
                should(err).not.be.ok();
                should(id).equal(2);
                done();
            });
        });

        it("should save many new gamelogs", (done) => {
            var glogs = [{match: 123}, {match: 124}, {match: 125}, {match: 126}, {match: 127}, {match: 128}];

            async.map(glogs, (glog, cb) => {
                glogger.save(glog, (err, id) => {
                    if(err) return cb(err);
                    cb(null, id);
                });
            }, (err, results) => {
                should(err).not.be.ok();
                done();
            });
        });
    });

    describe("load", function() {
        it("should load a specified glog", (done) => {
            glogger.get(1, (err) => {
                should(err).not.be.ok();
                done();
            });
        });
    });
});
