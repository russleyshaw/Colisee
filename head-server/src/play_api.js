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
    // get the oldest, scheduled match and play it
    knex("match").where(function(){
        this.where({status: "scheduled"}).limit(1)
    }).update({status: "sending", modified_time: "now()"}, "*").asCallback((err, rows) => {
        console.log(JSON.stringify(rows));
        if(err) return res.status(400).send(err);
        if(rows.length !== 1) return res.status(204).send("Nothing scheduled");
        res.status(200).send({id: rows[0].id});
    });
});

router.post("/:id", (req, res) => {
    winston.warn("GOT THING");
    knex("match").where({status: "sending", id: req.params.id}).update({status: "finished", modified_time: "now()"}).asCallback( (err, rows) => {
        if(err) return res.status(400).send(err);
        if(rows.length != 1) return res.status(204).send("Nothing updated");

        res.status(200).send(`Updated match ${req.params.id}`);
    });
});

module.exports = router;