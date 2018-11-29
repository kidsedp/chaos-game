function initControls() {
  initButton('restart', 'restart-button-parent', restart);

  initSlider(1, 1000, 1, 'pointsPerFrame', 'points-per-frame-parent');
  initSlider(3, 20, 3, 'numCorners', 'num-corners-parent');
  initSlider(1, 10, 10, 'pointSize', 'point-size-parent');
  initSlider(1, 999, 500, 'distance', 'distance-parent', 1000);

  initSwitch('random-corners', 'randomCorners');
  initSwitch('allow-repeats', 'allowRepeats');
}

function initButton(text, container, func) {
  let button = createButton(text);
  button.class('btn waves-effect');
  button.parent(container);
  button.mousePressed(func);
}

function initSlider(start, end, value, key, container, downscale) {
  let slider = createSlider(start, end, value);
  slider.id = 'points-per-frame';
  let text = createSpan(nextSettings[key]);
  text.class('slider-value');

  text.parent(container);
  slider.parent(container);

  slider.input(e => {
    value = parseInt(e.target.value);
    if (downscale) {
      value /= downscale;
    }

    nextSettings[key] = value;
    text.html(value);
  });
}

function initSwitch(id, key) {
  let toggle = select('#' + id);
  toggle.changed(e => {
    nextSettings[key] = e.target.checked;
  });
}
