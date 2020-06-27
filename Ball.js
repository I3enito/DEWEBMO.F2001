const maxSpeed = 100;
const drag = 0.999;

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

  getNextSpeedY = (gravity, secondsPassed) => {
    if (Math.abs(this.speedY) < maxSpeed) {
      return this.speedY + gravity * secondsPassed;
    }
    return this.speedY;
  };

  getNextPositionX = () => {
    return this.posX + this.getNextSpeedX() * secondsPassed;
  };

  getNextPositionY = (gravity, secondsPassed) => {
    return (
      this.posY + this.getNextSpeedY(gravity, secondsPassed) * secondsPassed
    );
  };

  updateSpeed = (gravity, secondsPassed) => {
    // this.speedX *= drag;

    if (Math.abs(this.speedY) < maxSpeed) {
      this.speedY -= gravity * secondsPassed;
    }
  };

  updatePosition = (gravity, secondsPassed) => {
    console.log(this.speedY);
    this.updateSpeed(gravity, secondsPassed);

    this.posX += this.speedX * secondsPassed;
    this.posY += this.speedY * secondsPassed;
  };

  drawElement = () => {
    this.element.style.left = this.posX;
    this.element.style.bottom = this.posY;
  };
}
