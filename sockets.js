/*
** Lobby data routes

1. On quick match
    Server finds available games and returns a gameId to the client and joins them to the room. Updates game database with playerId
    If no game is found, server generates a guid for a new game, inserts a new document into the db

2. On lobby match population
    When a new match is created, server emits to clients that there has been a new database update.
        Should clients read the DB or should the emit pass the new DB document to update the lobby listing?
        Clients will listen for changes for lobby Updates

3. Usernames
    Either through authentication
    or writing name/playerId to the users local storage

4. Separate socket channels into socket.js file

5. Create schemas for player and game

6. Create data routes for CRU methods

7. Integrate routes with React

8. Figure out how to deploy react + node





*/



// app.get('/', (req, res) => {
//   res.sendFile('public/index.html')
// });

module.exports = {
    listen: (port, app) => {
        const http = require('http').Server(app);
        const io = require('socket.io')(http);
        http.listen(port, () => console.log(`App listening on port ${port}!`));
        const connectionCount = (socket) => {
            try {
                if (socket && socket.server) {
                console.log('Player Count:',
                    socket.server.engine.clientsCount);
                    console.log(socket.server.engine.clientsCount)
                    io.emit('player:count', socket.server.engine.clientsCount);
                }
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
                io.sockets.in(DataPackage.roomId).emit('input', DataPackage);
            });

            // io.to('5000').emit('chat-message', 'Secret channel');
        }); //End connection

    }
}

