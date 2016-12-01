/* eslint-env node, mocha */
let should = require("should");
let RandomSchedulerType = require("../src/schedulers/RandomSchedulerType");
let Scheduler = require("../src/schedulers/Scheduler");
let Db = require("../common/Db");
let Schedule = require("../common/Schedule");

let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
});

describe("Scheduler", function() {
    function setupDb(callback){
        Db.reset(function(err){
            if(err) return callback(err);
            let sql_args= [
                [ "INSERT INTO client (name, repo, hash, language,build_success) VALUES ($1::text, $2::text, $3::text, $4,$5 ) RETURNING *",
                    ["test1", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp",true]],
                [ "INSERT INTO client (name, repo, hash, language,build_success) VALUES ($1::text, $2::text, $3::text, $4,$5 ) RETURNING *",
                    ["test2", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp",true]],
                [ "INSERT INTO client (name, repo, hash, language,build_success) VALUES ($1::text, $2::text, $3::text, $4,$5 ) RETURNING *",
                    ["test3", "https://github.com/russleyshaw/Joueur.cpp.git", "98ae5ac0daa867a7ec98f2f5f8f2add6dc91c00c", "cpp",true]]
            ];
            Db.queryLots(sql_args,function(err, results){
                if(err) return callback(err);
                callback(null, results);
            });
        });
    }
    before("Reset database and initialize clients." , function(done){
        this.timeout(8000);
        setupDb(function(err){
            should(err).be.not.ok();
            done();
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
