
//var express = require("express");
//var config = require("config");
var SchedulerType = require("./BaseSchedulerType");
var MatchType = require("./MatchObject");


class RandomScheduler extends SchedulerType{

    //matches two clients at a time and puts them in Match_queue
    queue_matches(num_times){
        console.log("The clients will be specifically queued in this program.")
        if (this.match_queue.length < this.MAX_SCHEDULED) {
            for (var j = 0; j < num_times; j++) {
                var client1 = this.clientArray[Math.floor(Math.random() * this.clientArray.length)];
                var client2 = this.clientArray[Math.floor(Math.random() * this.clientArray.length)];
                var m = new MatchType(client1, client2);
                this.match_queue.push(m);
            }
            for (var i = 0; i < this.match_queue.length; i++) {
                console.log(this.match_queue[i]);
            }
        }
        else
            console.log("Maximum matches are queued.");
        return;
    }


}


module.exports = RandomScheduler;