let winston         = require("winston");
const config          = require("config");
const request         = require("request");
const url           = require("url");

winston.level = config.logging;

const max_playing = config.max_playing;
let num_playing = 0;
let poll_interval = null;

const head_host = process.env.HEAD_HOST;
const head_port = process.env.HEAD_PORT;
const head_token = process.env.HEAD_TOKEN;

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
            winston.debug(`Bad status code ${response.statusCode} - ${response.statusMessage} - ${JSON.stringify(body)}`);
            return;
        }
        winston.debug(`GOT\t${response}\t${body}`);

    });
}

(function() {
    winston.debug(`Polling with interval ${config.poll_interval}`);
    poll_interval = setInterval(pollFunc, config.poll_interval);
})();






