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
        return apiHelper.getRandomHelper(apiHelper.getValues(account + '_tweets'))
    },
    getAmount: function (account, amount) {
        return apiHelper.getAmountHelper(apiHelper.getValues(account + '_tweets'), amount)
    }
};
