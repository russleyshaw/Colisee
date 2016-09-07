const express = require("express");
const router = express.Router();

router.get("/bracket/", function(req, res){
    res.sendFile(__dirname + "/bracket.html");
});

module.exports = router;
