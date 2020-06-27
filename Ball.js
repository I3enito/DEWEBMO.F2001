const maxSpeed = 20;

class Ball {
  constructor(posX, posY, speedX, speedY, htmlId) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.gravitySpeed = 0;
    this.element = document.getElementById(htmlId);
  }

  getNextSpeedX = () => {
    return this.speedX;
  };

  getNextSpeedY = (gravity) => {
    if (Math.abs(this.speedY) < maxSpeed) {
      return this.speedY + this.gravitySpeed + gravity;
    }
    return this.speedY;
  };

  getNextPositionX = () => {
    return this.posX + this.getNextSpeedX();
  };

  getNextPositionY = (gravity) => {
    return this.posY + this.getNextSpeedY(gravity);
  };

  updateGravitySpeed = (gravity) => {
    this.gravitySpeed += gravity;
  };

  updateSpeed = () => {
    if (Math.abs(this.speedY) < maxSpeed) {
      this.speedY += this.gravitySpeed;
    }
  };

  updatePosition = (gravity) => {

    this.posX += this.speedX;
    this.posY += this.speedY;

    this.updateGravitySpeed(gravity);
    this.updateSpeed();

    console.log(this.gravitySpeed);
  };

  drawElement = () => {
    this.element.style.left = this.posX;
    this.element.style.bottom = this.posY;
  };
}
