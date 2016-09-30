/* eslint-env node, mocha */

var should = require("should");
var async = require("async");

var Db = require("../../src/common/Db");
var Builder = require("../../src/build_server/Builder");
var Player = require("../../src/play_server/Player.js");

var Scheduler = require("../../src/head_server/schedulers/Scheduler");
var RandomSchedulerType = require("../../src/head_server/schedulers/Scheduler");

describe("Player",function() {

    var play = Player(0);

    before("Reset database and insert test data", function(done) {
        this.timeout(0); //TODO: set an actual timeout

        play.init((err) => {
            should(err).not.be.ok();
        });
    });
});
