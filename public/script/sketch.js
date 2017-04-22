var bubbles = [];
var hot_air_ballon;
var backImg;
var ufo;
var spidy;
var cow;
var cowSecured = false

// let timeoutVariable;
// let acceptingData = true;
// pendulum
const pivot_x = 450; //x-position of sprite, relative to middle of screen
const pivot_y = 0;

let len = 450;

let angle = 0;
const gravity = 0.01;
let acc;
let vel;
let hits = 0;
let batSwings = 0;
let jit = 10;
let pinata;
//arm & bat swing variables
let bat,
  batX,
  batY,
  swingAngle,
  calcAngle;
//-------------Spring--------------
// Spring drawing constants for top bar

let R = 0;

let ready = true;
let springHeight = 32,
  left,
  right,
  maxHeight = 350,
  minHeight = 350,
  over = false,
  move = false;

// Spring simulation constants
const M = 5, // Mass
  K = 3, // Spring constant
  D = 0.7; // Damping

// Spring simulation variables
let ps = 0, // Position   ps = R,
  vs = 0.0, // Velocity
  as = 0, // Acceleration
  f = 0; // Force

// images and sounds
let candies = [];
let sweet = [];
let hitSound = [];
let chicken;
let candyTime = false;
// var dummyImg; // index of dummy images array
// var dummy = []  // pinata before
// var broken = [] // pinata after
// var dummySound = [] // dummy sounds

// preload image to sprite
preload = () => {
  balloon = loadImage('/img/hot_air_balloon.png');
  bubble = loadImage('/img/asteroid1.png')
  backFill = loadImage('/img/moonscape.jpg');
  ufo = loadImage('/img/ufo.png');
  spidy = loadImage('/img/spidy.png')
  cow = loadImage('/img/cow.png')

  dummy = loadImage('/img/bird.png');
  broken = loadImage('/img/bird2.png')
  chicken = loadSound('/sounds/chicken.mp3')
  arm = loadImage('/img/arm125.png');

  //     for (var i=0; i < 3; i++ ) {
  //       dummy[i] = loadImage('/img/dummy' + i + '.png');
  //       broken[i] = loadImage('/img/broken' + i + '.png');
  //       dummySound[i] = loadSound('/sounds/sound' + i + '.mp3')
  //     }

  for (var i = 0; i < 3; i++) {
    sweet[i] = loadImage("/img/sweet" + i + ".png");
  }
  // sounds
  for (var j = 0; j < 6; j++) {
    hitSound[j] = loadSound('/sounds/hit' + j + '.mp3');
  }
}
// console.log('Sketch file loaded')
// *************** //
setup = () => {
  var myCanvas = createCanvas(1000, 700);
  myCanvas.parent('canvas');

  // pivot_x = width / 2 -100; //x-position of sprite, relative to middle of screen
  // pivot_y = 0;

  for (var j=0; j < 9; j++) {
        bubbles[j] = new Bubble();
    }

    hot_air_balloon = new Balloon();
    ufo = new UFO();
    spidy = new Spidy();
    cow = new Cow();

  line(pivot_x, pivot_y, 300, 250);

  // pinata
  pinata = createSprite(pivot_x, pivot_y, 50, 50);
  //     dummyImg = Math.floor(random(0, dummy.length));
  //     pinata.addImage(dummy[dummyImg])
  pinata.addImage(dummy);
  pinata.velocity.y = 0;
  pinata.velocity.x = 0;
  candyTime = false;

  //-----------setup bat swing---------
  calcAngle; //
  swingAngle = -2;
  batX = pivot_x + 300; //x-position of bat sprite, relative to x pos of pinata
  batY = len + 100; //y-position of bat sprite, relative to pinata resting y
  bat = createSprite(batX, batY, 20, 200)
  bat.shapeColor = color(128);
  bat.addImage(arm)
  bat.velocity.x = 0;

  // candies
  for (var i = 0; i < 150; i++) {
    candies.push(new Candy());
  }
}

draw = () => {
  background(0);

  image(backFill, 0, 0, windowWidth, 700);

for (var i=0; i<bubbles.length; i++) {
bubbles[i].move();
bubbles[i].show();
}

hot_air_balloon.move();
hot_air_balloon.show();

if (frameCount >= 1400) {
ufo.move();
ufo.show();
cow.move();
cow.show();
}

if (frameCount >= 600) {
spidy.move();
spidy.show();
}

// on collision
  if (hits < 8) {
    if (bat.overlap(pinata)) {
      jit = 10;
      var rSound = Math.floor(random(0, hitSound.length));
      hitSound[rSound].setVolume(0.5, 2);
      hitSound[rSound].play();
      //         dummySound[dummyImg].setVolume(0.2, 0.6);
      //         dummySound[dummyImg].play();
      chicken.setVolume(0.05);
      chicken.play();
    }
  }

  // what happens after screwing up pinata
  if (hits >= 3) {
    document.getElementById('batWins').click();
    hits = 0;
    candyTime = true;
  } else if (batSwings > 100) {
    document.getElementById('pinataWins').click();
    batSwings = 0;
  }

  if (candyTime) {
    jit = 2;
    len = 345;
    //         pinata.addImage(broken[dummyImg]);
    pinata.addImage(broken);

    for (var i = 0; i < candies.length; i++) {
      candies[i].applyForce();
      candies[i].update();
      candies[i].show();
    }
  }

  pinataSwing();
  drawSprites();
}

// ************************ //

updateSpring = (mag, alpha) => {
  // console.log('Update Spring', mag, alpha)

  mag = -mag;
  // Update the spring position
  if (mag > -30) {
    f = -K * (ps); // f=-ky
    as = f / M; // Set the acceleration, f=ma == a=f/m
    vs += as; // Set the velocity
    vs *= D; // damping
    ps = ps + vs; // Updated position
  }

  if (Math.abs(vs) > 5) {
    ready = false;
  } else {
    ready = true
  }
  if (Math.abs(vs) < 0.1) {
    vs = 0.0;
  }

  // Set and constrain the position of top bar
  if (mag < -30) {

    ps = mag * 0.5;
    mag *= 0.01; // damping
    // angle = alpha*.03;
    ps = constrain(ps, minHeight, maxHeight);
  }

}

pinataSwing = () => {
  acc = -gravity * sin(angle);

  if (angle != 0) {
    pinata.rotation = -(angle * 180 / PI) + random(-jit, jit);
    jit *= 0.995;
  } else {
    jit = 0.3;
    pinata.rotation = random(-jit, jit);
  }

  pinata.velocity.y += acc;
  pinata.velocity.y *= 0.99; // damping oscillation
  angle += pinata.velocity.y;
  pinata.position.x = pivot_x + (len - ps) * sin(angle);
  pinata.position.y = pivot_y + (len - ps) * cos(angle);
  line(pivot_x, pivot_y, pinata.position.x + random(-1, 1), pinata.position.y);
  pinata.addSpeed(pinata.velocity.y, acc);
}

// ******************** //

class Candy {
  constructor() {
    this.pos = createVector(pivot_x - 10, pivot_y + len + 40);

    this.vel = createVector(random(-1, 0.2), random(-2, 0));

    this.vel.mult(random(0, 3))
    this.acc = createVector(0, 0);
    var grav = createVector(0, 0.1);

    this.applyForce = () => {
      this.acc.add(grav);
    }

    this.update = () => {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    this.show = () => {
      noStroke();
      stroke(0);
      strokeWeight(1);
      imageMode(CENTER);
      var randImg = Math.floor(random(0, sweet.length));
      this.img = sweet[randImg];
      image(this.img, this.pos.x, this.pos.y)
    }
  }
}

function Bubble() {
  var bub_x = 0
  var vel_x = random(-1, 1);
  var vel_y = random(-1, 1);

  this.x = random(0, width);
  this.y = random(0, height);

  this.img = bubble;

  this.show = function() {
    stroke(255);
    strokeWeight(1);
    noFill();

    image(this.img, this.x, this.y)
    // ellipse(this.x, this.y, 24, 24)
  }

  this.move = function() {
    if (this.x > width + 100 || this.x < -100) {
      vel_x *= -1 * random(0.2, 2)
    }
    if (this.y > height + 100 || this.y < -100) {
      vel_y *= -1
    }
    this.x += vel_x
    this.y += vel_y
  }
}

function Balloon() {
  hot_air_ballon = this.x;
  var vel = -0.3;

  this.x = windowWidth - 25;
  this.y = 75
  this.img = balloon;

  this.show = function() {
    imageMode(CENTER);
    image(this.img, this.x, this.y)
  }

  this.move = function() {
    if (this.x > windowWidth - random(25, 30) || this.x < 100) {
      vel *= -1;
    }
    this.x += vel + random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
    hot_air_ballon = this.x;
  }

}

function Spidy() {
  var vel = 1.3;

  // this.x = 150;
  this.x = (width/2 - 100)/2.2
  this.y = -100;
  this.endline = -100;
  this.img = spidy;

  this.show = function() {
    stroke(175)
    strokeWeight(2)
    if (this.y < height + 100) {
    line(this.x, 0, this.x, this.y - 80)
    imageMode(CENTER);
    image(this.img, this.x, this.y);
  }
  }

  this.move = function() {
    if (this.y > height/random(1.2,2)) {
        vel *= random(1.8, 2);
    }

    this.y += vel * random(0.5, 1);
  }
}

function UFO() {
  var vel = 1.1;

  this.x = -25;
  this.y = 150
  this.img = ufo;

  this.show = function() {
    imageMode(CENTER);
    image(this.img, this.x, this.y)
  }

  this.move = function() {
    if (cowSecured) {
      vel = -1.2 * random(0.9, 1.1);
      this.y += 2 * vel;
      this.x += 0.7 * vel;
    } else {
      if (this.x > (width / 2 - 100) / 2) {
        this.y += 10 * vel;
        vel *= 0.98
        if (vel < 0.05) {
          cowSecured = true;
        }
      } else {
        this.x += vel;
        this.y += vel * random(-0.15, 0.15);
      }
    }
  }
}

  function Cow() {
    var vel;

    this.x = (width/2 - 100)/2
    this.y = height + 60;
    this.img = cow;

    this.show = function() {
      imageMode(CENTER);
      image(this.img, this.x, this.y);
    }

    this.move = function() {
      if (cowSecured) {
        vel = -1.2 * random(0.9, 1.1);
        this.y += 2 * vel;
        this.x += 0.7 * vel + random(-0.05, 0,05);
    }
  }
}
