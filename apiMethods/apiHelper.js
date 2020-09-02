module.exports = {

    getValues: function (fileName) {
        const getJsonScript = require('../jsonObj');
        jsonObj = getJsonScript.getJsonObj(fileName)
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

    getAuthorHelper: function (values, author) {
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
}