const express = require("express");
const router = express.Router();

router.get("/log/", function(req, res){
    res.sendFile(__dirname + "/log.html");
});

module.exports = router;
