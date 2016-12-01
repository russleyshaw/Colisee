let express = require("express");
let path = require("path");

let Client = require("../common/Client");

let router = express.Router();

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
        if(err) return res.status(404).send(err);
        res.send(client);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/api/v2/client/:id/update/", (req, res) => {
    Client.updateById(req.params.id, req.body, (err, client) => {
        if(err) return res.status(404).send(err);
        res.send(client);
    });
});

router.post("/api/v2/client/", function(req, res){
    Client.create(req.body, (err, client) => {
        if(err) return res.status(400).send(err);
        res.send(client);
    });
});

module.exports = router;
