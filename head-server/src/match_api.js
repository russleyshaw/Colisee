let express = require("express");
let path = require("path");

let Match = require("../common/Match");

let router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/api/v2/match/", (req, res) => {
    var options = req.query;
    console.log(JSON.stringify(options));
    Match.get(options, (err, matches) => {
        if(err) return res.status(404).send(err);
        res.send(matches);
    });
});

router.get("/api/v2/match/:id", (req, res) => {
    Match.getById(req.params.id, (err, match) => {
        if(err) return res.status(404).send(err);
        res.send(match);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/api/v2/match/:id/update/", (req, res) => {
    Match.updateById(req.params.id, req.body, (err, match) => {
        if(err) return res.status(404).send(err);
        res.send(match);
    });
});

router.post("/api/v2/match/", function(req, res){
    Match.create(req.body, (err, match) => {
        if(err) return res.status(400).send(err);
        res.send(match);
    });
});

module.exports = router;
