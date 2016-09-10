var express = require("express");

var Client = require("../../common/client");

var router = express.Router();

router.get("/api/v2/client/:id", function(req, res){
    var id = req.params.id;

    Client.get(id, function(err, client){
        if(err) { res.send({success: false, message: "Failed to get client"}); return; }

        res.send(data = {
            success: true,
            client: client
        });
    });
});

router.post("/api/v2/client/", function(req, res){
    //TODO: Verify arguments

    var name = req.body.name;
    var git_repo = req.body.git_repo;
    var git_hash = req.body.git_hash;
    var language = req.body.language;

    Client.create(name, git_repo, git_hash, language, function(err, client){
        if(err) { res.send({success: false, message: "Failed to create client"}); return; }
        res.send({
            success: true,
            client: client
        });
    });
});

module.exports = router;
