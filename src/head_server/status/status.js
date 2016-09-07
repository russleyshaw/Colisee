const express = require("express");
const router = express.Router();

router.get("/status/", function(req, res){
    res.sendFile(__dirname + "/status.html");
});

module.exports = router;
