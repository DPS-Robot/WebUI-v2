const elements = document.querySelectorAll('.shape');
let min = 1;
let max = 1.5;
let shapes;
let statusInfo = {status: "init"};
let processingSpeed = 4;

async function getInfo(){
  try {
    const response = await fetch("http://127.0.0.1:5000/status");
    const data = await response.json();
    if (data.status !== statusInfo.status) {
      statusInfo = data;
      shapes.forEach(shape => shape.updateSpeed());
    }
  } catch (error) {
    console.error("Error fetching status:", error);
  }
}

setInterval(getInfo, 1000);

class Shape {
  constructor(el) {
    this.el = el;
    this.size = el.offsetWidth;
    this.x = random(0, window.innerWidth - this.size);
    this.y = random(0, window.innerHeight - this.size);
    this.baseVx = random(min, max);
    this.baseVy = random(min, max);
    this.vx = this.baseVx;
    this.vy = this.baseVy;
  }

  updateSpeed() {
    if (statusInfo.status === "processing") {
      this.vx = this.baseVx * processingSpeed;
      this.vy = this.baseVy * processingSpeed;
    } else {
      this.vx = this.baseVx;
      this.vy = this.baseVy;
    }
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