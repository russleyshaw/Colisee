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
        host: process.env.DB_HOST
    }
});

describe("Match", function() {

    function clearDb(callback) {
        async.map([
            knex("client").select("*").del(),
            knex("schedule").select("*").del(),
            knex("match").select("*").del()
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

    function populateDb(callback) {
        async.map([
            knex("schedule").insert({type: "random"}, "*"),
            knex("client").insert({name: "client1"}, "*"),
            knex("client").insert({name: "client2"}, "*")
        ], (item, cb) => {
            item.asCallback((err, rows) => {
                if(err) return cb(err);
                cb(null, rows);
            });
        }, (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        });
    }

    let schedule_id = null;
    let client_ids = [];

    before("Reset database and initialize test data", function(done) {
        this.timeout(5 * 1000);
        clearDb((err) => {
            should(err).not.be.ok();

            populateDb((err, results) => {
                should(err).not.be.ok();
                schedule_id = results[0][0].id;
                client_ids.push(results[1][0].id);
                client_ids.push(results[2][0].id);
                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new client in the database", function (done) {
            Client.create({
                name: "test1",
                build_success: true
            }, (err, client) => {
                should(err).not.be.ok();
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

    describe("create", function() {
        it("should create a new match in the database", function(done) {
            Match.create({
                clients: [client_ids[0], client_ids[1]],
                reason: "Random reason 3",
                schedule_id: schedule_id
            }, (err, match) => {
                should(err).not.be.ok();
                should(match.reason).equal("Random reason 3");
                done();
            });
        });

        it("should create a new match in the database", function(done) {
            Match.create({
                clients: [client_ids[0], client_ids[1]],
                reason: "Random reason 4",
                schedule_id: schedule_id
            }, (err, match) => {
                should(err).not.be.ok();
                should(match.reason).equal("Random reason 4");
                done();
            });

        });

        it("should not create a match with an invalid gamelog", function(done) {
            Match.create({
                clients: [client_ids[0], client_ids[1]],
                reason: "Random reason 5",
                gamelog: "Random gamelog",
                schedule_id: schedule_id
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("should not create a match with a non-existent schedule reference", function(done) {
            Match.create({
                clients: [client_ids[0], client_ids[1]],
                reason: "Random reason 5",
                schedule_id: 6
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });

        it("should not create a match without a schedule_id", function(done) {
            Match.create({
                clients: [client_ids[0], client_ids[1]],
                reason: "Random reason 5",
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });
});

