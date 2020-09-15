const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {

    getInfo: function () {
        return {
            "info": "Welcome to the Marvel Quote Api, the possible paths include",
            "random": "thisPage/random",
            "x amount of quotes": "thisPage/amount?amount={number of quotes wanted}",
            "Thank you": "Thank you for using our api!"
        }
    },
    getAll: function () {
        return apiHelper.getAllHelper(apiHelper.getValues('marvelQuote'))
    },
    getRandom: function () {
        return apiHelper.getRandomHelper(apiHelper.getValues('marvelQuote'))
    },
    getAmount: function (amount) {
        return apiHelper.getAmountHelper(apiHelper.getValues('marvelQuote'), amount)
    }
};