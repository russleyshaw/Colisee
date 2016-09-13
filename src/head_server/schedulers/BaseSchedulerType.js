//base scheduler class

var MatchType = require("./MatchObject");

class SchedulerType{
    // creates a scheduler
    constructor( scheduled_max,sched_interval) {
        this.MAX_SCHEDULED = scheduled_max;
        this.S_INTERVAL=sched_interval;
        this.clientArray =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,26,27,18,19,20,21,22,23,24,25,26,27,28,29,30];
        this.match_queue =[];
        this.is_started = true;
    }



    start(){
        do this.queue_matches(this.MAX_SCHEDULED); while(this.is_started == true);
    }

    //stops tournament and does not allow restart with current matches in match_queue.
    stop(){
        this.is_started = false;
    }

    //allows the scheduler to resume with current matches in match_queue.
    pause(){

    }

    //This option resumes scheduler with current matches in match_queue
    resume(){

    }

    //clears the match_queue
    purge(){
        this.match_queue.splice(0,this.match_queue.length);

    }

    //only schedules one match at a time
    schedule_once(){
        this.queue_matches(1);
    }

    //switches scheduler to any version available.
    switch_to() {

    }

    //returns the next match in match_queue
    next(){
        return this.match_queue[this.match_queue.length];
    }

    //returns the number of matches in match_queue.
    num_scheduled(){
        //console.log("The number of scheduled matches are: "+ match_queue.length);
        return this.match_queue.length;

    }

    //matches two clients at a time and puts them in Match_queue
    queue_matches(num_times){
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
            return;
    }

}



module.exports = SchedulerType;
