const getJsonScript = require('../jsonObj');
const apiHelper = require('./apiHelper')

module.exports = {

    getInfo: function () {
        return {
            "info": "Welcome to the Coronavirus Api, the possible paths include",
            "all": "thispage/all",
            "get by iso code": "thisPage/getISO?iso={iso code}",
            "all ISO Codes": "https://many-api.vercel.app/coronavirus/getISO",
            "get data": "thisPage/getData?date={YYYY-MM-DD}&iso={iso code}\nPlease note you can keep either one of them blank, if you just do 'thisPage/getData' you will get today's data for all countries",
            "Thank you": "Thank you for using our api!"
        }
    },

    getAll: function () {
        return apiHelper.getAllHelper(apiHelper.getValues('coronavirus'))
    },

    getData: function (date, iso) {
        return getDataLocal(apiHelper.getValues('coronavirus'), date, iso)
    },

    getISO: function (iso) {
        return getISOLocal(apiHelper.getValues('coronavirus'), iso)
    },

    getCountry: function (country) {
        return getCountryLocal(apiHelper.getValues('coronavirus'), country)
    },

    getImage: function (iso, type) {
        return getImageLocal(apiHelper.getValues('coronavirus'), 'data/img/covid/', iso, type)
    }
};

function getImageLocal(values, path, iso, type) {
    data = []
    for (var x = 0; x < values.length; x++) {
        if (values[x].iso_code.toLowerCase() == iso.toLowerCase()) {
            data.push(values[x])
        }
    }
    if (data.length != 0) {
        return path + iso.toUpperCase + "/" + type + ".png"
    }
    return { "error": "image could not be retrieved" }
}

function getISOLocal(values, iso) {
    data = []
    if (iso == undefined) {
        for (var x = 0; x < values.length; x++) {
            data.push({ "iso": values[x].iso_code, "location": values[x].location })
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

function getTodayDate() {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var today = new Date(utc + (3600000 * '-8'));
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today
}

function getDataLocal(values, date, iso) {
    data = []
    if (date == undefined && iso == undefined) {
        for (var x = 0; x < values.length; x++) {
            dictio = (values[x].data)[(values[x].data).length - 1]
            dictio.iso_code = values[x].iso_code
            data.push(dictio)
        }
        return data
    }
    else if (date != undefined && iso == undefined) {
        for (var x = 0; x < values.length; x++) {
            for (var y = 0; y < values[x].data.length; y++) {
                if ((values[x].data)[y].date == date) {
                    dictio = (values[x].data)[y]
                    dictio.iso_code = values[x].iso_code
                    data.push(dictio)
                    break
                }
            }
        }
        return data
    }
    else if (date == undefined && iso != undefined) {
        for (var x = 0; x < values.length; x++) {
            if ((values[x].iso_code) == iso.toUpperCase()) {
                dictio = (values[x].data)[(values[x].data).length - 1]
                dictio.iso_code = values[x].iso_code
                data.push(dictio)
                break

            }
        }
        return data
    }
    else if (date != undefined && iso != undefined) {
        for (var x = 0; x < values.length; x++) {
            for (var y = 0; y < values[x].data.length; y++) {
                if ((values[x].iso_code) == iso.toUpperCase() && (values[x].data)[y].date == date) {
                    dictio = (values[x].data)[y]
                    dictio.iso_code = values[x].iso_code
                    data.push(dictio)
                    break
                }
            }
        }
        return data
    }

}