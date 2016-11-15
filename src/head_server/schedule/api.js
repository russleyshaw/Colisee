var express = require("express");
var path = require("path");

var Schedule = require("../../common/Schedule");
var Scheduler = require("../schedulers/Scheduler");
var RandomSchedulerType = require("../schedulers/RandomSchedulerType");

var router = express.Router();

var scheduler =  new Scheduler();

scheduler.switchTo(new RandomSchedulerType());

router.use("/schedule/", express.static(path.join(__dirname, "static/index.html")));
router.use("/schedule/static/", express.static(path.join(__dirname, "static")));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/api/v2/schedule/", (req, res) => {
    var options = req.query;
    console.log(JSON.stringify(options));
    Schedule.get(options, (err, schedules) => {
        if(err) return res.status(404).send(err);
        res.send(schedules);
    });
});

router.get("/api/v2/schedule/:id/", (req, res) => {
    Schedule.getByID(req.params.id, (err, schedule) => {
        if(err) return res.sendStatus(404);
        res.send(schedule);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/api/v2/schedule/:id/update/", (req, res) => {
    Schedule.updateById(req.params.id, req.body, (err, schedule) => {
        if(err) return res.sendStatus(404);
        res.send(schedule);
    });
});

router.post("/api/v2/schedule/", function(req, res){
    Schedule.create(req.body, (err, schedule) => {
        if(err) return res.sendStatus(400);
        res.send(schedule);
    });
});
router.post("/api/v2/schedule/start", (req, res )=>{

   scheduler.start();
    res.send(200);
});
router.post("/api/v2/schedule/stop",(req,res) =>{
   scheduler.stop();
    res.send(200);
});

module.exports = router;










