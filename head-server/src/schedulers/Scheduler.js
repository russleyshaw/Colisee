let winston = require("winston");
let Match = require("../../common/Match");
let Schedule = require("../../common/Schedule");
let knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
});

function defaultErrorCallback(err) {
    winston.error(err);
}

class Scheduler {

    constructor() {
        this.MAX_SCHEDULED = 5;
        this.SCHEDULE_INTERVAL = 1000;

        this.interval_ptr = undefined;
        this.current_scheduler = undefined;
        this.sched_id = null;
    }

    /**
     *
     * @callback Scheduler ~getNumScheduledCallback
     */
    getNumScheduled(callback){
        knex("match").where("status","scheduled").count("*").asCallback((err, rows) => {
            if(err) return callback(err);
            console.log(JSON.stringify(rows));
            callback(null, rows[0].count);
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
        if(callback === undefined) callback = defaultErrorCallback;
        if(this.current_scheduler === undefined || this.current_scheduler === null) {
            callback(new Error("Schedule type not set yet."));
            return;
        }
        Schedule.create({
            type: this.current_scheduler.getType(),
            status: "running"
        }, (err, schedule) => {
            if(err) return callback(err);
            this.sched_id = schedule.id;

            this.interval_ptr = setInterval(() => {
                Scheduler.intervalFunc(this);
            }, this.SCHEDULE_INTERVAL);

            callback();
        });
    }

    static intervalFunc(self) {
        self.getNumScheduled((err, numScheduled) => {
            if(err) return winston.error(err);
            if(numScheduled < self.MAX_SCHEDULED) {
                self.scheduleOnce((err) => {
                    if(err) return winston.error(err);
                });
            }
        });
    }

    /**
     * clears match objects for new tournament.
     */
    stop(callback) {
        if(callback === undefined) callback = defaultErrorCallback;
        knex("schedule").where("status","running").update("status", "stopped").asCallback((err) => {
            if(err) return callback(err);
            clearInterval(this.interval_ptr);
            callback();
        });
    }

    /**
     * Schedules just (1) match by calling the genNext() to get 2 clients from db and
     * creating a match using those IDs
     * .
     * Logs any errors in the Db log table as a message.
     * @param callback
     */
    scheduleOnce(callback) {
        winston.debug("scheduling once");
        if(this.current_scheduler === null) {
            return callback( new Error("Current scheduler is null") );
        }
        winston.debug("after null check");
        this.current_scheduler.genNext((err, clientIDs) => {
            if(err) return callback(err);
            if(this.sched_id === null) {
                return callback( new Error("Internal schedule id is null") );
            }
            Match.create({
                clients: clientIDs,
                schedule_id: this.sched_id,
                status: "scheduled"
            }, (err) => {
                if (err) return callback(err);
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
}

module.exports = Scheduler;
