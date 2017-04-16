'use strict';
// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const port = process.env.PORT || 3000;
const sockets = require('./sockets.js').listen(port, app);

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socket-game-platform");
const db = mongoose.connection;
// Show any mongoose errors
db.once("open", () => { console.log("Mongoose connection successful."); });
db.on("error", (error) => { console.log("Mongoose Error:", error); });


// Use morgan and body parser with our app
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get('/testFone', function(req, res) {
  console.log('yeah boyyyy')
  res.sendFile(path.join(__dirname, '/public/fone.html'))
})

const routes = require('./routes');
for (let route in routes) {
  app.use(route, routes[route]);
}


//Server side react? Maybe.
// const React = require('react');