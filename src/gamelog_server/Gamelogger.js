var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");

class Gamelogger {

    /**
     * Initializes a new Gamelogger
     */
    constructor() {
        this.last_id = 0;
    }

    /**
     * @callback Gamelogger~resetCallback
     * @param err
     */

    /**
     * Resets the Gamelogger by deleting all saved gamelogs and resetting id
     * @param {Gamelogger~resetCallback} callback
     */
    reset(callback){
        this.last_id = 0;
        fse.remove( path.join(_dirname, "/gamelogs/*.glog"), (err) => {
            if(err) return callback(err);
            callback();
        });
    }

    /**
     * @callback Gamelogger~saveCallback
     * @param err
     * @param id {number} The id of the saved gamelog
     */

    /**
     * Saves a gamelog to the system
     * @param glog_data {object}
     * @param {Gamelogger~saveCallback} callback
     */
    save(glog_data, callback){
        this.last_id++;
        var curr_id = this.last_id;
        fs.writeFile( path.join(__dirname, `gamelogs/${curr_id}.glog`), glog_data, (err) => {
            if(err) return callback(err);
            callback(null, curr_id);
        });
    }

    /**
     * @callback Gamelogger~loadCallback
     * @param err
     * @param data Contents of the requested gamelog
     */

    /**
     * Retrieves a saved gamelog
     * @param id {number} The id of the requested gamelog
     * @param {Gamelogger~loadCallback} callback
     */
    load(id, callback){
        fs.readFile( path.join(__dirname, `gamelogs/${id}.glog`), (err, data) => {
            if(err) return callback(err);
            callback(null, data);
        });
    }
}

module.exports = Gamelogger;