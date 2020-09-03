const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function () {
        return {
            "info": "Welcome to the Jokes Api, the possible paths include",
            "random": "thisPage/random",
            "x amount of joke": "thisPage/amount?amount={number of jokes wanted}",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function () {
        return apiHelper.getRandomHelper(apiHelper.getValues('jokes'))
    },
    getAmount: function (amount) {
        return apiHelper.getAmountHelper(apiHelper.getValues('jokes'), amount)
    }
};
