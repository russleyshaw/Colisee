var Db = require("../../common/Db");
var Match = require("../../common/Match");
var knex = require("knex")({
    dialect: "pg"
});
var Logger = require("../../common/logger");

class Scheduler {

    constructor() {
        this.MAX_SCHEDULED = 10;
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
            if(err)return console.error("queryOnce returns an error");//callback(err);
            callback(null,result.rows[0].count);
        });
    }


    /**
     * Starts a scheduler if MAX_SCHEDULED is not met.
     *
     * Calls scheduleOnce at a specified Interval until MAX_SCHEDULED is reached.
     *
     * Calls schedDbId() to create a schedule in Db whose status ="stopped".
     *
     * Logs any errors in the log table as a message.
     * @param callback
     */
    start(callback) {
        this.interval_ptr = setInterval(() => {
            this.getNumScheduled((err,numScheduled)=>{
                if(err) return console.error("error returning the number scheduled",numScheduled);
                if (numScheduled < this.MAX_SCHEDULED){
                    this.current_scheduler.schedDbId((err) =>{
                        if(err) {
                            var log = {
                                message: "schedDbId() error",
                                severity: "error"
                            };
                            Logger.create(log, (err, log) => {
                                if (err) console.error("Logger.create() error");
                                callback(null, log);
                            });
                        }
                    });
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
    // stop(callback) {
    //     var sql= knex.select().table(schedule).where("match_status_enum","scheduled").update("match_status_enum","stopped").toString;
    //     Db.queryOnce(sql,args,(err)=>{
    //         if(err)return callback(err);
    //         clearInterval(this.interval_ptr);
    //         console.log(this.interval_ptr);
    //     });
    //
    //
    // }
    stop(){
        console.log("");
    }
    pause() {}
    resume() {}

    purge() {
        //TODO: delete all entries in schedule queue
    }

    /**
     * Schedules just (1) match by calling the genNext() to get 2 clients from db and
     * creating a match using those IDs
     * .
     * Logs any errors in the Db log table as a message.
     * @param callback
     */
    scheduleOnce(callback){
        this.current_scheduler.genNext( (err, clientIDs) => {
            if(err)return callback(err);
            var match = {
                clients:clientIDs
            };
            Match.create(match, (err) => {
                if (err){

                    var log = {
                        message: "Match.create() error",
                        severity: "error"
                    };
                    Logger.create(log, (err, log) => {
                        if (err) console.error("Logger.create() error");
                        callback(null, log);
                    });
                    return callback(err);
                }
                callback(null, clientIDs);
            });

        });
    }

    /**
     * Switch between different types of schedulers.
     * @param scheduler_type
     */
    switchTo( scheduler_type ) {
        this.current_scheduler = scheduler_type;
    }

    /**
     * Needs to return an individual match whose created time is oldest.
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




}

module.exports = Scheduler;
