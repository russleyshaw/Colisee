/* eslint-env node, mocha */
var should = require("should");

var RandomSchedulerType = require("../../src/head_server/schedulers/RandomSchedulerType");
var Scheduler = require("../../src/head_server/schedulers/Scheduler");

describe("Scheduler", function() {
    describe("RandomSchedulerType", function () {

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

        describe("scheduleOnce()", function(){
            it("should schedule an individual game",function(done){
                var sched = new Scheduler();
                sched.switchTo( new RandomSchedulerType() );
                sched.scheduleOnce();
                should( sched.numScheduled() ).be.equal(1);
                done();
            });
        });

    });
});
