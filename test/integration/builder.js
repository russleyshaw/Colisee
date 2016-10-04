/* eslint-env node, mocha */

var should = require("should");
var path = require("path");

var Db = require("../../src/common/Db");
var Client = require("../../src/common/Client");
var Builder = require("../../src/build_server/Builder");

describe("Builder", function() {
    var builder = new Builder();

    before("Reset database and insert test data", function(done){
        Db.reset(function(err){
            should(err).not.be.ok();
            Db.queryLots([
                [ "INSERT INTO client (name, repo, hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "ca3803e2a120668b1715ba29cafbad3fed4b10ce", "cpp"]],
                [ "INSERT INTO client (name, repo, hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test2", "https://github.com/russleyshaw/Joueur.cpp.git", "2864ce98441b0b894d0127d9ceefcf465baec9b5", "cpp"]]
            ], function(err, results) {
                should(err).not.be.ok();
                should(results).be.length(2);
                done();
            });
        });
    });

    describe.skip("init", function(){
        it("should finish initializing", function(done){

            this.timeout(0);

            builder.init(function(err){
                should(err).not.be.ok();

                done();
            });
        });
    });

    describe("build", function(){
        it("should build a given good cpp client", function(done) {

            //approx 64469ms
            this.timeout(0);

            builder.build(1, function(err, built) {
                should(err).not.be.ok();
                should(built).be.true();

                //Check client was updated
                Client.getById(1, function(err, client){
                    should(err).not.be.ok();
                    should(client.build_success).be.true();
                    should(client.last_success_time).be.ok();
                    done();
                });
            });
        });

        it("should fail to build a given bad cpp client", function(done) {

            //approx 64469ms
            this.timeout(0);

            builder.build(2, function(err, succeeded) {
                should(err).not.be.ok();
                should(succeeded).be.false();

                //Check client was updated
                Client.getById(2, function(err, client){
                    should(err).not.be.ok();
                    should(client.build_success).be.false();
                    should(client.last_failure_time).be.ok();
                    done();
                });
            });
        });
    });

    describe("getTar", function(){
        it("should retrieve built tar file", function(done) {

            builder.getTar(1, function(err, tar) {
                should(err).not.be.ok();
                should(tar).be.ok();
                done();
            });
        });
    });

    describe("getLog", function(){
        it("should retrieve the build log", function(done) {

            builder.getLog(1, function(err, log) {
                should(err).not.be.ok();
                should(log).be.ok();
                done();
            });
        });
    });
    describe("getHash", function(){
        it("should retrieve the build hash", function(done) {

            builder.getHash(1, function(err, hash) {
                should(err).not.be.ok();
                should(hash).be.ok();
                done();
            });
        });
    });
});
