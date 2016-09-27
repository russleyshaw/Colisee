var express = require("express");
var config = require("config");
var body_parser = require("body-parser");
var Gamelogger = require("./Gamelogger");

var app = express();
var gloger = new Gamelogger();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use( (req, res, next) => {
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
app.get("/api/v2/glog/:id/", (req, res) => {
    if(typeof req.params.id !== "number") return res.send(400);
    if(req.params.id < 0) return res.send(400);

    gloger.load(req.params.id, (err, glog) => {
        if(err) return res.send(404);
        res.send(glog);
    });
});

/**
 * @apiGroup Gamelog
 * @api {post} /api/v2/glog/
 * @apiName Post gamelog
 * @apiDescription Store a gamelog stored in the request body
 *
 */
app.post("/api/v2/glog/", (req, res) => {
    gloger.save(req.body, (err, id) => {
        if(err) return res.send(400);
        res.send({id: id});
    });
});

app.listen(config.gamelog_server.port, () => {
    console.log("Gamelog server is listening...")
});