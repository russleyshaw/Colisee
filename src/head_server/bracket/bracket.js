var express = require("express");
var router = express.Router();

router.get("/bracket/", function(req, res){
    res.sendFile(__dirname + "/bracket.html");
});

module.exports = router;