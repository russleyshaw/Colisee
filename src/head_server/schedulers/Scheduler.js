/**
 * Created by gary on 9/18/16.
 */
var MatchType = require("./MatchObject");
var RandomScheduler = require("./RandomSchedulerType");
var BaseScheduler = require("./BaseSchedulerType");
class Scheduler extends BaseScheduler{

    start(){
        this.queue_matches(this.MAX_SCHEDULED);

    }

    //stops tournament and does not allow restart with current matches in match_queue.
    stop(){
        this.is_started = false;
        this.purge();
    }

    //allows the scheduler to resume with current matches in match_queue.
    pause(){
        this.is_started = false;
    }

    //This option resumes scheduler with current matches in match_queue
    resume(){
        this.is_started = true;
    }

    //clears the match_queue
    purge(){
        //this.match_queue=[];
        this.match_queue.splice(0,this.match_queue.length);
        console.log(this.match_queue.length);
    }

    //only schedules one match at a time
    schedule_once(){
        this.queue_matches(1);
    }

    //switches scheduler to any version available.
    switch_to(SchedulerType) {
        this.Scheduler = SchedulerType;
    }

    //returns the next match in match_queue
    next(){
        return this.match_queue[this.match_queue.length-1];
        //console.log()
    }

    //returns the number of matches in match_queue.
    num_scheduled(){
        //console.log("The number of scheduled matches are: "+ match_queue.length);
        return this.match_queue.length;

    }

    //matches two clients at a time and puts them in Match_queue
    queue_matches(num_times){
        var counter = 0;
        while (this.is_started == true) {
            if (this.match_queue.length < this.MAX_SCHEDULED && counter < num_times) {
                for (var j = 0; j < num_times && this.is_started == true; j++) {
                    var client1 = this.clientArray[Math.floor(Math.random() * this.clientArray.length)];
                    var client2 = this.clientArray[Math.floor(Math.random() * this.clientArray.length)];
                    var m = new MatchType(client1, client2);
                    this.match_queue.push(m);
                    // console.log(this.num_scheduled());
                    // console.log(j);
                    // console.log(this.match_queue[j]);
                    counter+=1;
                }
                for (var i = 0; i < this.match_queue.length; i++) {
                    // console.log(this.match_queue[i]);

                }
            }
            else
                return;


        }
    }

}

module.exports = Scheduler;