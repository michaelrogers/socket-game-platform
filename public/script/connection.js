document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let timeoutVariable;
    let acceptingData = true;
    // const requestJoinRoom = () => {
    //     sessionStorage.setItem('room-id', roomId);
    //     // playerSelection = 0;
    //     // $('#player-selection').val("0");
    //     socket.emit('room', new DataPackage());
    // }

    // const inputEventHandler = (DataPackage) => {

    //     var data = DataPackage.data;

    //     // get y and x acceleration component
    //     var a_y = data.acc.y;
    //     var a_x = data.acc.x;

    //     // vector magnitude and acceleration when provided with x and y acceleration components
    //     var mag  = Math.sqrt(Math.pow(a_y, 2) + Math.pow(a_x, 2));
    //     var alpha = Math.atan(a_x/a_y)*(180/Math.PI);
    //     console.log(alpha)
        
    //     updateSpring(mag, alpha)
    // }

    //DataPackage Constructor    
    function DataPackage(roomId, data = null, dataType = null, playerId = null, playerSelection = null) {
        this.roomId = roomId;
        this.data = data;
        this.dataType = dataType;
        this.playerId = playerId;
        this.playerSelection = playerSelection;
        this.timestamp = Date.now();
    }
    
    //Client initialization
    const connection = () => {
        // $('input[name="room-id"]').val(roomId);
        const [roomId, playerSelection, playerId] = [
            sessionStorage.getItem('room-id'),
            sessionStorage.getItem('player-selection'),
            sessionStorage.getItem('player-id'),
        ];
        // Transmit
        socket.emit('room',  new DataPackage(roomId));

        window.addEventListener('devicemotion', (e) => {
            // get phone acceleration components
            if (acceptingData) {
                acceptingData = false;
                timeoutVariable = setTimeout(() => {
                    acceptingData = true;
                }, 50);
//
            let a_x = event.accelerationIncludingGravity.x;
            let a_y = event.accelerationIncludingGravity.y;
            let a_z = event.accelerationIncludingGravity.z;
            
            // compile acceleration componenets in one acceleration object
            let data = {
                acc: {
                    x: a_x,
                    y: a_y,
                    z: a_z
                }
            }

            e.preventDefault();
            // send acceleration components to 'input' socket
            socket.emit('input', new DataPackage(roomId, data, 'acceleration', playerId, playerSelection));
            }
        }, true);

        // testBtn.onclick = () => {
        //     let a_x = 1;
        //     let a_y = -40;
        //     let a_z = 1;
            
        //     // compile acceleration componenets in one acceleration object
        //     let data = {
        //         acc: {
        //             x: a_x,
        //             y: a_y,
        //             z: a_z
        //         }
        //     }

        //     // send acceleration components to 'input' socket
        //     socket.emit('input', new DataPackage(roomId, data, 'acceleration', playerId, playerSelection));
        // }

        startGameBtn.onclick = () => {
                console.log('clickeeeedddd in connection')
                let data = {
                    roomId: gameId,
                    result: 1,
                    type: 'gameStart'
                }
                console.log(data)
                startGameBtn.disabled = true;
                socket.emit('admin', data);
            }

    }
    connection();
    
    
    // Receive
    socket.on('connection-status', (status) => {

    });
    socket.on('chat-message', (message) => {
        
    });

    socket.on('input', inputEventHandler);

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