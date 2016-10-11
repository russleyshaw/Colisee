const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/bracket/", function(req, res){
    res.sendFile(path.join(__dirname, "bracket.html"));
});

module.exports = router;
