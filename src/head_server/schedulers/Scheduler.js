var Db = require("../../common/Db");
var Match = require("../../common/Match");
var knex = require("knex")({
    dialect: "pg"
});

class Scheduler {

    constructor() {
        this.MAX_SCHEDULED = 50;
        this.SCHEDULE_INTERVAL = 100;

        this.interval_ptr = undefined;
        this.current_scheduler = undefined;
        this.sched_queue = new Array();
    }

    /**
     *
     * @param callback
     */
    getNumScheduled(callback){
        var sql = knex("match").where("status","scheduled").count("* as count").toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return callback(err);
            console.log(result.rows[0].count);
            callback(result.rows[0].count);
        });
    }

    /**
     *
     * @param callback
     */
    start(callback) {
        this.interval_ptr = setInterval(() => {
            this.getNumScheduled((err,numScheduled)=>{
                if (numScheduled < this.MAX_SCHEDULED){
                    this.scheduleOnce(function(err){
                        if(err)return callback(err);
                    });
                }
            });

        }, this.SCHEDULE_INTERVAL);
    }

    /**
     * clears match objects for new tournament.
     */
    stop() {
        clearInterval(this.interval_ptr);
    }

    pause() {}
    resume() {}

    purge() {
        //TODO: delete all entries in schedule queue
    }

    /**
     *
     * @param callback
     */
    scheduleOnce(callback){
        this.current_scheduler.genNext( (err, clientIDs) => {
            if(err)return callback(err);
            var match = {
                clients:clientIDs
            };
            Match.create(match, (err) => {
                if (err)return callback(err);
                callback(null, clientIDs);
            });

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

    // numScheduled(){
    //
    //
    //     return this.sched_queue.length;
    // }



}

module.exports = Scheduler;
