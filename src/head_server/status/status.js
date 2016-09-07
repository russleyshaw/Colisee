var express = require("express");
var router = express.Router();

router.get("/status/", function(req, res){
    res.sendFile(__dirname + "/status.html");
});

module.exports = router;