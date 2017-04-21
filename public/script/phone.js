'use strict';

const url = window.location.href.split('/');

const [gameId, playerId, playerSelection] = [url[4], url[5], url[6]];
sessionStorage.setItem('room-id', gameId);
sessionStorage.setItem('player-id', playerId);
sessionStorage.setItem('player-selection', playerSelection);

console.log(gameId, playerId, playerSelection)

const startGameBtn = document.getElementById('startGame');
const testBtn = document.getElementById('testBtn')
// document.getElementById('startGame').onclick = () => {
//   console.log('clickeeeedddd')
// }