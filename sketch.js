let emitters = [];
let G;
let particleImg;

function preload() {
  // Load an image to be used for ImageParticle and tag
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

    // Step 3
    let initialCount = int(random(10, 40));
    this.theme = random(['circle', 'square', 'image', 'mixed']); // Step 5
    this.emitInterval = int(random(3, 10)); // Step 4
    this.frameCounter = 0;

    for (let i = 0; i < initialCount; i++) {
      this.particles.push(this.createThemedParticle(this.x, this.y));
    }
  }

  createThemedParticle(x, y) {
    if (this.theme === 'square') return new SquareParticle(x, y);
    if (this.theme === 'image') return new ImageParticle(x, y);
    if (this.theme === 'circle') return new Particle(x, y);

    // Mixed
    let type = random(['circle', 'square', 'image']);
    if (type === 'square') return new SquareParticle(x, y);
    if (type === 'image') return new ImageParticle(x, y);
    return new Particle(x, y);
  }

  update() {
    this.particles = this.particles.filter(p => !p.isDead());

    for (let p of this.particles) {
      p.applyForce(G);
      p.update();
      p.draw();
    }

    this.frameCounter++;
    if (this.frameCounter % this.emitInterval === 0) {
      this.particles.push(this.createThemedParticle(this.x, this.y));
    }

    this.drawTag(); // Step 6
  }

  drawTag() {
    push();
    translate(this.x, this.y);

    switch (this.theme) {
      case 'circle':
        fill(0, 150, 255);
        ellipse(0, 0, 10);
        break;
      case 'square':
        fill(255, 100, 100);
        rectMode(CENTER);
        rect(0, 0, 12, 12);
        break;
      case 'image':
        imageMode(CENTER);
        image(particleImg, 0, 0, 14, 14);
        break;
      case 'mixed':
        fill(150, 0, 255);
        triangle(-6, 5, 0, -6, 6, 5);
        break;
    }

    pop();
  }
}

