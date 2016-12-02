let express = require("express");

let Client = require("../common/Client");

let router = express.Router();

router.get("/", (req, res) => {
    let options = req.query;
    Client.get(options, (err, clients) => {
        if(err) return res.status(404).send(err);
        res.send(clients);
    });
});

router.get("/:id/", (req, res) => {
    Client.getById(req.params.id, (err, client) => {
        if(err) return res.status(404).send(err);
        res.send(client);
    });
});

router.post("/:id/update/", (req, res) => {
    Client.updateById(req.params.id, req.body, (err, client) => {
        if(err) return res.status(404).send(err);
        res.send(client);
    });
});

router.post("/", function(req, res){
    Client.create(req.body, (err, client) => {
        if(err) return res.status(400).send(err);
        res.send(client);
    });
});

module.exports = router;
