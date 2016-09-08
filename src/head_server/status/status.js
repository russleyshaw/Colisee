const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/status/", function(req, res){
   res.sendFile(path.join(__dirname, "status.html"));
});

module.exports = router;
