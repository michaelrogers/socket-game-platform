'use strict';
console.log('hello world');
console.log('location',window.location.href);

const url = window.location.href.split('/');

const gameId = url[4];
const playerId = url[5];

console.log('game id', gameId);
console.log('player id', playerId);