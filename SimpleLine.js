class SimpleLine {
  constructor(pointA, pointB) {
    this.pointA = pointA;
    this.pointB = pointB;

    this.bouncyNessFactor = 0.8;

    this.ownCollisionPoint = new CollisionPoint();

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

    document.getElementById("ground").appendChild(this.divElement);
  }

  triggerAnimation = () => {
    this.divElement.animate(
      {
        backgroundColor: ["#b7bec2", "#fe5660", "#b7bec2"], // offset: 0, 0.5, 1
        iterations: 1,
      },
      100
    );
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
}
