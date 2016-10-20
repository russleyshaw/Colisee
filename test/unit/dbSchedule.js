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
        it("Should create a new schedule in the database",(done)=>{
            var schedule_type = {
                type:"random"
            };
            Schedule.create(schedule_type,(err, schedule)=>{
                should(err).not.be.ok();
                should(schedule.id).equal(1);
                should(schedule.type).equal("random");
                should(schedule.status).equal("stopped");
                done();
            });
        });
    });

});
