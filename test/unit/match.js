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
                [ "INSERT INTO match (clients,  reason, gamelog) VALUES ($1,  $2::text, $3::integer) RETURNING *", [[1,2],  "Random_reason_1", "1"]],
                [ "INSERT INTO match (clients, reason, gamelog) VALUES ($1,  $2::text, $3::integer) RETURNING *", [[1,2],  "Random reason 2", "2"]]
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
                should(match.reason).be.equal("Random_reason_1");
                should(match.gamelog).be.equal("1");

                done();
            });
        });
    });

    describe("create", function() {
        it("should create a new match in the database", function(done) {
            Match.create([1,2],  "Random reason 3", "3", function(err, match) {
                should(err).not.be.ok();

                should(match.id).equal(3);
                should(match.reason).equal("Random reason 3");
                should(match.gamelog).equal("3");

                done();
            });

        });

        it("should not create a match with an invalid gamelog", function(done) {
            Match.create([1,2], "Random reason 4", "Random gamelog", function(err) {
                should(err).be.ok();
                done();
            });

        });
    });

});

