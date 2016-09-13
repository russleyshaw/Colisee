
//var express = require("express");
//var config = require("config");
var SchedulerType = require("../src/head_server/schedulers/BaseSchedulerType");
var MatchType = require("../src/head_server/schedulers/MatchObject");


class RandomScheduler extends SchedulerType{

    //matches two clients at a time and puts them in Match_queue
    queue_matches(num_times) {
        console.log("The clients will be queued randomly in this program.")

        for (var j = 0; j < num_times; j++) {
            //var match_queue = [];
            var job1 = this.clientArray[Math.floor(Math.random() * this.clientArray.length)];
            this.match_queue.push(job1);
            var job2 = this.clientArray[Math.floor(Math.random() * this.clientArray.length)];
            this.match_queue.push(job2);
            for (var i = 0; i < this.match_queue.length; i++) {
                console.log(this.match_queue[i]);
            }

        }
    }


}


