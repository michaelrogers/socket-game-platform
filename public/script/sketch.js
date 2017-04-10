// const sketch = () => {

// $('#canvas-container').ready(() =>  {
// if ($('#canvas-container').length) {
function setup() {
    const canvas = createCanvas(640, 480);
    canvas.parent('canvas-container');
    background(255, 0, 200);

  }
  function draw() { 
    moveCoordinate("1", 0, 0);
    moveCoordinate("2", 0, 0);
    
  }

const resetGame = () => {
  console.log('Ran');
  // remove();
  setup();
}

const moveCoordinate = (player, xMovement, yMomvement) => {
  if (player == '2') {
    fill(0); 
    player2.x += xMovement;
    player2.y += yMomvement;
    ellipse(player2.x, player2.y, 80, 80);

  } else {
    fill(255);
    player1.x += xMovement;
    player1.y += yMomvement;
    ellipse(player1.x, player1.y, 80, 80);

  }

}

let player1 = { x: 40, y: 50 }
let player2 = { x: 500, y: 50 }
const increment = 10;

const playerInput = (player, keyCode) => {
  const playerCoordinates = player == "1" ? player1 : player2; 
  console.log(keyCode);
  
  switch(keyCode) {
    //ArrowLeft
    case 37: return moveCoordinate(player, -increment, 0); 
    //ArrowRight
    case 39: return moveCoordinate(player, increment, 0); 
    //ArrowUp
    case 38: return moveCoordinate(player, 0, -increment); 
    //ArrowDown
    case 40: return moveCoordinate(player, 0, +increment); 
    //Space
    case 32: return resetGame();

    default: break;
  }


  ellipse(50, 50, 80, 80);
  
}


// }
// });
// module.exports = playerInput;

// }

// export default sketch;