class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = p5.Vector.random2D();
    this.r = 10;
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
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.lifespan
    );
    circle(this.position.x, this.position.y, this.r);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  static createStandardParticleAt(x, y) {
    return new Particle(x, y);
  }
}
