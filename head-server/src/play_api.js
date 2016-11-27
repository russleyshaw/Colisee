const express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("thing");
});

router.post("/:id", (req, res) => {
    res.status(405).send("UNIMPLEMENTED");
});

module.exports = router;