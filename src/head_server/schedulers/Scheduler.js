class Scheduler {

    constructor() {
        this.MAX_SCHEDULED = 50;
        this.SCHEDULE_INTERVAL = 100;

        this.interval_ptr = undefined;
        this.current_scheduler = undefined;
        this.sched_queue = new Array();
    }

    start() {
        var self = this;
        this.interval_ptr = setInterval(function(){
            self.scheduleOnce();
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
    scheduleOnce(){
        this.sched_queue.push( this.current_scheduler.genNext() );
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

    numScheduled(){
        return this.sched_queue.length;
    }

}

module.exports = Scheduler;
