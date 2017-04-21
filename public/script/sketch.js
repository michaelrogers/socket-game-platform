// let timeoutVariable;
// let acceptingData = true;
// pendulum
const pivot_x = 200;
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
  dummy = loadImage('/img/bird.png');
  broken = loadImage('/img/bird2.png')
  //     broken = loadImage('/img/winner.png')
  chicken = loadSound('/sounds/chicken.mp3')
  arm = loadImage('/img/arm125.png');

  //     for (var i=0; i < 3; i++ ) {
  //       dummy[i] = loadImage('/img/dummy' + i + '.png');
  //       broken[i] = loadImage('/img/broken' + i + '.png');
  //       dummySound[i] = loadSound('/sounds/sound' + i + '.mp3')
  //     }

  for (var i = 0; i < 3; i++) {
    sweet[i] = loadImage("/img/sweet" + i + ".png");
    console.log(sweet.length)
  }
  // sounds
  for (var j = 0; j < 6; j++) {
    hitSound[j] = loadSound('/sounds/hit' + j + '.mp3');
  }
}
// console.log('Sketch file loaded')
// *************** //
setup = () => {
  var myCanvas = createCanvas(700, 700);
  myCanvas.parent('canvas');

  // cord
  line(pivot_x, pivot_y, 300, 250);

  // pinata
  pinata = createSprite(pivot_x, pivot_y, 50, 50);
  //     dummyImg = Math.floor(random(0, dummy.length));
  //     pinata.addImage(dummy[dummyImg])
  pinata.addImage(dummy);
  pinata.velocity.y = 0;
  pinata.velocity.x = 0;
  candyTime = false;
  // bat
  bat = createSprite(1000, 1000, 20, 200);
  bat.shapeColor = color(128);
  bat.addImage(arm)
  bat.velocity.x = 0;

  //-----------setup bat swing---------
  calcAngle; //
  swingAngle = -2;
  batX = width - 150; //x-position of bat sprite, to right side of screen
  batY = len + 100; //y-position of bat sprite, equal to pinata resting
  bat = createSprite(batX, batY, 20, 200)
  bat.shapeColor = color(128);
  bat.addImage(arm)

  // candies
  for (var i = 0; i < 150; i++) {
    candies.push(new Candy());
  }
  // console.log('Sketch file setup')
  // } catch (e) { console.log(e); }

}

draw = () => {
  background(50);
  // reference pivot point - not needed
  ellipse(250, 20, 5, 5);
  // reference equilibrium point - not needed
  ellipse(250, len + 20, 5, 5);

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
