/* eslint-env node, mocha */

let should = require("should");
let Schedule = require("../common/Schedule");

let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
});

describe("Schedule", function() {

    before("Reset database and initialize test data", function (done) {
        this.timeout(5 * 1000);
        knex("schedule").select("*").del().asCallback((err) => {
            should(err).not.be.ok();
            done();
        });
    });

    let schedule_id = null;

    describe("create", ()=> {
        it("Should create a new schedule in the database", (done)=> {
            Schedule.create({
                type: "random"
            }, (err, schedule)=> {
                should(err).not.be.ok();
                should(schedule.type).equal("random");
                should(schedule.status).equal("stopped");
                schedule_id = schedule.id;
                done();
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
        it("Should create a new  triple_elimination schedule ", (done)=> {
            Schedule.create({
                type: "triple_elimination"
            }, (err, schedule)=> {
                should(err).not.be.ok();
                should(schedule.type).equal("triple_elimination");
                should(schedule.status).equal("stopped");
                done();
            });
        });
        it("Should not create a new schedule with an invalid id.", function (done) {
            Schedule.create({
                type: "random",
                id: 1
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("Should not create a new schedule with an invalid created time.", function (done) {
            Schedule.create({
                type: "random",
                created_time: "now()"
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
        it("Should not create a new schedule with an invalid modified time.", function (done) {
            Schedule.create({
                type: "random",
                modified_time: "now()"
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

    describe("get", ()=>{
        it("Should retreive a schedule with given config.", (done)=>{
            Schedule.get({
                type:"triple_elimination"
            }, (err, result)=>{
                should(err).not.be.ok();
                should(result[0].type).equal("triple_elimination");
                should(result[0].status).equal("stopped");
                done();
            });
        });
    });

    describe("updateById",function(){
        it("Should update status of existing schedule.", function(done){
            this.timeout(8000);
            Schedule.updateById(schedule_id, {
                status:"running",
            }, (err, result) => {
                should(err).not.be.ok();
                should(result.status).equal("running");
                done();
            });
        });
    });
});
