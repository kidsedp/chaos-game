let corners;
let currentPoint;
let lastChoice = -1;

let nextSettings = {
  'pointsPerFrame': 1,
  'pointSize': 10,
  'randomCorners': false,
  'numCorners': 3,
  'distance': 0.5,
  'allowRepeats': true
};
let settings;


function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-container");
  initControls();

  stroke(255);
  restart();
}

function draw() {
  for (let i = 0; i < settings.pointsPerFrame; i++) {
    nextPoint(settings.allowRepeats, settings.distance);
    point(currentPoint.x, currentPoint.y);
  }
}

function restart() {
  settings = JSON.parse(JSON.stringify(nextSettings));
  background(0);
  strokeWeight(settings.pointSize);
  corners = initCorners(settings.numCorners, !settings.randomCorners);
  currentPoint = createVector(random(width), random(height));
  drawCorners();
}

function initCorners(n, uniform) {
  let corners = []
  let radius = min(width, height) / 2;
  let theta = TAU / n;

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

function nextPoint(allowRepeats, distance) {
  let choice;
  do {
    choice = floor(random(corners.length));
  } while (!allowRepeats && choice == lastChoice);
  lastChoice = choice;
  let corner = corners[choice];

  currentPoint.x = lerp(currentPoint.x, corner.x, distance);
  currentPoint.y = lerp(currentPoint.y, corner.y, distance);
}
