var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/status/", function(req, res, next){
   res.sendFile(path.join(__dirname, "/status.html"));
});

module.exports = router;