let express = require("express");

let Match = require("../common/Match");

let router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
    let options = req.query;
    Match.get(options, (err, matches) => {
        if(err) return res.status(404).send(err);
        res.send(matches);
    });
});

router.get("/:id", (req, res) => {
    Match.getById(req.params.id, (err, match) => {
        if(err) return res.status(404).send(err);
        res.send(match);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/:id/update/", (req, res) => {
    Match.updateById(req.params.id, req.body, (err, match) => {
        if(err) return res.status(404).send(err);
        res.send(match);
    });
});

router.post("/", function(req, res){
    Match.create(req.body, (err, match) => {
        if(err) return res.status(400).send(err);
        res.send(match);
    });
});

module.exports = router;
