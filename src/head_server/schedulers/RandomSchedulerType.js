var BaseScheduler = require("./BaseSchedulerType");

class RandomScheduler extends BaseScheduler {
    constructor() {
        super();
    }

    genNext() {
        //TODO: get 2 random client IDs from the database
        return [1, 5];
    }

}


module.exports = RandomScheduler;
