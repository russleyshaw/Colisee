var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/log/", function(req, res, next){
   res.sendFile(path.join(__dirname, "log.html"));
});

module.exports = router;