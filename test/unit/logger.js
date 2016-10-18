/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/Db");
var Logger = require("../../src/common/logger");

describe("Logger",function() {

    before("Reset database and initialize test data", function(done){
        //Db.DEBUG = true;
        this.timeout(5 * 1000);
        Db.reset((err) => {
            should(err).not.be.ok();
            done();
        });
    });

    describe("create", () => {
        it("should create a new log in the database", function(done) {
            this.timeout(525);
            var log = {
                message: "test1",
                severity: "warn"
            };
            Logger.create(log, (err, log) => {
                should(err).not.be.ok();
                should(log.id).equal(1);
                should(log.message).equal("test1");
                should(log.severity).equal("warn");
                done();
            });
        });

        it("should create a new log in the database", function(done) {
            this.timeout(525);
            var log = {
                message: "test2",
                severity: "warn"
            };
            Logger.create(log, (err, log) => {
                should(err).not.be.ok();
                should(log.id).equal(2);
                should(log.message).equal("test2");
                should(log.severity).equal("warn");
                done();
            });
        });

        it("should create a new log in the database", function(done) {
            this.timeout(525);
            var log = {
                message: "test3",
                severity: "warn"
            };
            Logger.create(log, (err, log) => {
                should(err).not.be.ok();
                should(log.id).equal(3);
                should(log.message).equal("test3");
                should(log.severity).equal("warn");
                done();
            });
        });
        it("should create a new log in the database", function(done) {
            this.timeout(525);
            var log = {
                message: "test5",
                severity: "debug"
            };
            Logger.create(log, (err, log) => {
                should(err).not.be.ok();
                should(log.id).equal(4);
                should(log.message).equal("test5");
                should(log.severity).equal("debug");
                done();
            });
        });
        it("should not create a log with an invalid severity", function(done) {
            this.timeout(525);
            var log = {
                message: "test4",
                severity: "critical1"
            };
            Logger.create(log, (err) => {
                should(err).be.ok();
                done();
            });
        });

        it("should not create a log with a given id", function(done) {
            this.timeout(525);
            var log = {
                id: 1,
                message: "test4",
                severity: "critical"
            };
            Logger.create(log, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

    describe("updateById", function() {
        it("should update a log based on its id", function(done){
            this.timeout(525);
            var fields = {
                severity: "info",
            };
            Logger.updateById(1, fields, (err, log) => {
                should(err).not.be.ok();
                should(log.id).equal(1);
                should(log.severity).equal("info");
                done();
            });
        });
    });

    describe("getById", () => {
        it("should retrieve a log by id", function(done) {
            this.timeout(525);
            Logger.getById(1, (err, log) => {
                should(err).not.be.ok();
                should(log.id).be.equal(1);
                should(log.message).be.equal("test1");
                done();
            });
        });
    });

    describe("getLatest", () => {
        it("should get most recent log", function(done) {
            this.timeout(525);
            Logger.getLatest({limit:1}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(1);
                done();
            });
        });
        it("should get latest specified number of logs", function(done) {
            this.timeout(525);
            Logger.getLatest({limit:2}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(2);
                done();
            });
        });
        it("should get all logs with severity Debug or Higher", function(done) {
            this.timeout(525);
            Logger.getLatest({severity:"debug"}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(4);
                done();
            });
        });
        it("should get all logs with severity Debug or Higher", function(done) {
            this.timeout(525);
            Logger.getLatest({severity:"warn"}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(2);
                done();
            });
        });
        it("should get most recent log with at least specified severity level", function(done) {
            this.timeout(525);
            Logger.getLatest({limit:1,severity:"warn"}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(1);
                should(logs[0].severity).be.equal("warn");
                done();
            });
        });
        it("should get latest specified number of logs with at least specified severity level", function(done) {
            this.timeout(525);
            Logger.getLatest({limit:2,severity:"warn"}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(2);
                should(logs[0].severity).be.equal("warn");
                should(logs[1].severity).be.equal("warn");
                done();
            });
        });
    });
});
