/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/db");
var Client = require("../../src/common/client");

describe("Client", function() {

    before("Reset database and initialize test data", function(done){
        Db.reset(function(err){
            should(err).not.be.ok();
            Db.queryLots([
                [ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]],
                [ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test2", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]]
            ], function(err) {
                should(err).not.be.ok();
                done();
            });
        });
    });

    describe("getById", function() {
        it("should retrieve a client by id", function(done){
            Client.getById(1, function(err, client){
                should(err).not.be.ok();

                should(client.id).be.equal(1);
                should(client.name).be.equal("test1");
                should(client.git_repo).be.equal("https://github.com/russleyshaw/Joueur.cpp.git");
                should(client.git_hash).be.equal("98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c");
                should(client.language).be.equal("cpp");

                done();
            });
        });
    });

    describe("getByName", function() {
        it("should retrieve a client by name", function(done){
            Client.getByName("test2", function(err, client){
                should(err).not.be.ok();

                should(client.id).be.equal(2);
                should(client.name).be.equal("test2");
                should(client.git_repo).be.equal("https://github.com/russleyshaw/Joueur.cpp.git");
                should(client.git_hash).be.equal("98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c");
                should(client.language).be.equal("cpp");

                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new client in the database", function(done) {
            Client.create("test3", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp", function(err, client) {
                should(err).not.be.ok();

                should(client.id).equal(3);
                should(client.name).equal("test3");
                should(client.git_repo).equal("https://github.com/russleyshaw/Joueur.cpp.git");
                should(client.git_hash).equal("98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c");
                should(client.language).equal("cpp");

                done();
            });

        });

        it("should not create a client with an invalid language", function(done) {
            Client.create("test2", "https://github.com/russleyshaw/Joueur.cpp.git", "hash1", "cpp1", function(err) {
                should(err).be.ok();
                done();
            });

        });
    });

    describe("getRandom", function(){
        it("should get a random client", function(done){
            Client.getRandom(1, function(err, clients) {
                should(err).not.be.ok();
                should(clients.length).be.below(2);

                done();
            })
        });
        it("should get multiple random clients", function(done){
            Client.getRandom(2, function(err, clients) {
                should(err).not.be.ok();
                should(clients.length).be.below(3);

                done();
            })
        });
    });
});
