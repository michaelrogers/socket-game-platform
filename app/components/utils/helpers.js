import axios from 'axios';

const helpers = {

    runQuery : (long_url) => {
        let bitlyToken = 'f707841cb08536c98723f28ac1d64de1c7dc0162';
        let queryURL = "https://api-ssl.bitly.com/v3/shorten?access_token=" + bitlyToken + "&longUrl=" + long_url;

        return axios.get(queryURL).then(function(apiResponse) {
          // console.log("axios long url: " + long_url);
          // console.log(apiResponse);
          // console.log("axios shortened url: " + apiResponse.data.data.url)
          return apiResponse.data.data;
        });
    },

    viewActiveGames: () => {
        return axios.get("api/game/")
        .then(function(response) {return response; });
    },
    createNewGame: (playerId) => {
        return axios.post(`api/game/create/${playerId}`)
        .then(response => {
            return response.data;
        });
    },
    removeGame: (gameId) => {
        return axios.post(`api/game/remove/${gameId}`)
        .then(response => response.data);
    },
    
    completeGame: (gameId) => {
        return axios.get(`api/game/complete/${gameId}`)
        .then(response => {
            return response;
        });
    },

    joinGame: (gameId, playerId) => {
        return axios.post(`api/game/join/${gameId}/${playerId}`)
        .then(response => {
            return response.data;
        });
    },
    createNewPlayer: (playerName) => {
        return axios.post(`api/player/create/${playerName}`)
        .then(response => {
            sessionStorage.clear();
            sessionStorage.setItem('player-id', response.data._id);
            sessionStorage.setItem('username', response.data.name);
            return response.data;
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
