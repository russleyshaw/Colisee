var express = require("express");
var fs = require("fs");
var config = require("config");
var body_parser = require("body-parser");

function main(){
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

    app.use(body_parser.json());
    app.use(body_parser.urlencoded({ extended: true }));
    app.use( function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        next();
    });

    /**
     * @apiGroup Gamelog
     * @apiName Get gamelog
     * @apiDescription Gets a gamelog from the server
     * @api {get} /api/v2/glog/:glog
     * @apiParam {integer} glog Gamelog id
     * @apiSuccess 200
     * @apiError 400 Invalid arguments
     * @apiError 404 Gamelog not found
     */
    app.get("/api/v2/glog/:id/", function(req, res){
        if(typeof req.params.id !== "number") return res.send(400);
        if(req.params.id < 0) return res.send(400);

        var id = req.params.id;

        fs.readFile(path.join(_dirname, `gamelogs/${id}.glog`), function(err, data){
            if(err) return res.send(404);
            res.send(data);
        });
    });

    /**
     * @apiGroup Gamelog
     * @api {post} /api/v2/glog/
     * @apiName Post gamelog
     * @apiDescription Store a gamelog stored in the request body
     *
     */
    app.post("/api/v2/glog/", function(req, res){

        //TODO - Verify data
        if (req.body.gamelog) {
            last_id += 1;
            gamelogs.push(last_id);
            fs.writeFileSync(GLOG_LOCATION + last_id.toString(), req.body.gamelog);
            const res_data = {
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
