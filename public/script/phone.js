'use strict';

const url = window.location.href.split('/');

const [gameId, playerId, playerSelection] = [url[4], url[5], url[6]];
sessionStorage.setItem('room-id', gameId);
sessionStorage.setItem('player-id', playerId);
sessionStorage.setItem('player-selection', playerSelection);

console.log(gameId, playerId, playerSelection)

const startGameBtn = document.getElementById('startGame');
const testBtn = document.getElementById('testBtn');

//detect player selection
const getImgSrc = (playerSelection) => {
    if(playerSelection == 1) {
        //player role is bat
        return "/img/arm125.png";
    } else if (playerSelection == 0) {
        //player role is bird
        return "/img/bird-sm.png"
    }
};

//create image element
const buildImageElem = () => {
    let imgElem = document.createElement("img");
    imgElem.src = getImgSrc(playerSelection);
    document.getElementById("spriteImage").appendChild(imgElem);
};

//run above function
buildImageElem();