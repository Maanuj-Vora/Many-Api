const fs = require('fs');
const path = require('path');

const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function () {
        let rawdata = fs.readFileSync(path.resolve(__dirname + "/data.json"));
        let config = JSON.parse(rawdata);
        handles = config['twitterHandles']
        return {
            "info": "Welcome to the Tweet Api, the possible paths include",
            "random": "thisPage/random?account={account handle}",
            "x amount of tweets": "thisPage/amount?amount={number of tweets wanted}&account={account handle}",
            "currently supported handles": handles,
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function (account) {
        jsonObj = getJsonScript.getJsonObjRaw(account + '_tweets')
        values = Object.values(jsonObj)
        return apiHelper.getRandomHelper(values)
    },
    getAmount: function (account, amount) {
        jsonObj = getJsonScript.getJsonObjRaw(account + '_tweets')
        values = Object.values(jsonObj)
        return apiHelper.getAmountHelper(values, amount)
    }
};
