/* eslint-env node, mocha */

var should = require("should");
var fs = require("fs");
var path = require("path");

var Db = require("../../src/common/db");
var Client = require("../../src/common/client");
var Builder = require("../../src/build_server/builder");

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

    describe("init", function(){
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

            builder.build(1, function(err, succeeded) {
                should(err).not.be.ok();
                should(succeeded).be.true();

                //Check client was updatedE
                Client.getById(1, function(err, client){
                    should(err).not.be.ok();
                    should(client.build_success).be.true();
                    should(client.last_success_time).be.ok();

                    done();
                });
            });
        });

        it("should have created a build log", function(done){
            fs.stat( path.join(__dirname, "../../src/build_server/build_logs/", "1.log"), function(err, stat){
                should(stat.isFile()).be.ok();
                done();
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

        it("should have created a build log", function(done){
            fs.stat( path.join(__dirname, "../../src/build_server/build_logs/", "2.log"), function(err, stat){
                should(stat.isFile()).be.ok();
                done();
            });
        });

    });

    describe("getTar", function(){
        it("should retrieve built tar file", function(done) {

            //approx 64469ms
            this.slow(1000 * 70);
            this.timeout(1000 * 60 * 5);

            builder.getTar(1, function(err, tar) {
                should(err).not.be.ok();

                //TODO: Do something better with the tar, most likely, to attempt to build an image from it
                should(tar).be.ok();

                done();
            });
        });
    });

    //TODO: Add builder tests
});
