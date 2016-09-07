var express = require("express");
var router = express.Router();

router.get("/log/", function(req, res){
    res.sendFile(__dirname + "/log.html");
});

module.exports = router;