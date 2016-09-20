var BaseScheduler = require("./BaseSchedulerType");

class RandomScheduler extends BaseScheduler {
    constructor() {
        super();
    }

    /**
     * Generate the next match to be played
     */
    genNext() {
        //TODO: get 2 random client IDs from the database
        return [1, 5];
    }

}


module.exports = RandomScheduler;
