function initControls() {
  initResetButton();

  initSlider(1, 1000, 1, 'pointsPerFrame', 'points-per-frame-parent');
  initSlider(3, 20, 3, 'numCorners', 'num-corners-parent');
  initSlider(1, 10, 10, 'pointSize', 'point-size-parent');
  initSlider(1, 999, 500, 'distance', 'distance-parent', 1000);

  initCheckbox(false, 'randomCorners', 'random-corners-parent');
  initCheckbox(true, 'allowRepeats', 'allow-repeats-parent');
}

function initResetButton() {
  let resetButton = createButton("restart");
  resetButton.mousePressed(restart);
}

function initSlider(start, end, value, key, container, downscale) {
  let slider = createSlider(start, end, value);
  let text = createSpan(nextSettings[key]);

  slider.parent(container);
  text.parent(container);

  slider.changed(e => {
    value = parseInt(e.target.value);
    if (downscale) {
      value /= downscale;
    }

    nextSettings[key] = value;
    text.html(value);
  });
}

function initCheckbox(value, key, container) {
  let checkbox = createCheckbox('', value);
  checkbox.parent(container);

  checkbox.changed(e => {
    nextSettings[key] = e.target.checked;
  });
}
