/* eslint-env node, mocha */

var should = require("should");

var Db = require("../src/common/db");

describe("Builder", function() {

    before("Reset database and insert test data", function(done){
        Db.reset(function(err){
            should(err).not.be.ok();
            Db.query_lots([
                [ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *",
                    ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]
                ]
            ], function(err) {
                should(err).not.be.ok();
                done();
            });
        });
    });

    //TODO: Add builder tests
});
