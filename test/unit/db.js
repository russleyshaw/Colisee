/* eslint-env node, mocha */

var should = require("should");

var Db = require("../../src/common/Db");

describe("Db", function() {

    before("initialize database with data", function(done){
        Db.reset(function(err){
            should(err).not.be.ok();
            done();
        });
    });

    describe("reset", function () {
        it("should be able to reset the entire database", function (done) {
            Db.reset(function (err) {
                should(err).not.be.ok();

                Db.queryLots([
                    ["SELECT COUNT(*) FROM client AS count", []],
                    ["SELECT COUNT(*) FROM match AS count", []],
                    ["SELECT COUNT(*) FROM log AS count", []],
                    ["SELECT COUNT(*) FROM tournament AS count", []]
                ], function (err, results) {
                    should(err).not.be.ok();
                    should(results).be.length(4);

                    // NOTE: COUNT(*) returns a bigint, larger than the max int size in Javascript
                    // https://github.com/brianc/node-postgres/issues/378
                    should(results[0].rows[0].count).equal("0");
                    should(results[1].rows[0].count).equal("0");
                    should(results[2].rows[0].count).equal("0");
                    should(results[3].rows[0].count).equal("0");
                    done();
                });

            });
        });
    });
});

describe("Db", function() {

    describe("queryOnce", function() {
        it("should make a single database query", function(done){
            Db.queryOnce("SELECT $1::integer + $2::integer AS num", [30, 12], function(err, result) {
                should(err).not.be.ok();
                should(result.rows).be.length(1);

                should(result.rows[0].num).equal(42);
                done();
            });
        });
    });

    describe("queryLots", function() {
        it("should make several database queries", function(done){
            Db.queryLots([
                ["SELECT $1::integer + $2::integer AS num", [1, 2]],
                ["SELECT $1::integer + $2::integer AS num", [3, 4]],
                ["SELECT $1::integer + $2::integer AS num", [5, 6]],
            ], function(err, results) {
                should(err).not.be.ok();
                should(results).be.length(3);

                should(results[0].rows[0].num).equal(3);
                should(results[1].rows[0].num).equal(7);
                should(results[2].rows[0].num).equal(11);
                done();
            });
        });
    });

    describe("queryLotsSeries", function() {
        it("should make several database queries", function(done){
            Db.queryLotsSeries([
                ["SELECT $1::integer + $2::integer AS num", [1, 2]],
                ["SELECT $1::integer + $2::integer AS num", [3, 4]],
                ["SELECT $1::integer + $2::integer AS num", [5, 6]],
            ], function(err, results) {
                should(err).not.be.ok();
                should(results).be.length(3);

                should(results[0].rows[0].num).equal(3);
                should(results[1].rows[0].num).equal(7);
                should(results[2].rows[0].num).equal(11);
                done();
            });
        });
    });
});
