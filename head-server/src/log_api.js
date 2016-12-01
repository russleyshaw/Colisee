var express = require("express");
var path = require("path");
var Logger = require("../common/Logger");
var router = express.Router();

router.use("/log/", express.static(path.join(__dirname, "../static/log/")));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/api/v2/log/", (req, res) => {
    var options = {};
    if(req.query.hasOwnProperty("limit")) options.limit = parseInt(req.query.limit);
    if(req.query.hasOwnProperty("severity")) options.severity = req.query.severity;

    Logger.getLatest(options, (err, logs) => {
        if(err) return res.status(404).send(err);
        res.send(logs);
    });
});

router.get("/api/v2/log/:id/", (req, res) => {
    Logger.getById(req.params.id, (err, log) => {
        if(err) return res.status(404).send(err);
        res.send(log);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/api/v2/log/:id/update/", (req, res) => {
    Logger.updateById(req.params.id, req.body, (err, log) => {
        if(err) return res.status(404).send(err);
        res.send(log);
    });
});

router.post("/api/v2/log/", (req, res) => {
    Logger.create(req.body, (err, log) => {
        if(err) return res.status(400).send(err);
        res.send(log);
    });
});


module.exports = router;
