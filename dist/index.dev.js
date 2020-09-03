"use strict";

var express = require("express");

var app = express();
var port = 5000;
app.use(express.urlencoded({
  extended: false
}));
app.listen(process.env.PORT, function () {
  console.log("Server is booming on port 5000\nVisit http://localhost:" + listener.address().port);
});
app.get("/", function (req, res) {
  res.send({
    "welcome": "Welcome to Many Api",
    "about": "This api has been created by Maanuj Vora",
    "link": "Visit here to get more up to speed https://github.com/Maanuj-Vora/Many-Api",
    "possible paths": ['/atla-quotes', '/jokes', '/tweets', '/coronavirus'],
    "notes": "If you add an extra frontslash in the end, the api will not be functionable",
    "documentation": "Documentation coming soon"
  });
});
/* Avatar The Last Airbender Api Start */

var atlaQuotes = require('./apiMethods/atla-quotes');

app.get("/atla-quote", function (request, response) {
  response.send(atlaQuotes.getInfo());
});
app.get("/atla-quote/all", function (request, response) {
  response.send(atlaQuotes.getAll());
});
app.get("/atla-quote/random", function (request, response) {
  response.send(atlaQuotes.getRandom());
});
app.get("/atla-quote/amount", function (request, response) {
  var amount = request.query.amount;
  response.send(atlaQuotes.getAmount(amount));
});
app.get("/atla-quote/author", function (request, response) {
  var author = request.query.author;
  response.send(atlaQuotes.getAuthor(author));
});
/* Avatar The Last Airbender Api End */

/* Jokes Api Start */

var jokes = require('./apiMethods/jokes');

app.get("/jokes", function (request, response) {
  response.send(jokes.getInfo());
});
app.get("/jokes/random", function (request, response) {
  response.send(jokes.getRandom());
});
app.get("/jokes/amount", function (request, response) {
  var amount = request.query.amount;
  response.send(jokes.getAmount(amount));
});
/* Jokes Api End */

/* Tweet Api Start */

var tweet = require('./apiMethods/tweets');

app.get("/tweets", function (request, response) {
  response.send(tweet.getInfo());
});
app.get("/tweets/random", function (request, response) {
  var account = request.query.account;
  response.send(tweet.getRandom(account));
});
app.get("/tweets/amount", function (request, response) {
  var amount = request.query.amount;
  var account = request.query.account;
  response.send(tweet.getAmount(account, amount));
});
/* Tweet Api End */

/* Coronavirus Api Start */

var coronavirus = require('./apiMethods/coronavirus');

app.get("/coronavirus", function (request, response) {
  response.send(coronavirus.getInfo());
});
app.get("/coronavirus/all", function (request, response) {
  // response.send(coronavirus.getAll())
  response.send({
    "status": "Currently Not Available"
  });
});
app.get("/coronavirus/getData", function (request, response) {
  var date = request.query.date;
  var iso = request.query.iso;
  response.send(coronavirus.getData(date, iso));
});
app.get("/coronavirus/getISO", function (request, response) {
  var iso = request.query.iso;
  response.send(coronavirus.getISO(iso));
});
app.get("/coronavirus/getCountry", function (request, response) {
  var country = request.query.country;
  response.send(coronavirus.getCountry(country));
});
/* Coronavirus Api End */

var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});