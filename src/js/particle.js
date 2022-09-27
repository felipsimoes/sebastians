class Particle {
    constructor(x, y) {
      this.pos = createVector(Math.random() * width, Math.random() * height)
      this.size = 5
      // this.pos = createVector(random(-width, width * 2), random(-height, height * 2))
  
      if (this.x && this.y) {
        this.endPos = createVector(x, y)
      } else {
        this.endPos = this.pos.copy()
      }
  
      this.vel = p5.Vector.random2D().mult(1)
      // this.vel.limit(.01)
      this.acc = createVector(0, 0)
      this.color = color(255, 255, 255)
      this.endColor = color(255, 255, 255)
    }
    
    update() {
        this.endColor = lerpColor(this.endColor, this.color, 0.1)

      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0)
      // this.mouse = createVector(mouseX, mouseY)
      
      // Change the velocity when particle hit canvas edges
      if (this.pos.x < 0 || this.pos.x > width) {
        this.vel.x *= -1
      }
      if (this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1
      }
      
    //   this.vel.setMag(5)
    //   this.acc.limit(1)
      this.vel.limit(3)
      
    }
    
    applyForce(force) {
      this.acc.add(force)
      
      // this.acc.mult(0)
    }
    
    attractsTo(aPos) {
      
      let force = p5.Vector.sub(aPos, this.pos)
      let distance = force.mag()
      // let mag = .00001 / (distance * distance)
      
      
      force.normalize()
      let mag = 10 / distance
      force.mult(mag)
    //   force.limit(5)
      
      this.applyForce(force)
    }
    
    show() {
      push()
        // let clr = map(this.size, 10, 50, 75, 255);
    //   let clr = map(this.size, 10, 50, 75, 255);
        // fill(230, clr);
        // fill(this.color)
        fill(this.endColor)
        circle(this.pos.x, this.pos.y, this.size)
      // stroke(255)
      // strokeWeight(10)
      // point(this.pos.x, this.pos.y)
      pop()
    }
    
    edges() {
      return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height)
    }
  }