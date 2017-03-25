'use strict';
// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const React = require('react');

const port = process.env.PORT || 3000;
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/week18newsscraper");
const db = mongoose.connection;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// const routes = require('./routes');
// for (let route in routes) {
//   app.use(route, routes[route]);
// }

app.get('/', sendFile('public/index.html'));

// Show any mongoose errors
db.on("error", (error) => {
  console.log("Mongoose Error:", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});

//Set template engine
// app.engine(
//     "handlebars",
//     exphbs(
//         { defaultLayout: "main" }
//     )
// );
// app.set("view engine", "handlebars");

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
