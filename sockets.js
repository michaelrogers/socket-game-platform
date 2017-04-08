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