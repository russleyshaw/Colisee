/* eslint-env node, mocha */

var should = require("should");

var Client = require("../src/common/client");

describe("Client", function() {

    var last_id = 0;

    describe("purge", function() {
        it("should delete all entries in the database", function(done){
            Client.purge(function(err){
                should(err).not.be.ok();

                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new client in the database", function(done) {
            Client.create("user1", "repo1", "hash1", "cpp", function(err, client) {
                should(err).not.be.ok();

                last_id = client.id;

                should(client.name).equal("user1");
                should(client.git_repo).equal("repo1");
                should(client.git_hash).equal("hash1");
                should(client.language).equal("cpp");

                done();
            });

        });

        it("should not create a client with an invalid language", function(done) {
            Client.create("user2", "repo1", "hash1", "cpp1", function(err) {
                should(err).be.ok();

                done();
            });

        });
    });

    describe("get", function() {
        it("should retrieve a client by id", function(done){
            Client.get(last_id, function(err, client){
                should(err).not.be.ok();

                should(client.id).be.equal(last_id);

                done();
            });
        });
    });
});
