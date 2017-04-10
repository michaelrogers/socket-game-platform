// const sketch = require('./sketch.js');
// import sketch from './sketch.js';

// document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    // setup();

    //DataPackage Constructor    
    function DataPackage(data = null, playerId = null) {
        this.roomId = roomId;
        this.data = data;
        this.playerId = playerId;
        this.timestamp = Date.now();
    }

    const requestJoinRoom = () => {
        sessionStorage.setItem('room-id', roomId);
        playerSelection = 0;
        $('#player-selection').val("0");
        socket.emit('room', new DataPackage());
    }

    const inputEventHandler = (DataPackage) => {
        console.log(DataPackage);
        playerInput(DataPackage.playerId, DataPackage.data)

    }
    
    //Client initialization
    const connection = () => {
        $('input[name="room-id"]').val(roomId);
        
        
        // Transmit
        socket.emit('room',  new DataPackage());
        
        window.addEventListener('keydown', (e) => {
            if (playerSelection > 0) {
                const acceptedKeys = [38, 37, 39, 40, 32];
                if (acceptedKeys.indexOf(e.keyCode) !== -1) {
                    e.preventDefault();
                    socket.emit('input', new DataPackage(e.keyCode, playerSelection));
                }
            }
        });

        $('#player-selection').on('change', (e) => {
            playerSelection = $('#player-selection').val();
            
        });

        $('#room-id-button').on('click', (e) => {
            roomId = $('input[name="room-id"]').val();
            $('#messages').empty();
            requestJoinRoom();
        });

        $('#message-button').on('click', (e) => {
            e.preventDefault();
            socket.emit( 'chat-message', new DataPackage($('#message-input').val()) );
            $('#message-input').val('');

            requestJoinRoom();
            
        });

    }
    let playerSelection = 0;
    let roomId = sessionStorage.getItem('room-id') || 0;
    connection();

    // $('form').submit(e => e.preventDefault())

    // Receive
    socket.on('connection-status', (status) => {
        $('#messages').append($('<li>').text(status));
    });
    socket.on('chat-message', (message) => {
        $('#messages').append($('<li>').text(message));
    });

    socket.on('input', inputEventHandler);



// });


/*
## Matchmaking
[ ] Setup a server side receipt of 'join-game' message
* May only need to expose the available room numbers in the lobby, if none, auto generate 
[ ] Store room-id and player-ids in mongoDB

[ ] Use mongoDB game info to populate lobby

*/

/*
## Game (in unique room)
### Pregame
[ ] Once sufficient number of people join the room, the server will have a callback to count number of joined players (controllers) and compare to the required amount
### During Game
[ ] Clients send certain events to the room
    * For player controlling pinata, the server can keep the last known Y position to compare with the Swing event once it is emited
    * Swing event is emitted from the client to server
[ ] Server evaluates last known valid Y position against the approximate Y position of the swing once it crosses an X threshold
    * if within the valid range: hit
    * if not: miss
### connection
    If one player disconnects; other player wins? Or allow time to rejoin?
*/