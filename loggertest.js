/* eslint-env node, mocha */

var should = require("should");

var Logger = require("../src/common/logger");

describe("Logger",function() {

    var last_id = 0;

    describe("purge", function () {
        it("should delete all entries in the database", function (done) {
            Logger.purge(function (err) {
                should(err).not.be.ok();

                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new log in the database", function(done) {
            Logger.create("msg1", "loc1", "info", "2001-12-23 14:39:53.66-05", function(err, log) {
                should(err).not.be.ok();

                last_id = log.id;

                should(log.message).equal("msg1");
                should(log.location).equal("loc1");
                should(log.severity).equal("info");
                should(log.time_created).equal("2001-12-23 14:39:53.66-05");

                done();
            });

        });

        it("should not create a log with an invalid severity", function(done){
            Logger.create("msg2", "loc1", "info1", "2001-12-23 14:39:53.66-05", function(err){
                should(err).be.ok();

                done();
            });

        });
    });

    describe("get", function() {
        it("should get a given log", function(done){
            Logger.get(last_id, function(err, log){
                should(err).not.be.ok();

                should(log.id).be.equal(last_id);

                done();
            });
        });
    });
});
