const getJsonScript = require('../jsonObj');

jsonObj = getJsonScript.getJsonObj('atlaQuote')
values = Object.values(jsonObj)

module.exports = {
    getAll: function () {
        return getAllHelper()
    },
    getRandom: function () {
        return getRandomHelper()
    },
    getAmount: function (amount) {
        return getAmountHelper(amount)
    },
    getAuthor: function (author) {
        return getAuthorHelper(author)
    }
};

function getAllHelper() {
    return values
}

function getRandomHelper() {
    randomValue = values[parseInt(Math.random() * values.length)]
    return randomValue
}

function getAmountHelper(amount) {
    if (amount > values.length) {
        return values
    }
    data = []
    for (var x = 0; x < amount; x++) {
        data.push(values[parseInt(Math.random() * values.length)])
    }
    return data
}

function getAuthorHelper(author) {
    data = []
    if (author == undefined) {
        for (var x = 0; x < values.length; x++) {
            data.push(values[x].author)
        }
        return data.filter((x, y, z) => z.indexOf(x) === y)
    }
    for (var x = 0; x < values.length; x++) {
        if (values[x].author.toLowerCase() == author.toLowerCase()) {
            data.push(values[x])
        }
    }
    return data
}