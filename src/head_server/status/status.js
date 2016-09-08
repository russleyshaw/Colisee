<<<<<<< HEAD
const express = require("express");
const router = express.Router();

router.get("/status/", function(req, res){
    res.sendFile(__dirname + "/status.html");
=======
var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/status/", function(req, res, next){
   res.sendFile(path.join(__dirname, "/status.html"));
>>>>>>> master
});

module.exports = router;
