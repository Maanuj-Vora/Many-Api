const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

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
        return apiHelper.getAllHelper(apiHelper.getValues('atlaQuote'))
    },
    getRandom: function () {
        return apiHelper.getRandomHelper(apiHelper.getValues('atlaQuote'))
    },
    getAmount: function (amount) {
        return apiHelper.getAmountHelper(apiHelper.getValues('atlaQuote'), amount)
    },
    getAuthor: function (author) {
        return apiHelper.getAuthorHelper(apiHelper.getValues('atlaQuote'), author)
    }
};