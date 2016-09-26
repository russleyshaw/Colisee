var express = require("express");
var router = express.Router();

router.get("/api/v2/sched/next", function(req, res){
    res.send([1, 2]);
});

module.exports = router;
