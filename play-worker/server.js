let winston         = require("winston");
const config          = require("config");
const request         = require("request");
const url           = require("url");
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

winston.level = config.logging;

const max_playing = config.max_playing;
let num_playing = 0;
let poll_interval = null;

const head_host = process.env.HEAD_HOST;
const head_port = process.env.HEAD_PORT;
const head_token = process.env.HEAD_TOKEN;

function playGame(match_id, callback) {
    knex("match").where("id", match_id).update({
        status: "playing", modified_time: "now()"
    }, "*").asCallback((err, rows)=>{
        if(err) return callback(err);
        if(rows.length !== 1) return callback( new Error(`Unable to query match ${match_id}`) );
        let match = rows[0];
        // simulate game playing by waiting
        let game_time = 5000;
        setTimeout(() => {

            knex("match").where("id", match_id).update({
                status: "sending",
                winner: match.clients[Math.floor(Math.random()*match.clients.length)],
                modified_time: "now()"
            }, "*").asCallback((err, rows) => {
                if(err) return callback(err);
                if(rows.length !== 1) return callback( new Error(`Unable to query match ${match_id}`) );
                callback();
            });
        }, game_time);
    });
}

function pollFunc() {
    if(num_playing >= max_playing) {
        winston.debug(`Max games currently playing`);
        return;
    }

    winston.debug(`Polling head server at ${head_host}:${head_port}...`);

    request({
        method: "GET",
        uri: `http://${head_host}:${head_port}/api/v2/play`,
        headers: {
            Authorization: `Token: ${head_token}`
        },
        json: true
    }, (err, response, body) => {
        if(err) {
            winston.warn(`Error polling head server - ${err}`);
            winston.warn(err);
            return;
        }
        if(response.statusCode == 204) {
            winston.debug(`Nothing to poll`);
            return;
        }
        if(response.statusCode != 200) {
            winston.warn(`Bad status code ${response.statusCode} - ${response.statusMessage} - ${JSON.stringify(body)}`);
            return;
        }
        winston.debug(`GOT\t${response}\t${body}`);
        let match_id = req.body.id;
        winston.debug(`Starting playing match ${match_id}...`);
        num_playing += 1;
        playGame(match_id, (err) => {
            winston.debug(`Finished playing match ${match_id}`);
            num_playing -= 1;
            if(err) winston.warn(err);
            request({
                method: "POST",
                uri: `http://${head_host}:${head_port}/api/v2/play/${match_id}`,
            }, () => {

            });
        });
    });
}

(function() {
    winston.debug(`Polling with interval ${config.poll_interval}`);
    poll_interval = setInterval(pollFunc, config.poll_interval);
})();






