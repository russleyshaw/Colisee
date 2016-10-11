
class BaseSchedulerType{

    constructor() {}

    /**
     * Generate the next match to be played
     */
    genNext() {}
    getType(){
        return "invalid";
    }

}



module.exports = BaseSchedulerType;
