const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

jsonObj = getJsonScript.getJsonObj('realDonaldTrump_tweets')
values = Object.values(jsonObj)

module.exports = {
    getInfo: function(){
        return {
            "info": "Welcome to the Donald Trump Tweet Api, the possible paths include",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function () {
        return apiHelper.getRandomHelper(values)
    },
    getAmount: function (amount) {
        return apiHelper.getAmountHelper(values, amount)
    }
};
