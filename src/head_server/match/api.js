var express = require("express");
var path = require("path");

var Match = require("../../common/Match");

var router = express.Router();

router.use("/match/", express.static(path.join(__dirname, "static/index.html")));
router.use("/match/static/", express.static(path.join(__dirname, "static")));

/////////////WEB


////////////API
router.get("/api/v2/match/", (req, res) => {
    Match.getAll((err, matches) => {
        if(err) return res.sendStatus(404);
        res.send(matches);
    });
});

router.get("/api/v2/match/:id", (req, res) => {
    Match.getById(req.params.id, (err, match) => {
        if(err) return res.sendStatus(404);
        res.send(match);
    });
});

router.patch("/api/v2/match/:id", (req, res) => {
    Match.updateById(req.params.id, req.body, (err, match) => {
        if(err) return res.sendStatus(404);
        res.send(match);
    });
});

router.post("/api/v2/match/", function(req, res){
    Match.create(req.body, (err, match) => {
        if(err) return res.sendStatus(400);
        res.send(match);
    });
});

module.exports = router;
