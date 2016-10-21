/* eslint-env node, mocha */

var should = require("should");
var Schedule = require("../../src/common/Schedule");
var Db = require("../../src/common/Db");

describe("Schedule", function() {

    before("Reset database and initialize test data", function (done) {
        this.timeout(5 * 1000);
        Db.reset((err) => {
            should(err).not.be.ok();
            done();
        });
    });

    describe("create", ()=> {
        it("Should create a new schedule in the database", (done)=> {
            var schedule_type = {
                type: "random"
            };
            Schedule.create(schedule_type, (err, schedule)=> {
                should(err).not.be.ok();
                should(schedule.id).equal(1);
                should(schedule.type).equal("random");
                should(schedule.status).equal("stopped");
                done();
            });
        });
        it("Should create a new  single_elimination schedule ", (done)=> {
            var schedule_type = {
                type: "single_elimination"
            };
            Schedule.create(schedule_type, (err, schedule)=> {
                should(err).not.be.ok();
                should(schedule.id).equal(2);
                should(schedule.type).equal("single_elimination");
                should(schedule.status).equal("stopped");
                done();
            });
        });
        it("Should create a new  triple_elimination schedule ", (done)=> {
            var schedule_type = {
                type: "triple_elimination"
            };
            Schedule.create(schedule_type, (err, schedule)=> {
                should(err).not.be.ok();
                should(schedule.id).equal(3);
                should(schedule.type).equal("triple_elimination");
                should(schedule.status).equal("stopped");
                done();
            });
        });
        it("Should not create a new schedule with an invalid id.", function (done) {
            var schedule_type = {
                type: "random",
                id: 1
            };
            Schedule.create(schedule_type, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("Should not create a new schedule with an invalid created time.", function (done) {
            var schedule_type = {
                type: "random",
                created_time: "now()"
            };
            Schedule.create(schedule_type, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("Should not create a new schedule with an invalid modified time.", function (done) {
            var schedule_type = {
                type: "random",
                modified_time: "now()"
            };
            Schedule.create(schedule_type, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });
    describe("getByID", ()=> {
        it("Should retrieve a schedule by ID.", (done)=> {
            Schedule.getByID(1, (err, result) => {
                should(err).not.be.ok();
                should(result.id).equal(1);
                should(result.type).equal("random");
                should(result.status).equal("stopped");
                done();
            });
        });
    });
    describe("getByType", ()=> {
        it("Should retrieve a schedule by ID.", (done)=> {
            Schedule.getByType("triple_elimination", (err, result) => {
                should(err).not.be.ok();
                should(result.id).equal(3);
                should(result.type).equal("triple_elimination");
                should(result.status).equal("stopped");
                done();
            });
        });
    });
    describe("get", ()=>{
        it("Should retreive a schedule with given config.", (done)=>{
            fields = {
                type:"triple_elimination"
            };
            Schedule.get(fields,(err,result)=>{
                should(err).not.be.ok();
                should(result[0].id).equal(3);
                should(result[0].type).equal("triple_elimination");
                should(result[0].status).equal("stopped");
                done();
            });
        });
    });
    describe("updateById",function(){
        it("Should update status of existing schedule.", function(done){
            Fields = {
                status:"running",
            };
            this.timeout(8000);
            Schedule.updateById(3,Fields,(err,result)=>{
                should(err).not.be.ok();
                should(result.status).equal("running");
                should(result.type).equal("triple_elimination");
                done();
            });
        });
    });
});
