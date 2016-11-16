/* eslint-env node, mocha */

var should = require("should");
// Load the full build.
// var _ = require("lodash");
var Db = require("../../src/common/Db");
var Match = require("../../src/common/Match");
var Client= require("../../src/common/Client");
var Schedule= require("../../src/common/Schedule");

describe("Match", function() {

    before("Reset database and initialize test data", function(done){
        this.timeout(5 * 1000);
        Db.reset(function(err){
            should(err).not.be.ok();
            Db.queryLots([
                [ "INSERT INTO  client(name, build_success) VALUES($1::text, $2::boolean)  RETURNING*",["Team_1", true]],
                [ "INSERT INTO  client(name, build_success) VALUES($1::text, $2::boolean)  RETURNING*",["Team_2", true]],
                [ "INSERT INTO  schedule(type, status)      VALUES($1, $2)     RETURNING*",["single_elimination", "stopped"]],
                [ "INSERT INTO  schedule(type, status)      VALUES($1, $2)     RETURNING*",["single_elimination", "stopped"]],
                [ "INSERT INTO match (clients,  reason, gamelog,schedule_id) VALUES ($1,  $2::text, $3::integer,$4) RETURNING *", [[1,2],  "Random_reason_1", 1,1]],
                [ "INSERT INTO match (clients, reason, gamelog,schedule_id) VALUES ($1,  $2::text, $3::integer,$4) RETURNING *", [[1,2],  "Random reason 2", 2,2]]
            ], function(err) {
                should(err).not.be.ok();
                done();
            });
        });
    });

    describe("getById", function() {
        it("should retrieve a match by id", function(done){
            Match.getById(1, (err, match) => {
                should(err).not.be.ok();

                should(match.id).be.equal(1);
                should(match.reason).be.equal("Random_reason_1");
                should(match.gamelog).be.equal(1);
                should(match.schedule_id).be.equal(1);

                done();
            });
        });
    });
    // describe("create", function() {
    //     it("should create a new client in the database", function (done) {
    //         var client = {
    //             name: "test1",
    //             build_success: true
    //         };
    //         Client.create(client, (err, client) => {
    //             should(err).not.be.ok();
    //             should(client.id).equal(1);
    //             should(client.name).equal("test1");
    //             done();
    //         });
    //     });
    //     it("should create a new client in the database", function (done) {
    //         var client = {
    //             name: "test2",
    //             build_success: true
    //         };
    //         Client.create(client, (err, client) => {
    //             should(err).not.be.ok();
    //             should(client.id).equal(2);
    //             should(client.name).equal("test2");
    //             done();
    //         });
    //     });
    // });
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
                gamelog: 3
            };
            Match.create(match, (err, match) => {
                should(err).not.be.ok();
                should(match.id).equal(3);
                should(match.reason).equal("Random reason 3");
                should(match.gamelog).equal(3);
                should(match.schedule_id).equal(1);
                done();
            });

        });

        it("should create a new match in the database", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 4",
                gamelog: 4
            };
            Match.create(match, (err, match) => {
                should(err).not.be.ok();
                should(match.id).equal(4);
                should(match.reason).equal("Random reason 4");
                should(match.gamelog).equal(4);
                should(match.schedule_id).equal(2);
                done();
            });

        });

        it("should not create a match with an invalid gamelog", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 4",
                gamelog: "Random gamelog"
            };
            Match.create(match, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("should not create a match with an invalid schedule_id", function(done) {
            var match = {
                clients: [1, 2],
                reason: "Random reason 4",
                gamelog: "5",
                schedule_id: 5
            };
            Match.create(match, (err) => {
                should(err).be.ok();
            done();
            });
        });
    });

});

