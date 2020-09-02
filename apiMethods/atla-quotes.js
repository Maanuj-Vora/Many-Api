const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

jsonObj = getJsonScript.getJsonObj('atlaQuote')
values = Object.values(jsonObj)

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
        return apiHelper.getAllHelper(values)
    },
    getRandom: function () {
        return apiHelper.getRandomHelper(values)
    },
    getAmount: function (amount) {
        return apiHelper.getAmountHelper(values, amount)
    },
    getAuthor: function (author) {
        return apiHelper.getAuthorHelper(values, author)
    }
};
