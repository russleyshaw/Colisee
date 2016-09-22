/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/db");
var Builder = require("../../src/build_server/builder");

describe("Builder", function() {
    var builder = new Builder();

    before("Reset database and insert test data", function(done){
        Db.reset(function(err){
            should(err).not.be.ok();
            Db.queryLots([
                [ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]]
            ], function(err, results) {
                should(err).not.be.ok();

                should(results).be.length(1);

                should(results[0].rows).be.length(1);
                should(results[0].rows[0].id).equal(1);

                done();
            });
        });
    });

    describe("init", function(){
        it("should finish initializing", function(done){

            //approx 62816ms
            this.slow(1000 * 70);
            this.timeout(1000 * 60 * 2);

            builder.init(function(err){
                should(err).not.be.ok();

                done();
            });
        });
    });

    describe("build", function(){
        it("should build a given cpp client", function(done) {

            //approx 64469ms
            this.slow(1000 * 70);
            this.timeout(1000 * 60 * 5);

            builder.build(1, function(err) {
                should(err).not.be.ok();

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
