const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function () {
        return {
            "info": "Welcome to the Avatar the Last Airbender Quote Api, the possible paths include",
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
        return getAuthorHelper(apiHelper.getValues('atlaQuote'), author)
    }
};

function getAuthorHelper(values, author) {
    data = []
    if (author == undefined) {
        for (var x = 0; x < values.length; x++) {
            data.push(values[x].author)
        }
        dict = { "authors": data.filter((x, y, z) => z.indexOf(x) === y) }
        return dict
    }
    for (var x = 0; x < values.length; x++) {
        if (values[x].author.toLowerCase() == author.toLowerCase()) {
            data.push(values[x])
        }
    }
    return data
}