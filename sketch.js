function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  noFill();

  rotateX(60);

  for (let i = 0; i < 20; i++) {
    stroke(255);

    beginShape();
    for (let j = 0; j < 360; j++) {
      let rad = i * 10;

      let x = rad * cos(j);
      let y = rad * sin(j);
      let z = sin(frameCount * 2 + i * 10) * 50;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
