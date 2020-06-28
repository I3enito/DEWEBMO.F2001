const gravityVector = new Victor(0, -9.81);

class Ball {
  constructor(positionVector, speedVector, radius) {
    this.positionVector = positionVector;
    this.speedVector = speedVector;
    this.radius = radius;
    this.width = 2 * radius;

    this.element = document.createElement("div");
    document.getElementById("ground").appendChild(this.element);
    this.element.classList.add("ball");

    this.element.style.width = this.width;
    this.element.style.height = this.width;
  }

  getNextSpeedVector = (secondsPassed) => {
    const speedVectorLength = this.speedVector.length();
    return this.speedVector.clone().add(
      gravityVector
        .clone()
        .multiplyScalar(secondsPassed * 60)
        .multiplyScalar(speedVectorLength > 500 ? 0.9 : 1)
    );
  };

  getNextPositionVector = (secondsPassed) => {
    return this.positionVector
      .clone()
      .add(this.speedVector.clone().multiplyScalar(secondsPassed));
  };

  updateSpeed = (secondsPassed) => {
    const nextSpeedVector = this.getNextSpeedVector(secondsPassed);

    this.speedVector = nextSpeedVector;
  };

  updatePosition = (secondsPassed) => {
    this.positionVector = this.getNextPositionVector(secondsPassed);

    this.updateSpeed(secondsPassed);
  };

  drawElement = () => {
    this.element.style.left = this.positionVector.x - this.radius;
    this.element.style.bottom = this.positionVector.y - this.radius;
  };
}
