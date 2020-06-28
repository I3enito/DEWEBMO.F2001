class SimpleBumber {
  constructor(pointA, pointB, htmlId, keyCode, isRotationInversed) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.htmlId = htmlId;
    this.keyCode = keyCode;

    this.bouncyNessFactor = 1.2;

    this.rotationFactor = isRotationInversed ? -1 : 1;

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

    if (keyCode === this.keyCode) {
      this.keyPressed = true;
      this.bouncyNessFactor = 1.6;
    }
  };

  onKeyUp = (event) => {
    const keyCode = event.keyCode;

    if (keyCode === this.keyCode) {
      this.keyPressed = false;
      this.bouncyNessFactor = 1.2;
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

    if (
      this.richtungsVektor.x > 0 &&
      (collisionPoint.x > this.pointB.x || collisionPoint.x < this.pointA.x)
    ) {
      return 1000;
    } else if (
      this.richtungsVektor.x < 0 &&
      (collisionPoint.x > this.pointA.x || collisionPoint.x < this.pointB.x)
    ) {
      return 1000;
    }

    const distanzZwischenBeidenPunkten = projektionsPunkt.distance(
      collisionPoint
    );

    this.ownCollisionPoint.updatePosition(collisionPoint);

    return distanzZwischenBeidenPunkten;
  };

  updateRotation = (secondsPassed) => {
    const degreeStep = 3 * this.rotationFactor;

    if (this.keyPressed && Math.abs(this.rotationDeg) < this.maxRotationDeg) {
      this.richtungsVektor.rotateDeg(degreeStep);
      this.rotationDeg += degreeStep;
    } else if (!this.keyPressed && Math.abs(this.rotationDeg) > 0) {
      this.richtungsVektor.rotateDeg(-degreeStep);
      this.rotationDeg -= degreeStep;
    }
    this.divElement.style.transform = `rotateZ(${
      this.richtungsVektor.horizontalAngleDeg() * -1
    }deg)`;
  };
}
