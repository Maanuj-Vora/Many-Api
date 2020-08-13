const express = require("express");
const app = express();

const port = 5000;

app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    console.log(`Server is booming on port 5000
Visit http://localhost:`+listener.address().port);
});

app.get("/", (req, res) => {
    res.send({
        "welcome": "Welcome to Many Api",
        "about": "This api has been created by Maanuj Vora",
        "link": "Visit here to get more up to speed https://github.com/Maanuj-Vora/Many-Api",
        "documentation": "Documentation coming soon!"
    });
});

// // Mock APIs
// app.get("/users", (req, res) => {
//     res.json([
//         { name: "William", location: "Abu Dhabi" },
//         { name: "Chris", location: "Vegas" }
//     ]);
// });

// app.post("/user", (req, res) => {
//     const { name, location } = req.body;

//     res.send({ status: "User created", name, location });
// });

/* Avatar The Last Airbender Api Start */
var atlaQuotes = require('./apiMethods/atla-quotes');

app.get("/atla-quote", function (request, response) {
    response.send(atlaQuotes.getAll())
});

app.get("/atla-quote/random", function (request, response) {
    response.send(atlaQuotes.getRandom())
});

app.get("/atla-quote/amount", function (request, response) {
    const { amount } = request.query
    response.send(atlaQuotes.getAmount(amount))
});

app.get("/atla-quote/author", function (request, response) {
    const { author } = request.query
    response.send(atlaQuotes.getAuthor(author))
});
/* Avatar The Last Airbender Api End */

const listener = app.listen(port, function () {
    console.log("Your app is listening on port " + listener.address().port);
});