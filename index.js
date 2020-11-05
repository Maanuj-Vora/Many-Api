const express = require("express");
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

    result = coronavirus.getImage(iso, type)

    if (result.constructor == Object) {
        response.send(result)
    }
    else {
        response.sendFile(result, {
            root: __dirname
        })
    }
})
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

const listener = app.listen(port, function () {
    console.log("Your app is listening on port " + listener.address().port);
});