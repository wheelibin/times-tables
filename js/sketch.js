// Input references
let numberOfPointsSlider;
let multiplierSlider;
let paletteSlider;
let startPositionSlider;
let lineWidthSlider;
let showNumberCheckbox;
let showDotsCheckbox;
let animateButton;

// App variables
let circleSize;
let circleX;
let circleY;
let multiplier = 2;
let startPosition = 1;
let animationDirection = 1;
let lineWidth = 1;

// App constants
const fps = 30;
const maxNumberOfPoints = 2000;
const minMultiplier = 2;
const maxMultiplier = 2000;
const maxAnimationSpeed = fps;
const dotSize = 8;
const circleStrokeWidth = 1;

// Colours
const backgroundColour = "#292929";
const circleBackgroundColour = "#030303";
const circleStrokeColour = "#e6e6e6";
const textColour = "#c6c6c6";
const headingColour = "rgb(121,121,121)";
const lineColourPalettes = [
  // https://coolors.co/012a4a-013a63-01497c-014f86-2a6f97-2c7da0-468faf-61a5c2-89c2d9-a9d6e5
  ["012a4a", "013a63", "01497c", "014f86", "2a6f97", "2c7da0", "468faf", "61a5c2", "89c2d9", "a9d6e5"],
  // https://coolors.co/fadde1-ffc4d6-ffa6c1-ff87ab-ff5d8f-ff97b7-ffacc5-ffcad4-f4acb7
  ["fadde1", "ffc4d6", "ffa6c1", "ff87ab", "ff5d8f", "ff97b7", "ffacc5", "ffcad4", "f4acb7"],
  // https://coolors.co/54478c-2c699a-048ba8-0db39e-16db93-83e377-b9e769-efea5a-f1c453-f29e4c
  ["54478c", "2c699a", "048ba8", "0db39e", "16db93", "83e377", "b9e769", "efea5a", "f1c453", "f29e4c"],
  // https://coolors.co/004b23-006400-007200-008000-38b000-70e000-9ef01a-ccff33
  ["004b23", "006400", "007200", "008000", "38b000", "70e000", "9ef01a", "ccff33"],
  // https://coolors.co/fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a
  ["fec5bb", "fcd5ce", "fae1dd", "f8edeb", "e8e8e4", "d8e2dc", "ece4db", "ffe5d9", "ffd7ba", "fec89a"],
  // https://coolors.co/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226
  ["001219", "005f73", "0a9396", "94d2bd", "e9d8a6", "ee9b00", "ca6702", "bb3e03", "ae2012", "9b2226"],
  // https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08
  ["03071e", "370617", "6a040f", "9d0208", "d00000", "dc2f02", "e85d04", "f48c06", "faa307", "ffba08"],
  // https://coolors.co/d8f3dc-b7e4c7-95d5b2-74c69d-52b788-40916c-2d6a4f-1b4332-081c15
  ["d8f3dc", "b7e4c7", "95d5b2", "74c69d", "52b788", "40916c", "2d6a4f", "1b4332", "081c15"],
  // https://coolors.co/d9ed92-b5e48c-99d98c-76c893-52b69a-34a0a4-168aad-1a759f-1e6091-184e77
  ["d9ed92", "b5e48c", "99d98c", "76c893", "52b69a", "34a0a4", "168aad", "1a759f", "1e6091", "184e77"],
  // https://coolors.co/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
  ["f8f9fa", "e9ecef", "dee2e6", "ced4da", "adb5bd", "6c757d", "495057", "343a40", "212529"],
  // https://coolors.co/390099-9e0059-ff0054-ff5400-ffbd00
  ["390099", "9e0059", "ff0054", "ff5400", "ffbd00"],
  // https://coolors.co/ff595e-ffca3a-8ac926-1982c4-6a4c93
  ["ff595e", "ffca3a", "8ac926", "1982c4", "6a4c93"],
];

function setup() {
  noLoop();
  frameRate(fps);
  createCanvas(windowWidth, windowHeight);
  createInputs();
}

function draw() {
  background(backgroundColour);
  stroke(backgroundColour);
  fill(0);
  textSize(16);

  const numberOfPoints = numberOfPointsSlider.value();
  const animationSpeed = animationSpeedSlider.value();
  const colourPaletteIndex = paletteSlider.value() - 1;
  const palette = lineColourPalettes[colourPaletteIndex];

  if (isLooping()) {
    let increment = (animationSpeed / (fps * 0.5)) * animationDirection;
    const newMultiplier = multiplier + increment;
    if (newMultiplier >= maxMultiplier) {
      animationDirection = -1;
    }
    if (newMultiplier < minMultiplier) {
      animationDirection = 1;
    }

    multiplier += increment;
  }

  // display input values
  fill(textColour);
  text(numberOfPoints, 160, numberOfPointsSlider.position().y + 14);
  text(Math.round(multiplier, 3), 160, multiplierSlider.position().y + 14);
  text(colourPaletteIndex, 160, paletteSlider.position().y + 14);
  text(animationSpeed, 160, animationSpeedSlider.position().y + 14);
  text(startPosition, 160, startPositionSlider.position().y + 14);

  // Draw the circle
  circleSize = Math.min(windowWidth, windowHeight) - 100;
  circleX = windowWidth / 2;
  circleY = windowHeight / 2;

  fill(circleBackgroundColour);
  stroke(`#${palette[palette.length - 1]}`);
  strokeWeight(lineWidth);
  circle(circleX, circleY, circleSize + lineWidth * 2);
  strokeWeight(1);

  // dots
  if (showDotsCheckbox.checked() || showNumberCheckbox.checked()) {
    for (let i = 0; i < numberOfPoints; i++) {
      if (showDotsCheckbox.checked()) {
        fill("rgb(255,0,0)");
        const dotCoord = getCoordsForValue(i, numberOfPoints);
        console.log(dotCoord);
        circle(dotCoord.x, dotCoord.y, dotSize);
      }

      if (showNumberCheckbox.checked()) {
        const textCoord = getCoordsForValue(i, numberOfPoints, 16);
        fill(textColour);
        text(i, textCoord.x - 6, textCoord.y + 6);
      }
    }
  }

  // now plot the times table
  const linesPerColour = numberOfPoints > palette.length ? Math.floor(numberOfPoints / palette.length) : 1;
  let colourIndex = 0;
  let linesForColourCount = 0;

  for (let i = 0; i < numberOfPoints; i++) {
    if (linesForColourCount > linesPerColour) {
      colourIndex++;
      linesForColourCount = 0;
    }

    stroke(`#${palette[colourIndex]}`);
    strokeWeight(lineWidth);
    const lineFrom = getCoordsForValue(i * multiplier, numberOfPoints);
    const lineTo = getCoordsForValue(i, numberOfPoints);
    line(lineFrom.x, lineFrom.y, lineTo.x, lineTo.y);

    linesForColourCount++;
  }
}

function getCoordsForValue(value, modulus, radiusAdj = 0) {
  const startPositionMultipliers = [2, 1.5, 1, 0.5];
  const a = (2 * Math.PI * value) / modulus - Math.PI * startPositionMultipliers[startPosition - 1];
  const circleRadius = circleSize / 2;
  return {
    x: circleX + (circleRadius + radiusAdj) * Math.cos(a),
    y: circleY + (circleRadius + radiusAdj) * Math.sin(a),
  };
}

function handleWindowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function handleParamsChanged() {
  redraw();
}

function handleMultiplierChanged() {
  multiplier = multiplierSlider.value();
  redraw();
}

function handleStartPositionChanged() {
  startPosition = startPositionSlider.value();
  redraw();
}

function handleLineWidthChanged() {
  lineWidth = lineWidthSlider.value();
  redraw();
}

function toggleAnimation() {
  if (isLooping()) {
    noLoop();
    animateButton.html("Start Animation");
  } else {
    loop();
    animateButton.html("Stop Animation");
  }
}

function createTextElement(element, text, x, y, color = textColour) {
  let el = createElement(element, text);
  el.style("font-family", "sans-serif");
  el.style("color", color);
  el.position(x, y);
}

function createInputs() {
  const controlX = 32;
  let controlY = 8;
  const controlYSpacing = 64;

  createTextElement("h1", "Modular Multiplication", controlX, controlY, textColour);
  controlY += controlYSpacing;

  createTextElement("h3", "Maths", controlX, controlY, headingColour);
  controlY += controlYSpacing / 1.5;

  createTextElement("p", "Number of points", controlX, controlY);
  controlY += controlYSpacing / 1.5;

  numberOfPointsSlider = createSlider(10, maxNumberOfPoints, 200, 1);
  numberOfPointsSlider.position(controlX, controlY);
  numberOfPointsSlider.style("width", "120px");
  numberOfPointsSlider.input(handleParamsChanged);

  controlY += 16;
  createTextElement("p", "Multiplier", controlX, controlY);
  controlY += controlYSpacing / 1.5;

  multiplierSlider = createSlider(minMultiplier, maxMultiplier, minMultiplier, 1);
  multiplierSlider.position(controlX, controlY);
  multiplierSlider.style("width", "120px");
  multiplierSlider.input(handleMultiplierChanged);

  controlY += 16;
  createTextElement("p", "Start Position", controlX, controlY);
  controlY += controlYSpacing / 1.5;

  startPositionSlider = createSlider(1, 4, startPosition, 1);
  startPositionSlider.position(controlX, controlY);
  startPositionSlider.style("width", "120px");
  startPositionSlider.input(handleStartPositionChanged);

  controlY += controlYSpacing / 2;
  createTextElement("h3", "Visuals", controlX, controlY, headingColour);
  controlY += controlYSpacing - 4;

  showNumberCheckbox = createCheckbox("Show Numbers", false);
  showNumberCheckbox.position(controlX, controlY);
  showNumberCheckbox.style("width", "150px");
  const showNumberCheckboxLabel = showNumberCheckbox.elt.getElementsByTagName("label")[0];
  showNumberCheckboxLabel.style.fontFamily = "sans-serif";
  showNumberCheckboxLabel.style.color = textColour;
  showNumberCheckboxLabel.style.paddingLeft = "8px";
  showNumberCheckbox.changed(handleParamsChanged);

  controlY += 32;
  showDotsCheckbox = createCheckbox("Show Dots", false);
  showDotsCheckbox.position(controlX, controlY);
  showDotsCheckbox.style("width", "150px");
  const showDotsCheckboxLabel = showDotsCheckbox.elt.getElementsByTagName("label")[0];
  showDotsCheckboxLabel.style.fontFamily = "sans-serif";
  showDotsCheckboxLabel.style.color = textColour;
  showDotsCheckboxLabel.style.paddingLeft = "8px";
  showDotsCheckbox.changed(handleParamsChanged);

  controlY += 16;
  createTextElement("p", "Line Width", controlX, controlY);
  controlY += controlYSpacing / 1.5;
  lineWidthSlider = createSlider(1, 20, 1, 1);
  lineWidthSlider.position(controlX, controlY);
  lineWidthSlider.style("width", "120px");
  lineWidthSlider.input(handleLineWidthChanged);

  controlY += 16;
  createTextElement("p", "Colour Palette", controlX, controlY);
  controlY += controlYSpacing / 1.5;
  paletteSlider = createSlider(1, lineColourPalettes.length, 1, 1);
  paletteSlider.position(controlX, controlY);
  paletteSlider.style("width", "120px");
  paletteSlider.input(handleParamsChanged);

  controlY += 16;
  createTextElement("p", "Animation Speed", controlX, controlY);
  controlY += controlYSpacing / 1.5;
  animationSpeedSlider = createSlider(0.01, 5, 0.05, 0.01);
  animationSpeedSlider.position(controlX, controlY);
  animationSpeedSlider.style("width", "120px");
  animationSpeedSlider.input(handleParamsChanged);

  controlY += controlYSpacing / 2;
  animateButton = createButton("Start Animation");
  animateButton.position(controlX, controlY);
  animateButton.style("font-family", "sans-serif");
  animateButton.mousePressed(toggleAnimation);
}
