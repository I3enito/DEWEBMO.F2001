class SimpleBumber {
  constructor(pointA, pointB, htmlId) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.htmlId = htmlId;

    this.keyPressed = false;

    this.rotationDeg = 0;
    this.maxRotationDeg = 45;

    this.ownCollisionPoint = new CollisionPoint("collisionPoint");

    this.ortsVektor = pointA.clone();
    this.richtungsVektor = pointB.clone().subtract(pointA);

    this.divElement = document.createElement("div");
    this.divElement.style.width = this.richtungsVektor.clone().length();

    this.divElement.style.bottom = this.ortsVektor.y;
    this.divElement.style.left = this.ortsVektor.x;

    this.divElement.style.transform = `rotateZ(${
      this.richtungsVektor.horizontalAngleDeg() * -1
    }deg)`;

    this.divElement.classList.add("simpleBumber");
    this.divElement.id = htmlId;

    document.getElementById("ground").appendChild(this.divElement);

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 37) {
      this.keyPressed = true;
    }
  };

  onKeyUp = (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 37) {
      this.keyPressed = false;
    }
  };

  getProjectionDistance = (projektionsPunkt) => {
    const projektionAufRichtungsVektor = this.richtungsVektor
      .clone()
      .multiplyScalar(
        this.richtungsVektor.clone().dot(projektionsPunkt) /
          this.richtungsVektor.clone().lengthSq()
      );

    const projektionVonOrtsVektorAufRichtungsVektor = this.richtungsVektor
      .clone()
      .multiplyScalar(
        this.richtungsVektor.clone().dot(this.ortsVektor) /
          this.richtungsVektor.clone().lengthSq()
      );

    const collisionPoint = projektionAufRichtungsVektor
      .clone()
      .add(this.ortsVektor)
      .subtract(projektionVonOrtsVektorAufRichtungsVektor);

    if (collisionPoint.x > this.pointB.x || collisionPoint.x < this.pointA.x) {
      return 1000;
    }

    const distanzZwischenBeidenPunkten = projektionsPunkt.distance(
      collisionPoint
    );

    this.ownCollisionPoint.updatePosition(collisionPoint);

    return distanzZwischenBeidenPunkten;
  };

  updateRotation = (secondsPassed) => {
    const degreeStep = 2;

    if (this.keyPressed && this.rotationDeg < this.maxRotationDeg) {
      this.richtungsVektor.rotateDeg(degreeStep);
      this.rotationDeg += degreeStep;
    } else if (!this.keyPressed && this.rotationDeg > 0) {
      this.richtungsVektor.rotateDeg(-degreeStep);
      this.rotationDeg -= degreeStep;
    }
    this.divElement.style.transform = `rotateZ(${
      this.richtungsVektor.horizontalAngleDeg() * -1
    }deg)`;
  };
}
