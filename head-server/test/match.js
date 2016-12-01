/* eslint-env node, mocha */

let should = require("should");
let async = require("async");

let Match = require("../common/Match");
let Client = require("../common/Client");
//let Schedule= require("../common/Schedule");

describe("Match", function() {

    before("Reset database and initialize test data", function(done){
        this.timeout(5 * 1000);
        async.map([
            knex("client").del(),
            knex("schedule").del(),
            knex("match").del()
        ], (item, cb) => {
            item.asCallback((err) => {
                cb(err);
            });
        }, () => {
            done();
        });
    });

    describe("create", function() {

        before("Create Schedule and Clients to create match for", function(done) {
            knex("schedule").insert({type: "random"}, "*").asCallback((err, rows) => {
                let schedule_id = rows[0].id;
                async.map([
                    knex("client").del(),
                    knex("schedule").del(),
                    knex("match").del()
                ], (item, cb) => {
                    item.asCallback((err) => {
                        cb(err);
                    });
                }, () => {
                    done();
                });
            });
        });

        it("should create a new client in the database", function (done) {
            var client = {
                name: "test1",
                build_success: true
            };
            Client.create(client, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(1);
                should(client.name).equal("test1");
                done();
            });
        });
        it("should create a new client in the database", function (done) {
            var client = {
                name: "test2",
                build_success: true
            };
            Client.create(client, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(2);
                should(client.name).equal("test2");
                done();
            });
        });
    });
    describe("getById", () => {
        it("should retrieve a client by id", function(done) {
            Client.getById(1, (err, client) => {
                should(err).not.be.ok();
                should(client.id).be.equal(1);
                should(client.name).be.equal("Team_1");
                done();
            });
        });
    });

    describe("getByName", () => {
        it("should retrieve a client by name", function(done) {
            Client.getByName("Team_1", (err, client) => {
                should(err).not.be.ok();

                should(client.id).be.equal(1);
                should(client.name).be.equal("Team_1");
                should(client.build_success).be.equal(true);
                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new match in the database", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 3",
                gamelog: 3,
                schedule_id: 3
            };
            Match.create(match, (err, match) => {
                should(err).not.be.ok();
                should(match.id).equal(3);
                should(match.reason).equal("Random reason 3");
                should(match.gamelog).equal(3);
                should(match.schedule_id).equal(3);
                done();
            });

        });

        it("should create a new match in the database", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 4",
                gamelog: 4,
                schedule_id: 4
            };
            Match.create(match, (err, match) => {
                should(err).not.be.ok();
                should(match.id).equal(4);
                should(match.reason).equal("Random reason 4");
                should(match.gamelog).equal(4);
                should(match.schedule_id).equal(4);
                done();
            });

        });

        it("should not create a match with an invalid gamelog", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 5",
                gamelog: "Random gamelog",
                schedule_id: 5
            };
            Match.create(match, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("should not create a match with a non-existent schedule reference", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 5",
                gamelog: "5",
                schedule_id: 6
            };
            Match.create(match, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("should not create a match without a schedule_id", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 5",
                gamelog: "5"
            };
            Match.create(match, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

});

