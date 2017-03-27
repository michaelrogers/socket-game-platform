'use strict';
// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

// Set mongoose to leverage built in JavaScript ES6 Promises
const port = process.env.PORT || 3000;
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socket-game-platform");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", (error) => {
  console.log("Mongoose Error:", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});

// Use morgan and body parser with our app
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));
// app.get('/', (req, res) => res.sendFile('index.html'));



//Server side react? Maybe.
const React = require('react');

const http = require('http').Server(app);
const io = require('socket.io')(http);

//Server side
let connectedUserCount = 0;


io.on('connection', function(socket) {
    console.log(++connectedUserCount);
    socket.emit('chat-message', 'New User joined');
    socket.on('chat-message', function(msg){
        io.emit('chat-message', msg);
    });
    socket.on('disconnect', () => {
        console.log(--connectedUserCount);
        io.emit('chat-message', 'User Left');
    });
    io.to('5000').emit('chat-message', 'Secret channel');
});

http.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
