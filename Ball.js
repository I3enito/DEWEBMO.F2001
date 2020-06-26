class Ball {
  constructor(posX, posY, speedX, speedY, gravity, htmlId) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.gravity = gravity;
    this.element = document.getElementById(htmlId);
  }

  calcNextPosition = () => {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };

  drawElement = () => {
    this.element.style.top = this.posX;
    this.element.style.left = this.posY;
  };
}
