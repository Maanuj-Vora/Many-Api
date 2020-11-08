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
        return getRandomLocal(apiHelper.getRandomHelper(apiHelper.getValues('pokemon')), apiHelper.getItem('pokemonArtworkLink'))
    },
    getPokemon: function (name, number) {
        return getPokemonLocal(apiHelper.getValues('pokemon'), apiHelper.getItem('pokemonArtworkLink'), name, number)
    },
    getArtwork: function (name) {
        return getArtworkLocal(apiHelper.getValues('pokemon'), apiHelper.getItem('pokemonArtwork'), name)
    }
};

function getRandomLocal(values, artwork) {
    name = /[^/]*$/.exec(values['link'])[0]
    values['artworkLink'] = artwork + "?name=" + name
    return values
}

function getArtworkLocal(values, path, name) {
    data = []
    for (var x = 0; x < values.length; x++) {
        result = /[^/]*$/.exec(values[x].link)[0]
        if (result.toLowerCase() == name.toLowerCase()) {
            data.push(values[x])
        }
    }
    if (data.length != 0) {
        return (path + name.toLowerCase() + "/" + name.toLowerCase() + ".png")
    }
    return { "error": "image could not be retrieved" }
}

function getPokemonLocal(values, artwork, name, number) {
    data = []
    if (number == undefined && name == undefined) {
        return data
    }
    if (number == undefined && name != undefined) {
        for (var x = 0; x < values.length; x++) {
            if (values[x].name.toLowerCase() == name.toLowerCase()) {
                data = values[x]
                break
            }
        }
    }
    else if ((number != undefined && name == undefined) || (number != undefined && name != undefined)) {
        if (values.length > parseInt(number)) {
            data = values[parseInt(number) - 1]
        }
    }
    name = /[^/]*$/.exec(data['link'])[0]
    data['artworkLink'] = artwork + "?name=" + name
    return data
}