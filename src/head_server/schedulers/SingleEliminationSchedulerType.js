var BaseScheduler = require("./BaseSchedulerType");
//var Db = require("../../common/Db");
//var Client = require("../../common/Client");
// var knex = require("knex")({
//     dialect: "pg"
// });


class SingleEliminationSchedulerType extends BaseScheduler {
    constructor() {
        super();
    }
    getType(){
        return "single elimination";
    }
}





module.exports = SingleEliminationSchedulerType;
