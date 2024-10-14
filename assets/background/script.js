const elements = document.querySelectorAll('.shape');
const min = 1;
const max = 1.5;
let shapes;

class Shape {
  constructor(el) {
    this.el = el;
    this.size = el.offsetWidth;
    this.x = random(0,window.innerWidth - this.size);
    this.y = random(0,window.innerHeight - this.size);
    this.vx = random(min,max);
    this.vy = random(min,max);
  }
  boundary() {
    if (this.x >= window.innerWidth - this.size) {
      this.vx *= -1;
      this.x = window.innerWidth - this.size;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.vy *= -1;
      this.y = window.innerHeight - this.size;
    }
    if (this.x <= 0) {
      this.vx *= -1;
      this.x = 0;
    }
    if (this.y <= 0) {
      this.vy *= -1;
      this.y = 0;
    }
  }
  animate() {
    this.x += this.vx;
    this.y += this.vy;
    this.el.style.transform = `translate(${this.x}px,${this.y}px)`;
    this.boundary();
  }
}

const random = (min,max) => Math.random() * (max-min) + min;

function update() {
  shapes.forEach((shape) => shape.animate());
  requestAnimationFrame(update);
}

function init() {
  shapes = Array.from(elements,(el) => new Shape(el));
  update();
}

window.addEventListener('load',init,false);