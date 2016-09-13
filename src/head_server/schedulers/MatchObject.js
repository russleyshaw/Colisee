/**
 * Created by gary on 9/13/16.
 */
var SchedulerType = require("../src/head_server/schedulers/BaseSchedulerType.js");
class MatchType{
    constructor(c1,c2){
        this.client1=c1;
        this.client2=c2;
    }
}
module.exports = MatchType;