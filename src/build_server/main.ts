///<reference path="../../typings/index.d.ts"/>

import * as express from "express";

function main() {
    console.log("Running Build Server...");
    
    let app = express();
    
    app.get('/', function(req, res){
        console.log('Got /');
    });
    
    
    app.listen(3031);
    
}

main();