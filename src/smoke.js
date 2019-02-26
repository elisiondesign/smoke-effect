export default class Smoke {

    opacities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 5, 7, 4, 4, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 17, 27, 41, 52, 56, 34, 23, 15, 11, 4, 9, 5, 1, 0, 0, 0, 0, 0, 0, 1, 45, 63, 57, 45, 78, 66, 52, 41, 34, 37, 23, 20, 0, 1, 0, 0, 0, 0, 1, 43, 62, 66, 64, 67, 115, 112, 114, 56, 58, 47, 33, 18, 12, 10, 0, 0, 0, 0, 39, 50, 63, 76, 87, 107, 105, 112, 128, 104, 69, 64, 29, 18, 21, 15, 0, 0, 0, 7, 42, 52, 85, 91, 103, 126, 153, 128, 124, 82, 57, 52, 52, 24, 1, 0, 0, 0, 2, 17, 41, 67, 84, 100, 122, 136, 159, 127, 78, 69, 60, 50, 47, 25, 7, 1, 0, 0, 0, 34, 33, 66, 82, 113, 138, 149, 168, 175, 82, 142, 133, 70, 62, 41, 25, 6, 0, 0, 0, 18, 39, 55, 113, 111, 137, 141, 139, 141, 128, 102, 130, 90, 96, 65, 37, 0, 0, 0, 2, 15, 27, 71, 104, 129, 129, 158, 140, 154, 146, 150, 131, 92, 100, 67, 26, 3, 0, 0, 0, 0, 46, 73, 104, 124, 145, 135, 122, 107, 120, 122, 101, 98, 96, 35, 38, 7, 2, 0, 0, 0, 50, 58, 91, 124, 127, 139, 118, 121, 177, 156, 88, 90, 88, 28, 43, 3, 0, 0, 0, 0, 30, 62, 68, 91, 83, 117, 89, 139, 139, 99, 105, 77, 32, 1, 1, 0, 0, 0, 0, 0, 16, 21, 8, 45, 101, 125, 118, 87, 110, 86, 64, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 28, 79, 79, 117, 122, 88, 84, 54, 46, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6, 55, 61, 68, 71, 30, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 23, 25, 20, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0];
    smokeSpriteSize = 20;
    particles = [];
    running = false;
    smokeParticleImage = null;
    lastframe = null;
    preDrawCallback = () => { };
    context = null;
  
    polyfillAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  
  
    constructor(context, color) {
      this.context = context;
      this.smokeParticleImage = this.makeSmokeSprite(color);
      this.lastframe = performance.now()
    }
  
    frame = (time) => {
      if (!this.running) return;
      var dt = time - this.lastframe;
      this.lastframe = time;
      this.updateAndDrawParticles(dt);
      this.polyfillAnimFrame.call(window, this.frame);
    }
  
    floatInRange(start, end) {
      return start + Math.random() * (end - start)
    }
  
    makeSmokeSprite(color = [24, 46.8, 48.2]) {
      var smokeSprite = document.createElement('canvas'),
        ctx = smokeSprite.getContext('2d'),
        data = ctx.createImageData(this.smokeSpriteSize, this.smokeSpriteSize),
        d = data.data
  
      for (var i = 0; i < d.length; i += 4) {
        d[i] = color[0]
        d[i + 1] = color[1]
        d[i + 2] = color[2]
        d[i + 3] = this.opacities[i / 4]
      }
  
      smokeSprite.width = this.smokeSpriteSize
      smokeSprite.height = this.smokeSpriteSize
  
      ctx.putImageData(data, 0, 0)
  
      return smokeSprite
    }
  
    createParticle(x, y, options) {
      options = options || {}
      var particle = {
        x: x,
        y: y,
        vx: this.floatInRange(options.minVx || -8 / 100, options.maxVx || 8 / 100),
        startvy: this.floatInRange(options.minVy || -4 / 10, options.maxVy || 1 / 10),
        scale: this.floatInRange(options.minScale || 0, options.maxScale || 0.5),
        lifetime: this.floatInRange(options.minLifetime || 2000, options.maxLifetime || 8000),
        age: 0,
      }
      particle.finalScale = this.floatInRange(
        options.minScale || 25 + particle.scale,
        options.maxScale || 30 + particle.scale
      )
      particle.vy = particle.startvy
      return particle
    }
  
    updateParticle(particle, deltatime) {
      particle.x += particle.vx * deltatime
      particle.y += particle.vy * deltatime
      var frac = Math.sqrt(particle.age / particle.lifetime)
      particle.vy = (1 - frac) * particle.startvy
      particle.age += deltatime
      particle.scale = frac * particle.finalScale
    }
  
    drawParticle(particle, smokeParticleImage) {
      this.context.globalAlpha = (1 - Math.abs(1 - 2 * particle.age / particle.lifetime)) / 8
      var off = particle.scale * this.smokeSpriteSize / 2
      var xmin = particle.x - off
      var xmax = xmin + off * 3
      var ymin = particle.y - off
      var ymax = ymin + off * 2
      this.context.drawImage(smokeParticleImage, xmin, ymin, xmax - xmin, ymax - ymin)
    }
  
    addParticles(x, y, numParticles, options) {
      numParticles = numParticles || 10;
      if (numParticles < 1) return Math.random() <= numParticles && this.particles.push(this.createParticle(x, y, options));
      for (var i = 0; i < numParticles; i++) this.particles.push(this.createParticle(x, y, options))
    }
  
    updateAndDrawParticles(deltatime) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  
      this.particles.forEach((p) => { this.updateParticle(p, deltatime) })
      this.particles = this.particles.filter(function (p) { return p.age < p.lifetime })
  
      this.preDrawCallback(deltatime, this.particles)
      this.particles.forEach((p) => { this.drawParticle(p, this.smokeParticleImage, this.context) })
    }
  
    setPreDrawCallback(callback) {
      this.preDrawCallback = callback;
    }
  
    step(dt) {
      dt = dt || 16;
      this.updateAndDrawParticles(dt);
    }
  
    start() {
      this.running = true;
      this.lastframe = performance.now();
      this.polyfillAnimFrame.call(window, this.frame);
      // this.step();
    }
  
    stop() {
      this.running = false;
    }
  
    addSmoke = this.addParticles;
  }
  