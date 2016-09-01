var express = require("express");
var router = express.Router();

router.get("/log/", function(req, res, next){
   res.sendFile(__dirname + "/log.html");
});

module.exports = router;