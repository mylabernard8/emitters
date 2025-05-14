class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(0.5, 2)); // Random motion
    this.acceleration = createVector(0, 0);
    this.r = random(5, 15); // Random size
    this.lifespan = 255;
    this.color = color(random(255), random(255), random(255)); // Random color
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  isDead() {
    return this.lifespan < 0;
  }

  draw() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    circle(this.position.x, this.position.y, this.r);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }
}

class SquareParticle extends Particle {
  draw() {
    fill(50, 200, 255, this.lifespan); // Light blue color
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.r, this.r);
  }
}

class ImageParticle extends Particle {
  draw() {
    tint(255, this.lifespan);
    imageMode(CENTER);
    image(particleImg, this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
}
