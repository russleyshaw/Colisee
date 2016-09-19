//base scheduler class

class BaseSchedulerType{

  // creates a scheduler
     constructor( scheduled_max,sched_interval) {
         this.MAX_SCHEDULED = scheduled_max;
         this.S_INTERVAL=sched_interval;
         this.clientArray =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,26,27,18,19,20,21,22,23,24,25,26,27,28,29,30];
         this.match_queue =[];
         this.is_started = true;
     }

    //stops tournament and does not allow restart with current matches in match_queue.
    stop(){
    }

    //allows the scheduler to resume with current matches in match_queue.
    pause(){
    }

    //This option resumes scheduler with current matches in match_queue
    resume(){
    }

    //clears the match_queue
    purge(){
    }

    //only schedules one match at a time
    schedule_once(){
    }

    //switches scheduler to any version available.
    switch_to() {
    }

    //returns the next match in match_queue
    next(){
    }


    //returns the number of matches in match_queue.
    num_scheduled(){
    }

    //matches two clients at a time and puts them in Match_queue
    queue_matches(){
     }

}



module.exports = BaseSchedulerType;
