function batSwing() {

    if (mouseIsPressed) {
    const dx = 20; //x dimension of image
    const dy = -20; //y dimension of image
    //rotation of bat and arm image, pivoted at center of image
    batAngle += -1; //value for rotating arm image
    a += 1 //angle for calculating x & y translation of image (for pivoting image at elbow)
    a = constrain(a, 0, 90); //constrain angle to min and max values
    batAngle = constrain(batAngle, -90, 0); //constrain bat roation
    bat.rotation = batAngle; //rotate image
    //translation of image so as to pivot
    //Trigonometric equations for circular positioning
    const transY = dx * tan(radians(a)); //image y displacement depending on angle of rotation
    const transX = dy / (tan(radians(a))); //image X displacement depending on angle of rotation
    //restrict position movement to angles less than 80
    if (batAngle > -80) {
      bat.position.x += transX * 0.01; //moves image in x position, (0.01 to decrease magnitude**testing***)
      bat.position.y += transY * 0.1; //moves image in y position, (magnitude testing)
    }
    console.log(batAngle)
  }

}