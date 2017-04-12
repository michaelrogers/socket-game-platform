restoreBatPos = () => {
  // const dx = 3; //x dimension of image
  // const dy = 0.25; //y dimension of image
  // const transY = dx * tan(radians(calcAngle)); //image y displacement depending on angle of rotation
  // const transX = -dy / (tan(radians(calcAngle))); //image X displacement depending on angle of rotation
  // for (var i = swingAngle; i < 0; i++) {
  //   swingAngle += 5
  //   bat.position.x += transX; //moves image in x position, (0.01 to decrease magnitude**testing***)
  //   bat.position.y += transY; //moves image in y position, (magnitude testing)
  //   bat.position.y = constrain(bat.position.y, bat.position.y - 0.05, bat.position.y + 6.4)
  //   bat.position.x = constrain(bat.position.x, bat.position.x - 0.11, bat.position.x + 1)
  // }
  // bat.position.x = width - 100;
  // bat.position.y = R + 100;
  // bat.rotation = 0;
}
drawBat = () => {

  // console.log("X Pos: " + bat.position.x)
  //   console.log("Y Pos: " + bat.position.x)
  if (mouseIsPressed) {
    const magX = accelerationX / 5;
    const dx = 3; //x dimension of image
    const dy = 0.25; //y dimension of image
    //rotation of bat and arm image, pivoted at center of image
    swingAngle += -1 * 5; //value for rotating arm image
    calcAngle = -swingAngle  //angle for calculating x & y translation of image (for pivoting image at elbow)
    calcAngle = constrain(calcAngle, 0, 65); //constrain angle to min and max values
    swingAngle = constrain(swingAngle, -65, 0); //constrain bat roation
    bat.rotation = swingAngle; //rotate image
    //translation of image so as to pivot
    //Trigonometric equations for circular positioning
    const transY = dx * tan(radians(calcAngle)); //image y displacement depending on angle of rotation
    const transX = -dy / (tan(radians(calcAngle))); //image X displacement depending on angle of rotation

    console.log("X trans: " + transX)
    console.log("Y trans: " + transY)
    console.log("==========")

    bat.position.x += transX; //moves image in x position, (0.01 to decrease magnitude**testing***)
    bat.position.y += transY; //moves image in y position, (magnitude testing)
    bat.position.y = constrain(bat.position.y, bat.position.y - 0.05, bat.position.y + 6.4)
    bat.position.x = constrain(bat.position.x, bat.position.x - 0.11, bat.position.x + 1)
    $('.accData').append($('<li>').text("----> X Acc: " + magX))
    $('.angleData').append($('<li>').text("----> Tangent: " + tan(radians(calcAngle))))
  }
}