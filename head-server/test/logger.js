/* eslint-env node, mocha */

let should = require("should");

let Logger = require("../common/Logger");

let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
});

describe("Logger", function() {

    before("Reset database and initialize test data", function(done){
        this.timeout(5 * 1000);
        knex("log").select("*").del().asCallback((err) => {
            should(err).not.be.ok();
            done();
        })
    });

    let log_id = null;

    describe("create", function() {
        it("should create a new log in the database", function(done) {
            this.timeout(525);
            Logger.create({
                message: "test1",
                severity: "warn"
            }, (err, log) => {
                should(err).not.be.ok();
                should(log.message).equal("test1");
                should(log.severity).equal("warn");
                log_id = log.id;
                done();
            });
        });

        it("should create a new log in the database", function(done) {
            this.timeout(525);
            Logger.create({
                message: "test2",
                severity: "warn"
            }, (err, log) => {
                should(err).not.be.ok();
                should(log.message).equal("test2");
                should(log.severity).equal("warn");
                done();
            });
        });

        it("should create a new log in the database", function(done) {
            this.timeout(525);
            Logger.create({
                message: "test3",
                severity: "warn"
            }, (err, log) => {
                should(err).not.be.ok();
                should(log.message).equal("test3");
                should(log.severity).equal("warn");
                done();
            });
        });
        it("should create a new log in the database", function(done) {
            this.timeout(525);
            Logger.create({
                message: "test5",
                severity: "debug"
            }, (err, log) => {
                should(err).not.be.ok();
                should(log.message).equal("test5");
                should(log.severity).equal("debug");
                done();
            });
        });
        it("should not create a log with an invalid severity", function(done) {
            this.timeout(525);
            Logger.create({
                message: "test4",
                severity: "critical1"
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });

        it("should not create a log with a given id", function(done) {
            this.timeout(525);
            Logger.create({
                id: 1,
                message: "test4",
                severity: "error"
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

    describe("updateById", function() {
        it("should update a log based on its id", function(done){
            this.timeout(525);
            Logger.updateById(log_id, {
                severity: "info",
            }, (err, log) => {
                should(err).not.be.ok();
                should(log.id).equal(log_id);
                should(log.severity).equal("info");
                done();
            });
        });
    });

    describe("getById", function() {
        it("should retrieve a log by id", function(done) {
            this.timeout(525);
            Logger.getById(log_id, (err, log) => {
                should(err).not.be.ok();
                should(log.id).be.equal(log_id);
                should(log.message).be.equal("test1");
                done();
            });
        });
    });

    describe("getLatest", function() {
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
            Logger.getLatest({limit:1, severity:"warn"}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(1);
                should(logs[0].severity).be.equal("warn");
                done();
            });
        });
        it("should get latest specified number of logs with at least specified severity level", function(done) {
            this.timeout(525);
            Logger.getLatest({limit:2, severity:"warn"}, (err, logs) => {
                should(err).not.be.ok();
                should(logs.length).be.equal(2);
                should(logs[0].severity).be.equal("warn");
                should(logs[1].severity).be.equal("warn");
                done();
            });
        });
    });
});
