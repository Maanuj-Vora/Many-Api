const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function () {
        return {
            "info": "Welcome to the Calvin and Hobbes Api, the possible paths include",
            "random": "thisPage/random",
            "daily": "returns the daily calvin and hobbes strip",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function () {
        return getRandomLocal(apiHelper.getItem('calvinhobbesStripLink'))
    },
    getRandomImage: function () {
        return getRandomImageLocal(apiHelper.getItem('calvinhobbesStripLink'))
    },
    getDaily: function () {
        return getDailyLocal(apiHelper.getItem('calvinhobbesStripLink'))
    }
};

function getRandomLocal(link) {
    var counter = 0
    while (counter < 10) {
        randomDate = apiHelper.randomDate(new Date(1985, 11, 18), new Date())
        url = link + randomDate + ".jpg"
        if (apiHelper.urlExists(url)) {
            return { 'url': url }
        }
        counter = counter + 1
    }
    return { "url": "", "error": "image could not be retrieved" }
}

function getRandomImageLocal(link) {
    var counter = 0
    while (counter < 10) {
        randomDate = apiHelper.randomDate(new Date(1985, 11, 18), new Date())
        url = link + randomDate + ".jpg"
        if (apiHelper.urlExists(url)) {
            return url
        }
        counter = counter + 1
    }
    return { "error": "image could not be retrieved" }
}

function getDailyLocal(link) {
    today = new Date()
    currentDate = apiHelper.cleanDate(today)
    url = link + currentDate + ".jpg"
    if (apiHelper.urlExists(url)) {
        return url
    }
    currentDate = apiHelper.cleanDate(today.setDate(today.getDate() - 1))
    url = link + currentDate + ".jpg"
    if (apiHelper.urlExists(url)) {
        return url
    }
    return { "error": "image could not be retrieved" }
}