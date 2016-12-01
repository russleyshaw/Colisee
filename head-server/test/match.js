/* eslint-env node, mocha */

let should = require("should");
let async = require("async");

let Match = require("../common/Match");
let Client = require("../common/Client");
//let Schedule= require("../common/Schedule");

let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
});

describe("Match", function() {

    function clearDb(callback) {
        async.map([
            knex("client").del(),
            knex("schedule").del(),
            knex("match").del()
        ], (item, cb) => {
            item.asCallback((err) => {
                if(err) return cb(err);
                cb();
            });
        }, (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        });
    }

    before("Reset database and initialize test data", function(done){
        this.timeout(5 * 1000);
        clearDb((err) => {
            should(err).not.be.ok();
            done();
        });
    });

    describe("create", function() {

        it("should create a new client in the database", function (done) {
            Client.create({
                name: "test1",
                build_success: true
            }, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(1);
                should(client.name).equal("test1");
                done();
            });
        });
        it("should create a new client in the database", function (done) {
            Client.create({
                name: "test2",
                build_success: true
            }, (err, client) => {
                should(err).not.be.ok();
                should(client.name).equal("test2");
                done();
            });
        });
    });
    describe("getById", () => {
        it("should retrieve a client by id", function(done) {
            Client.getById(1, (err, client) => {
                should(err).not.be.ok();
                should(client.name).be.equal("Team_1");
                done();
            });
        });
    });

    describe("getByName", () => {
        it("should retrieve a client by name", function(done) {
            Client.getByName("Team_1", (err, client) => {
                should(err).not.be.ok();
                should(client.name).be.equal("Team_1");
                should(client.build_success).be.equal(true);
                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new match in the database", function(done) {
            Match.create({
                clients: [1, 2],
                reason: "Random reason 3",
                gamelog: 3,
                schedule_id: 3
            }, (err, match) => {
                should(err).not.be.ok();
                should(match.id).equal(3);
                should(match.reason).equal("Random reason 3");
                should(match.gamelog).equal(3);
                should(match.schedule_id).equal(3);
                done();
            });

        });

        it("should create a new match in the database", function(done) {
            Match.create({
                clients: [1, 2],
                reason: "Random reason 4",
                gamelog: 4,
                schedule_id: 4
            }, (err, match) => {
                should(err).not.be.ok();
                should(match.reason).equal("Random reason 4");
                should(match.gamelog).equal(4);
                should(match.schedule_id).equal(4);
                done();
            });

        });

        it("should not create a match with an invalid gamelog", function(done) {
            Match.create({
                clients: [1, 2],
                reason: "Random reason 5",
                gamelog: "Random gamelog",
                schedule_id: 5
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("should not create a match with a non-existent schedule reference", function(done) {
            Match.create({
                clients: [1, 2],
                reason: "Random reason 5",
                gamelog: "5",
                schedule_id: 6
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("should not create a match without a schedule_id", function(done) {
            Match.create({
                clients: [1, 2],
                reason: "Random reason 5",
                gamelog: "5"
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

});

