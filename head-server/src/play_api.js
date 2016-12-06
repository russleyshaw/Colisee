const express = require("express");
let winston = require("winston");

let knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
});


let router = express.Router();

router.get("/", (req, res) => {
    knex("match").where({status: "scheduled"}).limit(1).asCallback((err, matches) => {
        if(err) return res.status(400).send(err);
        if(matches.length !== 1) return res.status(204).send("Nothing to be scheduled");

        let match_id = matches[0].id;

        knex("match").where("id", match_id).update({status: "sending", modified_time: "now()"}, "*").asCallback((err, matches) => {
            if(err) return res.status(400).send(err);
            if(matches.length !== 1) return res.status(400).send( new Error(`Unable to get match ${match_id}`) );

            res.status(200).send({id: matches[0].id});
        });
    });
});

router.post("/:id", (req, res) => {
    knex("match").where({status: "sending", id: req.params.id}).update({status: "finished", modified_time: "now()"}).asCallback( (err, rows) => {
        if(err) return res.status(400).send(err);
        if(rows.length != 1) return res.status(204).send("Nothing updated");

        res.status(200).send(`Updated match ${req.params.id}`);
    });
});

module.exports = router;