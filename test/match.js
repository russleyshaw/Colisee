/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/Db");
var Match = require("../../src/common/Match");

describe("Match", function() {

    before("Reset database and initialize test data", function(done){
        this.timeout(5 * 1000);
        Db.reset(function(err){
            should(err).not.be.ok();
            Db.queryLots([
                [ "INSERT INTO match (clients, tournament, hashes, reason, gamelog) VALUES ($1::integer, $2::integer, $3::text, $4::text, $5::integer) RETURNING *", ["1", "1", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "Random_reason_1", "1"]],
                [ "INSERT INTO match (clients, tournament, hashes, reason, gamelog) VALUES ($1::integer, $2::integer, $3::text, $4::text, $5::integer) RETURNING *", ["2", "1", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "Random reason 2", "2"]]
            ], function(err) {
                should(err).not.be.ok();
                done();
            });
        });
    });

    describe("getById", function() {
        it("should retrieve a match by id", function(done){
            Match.getById(1, function(err, match){
                should(err).not.be.ok();

                should(match.id).be.equal(1);
                should(match.clients).be.equal("1");
                should(match.tournament).be.equal("");
                should(match.hashes).be.equal("98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c");
                should(match.reason).be.equal("Random_reason_1");
                should(match.gamelog).be.equal("1");

                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new match in the database", function(done) {
            Match.create("3", "2", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "Random reason 3", "3", function(err, match) {
                should(err).not.be.ok();

                should(match.id).equal(3);
                should(match.clients).equal("3");
                should(match.tournaments).equal("2");
                should(match.hashes).equal("98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c");
                should(match.reason).equal("Random reason 3");
                should(match.gamelog).equal("3");

                done();
            });

        });

        it("should not create a match with an invalid gamelog", function(done) {
            Match.create("4", "2", "hash1", "Random reason 4", "Random gamelog", function(err) {
                should(err).be.ok();
                done();
            });

        });
    });

    describe("getRandom", function(){
        it("should get a random match", function(done){
            Match.getRandom(1, function(err, matches) {
                should(err).not.be.ok();
                should(matches.length).be.below(2);

                done();
            });
        });
        it("should get multiple random matches", function(done){
            Match.getRandom(2, function(err, matches) {
                should(err).not.be.ok();
                should(matches.length).be.below(3);

                done();
            });
        });
    });
});

