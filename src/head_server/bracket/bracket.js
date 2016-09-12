var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/bracket/", function(req, res){
    res.sendFile(path.join(__dirname, "bracket.html"));
});

module.exports = router;
