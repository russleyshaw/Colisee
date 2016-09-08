const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/log/", function(req, res){
   res.sendFile(path.join(__dirname, "log.html"));
});

module.exports = router;
