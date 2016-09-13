/**
 * Created by gary on 9/12/16.
 */
/* eslint-env node, mocha */
var should = require("should");
var RandomScheduler = require("../src/head_server/schedulers/RandomSchedulerType");
var Scheduler = require("../src/head_server/schedulers/BaseSchedulerType");


// describe("Scheduler", function() {
//     describe("RandomSchedulerType", function () {
//         describe("start", function () {
//             it("Should not start this scheduler.", function (done) {
//                 var d = new RandomScheduler(20,1000);
//                 should(d.num_scheduled()).be.equal(0);
//                 done();
//             });
//             it("Should start this scheduler.", function (done) {
//                 var d = new RandomScheduler(20,1000);
//                 d.start();
//                 should(d.num_scheduled()).be.equal(20);
//                 done();
//             });
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
//                 d.switch_to( new RandomScheduler() );
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
                var d = new RandomScheduler(20,1000);
                should(d.num_scheduled()).be.equal(0);
                done();
            });
            it("should return 1 when a game has been scheduled",function(done){
                 var d = new RandomScheduler(20,1000);
                 d.schedule_once();
                 should(d.num_scheduled()).be.equal(1);
                 done();
             });

        });

    });
});
// describe("Scheduler", function(){
//     describe("RandomSchedulerType", function(){
//         describe("next()", function(){
//             it("should return 1 when a game has been scheduled",function(done){
//                 var d = new Scheduler();
//                 d.next();
//                 should(d.next).be.ok()
//                 done();
//             });
//         });
//
//     });
// });
// describe("create", function() {
//     it("should create a new client in the database", function (done) {
//         Scheduler.create("user1", "repo1", "hash1", "cpp", function (err, client) {
//             should(err).not.be.ok();
//
//             done();
//         });
//
//     });
// });

