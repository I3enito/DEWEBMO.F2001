const template = document.createElement("template");
template.innerHTML = `
<style>
    .flipper {
    position: absolute;
    background-size: 100px 40px;
    width: 100px;
    height: 40px;
    }

    .flipper.left {
    top: 0;
    left: 10px;
    background-image: url("https://exorciser.ch/_media/pub/flipper-left.png");
    transform-origin: 18% 50%;
    transform: rotateZ(32deg);
    }

    .flipper.right {
    top: 0;
    right: 10px;
    background-image: url("https://exorciser.ch/_media/pub/flipper-right.png");
    transform-origin: 82% 50%;
    transform: rotateZ(-32deg);
    }
</style>    

<div class="flipper">
</div>`;

class Bumper extends HTMLElement {
  constructor() {
    super();

    this.bounce = 0.95;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.side = this.getAttribute("side") === "left" ? "left" : "right";

    this.id = side === "left" ? "flpper-left" : "flipper-right";
    this.shadowRoot
      .querySelector("div")
      .classList.add(side === "left" ? "left" : "right");
    this.x = x;
    this.y = y;
    this.r = r;
    this.bounce = bounce;
  }

  detect(b) {
    return (
      b.x - b.r < 0 ||
      b.x + b.r > this.width ||
      b.y - b.r < 0 ||
      b.y + b.r > this.height
    );
  }

  respond(b) {
    let xMin = 0;
    let xMax = this.width;
    let yMin = 0;
    let yMax = this.height;
    if (b.x - b.r < xMin) {
      b.x = xMin + b.r;
      if (Math.abs(b.vx) > 1) {
        b.y = b.y + ((-b.x + xMin + b.r) / b.vx) * b.vy;
      }
      b.vx = -b.vx * this.bounce;
      b.vy = b.vy * this.bounce;
    } else if (b.x + b.r > xMax) {
      b.x = xMax - b.r;
      if (Math.abs(b.vx) > 1) {
        b.y = b.y - ((b.x - xMax + b.r) / b.vx) * b.vy;
      }
      b.vx = -b.vx * this.bounce;
      b.vy = b.vy * this.bounce;
    } else if (b.y - b.r < yMin) {
      if (Math.abs(b.vy) > 1) {
        b.x = b.x + ((-b.y + yMin + b.r) / b.vy) * b.vx;
      }
      b.y = yMin + b.r;
      b.vx = b.vx * this.bounce;
      b.vy = -b.vy * this.bounce;
    } else if (b.y + b.r > yMax) {
      if (Math.abs(b.vy) > 1) {
        b.x = b.x - ((b.y - yMax + b.r) / b.vy) * b.vx;
      }
      b.y = yMax - b.r;
      b.vx = b.vx * this.bounce;
      b.vy = -b.vy * this.bounce;
    }
  }

  connectedCallback() {
    // this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    // this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define("bumper", Bumper);
