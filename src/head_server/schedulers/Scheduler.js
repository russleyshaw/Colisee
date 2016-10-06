

class Scheduler {

    constructor() {
        this.MAX_SCHEDULED = 50;
        this.SCHEDULE_INTERVAL = 100;

        this.interval_ptr = undefined;
        this.current_scheduler = undefined;
        this.sched_queue = new Array();
    }

    start() {
        this.interval_ptr = setInterval(() => {
            this.scheduleOnce(function(err){
                if(err) return console.log(`Error: ${err}`);
            });
        }, this.SCHEDULE_INTERVAL);
    }

    stop() {
        clearInterval(this.interval_ptr);
    }

    pause() {}
    resume() {}

    purge() {
        //TODO: delete all entries in schedule queue
    }

    /**
     * Schedule an individual game into the schedule queue
     */
    scheduleOnce(callback){
        this.current_scheduler.genNext( (err, clientIDs) => {
            if(err)return callback(err);
            this.sched_queue.push(clientIDs);
            callback(null, clientIDs);
        });
    }

    /**
     * Switch between different types of schedulers
     * @param scheduler_type
     */
    switchTo( scheduler_type ) {
        this.current_scheduler = scheduler_type;
    }

    /**
     * Pop and return an individual match off the end of the schedule queue
     * @returns {*}
     */
    next(){
        if( this.sched_queue.length > 0) {
            //TODO: pop off queue
            return this.sched_queue[this.sched_queue.length-1];
        }
        else {
            return null;
        }
    }

    //TODO: add a peekNext function that returns the next game without popping off. This will be useful for testing purposes

    numScheduled(){
        return this.sched_queue.length;
    }



}

module.exports = Scheduler;
