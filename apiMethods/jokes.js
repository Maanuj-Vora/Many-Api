const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

jsonObj = getJsonScript.getJsonObj('jokes')
values = Object.values(jsonObj)

module.exports = {
    getRandom: function () {
        return apiHelper.getRandomHelper(values)
    },
    getAmount: function (amount) {
        return apiHelper.getAmountHelper(values, amount)
    }
};
