function batSwing() {

    if (mouseIsPressed) {
    const dx = 20; //x dimension of image
    const dy = -20; //y dimension of image
    //rotation of bat and arm image, pivoted at center of image
    swingAngle += -1; //value for rotating arm image
    calcAngle += 1 //angle for calculating x & y translation of image (for pivoting image at elbow)
    calcAngle = constrain(calcAngle, 0, 90); //constrain angle to min and max values
    swingAngle = constrain(swingAngle, -90, 0); //constrain bat roation
    bat.rotation = swingAngle; //rotate image
    //translation of image so as to pivot
    //Trigonometric equations for circular positioning
    const transY = dx * tan(radians(calcAngle)); //image y displacement depending on angle of rotation
    const transX = dy / (tan(radians(calcAngle))); //image X displacement depending on angle of rotation
    //restrict position movement to angles less than 80
    if (swingAngle > -80) {
      bat.position.x += transX * 0.01; //moves image in x position, (0.01 to decrease magnitude**testing***)
      bat.position.y += transY * 0.1; //moves image in y position, (magnitude testing)
    }

  }

}