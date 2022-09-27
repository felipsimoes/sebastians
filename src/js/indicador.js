// ——————————————————————
// title: Indicador
// author: Werllen Castro
// github.com/werls
// 2022
// ——————————————————————

class Indicador {
    constructor() {
      this.pos = createVector(width / 2, height / 2)
      this.startColor = color(0, 0, 0)
      this.color = this.startColor
      this.sizeMin = 0
      this.sizeMax = height * 2
      this.particles = []
      this.freq = 0
      this.harmonics = true;

      for (let i = 0; i < 14; i++) {
        this.particles.push(new Particle())
      }
    }
    
    update(modulo) {
      // Cor
      this.color = modulo.color
      this.color = lerpColor(this.startColor, this.color, 0.1)
      
      // Posicão
      let moduloPos = createVector(modulo.x, modulo.y)
      this.dist = p5.Vector.sub(this.pos, moduloPos)
      this.dist.normalize()
      this.dist.mult(0.05)
      this.pos.lerp(moduloPos, this.dist.mag())
      
      // Tamanho
      amplitude = mic.getLevel()

      // tamanho do pincel princial = 1
      this.size = map(amplitude, 0, 1, this.sizeMin, this.sizeMax)
      this.startSize = this.size

      // Orbs
      if (this.harmonics) {
        for (let i = 0; i < this.particles.length; i++) {
          let particle = this.particles[i];
          
          let freqColor = transformHtztoColor(freq * (i + 2))
          freqColor.setAlpha(1 / i) + .1;
          particle.color = freqColor
          
          // tamanho relativo ao tamanho do indicador
          particle.size = this.size / (2 * i)

          // tamanho fixo
          // esse dois muda os tamanhos das orbs 
          //particle.size = 50 / (2 * i)

          particle.attractsTo(createVector(this.pos.x, this.pos.y))
          particle.update()
        }
      }
    }
    
    show() {
      this.startColor = this.color
      
      fill(this.color)
      this.drawIndicator(this.pos.x, this.pos.y, this.size, VARIATION)

      if (this.harmonics) {
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i].show()
        }
      }
    }
    
    drawIndicator(x, y, r, variation) {
      if (variation == 1) {
        circle(x, y, r)
      } else if (variation == 2) {
        beginShape()
        var xoff = 0
        for (var a = 0; a < TWO_PI; a += 0.01) {
          var offset = map(noise(a, xoff, r), 0, 1, -10, 10)
          var _r = r + offset
          var _x = _r * cos(a) + x
          var _y = _r * sin(a) + y
          curveVertex(_x, _y)
          xoff += .5
        }
        endShape()
      }
    }
  }