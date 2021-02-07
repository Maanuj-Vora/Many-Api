const express = require("express");
const path = require('path');
const app = express();

const port = 5000;

app.use(express.urlencoded({
    extended: false
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is booming on port 5000
Visit http://localhost:` + listener.address().port);
});

app.get("/", (req, res) => {
    res.send({
        "welcome": "Welcome to Many Api",
        "about": "This api has been created by Maanuj Vora",
        "link": "Visit here to get more up to speed https://github.com/Maanuj-Vora/Many-Api",
        "possible paths": [
            '/atla-quote', '/jokes', '/tweets', '/coronavirus', '/marvel-quote'
        ],
        "documentation": "Documentation coming soon"
    });
});

/* Avatar The Last Airbender Api Start */
var atlaQuotes = require('./apiMethods/atla-quotes');

app.get("/atla-quote", function (request, response) {
    response.send(atlaQuotes.getInfo())
});

app.get("/atla-quote/all", function (request, response) {
    response.send(atlaQuotes.getAll())
});

app.get("/atla-quote/random", function (request, response) {
    response.send(atlaQuotes.getRandom())
});

app.get("/atla-quote/amount", function (request, response) {
    const {
        amount
    } = request.query
    response.send(atlaQuotes.getAmount(amount))
});

app.get("/atla-quote/author", function (request, response) {
    const {
        author
    } = request.query
    response.send(atlaQuotes.getAuthor(author))
});
/* Avatar The Last Airbender Api End */


/* Jokes Api Start */
var jokes = require('./apiMethods/jokes');

app.get("/jokes", function (request, response) {
    response.send(jokes.getInfo())
});

app.get("/jokes/random", function (request, response) {
    response.send(jokes.getRandom())
});

app.get("/jokes/amount", function (request, response) {
    const {
        amount
    } = request.query
    response.send(jokes.getAmount(amount))
});
/* Jokes Api End */

/* Tweet Api Start */
var tweet = require('./apiMethods/tweets');

app.get("/tweets", function (request, response) {
    response.send(tweet.getInfo())
});

app.get("/tweets/random", function (request, response) {
    const {
        account
    } = request.query
    response.send(tweet.getRandom(account))
});

app.get("/tweets/amount", function (request, response) {
    const {
        amount
    } = request.query
    const {
        account
    } = request.query
    response.send(tweet.getAmount(account, amount))
});
/* Tweet Api End */

/* Coronavirus Api Start */
var coronavirus = require('./apiMethods/coronavirus');

app.get("/coronavirus", function (request, response) {
    response.send(coronavirus.getInfo())
});

app.get("/coronavirus/all", function (request, response) {
    // response.send(coronavirus.getAll())
    response.send({
        "status": "Currently Not Available"
    })
});

app.get("/coronavirus/getData", function (request, response) {
    const {
        date
    } = request.query
    const {
        iso
    } = request.query
    response.send(coronavirus.getData(date, iso))
});

app.get("/coronavirus/getISO", function (request, response) {
    const {
        iso
    } = request.query
    response.send(coronavirus.getISO(iso))
});

app.get("/coronavirus/getCountry", function (request, response) {
    const {
        country
    } = request.query
    response.send(coronavirus.getCountry(country))
});

app.get("/coronavirus/getImage", function (request, response) {
    const {
        iso
    } = request.query
    const {
        type
    } = request.query
    require('request').get(coronavirus.getImage(iso, type)).pipe(response)
});
/* Coronavirus Api End */

/* Marvel Quotes Api Start */
var marvelQuotes = require('./apiMethods/marvel-quotes');

app.get("/marvel-quote", function (request, response) {
    response.send(marvelQuotes.getInfo())
});

app.get("/marvel-quote/all", function (request, response) {
    response.send(marvelQuotes.getAll())
});

app.get("/marvel-quote/random", function (request, response) {
    response.send(marvelQuotes.getRandom())
});

app.get("/marvel-quote/amount", function (request, response) {
    const {
        amount
    } = request.query
    response.send(marvelQuotes.getAmount(amount))
});
/* Marvel Quotes Api End */

/* Pokemon Api Start */
var pokemon = require('./apiMethods/pokemon');

app.get("/pokemon", function (request, response) {
    response.send(pokemon.getInfo())
});

app.get("/pokemon/random", function (request, response) {
    response.send(pokemon.getRandom())
});

app.get("/pokemon/getPokemon", function (request, response) {
    const {
        name
    } = request.query
    const {
        number
    } = request.query
    response.send(pokemon.getPokemon(name, number))
});

app.get("/pokemon/getArtwork", function (request, response) {
    const {
        name
    } = request.query
    require('request').get(pokemon.getArtwork(name)).pipe(response)
});

app.get("/pokemon/getSprite", function (request, response) {
    const {
        name
    } = request.query
    require('request').get(pokemon.getSprite(name)).pipe(response)
});
/* Pokemon Api End */

/* Garfield Api Start */
var garfield = require('./apiMethods/garfield');

app.get("/garfield", function (request, response) {
    response.send(garfield.getInfo())
});

app.get("/garfield/random", function (request, response) {
    response.send(garfield.getRandom())
});

app.get("/garfield/random/image", function (request, response) {
    require('request').get(garfield.getRandomImage()).pipe(response)
});

app.get("/garfield/daily", function (request, response) {
    require('request').get(garfield.getDaily()).pipe(response)
});
/* Garfield Api End */

/* Calvin and Hobbes Api Start */
var calvinhobbes = require('./apiMethods/calvinhobbes');

app.get("/calvinhobbes", function (request, response) {
    response.send(calvinhobbes.getInfo())
});

app.get("/calvinhobbes/random", function (request, response) {
    response.send(calvinhobbes.getRandom())
});

app.get("/calvinhobbes/random/image", function (request, response) {
    require('request').get(calvinhobbes.getRandomImage()).pipe(response)
});

app.get("/calvinhobbes/daily", function (request, response) {
    require('request').get(calvinhobbes.getDaily()).pipe(response)
});
/* Calvin and Hobbes Api End */

const listener = app.listen(port, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/404.html'))
});