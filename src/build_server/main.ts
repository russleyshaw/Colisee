import express = require('express');

function main() {
    console.log("Running Build Server...");
    
    let app = express();
    
    app.get('/', function(req, res){
        console.log('Got /');
    });
    
    
    app.listen(3031);
    
}

main();