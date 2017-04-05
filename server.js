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
db.once("open", () => { console.log("Mongoose connection successful."); });
db.on("error", (error) => { console.log("Mongoose Error:", error); });


// Use morgan and body parser with our app
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//Server side react? Maybe.
const React = require('react');

const http = require('http').Server(app);
const io = require('socket.io')(http);
http.listen( port, () => console.log(`App listening on port ${port}!`) );

const connectionCount = (socket) => {
  try  {
    console.log('Player Count:',
    socket.server.engine.clientsCount);
  } catch (e) { console.log(e); }
};

const leaveRooms = (socket) => {
  try {
    // Leave all rooms the socket is in
    const roomIdArray = Object.keys(socket.rooms);
    roomIdArray.forEach(room => {
      socket.leave(room);
      io.sockets.in(room).emit('connection-status', 'User Left');
    });
  } catch (e) { console.log(e); }
};
 
io.on('connection', (socket) => {
    //--------------Connection-status-----------------
    connectionCount(socket);
    // socket.emit('connection-status', 'New User joined');
    
    socket.on('disconnect', (socket) => {
      connectionCount(socket);
      leaveRooms(socket);
    });

    //--------------Data--channels---------------------
    //A client requests to join a room and the server joins them
    socket.on('room', (DataPackage) => {
      leaveRooms(socket);
      // Then join the specified room
      socket.join(DataPackage.roomId);
      io.sockets.in(DataPackage.roomId).emit('connection-status', `New player joined room ${DataPackage.roomId}`)
    });
    //Note: No auto teardown of sockets necessary
    socket.on('chat-message', (DataPackage) => {
      io.sockets.in(DataPackage.roomId).emit('chat-message', DataPackage.data);
    });
    
    // Relay device input to all connected clients in the room
    socket.on('input', (DataPackage) => {
      console.log('package,',DataPackage)
      io.sockets.in(DataPackage.roomId).emit('input', DataPackage);
    });

    // io.to('5000').emit('chat-message', 'Secret channel');
}); //End connection

