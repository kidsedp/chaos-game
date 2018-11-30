/**
 * sketch.js
 *
 * Runs a p5.js sketch to simulate the Chaos Game
 */
let corners;
let size;
let currentPoint;
let lastCornerIndex = 0;

let nextSettings = {
  'pointsPerFrame': 1,
  'pointSize': 10,
  'randomCorners': false,
  'numCorners': 3,
  'movementDistance': 0.5,
  'allowRepeats': true,
  'choiceDistance': 10
};
let settings;


/**
 * Runs once at the start of the application
 */
function setup() {
  // Initialize the canvas element and embed it into the webpage
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-container");
  size = min(width, height);

  // Initialize the elements in the control panel - see dom.js
  initControls();

  stroke(0, 191, 165);
  restart();
}

/**
 * Runs once every frame
 */
function draw() {
  for (let i = 0; i < settings.pointsPerFrame; i++) {
    nextPoint(settings.movementDistance, settings.choiceDistance, settings.allowRepeats);
    point(currentPoint.x, currentPoint.y);
  }
}

/**
 * Restarts the animation, loading in the settings as they currently sit
 */
function restart() {
  // Load in the new settings
  settings = JSON.parse(JSON.stringify(nextSettings));

  // Refresh the canvas
  background(255);
  strokeWeight(settings.pointSize);

  // Figure out the scaling factor so that large points don't fall off the canvas
  let scale = (size - settings.pointSize) / size;

  // Generate new corners
  corners = initCorners(settings.numCorners, scale, !settings.randomCorners);
  for (let corner of corners) {
    point(corner.x, corner.y);
  }

  // Set the position of the initial point
  currentPoint = createVector(random(width), random(height));
}

/**
 * Generates the corner positions
 *
 * @param n  The number of corners to generate
 * @param scale  A float to scale the corners by
 * @param uniform  If true, the corners will form a regular shape. Otherwise,
 *                 they will be selected randomly.
 * @return  An array of *n* corners
 */
function initCorners(n, scale, uniform) {
  let corners = uniform ? uniformCorners(n) : randomCorners(n);

  for (let i = 0; i < corners.length; i++) {
    corners[i] = corners[i].mult(scale);
  }

  return corners;
}

/**
 * Generates the corner positions randomly
 *
 * @param n  The number of corners to generate
 * @return  An array of *n* corners
 */
function randomCorners(n) {
  let corners = []

  for (let i = 0; i < n; i++) {
    corners.push(createVector(random(width), random(height)));
  }

  return corners
}

/**
 * Generates the corner positions such that they form a regular shape
 *
 * @param n  The number of corners to generate
 * @return  An array of *n* corners
 */
function uniformCorners(n) {
  let corners = []
  let radius = size / 2;
  let theta = TAU / n;

  for (let i = 0; i < n; i++) {
      let angle = theta * i;
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      corners.push(createVector(x + width/2, y + height/2));
  }

  return corners
}

/**
 * Sets *currentPoint* to a new position
 *
 * @param movementDistance  A float from 0.0 to 1.0 indicating how far to go from the
 *                          current point to the corner
 * @param cornerDistance  How far from the previous point the next point can be
 * @param allowRepeats  If true, corners that were chosen in the previous round
 *                      will be allowed.
 */
function nextPoint(movementDistance, cornerDistance, allowRepeats) {
  let nextCornerIndex;

  // Choose a corner. If repeats are not allowed, then if the corner was used
  // last time around, keep choosing until one that wasn't used is chosen.
  do {
    let offset = floor(random(-cornerDistance, cornerDistance+1));
    nextCornerIndex = (lastCornerIndex + corners.length + offset) % corners.length;
  } while (!allowRepeats && nextCornerIndex == lastCornerIndex);

  lastCornerIndex = nextCornerIndex;

  // Set the current point some distance between its current position and the
  // chosen corner.
  currentPoint.lerp(corners[nextCornerIndex], movementDistance);
}
