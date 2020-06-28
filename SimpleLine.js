class SimpleLine {
  constructor(pointA, pointB, htmlId) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.htmlId = htmlId;

    this.bouncyNessFactor = 0.9;

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

    this.divElement.classList.add("simpleLine");
    this.divElement.id = htmlId;

    document.getElementById("ground").appendChild(this.divElement);
  }

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
}
