const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

jsonObj = getJsonScript.getJsonObj('atlaQuote')
values = Object.values(jsonObj)

module.exports = {
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
