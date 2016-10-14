var express = require("express");
var Match = require("../../common/Match");
var path = require("path");
var router = express.Router();

router.use("/match/", express.static(path.join(__dirname, "static/index.html")));
router.use("/match/static/", express.static(path.join(__dirname, "static")));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/api/v2/match/", (req, res) => {
    Match.getAll((err, matches) => {
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
