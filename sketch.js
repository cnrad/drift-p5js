var inc = 0.05;
var incStart = 0.025;
var magInc = 0.01;
var start = 0;
var scl = 25;
var cols, rows;
var zoff = 0;
var magOff = 0;
var magnitude = 8;
var slowRate = 5;
var maxWidth = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(0);
}

function draw() {
  background(0);
  
  var yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = start;
    for (let x = 0; x < cols; x++) {

      let r = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
      let g = map(noise(xoff + 100, yoff + 100, zoff), 0, 1, 0, 255);
      let b = map(noise(xoff + 200, yoff + 200, zoff), 0, 1, 0, 255);

      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      let m = map(noise(xoff, yoff, magOff), 0, 1, magnitude * -1, magnitude);
      
      // push() and pop() for individualized transforms
      push();
      blendMode(ADD);
      stroke(r, g, b);
      translate(x * scl, y * scl);
      rotate(v.heading());
      let endpoint = abs(m) * scl;

      strokeWeight(map(abs(m), 0, magnitude, 1, maxWidth));

      // Gradient lines, for opacity
      let gradient = drawingContext.createLinearGradient(0, 0, endpoint, 0);
      gradient.addColorStop(0, color(r, g, b, 0));
      gradient.addColorStop(1, color(r, g, b, map(abs(m), 0, 1, 0, 200)));
      drawingContext.strokeStyle = gradient;

      line(0, 0, endpoint, 0);
      // Add the little point at the end of a line, if the magnitude is lower
      stroke(r, g, b, map(abs(m), 0, magnitude / 2, 75, 0));
      point(endpoint, 0);
      
      pop();

      xoff += inc;
    }
    yoff += inc;
  }

  magOff += magInc / slowRate;
  zoff += incStart / slowRate;
  
}