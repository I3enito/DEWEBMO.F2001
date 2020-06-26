const template = document.createElement("template");
template.innerHTML = `
<style>
    .pinballTable {
        position: relative;
        width: 1000px;
        height: 1000px;
        background-color: bisque;
        margin: auto;
        }
</style>    

<div id="pinball-table" class="pinballTable">
</div>`;

class PinballTable extends HTMLElement extends GameManager {
  constructor() {
    super();

    this.showInfo = true;
    this.bounce = 0.95;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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

window.customElements.define("pinball-table", PinballTable);
