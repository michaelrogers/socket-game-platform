// let timeoutVariable;
// let acceptingData = true;
// pendulum
const pivot_x = 200;
const pivot_y = 0;
const len = 450;
let angle = 0;
const gravity = 0.01;
let acc;
let vel;
let hits = 0;
let batSwings = 0;
let jit = 10;
let pinata;
//arm & bat swing variables
let bat, batX, batY, swingAngle, calcAngle;
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
// R = 0;

// Spring simulation variables
let ps = 0, // Position   ps = R,
    vs = 0.0, // Velocity
    as = 0, // Acceleration
    f = 0; // Force

// candy spill
let candies = [];

// preload image to sprite
preload = () => {
    arm = loadImage('/img/arm125.png');
    dummy = loadImage('/img/bird.png');
}
console.log('Sketch file loaded')
// *************** //
setup = () => {
    // try {


    var myCanvas = createCanvas(700, 700);
    myCanvas.parent('canvas');

    // cord
    line(pivot_x, pivot_y, 300, 250);

    // pinata
    pinata = createSprite(pivot_x, pivot_y, 50, 50);
    pinata.addImage(dummy);
    pinata.shapeColor = color(0, 100);
    pinata.velocity.y = 0;
    pinata.velocity.x = 0;

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
    console.log('Sketch file setup')
    // } catch (e) { console.log(e); }

}

draw = () => {
    background(50);
    // reference pivot point - not needed
    ellipse(250, 20, 5, 5);
    // reference equilibrium point - not needed
    ellipse(250, len + 20, 5, 5);

    // what happens after screwing up pinata
    if (hits >= 3) {
        pinata.remove();
        // replace here with broken pinata
        pinata.velocity.x = 0;
        pinata.velocity.y = 0;
        line(pivot_x, pivot_y, pivot_x, pivot_y + len);
        for (var i = 0; i < candies.length; i++) {

            //   if (candies[i].pos.x > 0) {
            candies[i].applyForce();
            candies[i].update();
            candies[i].show();
        }
    } else {
        pinataSwing()
    }
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
        mag *= 0.01;  // damping
        // angle = alpha*.03;
        ps = constrain(ps, minHeight, maxHeight);
    }

}



pinataSwing = () => {
    acc = -gravity * sin(angle);

    // rotating object to align with rope plus some jittering - fix jittering to re-start after every hit, not really needed
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

  this.vel = createVector(random(-1, 0.2), random(-2,0));

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
    fill(125, 125, 255);
    noStroke();
    // stroke(0, 125, 235);
    // strokeWeight(1);
    imageMode(CENTER);
    // image(this.img, this.pos.x, this.pos.y )
    ellipse(this.pos.x, this.pos.y, random(7, 11), random(5, 9));

  }
    }
}