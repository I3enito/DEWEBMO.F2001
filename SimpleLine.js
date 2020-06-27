class SimpleLine {
  constructor(pointA, pointB) {
    this.pointA = pointA;
    this.pointB = pointB;

    this.ortsVektor = pointA.clone();
    this.richtungsVektor = pointB.clone().subtract(pointA);

    this.divElement = document.createElement("div");
    this.divElement.style.width = this.richtungsVektor.clone().length();

    this.divElement.style.bottom = this.ortsVektor.y;
    this.divElement.style.left = this.ortsVektor.x;

    this.divElement.style.transform = `rotateZ(-${this.richtungsVektor.horizontalAngleDeg()}deg)`;

    this.divElement.classList.add("simpleLine");

    document.getElementById("ground").appendChild(this.divElement);
  }

  getProjectionDistance = (projektionsPunkt) => {
    const projektionAufRichtungsVektor = this.richtungsVektor
      .clone()
      .multiplyScalar(
        this.richtungsVektor.clone().dot(projektionsPunkt) /
          this.richtungsVektor.clone().lengthSq()
      );

    const distanzZwischenBeidenPunkten = projektionsPunkt.distance(
      //   this.ortsVektor.clone().add(projektionAufRichtungsVektor)
      projektionAufRichtungsVektor.clone().addY(this.ortsVektor)
    );

    return distanzZwischenBeidenPunkten;
  };
}
