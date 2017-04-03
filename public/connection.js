document.addEventListener('DOMContentLoaded', () => {
   

    const socket = io();
    //DataPackageConstructor    
    function DataPackage(data = null, playerId = null) {
        this.roomId = roomId;
        this.data = data;
        this.playerId = playerId;
        this.timestamp = Date.now();
    }
    
    //Client initialization
    const connection = () => {
        $('input[name="room-id"]').val(roomId);
        socket.emit('room',  new DataPackage());
        
        window.addEventListener('keydown', (e) => {
            const acceptedKeys = [38, 37, 39, 40, 32];
            if (acceptedKeys.indexOf(e.keyCode) !== -1) {
                socket.emit('input', new DataPackage(e.keyCode));
            }
        });

        $('#room-id-button').on('click', (e) => {
            roomId = $('input[name="room-id"]').val();
            sessionStorage.setItem('room-id', roomId);
            socket.emit('room', new DataPackage());
        });

            $('#message-button').on('click', (e) => {
            e.preventDefault();
            // $('#messages').append($('<li>').text(data.message));
            socket.emit( 'chat-message', new DataPackage($('#m').val()) );
            $('#m').val('');
        });

    }
    let roomId = sessionStorage.getItem('room-id') || 0;
    
    connection();

    $('form').submit(e => e.preventDefault())

    // Front End updates
    socket.on('connection-status', (status) => {
        $('#messages').append($('<li>').text(status));
    });
    socket.on('chat-message', (message) => {
        $('#messages').append($('<li>').text(message));
    });

    socket.on('input', (data) => {
        $('#messages').prepend($('<li>').text(data));
    });

});


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