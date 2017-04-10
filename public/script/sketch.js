//-------------Spring--------------
// Spring drawing constants for top bar
const springHeight = 32;
let read = true,
  left, 
  right,
  maxHeight = 800,
  minHeight = 100;

// Spring simulation constants
const M = 8,  // Mass
    K = 0.2,  // Spring constant
    D = 0.92, // Damping
    R = 600;  // Rest position

// Spring simulation variables
let ps = R,   // Position
    vs = 0.0, // Velocity
    as = 0,   // Acceleration
    f = 0;    // Force

//arm & bat swing variables
let batX, batY, swingAngle, calcAngle;

//----preload images----
function preload() {
  arm = loadImage('../images/arm125.png')
}

function setup() {
  var myCanvas = createCanvas(800, 1000);
  myCanvas.parent('canvas'); 
  // ----------setup spring----------
  rectMode(CORNERS);
  noStroke();
  left = width/2 - 100;
  right = width/2 + 100;
  //-----------setup bat swing---------
  calcAngle = 0; //
  swingAngle = 0;
  batX = width - 100; //x-position of bat sprite, to right side of screen
  batY = R + 100; //y-position of bat sprite, equal to pinata resting
  bat = createSprite(batX, batY, 20, 100);
  bat.shapeColor = color(128);
  bat.addImage(arm)
}


function draw() {
  background(200,200,200,200);  
  
  // ---spring---
  updateSpring();
  drawSpring();

  //---swing animation---
  batSwing(); //found in batSwing.js

  //display sprites
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

function updateSpring(mag, alpha) {
  mag= -mag;

  // Update the spring position
  if ( mag > -30 ) {
    f = -K * ( ps - R ); // f=-ky
    as = f / M;          // Set the acceleration, f=ma == a=f/m
    vs = D * (vs + as);  // Set the velocity
    ps = ps + vs;        // Updated position
  }

  Math.abs(vs) > 5 ? ready = false : ready = true;

  if (Math.abs(vs) < 0.1) {
    vs = 0.0;
  }

  // Set and constrain the position of top bar
  if (mag < -30 && ready) {
    $('.accData').append($('<li>').text("Y acc: " + alpha))
    ps = mag*0.5
    ps = constrain(ps, minHeight, maxHeight);
  }
}