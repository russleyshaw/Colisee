var express = require("express");
var fs = require("fs");
var config = require("config");
var bodyParser = require('body-parser');

function main(){
    console.log("Starting Gamelog Server...");

    var app = express();
    var gamelogs = [];
    var last_id = 0;
    var GLOG_LOCATION = config.gamelog_server.file_location;

    function load_vars(){
        var filenames = fs.readdirSync(GLOG_LOCATION);
        // faster then foreach
        for (var i = 0, len = filenames.length; i < len; i++) {
            // convert to ints because int conversion/searching is a LOT faster then strings
            var id = parseInt(filenames[i]);
            gamelogs.push(id);
            if (id > last_id){
                last_id = id;
            }
        }
    }

    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    app.get('/api/v2/glog/:glog/', function(req, res){
        //TODO - verify this is a number
        var glog = parseInt(req.params.glog);
        if (gamelogs.indexOf(glog) != -1) {
            var gamelog_data = fs.readFileSync(GLOG_LOCATION + glog.toString()).toString();
            var res_data = {
                "gamelog": gamelog_data
            };
            res.send(res_data);
            return;
        }
        //TODO - better no id found
        //TODO - split between not found and invalid
        var res_error_data = {
            "error": "invalid id: "  + glog.toString()
        };
        res.send(res_error_data);
    });

    app.post('/api/v2/glog/', function(req, res){
        //TODO - Verify data
        if (req.body.gamelog) {
            last_id += 1;
            gamelogs.push(last_id);
            fs.writeFileSync(GLOG_LOCATION + last_id.toString(), req.body.gamelog);
            var res_data = {
                "id": last_id
            };
            res.send(res_data);
            return;
        }
        //TODO - better error
        res.send("ERROR");
    });

    load_vars();
    console.log("Gamelog Server listening on port " + config.gamelog_server.port);
    app.listen(config.gamelog_server.port, config.gamelog_server.url);
}

main();