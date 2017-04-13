restoreBatPos = () => {
  swingAngle = 0;
  calcAngle = 0;
  bat.position.x = width - 100;
  bat.position.y = R + 100;
  bat.rotation = 0;
}
drawBat = () => {

  if (mouseIsPressed) {
    const magX = accelerationX / 5;
    const dx = 3; //x dimension of image
    const dy = 0.25; //y dimension of image
    //rotation of bat and arm image, pivoted at center of image
    swingAngle += -1; //value for rotating arm image
    calcAngle = -swingAngle  //angle for calculating x & y translation of image (for pivoting image at elbow)
    calcAngle = constrain(calcAngle, 0, 65); //constrain angle to min and max values
    swingAngle = constrain(swingAngle, -65, 0); //constrain bat roation
    bat.rotation = swingAngle; //rotate image

    //translation of image so as to pivot
    //Trigonometric equations for circular positioning
    const transY = dx * tan(radians(calcAngle)); //image y displacement depending on angle of rotation
    const transX = -dy / (tan(radians(calcAngle))); //image X displacement depending on angle of rotation

    bat.position.x += transX; //moves image in x position, (0.01 to decrease magnitude**testing***)
    bat.position.y += transY; //moves image in y position, (magnitude testing)
    bat.position.y = constrain(bat.position.y, batY - 1.25, batY + 4.4);
    // bat.position.x = constrain(bat.position.x, batX - 0.11, batX + 2);
    $('.accData').append($('<li>').text("----> X Acc: " + magX))
    $('.angleData').append($('<li>').text("----> Tangent: " + tan(radians(calcAngle))))
  }
  if (swingAngle < -64) {
    restoreBatPos();
  }
}
/* --todo:
1. make bat swing only after a positive x acc, with min magnitude
2. restore bat position after swing.
3. allow bat y-movement depending on user's swing direction
  3a. if user swing with positive y-acc, have bat move up
  3b. if y-acc nega. bat moves down
*/