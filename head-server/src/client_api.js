var express = require("express");
var path = require("path");

var Client = require("../common/Client");

var router = express.Router();

router.use("/client/", express.static(path.join(__dirname, "../static/client")));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/api/v2/client/", (req, res) => {
    var options = req.query;
    console.log(JSON.stringify(options));
    Client.get(options, (err, clients) => {
        if(err) return res.status(404).send(err);
        res.send(clients);
    });
});

router.get("/api/v2/client/:id/", (req, res) => {
    Client.getById(req.params.id, (err, client) => {
        if(err) return res.sendStatus(404);
        res.send(client);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/api/v2/client/:id/update/", (req, res) => {
    Client.updateById(req.params.id, req.body, (err, client) => {
        if(err) return res.sendStatus(404);
        res.send(client);
    });
});

router.post("/api/v2/client/", function(req, res){
    Client.create(req.body, (err, client) => {
        if(err) {
            console.log(JSON.stringify(err));
            return res.status(400).send(err);
        }
        res.send(client);
    });
});

module.exports = router;
