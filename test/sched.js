/**
 * Created by gary on 9/12/16.
 */
/* eslint-env node, mocha */
var should = require("should");
var assert = require("assert");
var chai = require('chai'),
    show=chai.should;
var RandomScheduler = require("../src/head_server/schedulers/RandomSchedulerType");
var BaseScheduler = require("../src/head_server/schedulers/BaseSchedulerType");
var Scheduler = require("../src/head_server/schedulers/Scheduler");
//
describe("Scheduler", function() {
    describe("RandomSchedulerType", function () {
        describe("start", function () {
            it("Should not start this scheduler.", function (done) {
                var d = new Scheduler(20,1000);
                should(d.num_scheduled()).be.equal(0);
                done();
            });
            it("Should start this scheduler.", function (done) {
                var d = new Scheduler(20,1000);
                d.start();
                should(d.num_scheduled()).be.equal(20);
                done();
            });
        });
    });
});
describe("Scheduler", function() {
    describe("RandomSchedulerType", function () {
        describe("stop", function () {
            it("Should not stop this scheduler.", function (done) {
                var d = new Scheduler(20,1000);
                d.start();
                should(d.num_scheduled()).be.equal(20);
                done();
            });
            it("Should set is_started = false", function (done) {
                var d = new Scheduler(2000000,3000);
                var a, b, c;
                a = setInterval(function(){ d.stop(); }, 500);

                //d.stop();
                b = setInterval(function() { should.equal(d.is_started ,false); }, 1000);
                c = setInterval(function() { done(); }, 1050);

                //0 ms
                d.start();

                setInterval(function() {
                    clearInterval(a);
                    clearInterval(b);
                    clearInterval(c);

                }, 1051);

                //1 ms


            });
            it("Should purge match_queue.", function (done) {
                var d = new Scheduler(2000000,3000);
                var a, b, c;
                a = setInterval(function () {
                    d.stop();
                }, 500);

                //d.stop();
                b = setInterval(function () {
                    should.equal(d.is_started, false);
                }, 1000);
                c = setInterval(function () {
                    done();
                }, 1050);

                //0 ms
                d.start();

                setInterval(function () {
                    clearInterval(a);
                    clearInterval(b);
                    clearInterval(c);

                }, 1051);
            });

        });
    });
});
// describe("Scheduler", function() {
//     describe("RandomSchedulerType", function () {
//         describe("pause", function () {
//             it("Should pause this scheduler and have matches in queue.", function (done) {
//                 var d = new Scheduler(20000,3000);
//                 setInterval(function(){d.pause() }, 500);
//                 d.start();
//                 //d.pause();
//                 should.equal(d.is_started ,false);
//                 should(d.num_scheduled()).be.equal(20);
//                 done();
//             });
//
//         });
//     });
// });
// describe("Scheduler", function(){
//     describe("RandomSchedulerType", function(){
//         describe("num_scheduled()", function(){
//             it("should return 0 when no games have been scheduled",function(done){
//                 var d = new Scheduler(20,1000);
//                 d.switch_to( new RandomScheduler() );
//                 should(d.num_scheduled()).be.equal(0);
//                 done();
//             });
//             it("should return 1 when a games have been scheduled",function(done){
//                 var d = new Scheduler(20,1000);
//                 d.switch_to(new RandomScheduler() );
//                 d.schedule_once();
//                 should(d.num_scheduled()).be.equal(1);
//                 done();
//             });
//         });
//
//     });
// });
describe("Scheduler", function(){
    describe("RandomSchedulerType", function(){
        describe("schedule_once()", function(){
            it("should return 0 when no game has been scheduled",function(done){
                var d = new Scheduler(20,1000);
                should(d.num_scheduled()).be.equal(0);
                done();
            });
            it("should return 1 when a game has been scheduled",function(done){
                var d = new Scheduler(20,1000);
                d.schedule_once();
                should(d.num_scheduled()).be.equal(1);
                done();
            });
            it("should return 2 when .schedule_once() has been selected twice",function(done){
                var d = new Scheduler(20,1000);
                d.schedule_once();
                d.schedule_once();
                should(d.num_scheduled()).be.equal(2);
                done();
            });


        });

    });
});
// describe("Scheduler", function(){
//     describe("RandomSchedulerType", function(){
//         describe("next()", function(){
//             it("should return undefined when a match has not been scheduled", function(done) {
//                 var d = new Scheduler(20,1000);
//                 d.next();
//                 //assert.equal(d.next(), undefined);
//                 should.equal(d.next(),null);
//                 done();
//             });
//             it("should return a match when 1 match has been scheduled",function(done){
//                 var d = new Scheduler(20,1000);
//                 d.schedule_once();
//                 d.next();
//                 //console.log(d.next());
//                 should.notEqual(d.next(),null);
//
//
//                 done();
//             });
//             it("should return next match when 20 matches have been scheduled",function(done){
//                 var c = new Scheduler(20,1000);
//                 //d.schedule_once();
//                 c.start();
//                 //console.log(d.next());
//                 should.notEqual(c.next(),null);
//
//
//                 done();
//             });
//         });
//
//     });
// });
//
