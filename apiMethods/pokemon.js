const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {
    getInfo: function () {
        return {
            "info": "Welcome to the Pokemon Api, the possible paths include",
            "random": "thisPage/random",
            "get pokemon by name or number\nif the number and name are both given, the number will be priority": "thisPage/getPokemon?name={name}&number={dex number}",
            "Thank you": "Thank you for using our api!"
        }
    },
    getRandom: function () {
        return apiHelper.getRandomHelper(apiHelper.getValues('pokemon'))
    },
    getPokemon: function (name, number) {
        return getPokemonLocal(apiHelper.getValues('pokemon'), name, number)
    }
};

function getPokemonLocal(values, name, number) {
    data = []
    if (number == undefined && name == undefined) {
        return data
    }
    if (number == undefined && name != undefined) {
        for (var x = 0; x < values.length; x++) {
            if (values[x].name.toLowerCase() == name.toLowerCase()) {
                data.push(values[x])
                break
            }
        }
        return data
    }
    if (number != undefined && name == undefined) {
        if (values.length > parseInt(number)) {
            return [values[parseInt(number) - 1]]
        }
    }
    if (number != undefined && name != undefined) {
        if (values.length > parseInt(number)) {
            return [values[parseInt(number) - 1]]
        }
    }
    return data
}