const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

// jsonObj = getJsonScript.getJsonObj('jokes')
// values = Object.values(jsonObj)

module.exports = {
    getInfo: function(){
        return {
            "info": "Welcome to the Jokes Api, the possible paths include",
            "random": "thisPage/random",
            "x amount of joke": "thisPage/amount?amount={number of jokes wanted}",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function () {
        jsonObj = getJsonScript.getJsonObj('jokes')
        values = Object.values(jsonObj)
        return apiHelper.getRandomHelper(values)
    },
    getAmount: function (amount) {
        jsonObj = getJsonScript.getJsonObj('jokes')
        values = Object.values(jsonObj)
        return apiHelper.getAmountHelper(values, amount)
    }
};
