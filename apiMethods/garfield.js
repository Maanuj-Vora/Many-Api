const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function () {
        return {
            "info": "Welcome to the Garfield Api, the possible paths include",
            "random": "thisPage/random",
            "daily": "returns the daily garfield strip",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function () {
        return getRandomLocal(apiHelper.getItem('garfieldStripLink'))
    },
    getDaily: function () {
        return getDailyLocal(apiHelper.getItem('garfieldStripLink'))
    }
};

function getRandomLocal(link) {
    var counter = 0
    while (counter < 10) {
        randomDate = apiHelper.randomDate(new Date(1978, 6, 19), new Date())
        url = link + randomDate + ".jpg"
        if (apiHelper.urlExists(url)) {
            return url
        }
        counter = counter + 1
    }
    return { "error": "image could not be retrieved" }
}

function getDailyLocal(link) {
    currentDate = apiHelper.cleanDate(new Date())
    url = link + currentDate + ".jpg"
    if (apiHelper.urlExists(url)) {
        return url
    }
    currentDate = apiHelper.cleanDate((new Date()).setDate((new Date()).getDate() - 1))
    url = link + currentDate + ".jpg"
    if (apiHelper.urlExists(url)) {
        return url
    }
    return { "error": "image could not be retrieved" }
}