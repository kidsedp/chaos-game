/**
 * sketch.js
 *
 * Runs a p5.js sketch to simulate the Chaos Game
 */
let corners;
let currentPoint;
let lastCorner;

let nextSettings = {
  'pointsPerFrame': 1,
  'pointSize': 10,
  'randomCorners': false,
  'numCorners': 3,
  'distance': 0.5,
  'allowRepeats': true
};
let settings;


/**
 * Runs once at the start of the application
 */
function setup() {
  // Initialize the canvas element and embed it into the webpage
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-container");

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
    nextPoint(settings.distance, settings.allowRepeats);
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

  // Generate new corners
  corners = initCorners(settings.numCorners, !settings.randomCorners);
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
 * @param uniform  If true, the corners will form a regular shape. Otherwise,
 *                 they will be selected randomly.
 * @return  An array of *n* corners
 */
function initCorners(n, uniform) {
  if (uniform) {
    return initUniformCorners(n);
  }
  return initRandomCorners(n);
}

/**
 * Generates the corner positions randomly
 *
 * @param n  The number of corners to generate
 * @return  An array of *n* corners
 */
function initRandomCorners(n) {
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
function initUniformCorners(n) {
  let corners = []
  let radius = min(width, height) / 2;
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
 * @param distance  A float from 0.0 to 1.0 indicating how far to go from the
 *                  current point to the corner
 * @param allowRepeats  If true, corners that were chosen in the previous round
 *                      will be allowed.
 */
function nextPoint(distance, allowRepeats) {
  let nextCorner;

  // Choose a corner. If repeats are not allowed, then if the corner was used
  // last time around, keep choosing until one that wasn't used is chosen.
  do {
    nextCorner = random(corners);
  } while (!allowRepeats && nextCorner == lastCorner);

  lastCorner = nextCorner;

  // Set the current point some distance between its current position and the
  // chosen corner.
  currentPoint.lerp(nextCorner, distance);
}
