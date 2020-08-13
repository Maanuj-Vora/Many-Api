const fs = require('fs');
const path = require('path');

module.exports = {
    getJsonObj: function (itemName) {
        return getJson(getPath(itemName))
    }
};

function getPath(configName) {
    console.log(__dirname)
    let rawdata = fs.readFileSync(path.resolve(__dirname + "/apiMethods/data.json"));
    let config = JSON.parse(rawdata);
    return (config['jsonPath'] + config[configName] + '.json')
}
function getJson(pathName) {
    let rawdata = fs.readFileSync(path.resolve(__dirname, pathName));
    let jsonObj = JSON.parse(rawdata);
    return (jsonObj)
}