let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noiseDetail(1);

  let space = 20;

  for(let x = 0; x < windowWidth; x += space) {
    for(let y = 0; y < windowHeight; y += space) {
      let p = createVector(x, y);
      points.push(p);
    }
  }
}

function draw() {
  translate(-windowWidth / 2, -windowHeight / 2);
  background(0);
  strokeWeight(2);

  for(let i = 0; i < points.length; i++) {
    let n = noise(points[i].x, points[i].y);
    let nx = cos(frameCount * n);
    let ny = sin(frameCount * n);

    let r = map(sin(n * frameCount / 2), -1, 1, 0, 255);
    let g = map(cos(frameCount), -1, 1, 0, 255);
    let b = map(cos(frameCount ** n), -1, 1, 0, 255);
    stroke(r, g, b, 100);

    line(points[i].x, points[i].y, map(nx, -1, 1, -20, 20) + points[i].x, map(ny + cos(frameCount), -1, 1, -20, 20) + points[i].y);
  }
}
