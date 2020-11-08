const fs = require('fs');
const path = require('path');

module.exports = {
    getJsonObj: function (itemName) {
        return getJson(getPath(itemName))
    },
    getJsonObjRaw: function (itemName) {
        return getJson(getPathRaw(itemName))
    },
    getItem: function (itemName){
        return getItemLocal(itemName)
    }
};

function getPath(configName) {
    let rawdata = fs.readFileSync(path.resolve(__dirname + "/apiMethods/data.json"));
    let config = JSON.parse(rawdata);
    return (config['jsonPath'] + config[configName] + '.json')
}
function getJson(pathName) {
    let rawdata = fs.readFileSync(path.resolve(__dirname, pathName));
    let jsonObj = JSON.parse(rawdata);
    return (jsonObj)
}
function getPathRaw(configName) {
    let rawdata = fs.readFileSync(path.resolve(__dirname + "/apiMethods/data.json"));
    let config = JSON.parse(rawdata);
    return (config['jsonPath'] + configName + '.json')
}
function getItemLocal(configName){
    let rawdata = fs.readFileSync(path.resolve(__dirname + "/apiMethods/data.json"));
    let config = JSON.parse(rawdata);
    return (config[configName])
}