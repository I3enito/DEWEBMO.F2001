class SimpleBumber {
  constructor(ortsVektor, radius, htmlId) {
    this.ortsVektor = ortsVektor;
    this.htmlId = htmlId;

    this.radius = radius;

    this.bouncyNessFactor = 1.5;

    this.ownCollisionPoint = new CollisionPoint("collisionPoint");

    this.divElement = document.createElement("div");
    // this.divElement.style.width = this.richtungsVektor.clone().length();

    this.divElement.style.width = this.radius * 2;
    this.divElement.style.height = this.radius * 2;
    this.divElement.style.borderRadius = `${this.radius}px`;

    this.divElement.style.bottom = this.ortsVektor.y - this.radius;
    this.divElement.style.left = this.ortsVektor.x - this.radius;

    this.divElement.classList.add("simpleBumber");
    this.divElement.id = htmlId;

    document.getElementById("ground").appendChild(this.divElement);
  }

  getProjectionDistance = (projektionsPunkt) => {
    const verbindungsVektorZwischenPunkten = this.ortsVektor
      .clone()
      .subtract(projektionsPunkt);

    const kollisionsPunkt = projektionsPunkt
      .clone()
      .add(verbindungsVektorZwischenPunkten)
      .subtract(
        verbindungsVektorZwischenPunkten
          .clone()
          .norm()
          .multiplyScalar(this.radius)
      );

    // const projektionAufRichtungsVektor = this.richtungsVektor
    //   .clone()
    //   .multiplyScalar(
    //     this.richtungsVektor.clone().dot(projektionsPunkt) /
    //       this.richtungsVektor.clone().lengthSq()
    //   );

    // const projektionVonOrtsVektorAufRichtungsVektor = this.richtungsVektor
    //   .clone()
    //   .multiplyScalar(
    //     this.richtungsVektor.clone().dot(this.ortsVektor) /
    //       this.richtungsVektor.clone().lengthSq()
    //   );

    // const collisionPoint = projektionAufRichtungsVektor
    //   .clone()
    //   .add(this.ortsVektor)
    //   .subtract(projektionVonOrtsVektorAufRichtungsVektor);

    // if (
    //   this.richtungsVektor.x > 0 &&
    //   (collisionPoint.x > this.pointB.x || collisionPoint.x < this.pointA.x)
    // ) {
    //   return 1000;
    // } else if (
    //   this.richtungsVektor.x < 0 &&
    //   (collisionPoint.x > this.pointA.x || collisionPoint.x < this.pointB.x)
    // ) {
    //   return 1000;
    // }

    const distanzZwischenBeidenPunkten = projektionsPunkt.distance(
      kollisionsPunkt
    );

    this.ownCollisionPoint.updatePosition(kollisionsPunkt);

    return distanzZwischenBeidenPunkten;
  };
}
