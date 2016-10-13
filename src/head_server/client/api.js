var express = require("express");
var path = require("path");

var Client = require("../../common/Client");
var HandlebarLoader = require("../../common/HandlebarLoader");

var hb = HandlebarLoader({
    "index": path.join(__dirname, "index.html")
});

var router = express.Router();

router.use("/client/static/", express.static(path.join(__dirname, "static")));

router.get("/client/", (req, res) => {
    res.send(hb["index"]());
});

router.get("/api/v2/client/", (req, res) => {
    Client.getAll((err, clients) => {
        if(err) return res.sendStatus(404);
        res.send(clients);
    });
});

router.get("/api/v2/client/:id", (req, res) => {
    Client.getById(req.params.id, (err, client) => {
        if(err) return res.sendStatus(404);
        res.send(client);
    });
});

router.patch("/api/v2/client/:id", (req, res) => {
    Client.updateById(req.params.id, req.body, (err, client) => {
        if(err) return res.sendStatus(404);
        res.send(client);
    });
});

router.post("/api/v2/client/", function(req, res){
    Client.create(req.body, (err, client) => {
        if(err) return res.sendStatus(400);
        res.send(client);
    });
});

module.exports = router;
