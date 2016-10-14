/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/Db");
var Client = require("../../src/common/Client");

describe("Client", function() {

    before("Reset database and initialize test data", function(done) {
        this.timeout(5 * 1000);
        Db.reset((err) => {
            should(err).not.be.ok();
            done();
        });
    });

    describe("create", () => {
        it("should create a new client in the database", (done) => {
            var client = {
                name: "test1"
            };
            Client.create(client, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(1);
                should(client.name).equal("test1");
                done();
            });
        });

        it("should create a new client in the database", (done) => {
            var client = {
                name: "test2"
            };
            Client.create(client, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(2);
                should(client.name).equal("test2");
                done();
            });
        });

        it("should create a new client in the database", (done) => {
            var client = {
                name: "test3"
            };
            Client.create(client, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(3);
                should(client.name).equal("test3");
                done();
            });
        });

        it("should not create a client with an invalid language", (done) => {
            var client = {
                name: "test4",
                language: "cpp1"
            };
            Client.create(client, (err) => {
                should(err).be.ok();
                done();
            });
        });

        it("should not create a client with a given id", (done) => {
            var client = {
                id: 1,
                name: "test4",
            };
            Client.create(client, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

    describe("updateById", function() {
        it("should update a client based on its id", function(done){
            var fields = {
                language: "cpp",
            };
            Client.updateById(1, fields, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(1);
                should(client.language).equal("cpp");
                done();
            });
        });
    });

    describe("getById", () => {
        it("should retrieve a client by id", (done) => {
            Client.getById(1, (err, client) => {
                should(err).not.be.ok();
                should(client.id).be.equal(1);
                should(client.name).be.equal("test1");
                done();
            });
        });
    });

    describe("getByName", () => {
        it("should retrieve a client by name", (done) => {
            Client.getByName("test2", (err, client) => {
                should(err).not.be.ok();

                should(client.id).be.equal(2);
                should(client.name).be.equal("test2");

                done();
            });
        });
    });

    describe("getRandom", () => {
        it("should get a random client", (done) => {
            Client.getRandom(1, (err, clients) => {
                should(err).not.be.ok();
                should(clients.length).be.equal(1);
                done();
            });
        });
        it("should get multiple random clients", (done) =>{
            Client.getRandom(2, (err, clients) => {
                should(err).not.be.ok();
                should(clients.length).be.equal(2);
                done();
            });
        });
    });
});
