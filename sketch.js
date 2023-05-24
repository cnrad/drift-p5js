var inc = 0.05;
var incStart = 0.025;
var magInc = 0.01;
var start = 0;
var scl = 50;
var cols, rows;
var zoff = 0;
var magOff = 0;
var magnitude = 8;
var slowRate = 5;
var maxWidth = 15;

var variation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
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
    rows = floor(height / scl) * 2;
  } else {
    variation = 0;
    maxWidth = 15;
    rows = floor(height / scl);
  }
}

function draw() {
  background(0);

  translate(windowWidth * -0.5, windowHeight * -0.5);

  var yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = start;
    for (let x = 0; x < cols; x++) {
      let r = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
      let g = map(noise(xoff + 100, yoff + 100, zoff), 0, 1, 0, 255);
      let b = map(noise(xoff + 200, yoff + 200, zoff), 0, 1, 0, 255);

      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      // let v = p5.Vector.fromAngle(angle);
      let v = createVector(Math.cos(angle), Math.sin(angle), 0);

      let m = map(noise(xoff, yoff, magOff), 0, 1, magnitude * -1, magnitude);

      // push() and pop() for individualized transforms
      push();
      blendMode(ADD);
      stroke(r, g, b);
      translate(x * scl, y * scl);
      if (variation === 0) rotate(v.heading());
      let endpoint = abs(m) * scl;

      let strokeWidth = map(abs(m), 0, magnitude, 1, maxWidth);

      // 2D
      // Gradient lines, for opacity
      //   let gradient = drawingContext.createLinearGradient(0, 0, endpoint, 0);
      //   gradient.addColorStop(0, color(r, g, b, 0));
      //   gradient.addColorStop(1, color(r, g, b, map(abs(m), 0, 1, 0, 200)));
      //   drawingContext.strokeStyle = gradient;

      // WEBGL
      noStroke();
      beginShape();
      fill(r, g, b, 0);
      vertex(0, (strokeWidth / 2) * -1);
      vertex(0, strokeWidth / 2);

      fill(r, g, b, 255);
      vertex(endpoint, strokeWidth / 2);
      vertex(endpoint, (strokeWidth / 2) * -1);
      endShape(CLOSE);

      // 2D
      //   line(0, 0, endpoint, 0);
      // Add the little point at the end of a line, if the magnitude is lower
      strokeWeight(strokeWidth);
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

// function draw() {
//   background(0);

//   box();
// }
