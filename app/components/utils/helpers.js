import axios from 'axios';

const helpers = {
    viewActiveGames: () => {
        return axios.get("api/game/")
        .then(function(response) {
              return response;
      });
    },
    createNewGame: (playerId) => {
        return axios.post(`api/game/create/${playerId}`)
        .then(response => {
            return response;
        });
    },
    joinGame: (gameId) => {
        return axios.post(`api/game/join/${gameId}`)
        .then(response => { 
            return response;
        });
    },
    createNewPlayer: (playerName) => {
        return axios.post(`api/player/create/${playerName}`)
        .then(response => {
            sessionStorage.clear();
            sessionStorage.setItem('player-id', response.data._id);
            sessionStorage.setItem('username', response.data.name);
        })
    },
    login: (playerName) => {
        return axios.get(`api/player/fetchone/${playerName}`)
        .then(response => {
            sessionStorage.clear();
            sessionStorage.setItem('player-id', response.data._id);
            sessionStorage.setItem('username', response.data.name);
        });
    }
}

export default helpers;