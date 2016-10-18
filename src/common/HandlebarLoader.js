
var fs = require("fs");
var handlebars = require("handlebars");

function HandlebarLoader (fileMap) {
    var compileMap = {};
    for(var key in fileMap) {
        if(fileMap.hasOwnProperty(key)) {
            try {
                var f = fs.readFileSync(fileMap[key]);
                compileMap[key] = handlebars.compile(f.toString());
            }
            catch(err) {
                console.warn(`HandlebarLoader Error: {${key}, ${fileMap[key]}} - ${err}`);
            }
        }
    }
    return compileMap;
}

module.exports = HandlebarLoader;
