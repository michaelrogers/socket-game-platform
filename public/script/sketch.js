var img;
var star;
var pinata;
var y;
//-------------Spring--------------
// Spring drawing constants for top bar
var ready = true;
var springHeight = 32,
    left,
    right,
    maxHeight = 800,
    minHeight = 100,
    over = false,
    move = false;

// Spring simulation constants
var M = 8,  // Mass
    K = 0.2,  // Spring constant
    D = 0.92, // Damping
    R = 600;  // Rest position

// Spring simulation variables
var ps = R,   // Position
    vs = 0.0, // Velocity
    as = 0,   // Acceleration
    f = 0;    // Force

//-------------end Spring--------------
// function preload() {  // preload() runs once
//   img = loadImage("assets/image/small_rectangle.png");
//   pinataImg = loadImage("assets/image/flappy_pipe.png");
// }

function setup() {
  var myCanvas = createCanvas(800, 1000);
  myCanvas.parent('canvas'); 
  // ----------setup spring----------
  rectMode(CORNERS);
  noStroke();
  left = width/2 - 100;
  right = width/2 + 100;
}


function draw() {
  background(200,200,200,200);  
  
  // ---spring---
  updateSpring();
  drawSpring();


  drawSprites();
}

function drawSpring() {
  // Draw base
  fill(0.2);
  var baseWidth = 20;
  rect(width/2 - baseWidth, 0, width/2 + baseWidth, ps + springHeight);

  // Set color and draw top bar
    fill(600);

  rect(left, ps + springHeight , right, ps + springHeight + 20);
}

function updateSpring(y) {
  // Update the spring position
  if ( y > -30 ) {
    // console.log('al;j', y)
    f = -K * ( ps - R ); // f=-ky
    as = f / M;          // Set the acceleration, f=ma == a=f/m
    vs = D * (vs + as);  // Set the velocity
    ps = ps + vs;        // Updated position
  }

  if ( abs(vs) > 5) {
    ready = false;
  } else { ready = true}
  if (abs(vs) < 0.1) {
    vs = 0.0;
  }


  // Set and constrain the position of top bar
  if (y < -30 && ready) {
    $('.accData').append($('<li>').text("Y acc: " + y))
    ps = y*0.5;
    ps = constrain(ps, minHeight, maxHeight);
  }
}

// function setup() {
//     const canvas = createCanvas(640, 480);
//     canvas.parent('canvas-container');
//     background(255, 0, 200);

//   }
//   function draw() {
    
//   }

// const resetGame = () => {
//   console.log('Ran');
//   // remove();
//   setup();
// }

// const updateKey = (data, dataType) => {
//   switch(dataType) {
//     case 'keyCode':
//       $('#keyData').text(data);
//       break;

//     case 'acceleration':
//       $('#y-axis').text(data)
//       break;

//     default: break;
//   }
  
// }

// const moveCoordinate = (player, xMovement, yMomvement) => {
//   if (player == '2') {
//     fill(0); 
//     player2.x += xMovement;
//     player2.y += yMomvement;
//     ellipse(player2.x, player2.y, 80, 80);

//   } else {
//     fill(255);
//     player1.x += xMovement;
//     player1.y += yMomvement;
//     ellipse(player1.x, player1.y, 80, 80);

//   }

// }

// let player1 = { x: 40, y: 50 }
// let player2 = { x: 500, y: 50 }
// const increment = 10;

// const playerInput = (player, keyCode) => {
//   const playerCoordinates = player == "1" ? player1 : player2; 
//   console.log(keyCode);
  
//   switch(keyCode) {
//     //ArrowLeft
//     case 37: return moveCoordinate(player, -increment, 0); 
//     //ArrowRight
//     case 39: return moveCoordinate(player, increment, 0); 
//     //ArrowUp
//     case 38: return moveCoordinate(player, 0, -increment); 
//     //ArrowDown
//     case 40: return moveCoordinate(player, 0, +increment); 
//     //Space
//     case 32: return resetGame();

//     default: break;
//   }


//   ellipse(50, 50, 80, 80);
  
// }