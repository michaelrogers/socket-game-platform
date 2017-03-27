document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    let roomId = sessionStorage.getItem('room-id') || 101010;
    console.log(roomId )
    socket.on('connection', function(socket){
         socket.join(roomId.toString());
    });
    

    $('form').submit(function(e){
        e.preventDefault()
        socket.emit('chat-message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat-message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('disconnect', function(socket){
        socket.emit('chat-message', 'User disconnected');
    });
});
