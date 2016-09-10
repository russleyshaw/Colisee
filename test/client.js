var assert = require("assert");

var Client = require("../src/common/client");

describe("Client", function() {
    describe("create", function() {
        it('should create a new client in the database', function() {
            Client.purge(function(err){
                assert.ifError(err);

                Client.create("client1", "repo1", "hash1", "cpp", function(err, client) {
                    assert.ifError(err);

                    assert.equal(client.id, 1);
                    assert.equal(client.name, "client1");
                    assert.equal(client.git_repo, "repo1");
                    assert.equal(client.git_hash, "hash1");
                    assert.equal(client.language, "cpp");
                });
            });

        });
    });
});