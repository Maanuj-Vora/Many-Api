const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {

    getInfo: function(){
        return {
            "info": "Welcome to the Coronavirus Api, the possible paths include",
            "all": "thispage/all",
            "iso_code": "thisPage/iso_code?iso={iso code}",
            "Thank you": "Thank you for using our api!"
        }
    },

    getAll: function () {
        // return apiHelper.getAllHelper(apiHelper.getValues('coronavirus'))
    },

    getData: function (date, country, iso) {
        return getDataLocal(apiHelper.getValues('coronavirus'), date, country, iso)
    },

    getISO: function (iso) {
        return getISOLocal(apiHelper.getValues('coronavirus'), iso)
    },

    getCountry: function (country) {
        return getCountryLocal(apiHelper.getValues('coronavirus'), country)
    }
};

function getISOLocal(values, iso) {
    data = []
    if (iso == undefined) {
        for (var x = 0; x < values.length; x++) {
            data.push(values[x].iso_code + " | " + values[x].location)
        }
        dict = { "iso_code": data.filter((x, y, z) => z.indexOf(x) === y) }
        return dict
    }
    for (var x = 0; x < values.length; x++) {
        if (values[x].iso_code.toLowerCase() == iso.toLowerCase()) {
            data.push(values[x])
        }
    }
    return data
}

function getCountryLocal(values, location) {
    data = []
    if (location == undefined) {
        for (var x = 0; x < values.length; x++) {
            data.push(values[x].location)
        }
        dict = { "location": data.filter((x, y, z) => z.indexOf(x) === y) }
        return dict
    }
    for (var x = 0; x < values.length; x++) {
        if (values[x].location.toLowerCase() == location.toLowerCase()) {
            data.push(values[x])
        }
    }
    return data
}

function getDataLocal(values, date, country, iso) {

    data = []

    if (date == undefined && country == undefined && iso == undefined){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        for (var x = 0; x < values.length; x++) {
            if (values[x].date == today) {
                data.push(values[x])
            }
        }
        return data
    }

}