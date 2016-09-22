/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/db");
var Logger = require("../../src/common/logger");

describe("Logger",function() {

    before("Reset database and initialize test data", function(done){
        Db.reset(function(err){
            should(err).not.be.ok();
            done();
        });
    });

    describe("create", function() {
        it("should create a new log in the database", function(done) {
            Logger.create("this is a test message", "tester", "info", function(err, log) {
                should(err).not.be.ok();

                should(log.id).equal(1);
                should(log.message).equal("this is a test message");
                should(log.location).equal("tester");
                should(log.severity).equal("info");

                done();
            });

        });
        it("should not create a log with an invalid severity", function(done){
            Logger.create("msg2", "loc1", "info1", function(err){
                should(err).be.ok();

                done();
            });

        });
    });

    describe("get", function() {
        it("should get a given log", function(done){
            Logger.get(1, function(err){
                should(err).not.be.ok();

                done();
            });
        });
    });
});
