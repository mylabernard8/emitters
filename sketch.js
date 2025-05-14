let emitters = [];
let G;
let particleImg;

function preload() {
  // Load an image to be used for ImageParticle
  particleImg = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Yellow_star.svg/32px-Yellow_star.svg.png');
}

function setup() {
  createCanvas(400, 600);
  emitters.push(new Emitter(width / 2, 30));
  G = createVector(0, 0.1);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background(220);
  for (let e of emitters) {
    e.update();
  }
}

function mouseClicked() {
  emitters.push(new Emitter(mouseX, mouseY));
}

class Emitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    let initialCount = int(random(10, 40)); // Random initial particle count
    for (let i = 0; i < initialCount; i++) {
      this.particles.push(this.createRandomParticle(this.x, this.y));
    }
  }

  createRandomParticle(x, y) {
    let type = random(["circle", "square", "image"]);
    if (type === "square") return new SquareParticle(x, y);
    else if (type === "image") return new ImageParticle(x, y);
    else return new Particle(x, y);
  }

  update() {
    this.particles = this.particles.filter((p) => !p.isDead());

    for (let p of this.particles) {
      p.applyForce(G);
      p.update();
      p.draw();
    }

    this.particles.push(this.createRandomParticle(this.x, this.y));
  }
}

