const maxSpeed = 100;
const drag = 0.999;
const gravityVector = new Victor(0, -9.81);

class Ball {
  constructor(posX, posY, speedX, speedY, htmlId) {
    this.posX = posX;
    this.posY = posY;

    this.positionVector = new Victor(posX, posY);

    this.speedVector = new Victor(speedX, speedY);

    this.speedX = speedX;
    this.speedY = speedY;
    this.gravitySpeed = 0;
    this.element = document.getElementById(htmlId);
  }

  getNextSpeedVector = (secondsPassed) => {
    return this.speedVector
      .clone()
      .add(gravityVector.clone().multiplyScalar(secondsPassed));
  };

  getNextPositionVector = (secondsPassed) => {
    return this.positionVector
      .clone()
      .add(
        this.getNextSpeedVector(secondsPassed).multiplyScalar(secondsPassed)
      );
  };

  updateSpeed = (secondsPassed) => {
    // this.speedX *= drag;

    this.speedVector.add(gravityVector.clone().multiplyScalar(secondsPassed));
    // console.log("Speed vector y: " + this.speedVector.y);

    // this.speedY -= gravity * secondsPassed;
  };

  updatePosition = (secondsPassed) => {
    this.updateSpeed(secondsPassed);

    this.positionVector.add(
      this.speedVector.clone().multiplyScalar(secondsPassed)
    );

    // this.posX += this.speedVector.x * secondsPassed;
    // this.posY += this.speedVector.y * secondsPassed;
  };

  drawElement = () => {
    this.element.style.left = this.positionVector.x;
    this.element.style.bottom = this.positionVector.y;
  };
}
