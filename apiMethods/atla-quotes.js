const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

// atlaObj = getJsonScript.getJsonObj('atlaQuote')
// atlaValues = Object.values(atlaObj)

module.exports = {
    getInfo: function(){
        return {
            "info": "Welcome to the Avatar the Last Airbender Api, the possible paths include",
            "random": "thisPage/random",
            "x amount of quotes": "thisPage/amount?amount={number of quotes wanted}",
            "list of authors": "thisPage/author",
            "specific author": "thisPage/author?author={name of author}",
            "Thank you": "Thank you for using our api!"
        }
    },
    getAll: function () {
        atlaObj = getJsonScript.getJsonObj('atlaQuote')
        atlaValues = Object.values(atlaObj)
        return apiHelper.getAllHelper(atlaValues)
    },
    getRandom: function () {
        atlaObj = getJsonScript.getJsonObj('atlaQuote')
        atlaValues = Object.values(atlaObj)
        return apiHelper.getRandomHelper(atlaValues)
    },
    getAmount: function (amount) {
        atlaObj = getJsonScript.getJsonObj('atlaQuote')
        atlaValues = Object.values(atlaObj)
        return apiHelper.getAmountHelper(atlaValues, amount)
    },
    getAuthor: function (author) {
        atlaObj = getJsonScript.getJsonObj('atlaQuote')
        atlaValues = Object.values(atlaObj)
        return apiHelper.getAuthorHelper(atlaValues, author)
    }
};
