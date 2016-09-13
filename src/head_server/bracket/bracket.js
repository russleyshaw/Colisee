const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/bracket/", function(req, res){
    res.sendFile(path.join(__dirname, "bracket.html"));
});

router.get("/bracket/d3test/", function(req, res){
    res.sendFile(path.join(__dirname, "d3test.html"));
});

router.get("/bracket/jquerytest/", function(req, res){
    res.sendFile(path.join(__dirname, "jquerybrackettest.html"));
});

module.exports = router;
