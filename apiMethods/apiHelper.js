module.exports = {
    getValues: function (fileName) {
        const getJsonScript = require('../jsonObj');
        jsonObj = getJsonScript.getJsonObj(fileName)
        values = Object.values(jsonObj)
        return values
    },
    getRawValues: function (fileName) {
        const getJsonScript = require('../jsonObj');
        jsonObj = getJsonScript.getJsonObjRaw(fileName)
        values = Object.values(jsonObj)
        return values
    },
    getAllHelper: function (values) {
        return values
    },
    getRandomHelper: function (values) {
        randomValue = values[parseInt(Math.random() * values.length)]
        return randomValue
    },
    getAmountHelper: function (values, amount) {
        if (amount > values.length) {
            return values
        }
        data = []
        for (var x = 0; x < amount; x++) {
            data.push(values[parseInt(Math.random() * values.length)])
        }
        return data
    },
    getItem: function (valueName) {
        const getJsonScript = require('../jsonObj');
        return getJsonScript.getItem(valueName)
    }
}