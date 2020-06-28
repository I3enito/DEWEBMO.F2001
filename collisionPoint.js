class CollisionPoint {
  constructor() {
    this.positionVector = new Victor(0, 0);
    this.element = document.createElement("div");
    this.element.classList.add("collisionPoint");
    document.getElementById("ground").appendChild(this.element);

    this.radius = 5;
  }

  updatePosition = (victor) => {
    this.positionVector = victor;
    this.drawElement();
  };

  drawElement = () => {
    this.element.style.left = this.positionVector.x - this.radius;
    this.element.style.bottom = this.positionVector.y - this.radius;
  };
}
