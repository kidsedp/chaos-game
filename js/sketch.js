let pointSize = 2;
let randomCorners = false;
let corners;
let currentPoint;
let numCorners = 6;
let distance = 0.65;
let pointsPerFrame = 100;
let lastChoice = -1;
let allowRepeats = true;

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(255);

  restart();
}

function draw() {
  for (let i = 0; i < pointsPerFrame; i++) {
    nextPoint(allowRepeats);
    point(currentPoint.x, currentPoint.y);
  }
}

function restart() {
  strokeWeight(pointSize);
  corners = initCorners(numCorners, !randomCorners);
  currentPoint = createVector(random(width), random(height));
  drawCorners();
}

function initCorners(n, uniform) {
  let corners = []
  let radius = min(width, height) / 2;
  let theta = TAU / numCorners;

  for (let i = 0; i < n; i++) {
    if (uniform) {
      let angle = theta * i;
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      corners.push(createVector(x + width/2, y + height/2));
    } else {
      corners.push(createVector(random(width), random(height)));
    }
  }

  return corners
}

function drawCorners() {
  for (let corner of corners) {
    point(corner.x, corner.y);
  }
}

function nextPoint(allowRepeats) {
  let choice;
  do {
    choice = floor(random(numCorners));
  } while (!allowRepeats && choice == lastChoice);
  lastChoice = choice;
  let corner = corners[choice];

  currentPoint.x = lerp(currentPoint.x, corner.x, distance);
  currentPoint.y = lerp(currentPoint.y, corner.y, distance);
}
