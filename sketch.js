var inc = 0.05;
var incStart = 0.025;
var magInc = 0.01;
var start = 0;
var scl = 30;
var cols, rows;
var zoff = 0;
var magOff = 0;
var magnitude = 8;
var slowRate = 8;
var maxWidth = 15;

var variation = 0;

function setup() {
  createCanvas(windowWidth * 1.2, windowHeight * 1.2, WEBGL);
  pixelDensity(2);
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
}

function mouseClicked() {
  if (variation === 0) {
    variation = 1;
    maxWidth = 30;
    slowRate = 3;
    rows = floor(height / scl) * 2;
  } else {
    variation = 0;
    maxWidth = 15;
    slowRate = 8;
    rows = floor(height / scl);
  }
}

function draw() {
  background(0);

  translate(width * -0.5, height * -0.5);

  var yoff = 0;
  for (let y = 0; y < rows + 2; y++) {
    let xoff = start;
    for (let x = 0; x < cols + 2; x++) {
      // Random colors
      let r = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
      let g = map(noise(xoff + 100, yoff + 100, zoff), 0, 1, 0, 255);
      let b = map(noise(xoff + 200, yoff + 200, zoff), 0, 1, 0, 255);

      // Determine angle
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      // Create vector from angle
      let v = createVector(Math.cos(angle), Math.sin(angle), 0);

      // Determine magnitude
      let m = map(noise(xoff, yoff, magOff), 0, 1, magnitude * -1, magnitude);

      // Use push() and pop() for individualized transforms
      push();

      // Blend mode, so the colors add over one another when lines overlap
      blendMode(ADD);
      stroke(r, g, b);
      translate(x * scl, y * scl);
      // Determine where the line ends
      let endpoint = abs(m) * scl;

      if (variation === 0) rotate(v.heading());

      // Determine stroke width based on absolute magnitude
      let strokeWidth = map(abs(m), 0, magnitude, 0, maxWidth);

      // Draw line with gradient starting from alpha 0
      noStroke();
      beginShape();
      fill(r, g, b, 0);
      vertex(0, (strokeWidth / 2) * -1);
      vertex(0, strokeWidth / 2);

      fill(r, g, b, 255);
      vertex(endpoint, strokeWidth / 2);
      vertex(endpoint, (strokeWidth / 2) * -1);
      endShape(CLOSE);

      // Arc to add a rounded cap to the line
      fill(r, g, b);
      arc(endpoint, 0, strokeWidth, strokeWidth, PI + HALF_PI, HALF_PI);
      noFill();

      // Add the little point at the end of a line, if the magnitude is lower
      strokeWeight(strokeWidth);
      let pointColor = color(r, g, b, map(abs(m), 0, magnitude / 3, 200, 0));
      stroke(pointColor);
      point(endpoint, 0);

      pop();

      xoff += inc;
    }
    yoff += inc;
  }

  magOff += magInc / slowRate;
  zoff += incStart / slowRate;
}
