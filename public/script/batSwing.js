let acceptingData = true;
let timeoutVariable;
restoreBatPos = () => {
  swingAngle = 0;
  calcAngle = 0;
  bat.position.x = width - 150;
  bat.position.y = len + 100;
  bat.rotation = 0;
}
drawBat = (mag) => {
  // console.log("draw bat ", mag)
  if (mag > 30) {
    const magX = mag * 0.5;
    const dx = 1; //x dimension of image
    const dy = 1; //y dimension of image
    //rotation of bat and arm image, pivoted at center of image
    swingAngle += -1 * magX; //value for rotating arm image
    calcAngle = -swingAngle //angle for calculating x & y translation of image (for pivoting image at elbow)
    calcAngle = constrain(calcAngle, 0, 90); //constrain angle to min and max values
    swingAngle = constrain(swingAngle, -90, 0); //constrain bat roation
    bat.rotation = swingAngle; //rotate image
    bat.position.x = -magX*2;
    bat.position.x = constrain(bat.position.x, batX - 200, batX + 50);

    
    batSwings++;
    document.getElementById('batSwings').click();
    console.log('bat swing', batSwings)
  }

  bat.overlap(pinata, () => {
    if (acceptingData) {
      hits++;
      acceptingData = false;
      timeoutVariable = setTimeout(() => {
          acceptingData = true;
      }, 500);
    }
    console.log("bat overlaps pinata", hits);
    angle = -Math.PI / 15 * 1;
  });

  //negative and large x acceleration means player has recoiled swing backwards
  //restore bat position when user recoils swings
  if (mag < 10) {
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
