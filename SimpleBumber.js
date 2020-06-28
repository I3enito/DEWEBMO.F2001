class SimpleBumber {
  constructor(ortsVektor, radius, pointsPerHit) {
    this.ortsVektor = ortsVektor;

    this.radius = radius;
    const width = 2 * radius;

    this.bouncyNessFactor = 1.4;

    this.pointsPerHit = pointsPerHit;

    this.ownCollisionPoint = new CollisionPoint();

    this.divElement = document.createElement("div");

    this.divElement.style.width = width;
    this.divElement.style.height = width;
    this.divElement.style.borderRadius = `${width}px`;

    this.divElement.style.bottom = this.ortsVektor.y - this.radius;
    this.divElement.style.left = this.ortsVektor.x - this.radius;

    this.divElement.style.boxShadow = `${width / 10}px ${width / 10}px ${
      width / 5
    }px #6a7277, ${(width / 10) * -1}px ${(width / 10) * -1}px ${
      width / 5
    }px #ffffff`;

    this.divElement.classList.add("simpleBumber");

    document.getElementById("ground").appendChild(this.divElement);
  }

  triggerAnimation = () => {
    this.divElement.animate(
      {
        transform: ["scale(1)", "scale(1.2)", "scale(1)"], // offset: 0, 0.5, 1
        iterations: 1,
      },
      100
    );
  };

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

    const distanzZwischenBeidenPunkten = projektionsPunkt.distance(
      kollisionsPunkt
    );

    this.ownCollisionPoint.updatePosition(kollisionsPunkt);

    return distanzZwischenBeidenPunkten;
  };
}
