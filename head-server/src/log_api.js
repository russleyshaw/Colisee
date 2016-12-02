let express = require("express");

let Logger = require("../common/Logger");

let router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
    let options = {};
    if(req.query.hasOwnProperty("limit")) options.limit = parseInt(req.query.limit);
    if(req.query.hasOwnProperty("severity")) options.severity = req.query.severity;

    Logger.getLatest(options, (err, logs) => {
        if(err) return res.status(404).send(err);
        res.send(logs);
    });
});

router.get("/:id/", (req, res) => {
    Logger.getById(req.params.id, (err, log) => {
        if(err) return res.status(404).send(err);
        res.send(log);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/:id/update/", (req, res) => {
    Logger.updateById(req.params.id, req.body, (err, log) => {
        if(err) return res.status(404).send(err);
        res.send(log);
    });
});

router.post("/", (req, res) => {
    Logger.create(req.body, (err, log) => {
        if(err) return res.status(400).send(err);
        res.send(log);
    });
});


module.exports = router;
