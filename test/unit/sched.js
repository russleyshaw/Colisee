/* eslint-env node, mocha */
var should = require("should");
var RandomSchedulerType = require("../../src/head_server/schedulers/RandomSchedulerType");
var Scheduler = require("../../src/head_server/schedulers/Scheduler");
var Db = require("../../src/common/db");


describe("Scheduler", function() {
    function setupDb(callback){
        Db.reset(function(err){
            if(err) return callback(err);
            var sql_args=[
                [ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]],[ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test2", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]],[ "INSERT INTO client (name, git_repo, git_hash, language) VALUES ($1::text, $2::text, $3::text, $4) RETURNING *", ["test3", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp"]]];
            Db.queryLots(sql_args,function(err, results){
                if(err) return callback(err);
                callback(null, results);
            });
        });
    }
    before("Reset database and initialise clients." , function(done){
        setupDb(function(err){
            should(err).be.not.ok();
            done();
        });
    });

    describe("RandomSchedulerType", function () {
        describe("scheduleOnce()", function(){
            it("should schedule an individual game",function(done){
                var sched = new Scheduler();
                sched.switchTo( new RandomSchedulerType() );
                sched.scheduleOnce(function(err,idArray){
                    should(err).not.be.ok();
                    should( idArray.length ).be.equal(2);
                    done();
                });

            });
        });

        describe("start", function () {
            it("should begin scheduling games", function (done) {
                var sched = new Scheduler();

                sched.switchTo(new RandomSchedulerType);
                sched.start();

                setTimeout(function () {
                    should( sched.numScheduled() ).be.within(4, 6);
                    done();
                }, 500);
            });
        });

        describe("stop", function () {
            it("should stop a started scheduler", function (done) {
                var sched = new Scheduler();

                sched.switchTo(new RandomSchedulerType);
                sched.start();

                setTimeout(function () {
                    sched.stop();
                    should( sched.numScheduled() ).be.within(4, 6);
                    done();
                }, 500);
            });
        });



    });
});
