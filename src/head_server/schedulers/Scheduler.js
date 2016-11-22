var Db = require("../../common/Db");
var Match = require("../../common/Match");
var Schedule = require("../../common/Schedule");
var knex = require("knex")({
    dialect: "pg"
});
var Logger = require("../../common/Logger");

function defaultErrorCallback(err) {
    console.error(err);
}

class Scheduler {

    constructor() {
        this.MAX_SCHEDULED = 50;
        this.SCHEDULE_INTERVAL = 1000;

        this.interval_ptr = undefined;
        this.current_scheduler = undefined;
        this.schedID = null;

    }

    /**
     *
     * @callback Scheduler ~getNumScheduledCallback
     */
    getNumScheduled(callback){
        var sql = knex("match").where("status","scheduled").count("* as count").toString();
        Db.queryOnce(sql,[],function(err,result){
            if(err)return callback(new Error("queryOnce returns an error"));
            callback(null,result.rows[0].count);
        });
    }

    /**
     * creates a schedule of type "random" , with generated ID and status "stopped"
     * @callback Scheduler ~createScheduleCallback
     */
    // createSchedule(callback){
    //     var sched1 = {
    //         type: this.current_scheduler.getType()
    //     };
    //     var sql1 = knex("schedule").insert(sched1,"*").toString();
    //     Db.queryOnce(sql1,[],function(err,scheduler){
    //         if(err)return console.error("queryOnce in schedDbId returns an error");
    //         callback(null,scheduler.id);
    //     });
    // }

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
        if(callback===undefined) callback=defaultErrorCallback;
        if(this.current_scheduler===undefined||this.current_scheduler===null) {
            callback(new Error("Schedule type not set yet."));
            return;
        }
        var sched1 = {
            type: this.current_scheduler.getType()
        };
        Schedule.create(sched1,(err,scheduleID)=>{
            if(err) {
                var log = {
                    message: "schedule.create() error",
                    severity: "error"
                };
                Logger.create(log, (err) => {
                    if (err) console.error("Logger.create() error");
                });
                return callback(err);
            }
            this.schedId= scheduleID;
        });
        this.interval_ptr = setInterval(() => {
            this.getNumScheduled((err,numScheduled)=>{
                if(err) return console.error("error returning the number scheduled",numScheduled);
                if (numScheduled < this.MAX_SCHEDULED){

                    this.scheduleOnce(function(err){
                        if(err)return console.error(err);
                    });
                }
            });

        }, this.SCHEDULE_INTERVAL);
    }

    /**
     * clears match objects for new tournament.
     */
    stop(callback) {
        if(callback===undefined) callback=defaultErrorCallback;
        //was: var sql= knex("schedule").where("match_status_enum","scheduled").update("match_status_enum","stopped").toString();
        var sql= knex("schedule").where("status","running").update("status","stopped").toString();// I assume you meant this? - Tyler K.
        Db.queryOnce(sql,[],(err)=>{
            if(err)return callback(err);
            clearInterval(this.interval_ptr);
        });
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
                clients:clientIDs,
                schedule_id: 1
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
     * Gets next scheduled match.
     * @returns {*}
     */
    next(){
        // if( this.sched_queue.length > 0) {
        //     //TODO: pop off queue
        //     return this.sched_queue[this.sched_queue.length-1];
        // }
        // else {
        //     return null;
        // }
    }




}

module.exports = Scheduler;
