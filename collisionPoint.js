class CollisionPoint {
  constructor(htmlId) {
    this.positionVector = new Victor(0, 0);
    this.element = document.createElement("div");
    this.element.classList.add("collisionPoint");
    document.getElementById("ground").appendChild(this.element);
    // this.element = document.getElementById(htmlId);
  }

  updatePosition = (victor) => {
    this.positionVector = victor;
    this.drawElement();
  };

  drawElement = () => {
    this.element.style.left = this.positionVector.x;
    this.element.style.bottom = this.positionVector.y;
  };
}
