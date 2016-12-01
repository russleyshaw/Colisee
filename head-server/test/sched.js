/* eslint-env node, mocha */
let should = require("should");
let RandomSchedulerType = require("../src/schedulers/RandomSchedulerType");
let Scheduler = require("../src/schedulers/Scheduler");
let Db = require("../common/Db");
let Schedule = require("../common/Schedule");

let async = require("async");

let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
});

describe("Scheduler", function() {

    function clearDb(callback) {
        async.map([
            knex("client").select("*").del(),
            knex("match").select("*").del(),
            knex("schedule").select("*").del(),
        ], (item, cb) => {
            item.asCallback((err) => {
                if(err) return cb(err);
                cb();
            });
        }, (err, results) => {
            if(err) return callback(err);
            callback();
        })
    }

    function populateDb(callback) {
        async.map([
            knex("client").insert({name: "test1", repo: "https://github.com/russleyshaw/Joueur.cpp.git", hash: "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", language: "cpp", build_success: true}),
            knex("client").insert({name: "test2", repo: "https://github.com/russleyshaw/Joueur.cpp.git", hash: "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", language: "cpp", build_success: true}),
            knex("client").insert({name: "test3", repo: "https://github.com/russleyshaw/Joueur.cpp.git", hash: "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", language: "cpp", build_success: true})
        ], (item, cb) => {
            item.asCallback((err, rows) => {
                if(err) return cb(err);
                cb(null, rows);
            });
        }, (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        })
    }

    before("Reset database and initialize clients." , function(done){
        this.timeout(8000);
        clearDb((err) => {
            should(err).not.be.ok();

            populateDb((err, results) => {
                should(err).not.be.ok();

                done();
            });
        });
    });

    describe("RandomSchedulerType", function () {
        describe("scheduleOnce()", function(){
            it("should schedule an individual game",function(done){
                let sched = new Scheduler();
                sched.switchTo( new RandomSchedulerType() );
                sched.scheduleOnce(function(err,idArray){
                    should(err).not.be.ok();
                    should( idArray.length ).be.equal(2);
                    done();
                });
            });
        });
        it("Should create a new  single_elimination schedule ", (done)=> {
            Schedule.create({
                type: "single_elimination"
            }, (err, schedule)=> {
                should(err).not.be.ok();
                should(schedule.type).equal("single_elimination");
                should(schedule.status).equal("stopped");
                done();
            });
        });
        describe("start", function () {
            it("should begin scheduling games", function (done) {
                let sched = new Scheduler();
                sched.SCHEDULE_INTERVAL =100;
                sched.switchTo(new RandomSchedulerType);
                sched.start((err) =>{
                    should(err).not.be.ok();
                });
                setTimeout(function () {
                    sched.stop();
                    sched.getNumScheduled(function(err,numScheduled){
                        should(err).not.be.ok();
                        should( numScheduled).be.within(1,10);
                        done();
                    });
                }, 500);
            });
        });
    });
});
