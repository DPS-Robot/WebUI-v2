const elements = document.querySelectorAll('.shape');
const min = 1;
const max = 1.5;
let shapes;

const containerBox = {
  x: window.innerWidth / 3,
  y: window.innerHeight / 3,
  width: window.innerWidth / 3,
  height: window.innerHeight / 3
};

class Shape {
  constructor(el) {
    this.el = el;
    this.size = el.offsetWidth;
    this.x = random(containerBox.x, containerBox.x + containerBox.width - this.size);
    this.y = random(containerBox.y, containerBox.y + containerBox.height - this.size);
    this.vx = random(min, max);
    this.vy = random(min, max);
  }

  boundary() {
    if (this.x >= containerBox.x + containerBox.width - this.size) {
      this.vx *= -1;
      this.x = containerBox.x + containerBox.width - this.size;
    }
    if (this.y >= containerBox.y + containerBox.height - this.size) {
      this.vy *= -1;
      this.y = containerBox.y + containerBox.height - this.size;
    }
    if (this.x <= containerBox.x) {
      this.vx *= -1;
      this.x = containerBox.x;
    }
    if (this.y <= containerBox.y) {
      this.vy *= -1;
      this.y = containerBox.y;
    }
  }

  animate() {
    this.x += this.vx;
    this.y += this.vy;
    this.el.style.transform = `translate(${this.x}px,${this.y}px)`;
    this.boundary();
  }
}

const random = (min, max) => Math.random() * (max - min) + min;

function update() {
  shapes.forEach((shape) => shape.animate());
  requestAnimationFrame(update);
}

function init() {
  shapes = Array.from(elements, (el) => new Shape(el));
  update();
}

window.addEventListener('load', init, false);