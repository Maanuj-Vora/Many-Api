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
    },
    urlExists: function (url) {
        var https = require('https');
        var http = require('http');
        return https.get(url, function (res) {
            if (res.statusCode == 301 || res.statusCode == 200) {
                return true
            }
            else {
                return false
            }
        });

    },
    randomDate: function (start, end) {
        var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [year, month, day].join('-');
    },
    cleanDate: function (dirtyDate) {
        return [dirtyDate.getFullYear(), '' + (dirtyDate.getMonth() + 1), '' + dirtyDate.getDate()].join('-');
    }
}