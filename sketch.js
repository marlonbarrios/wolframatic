let cells = [];
let ruleValue = 0;
let ruleSet;
let w = 8;
let y = 0;
let total;
let automate = true;
let showRuleValue = false;
let changeColor = true;
let bgColor = 255; // Default white background

function setup() {
  createCanvas(windowWidth, windowHeight);
  total = width / w;
  initializeCells();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  total = width / w;
  initializeCells();
}

function initializeCells() {
  
  if (changeColor) {
    bgColor = color(random(255), random(255), random(255));
  }
  background(bgColor);
  ruleSet = ruleValue.toString(2).padStart(8, "0");
  cells = Array(floor(total)).fill(0);
  cells[floor(total / 2)] = 1;
  y = 0;
}

function draw() {
  if (y < height) {
    for (let i = 0; i < cells.length; i++) {
      let x = i * w;
      noStroke();
      fill(255 - cells[i] * 255);
      square(x, y, w);
    }

    y += w;
    let nextCells = Array(cells.length).fill(0);
    for (let i = 0; i < cells.length; i++) {
      let left = cells[(i - 1 + cells.length) % cells.length];
      let right = cells[(i + 1) % cells.length];
      let state = cells[i];
      nextCells[i] = calculateState(left, state, right);
    }

    cells = nextCells;
  } else if (automate) {
    ruleValue = (ruleValue + 1) % 256;
    initializeCells();
  }

  if (showRuleValue) {
    noStroke();
    fill(0);
    rect(width - 135, height - 50, 135, 50);
    fill(255); 
    textSize(30);
    textAlign(RIGHT, BOTTOM);
    text("rule " + ruleValue, width - 20, height - 10);
  }
}

function calculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    ruleValue = (ruleValue + 1) % 256;
    initializeCells();
  } else if (keyCode === DOWN_ARROW) {
    ruleValue = (ruleValue + 255) % 256;
    initializeCells();
  } else if (keyCode === 32) { // Spacebar for automation
    automate = !automate;
  } else if (key === 'r' || key === 'R') {
    showRuleValue = !showRuleValue;
  } else if (key === 's' || key === 'S') {
    saveCanvas('wolfram_cellular_automaton_rule_'+ ruleValue, 'png');
  }
}
