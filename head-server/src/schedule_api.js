let express = require("express");
let path = require("path");

let ScheduleInterface = require("../common/Schedule");
let Scheduler = require("./schedulers/Scheduler");
let RandomSchedulerType = require("./schedulers/RandomSchedulerType");

let router = express.Router();

let scheduler =  new Scheduler();
scheduler.switchTo(new RandomSchedulerType());

router.get("/api/v2/schedule/", (req, res) => {
    let options = req.query;
    ScheduleInterface.get(options, (err, schedules) => {
        if(err) return res.status(404).send(err);
        res.send(schedules);
    });
});

router.get("/api/v2/schedule/:id/", (req, res) => {
    ScheduleInterface.get({id: req.params.id, limit: 1}, (err, schedules) => {
        if(err) return res.status(404).send(err);
        if(schedules.length !== 1) return res.status(404).send(new Error(`Unable to find schedule with id ${req.params.id}`));
        res.send(schedules[0]);
    });
});

router.use("/schedule", express.static(path.join(__dirname, "../static/schedule")));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/api/v2/schedule/:id/update/", (req, res) => {
    ScheduleInterface.updateById(req.params.id, req.body, (err, schedule) => {
        if(err) {
            console.log(JSON.stringify(err));
            return res.sendStatus(404);
        }
        res.send(schedule);
    });
});

router.post("/api/v2/schedule/", function(req, res){
    ScheduleInterface.create(req.body, (err, schedule) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(schedule);
    });
});
router.post("/api/v2/schedule/start", (req, res )=>{
    scheduler.start((err) => {
        if(err) {
            console.log(JSON.stringify(err));
            return res.status(404).send(err);
        }
        res.status(200).send("Started schedule");
    });
});
router.post("/api/v2/schedule/stop",(req,res) =>{
    scheduler.stop();
    res.status(200).send("Stopped schedule");
});

module.exports = router;










