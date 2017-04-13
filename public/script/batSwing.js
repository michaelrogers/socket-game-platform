restoreBatPos = () => {
  swingAngle = 0;
  calcAngle = 0;
  bat.position.x = width - 100;
  bat.position.y = R + 100;
  bat.rotation = 0;
}
drawBat = () => {

  if (abs(accelerationX) > 30) {
    const magX = abs(accelerationX) - 10;
    const dx = 3; //x dimension of image
    const dy = 0.5; //y dimension of image
    //rotation of bat and arm image, pivoted at center of image
    swingAngle += -1 * magX ; //value for rotating arm image
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
    // bat.position.y = constrain(bat.position.y, batY - 1.25, batY + 4.4);
    // bat.position.x = constrain(bat.position.x, batX - 0.11, batX + 2);
    
    /* =====could be used of accY data is more accurate====
      // --------up vs down swing--------
      //detect if player swung up
      if (accelerationY > 10) {
        bat.position.y += -80;
        bat.position.x += -80;
        $('.accData').append($('<li>').text("Y Acceleration: ------POSITIVE-----"))
        $('.accData').append($('<li>').text("Y Acceleration: " + accelerationY + " ----> Y pos: " + bat.position.y))
      }
      // //detect if player swung down
      if (accelerationY < -10) {
        bat.position.y += 80;
        bat.position.x += -80;
        $('.accData').append($('<li>').text("Y Acceleration: ------NEGATIVE-----"))
        $('.accData').append($('<li>').text("Y Acceleration: " + accelerationY + " ----> Y pos: " + bat.position.y))
      }
    */  
  }

  //negative and large x acceleration means player has recoiled swing backwards
  //restore bat position when user recoils swings
  if (accelerationX < -40) {
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