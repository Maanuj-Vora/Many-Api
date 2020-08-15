const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function(){
        return {
            "info": "Welcome to the Tweet Api, the possible paths include",
            "random": "thisPage/random",
            "x amount of tweets": "thisPage/amount?amount={number of tweets wanted}",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function (account) {
        jsonObj = getJsonScript.getJsonObjRaw(account+'_tweets')
        values = Object.values(jsonObj)
        return apiHelper.getRandomHelper(values)
    },
    getAmount: function (account, amount) {
        jsonObj = getJsonScript.getJsonObjRaw(account+'_tweets')
        values = Object.values(jsonObj)
        return apiHelper.getAmountHelper(values, amount)
    }
};
