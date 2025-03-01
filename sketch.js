// Drawing area position and dimension
let drawAreaW = 638;
let drawAreaH = 438;
let drawAreaX = 81;
let drawAreaY = 56;

// Start sketch object function
let sketch = {
  x: 639,
  y: 439,
  px: 639,
  py: 439,

  outboundLeft: false,
  outboundRight: false,
  outboundTop: false,
  outboundBot: false,
  drawing: false,
  drawingUp: false,
  drawingDown: false,
  drawingLeft: false,
  drawingRight: false,
  drawingSpeed: 1,

  drawLine: function () {
    // Stops drawing outside drawing area
    if (this.x < drawAreaX + 7) {
      this.outboundLeft = true;
    } else {
      this.outboundLeft = false;
    }

    if (this.x > drawAreaX + drawAreaW - 8) {
      this.outboundRight = true;
    } else {
      this.outboundRight = false;
    }

    if (this.y < drawAreaY + 7) {
      this.outboundTop = true;
    } else {
      this.outboundTop = false;
    }

    if (this.y > drawAreaY + drawAreaH - 7) {
      this.outboundBot = true;
    } else {
      this.outboundBot = false;
    }

    this.px = this.x;
    this.py = this.y;

    this.drawHorizontal();
    this.drawVertical();

    // Drawing cursor
    if (this.drawing === true) {
      stroke(0);
      strokeWeight(2.5);
      line(this.px, this.py, this.x, this.y);
    }
  },

  // Draw horizontal
  drawHorizontal: function () {
    if (this.drawingLeft && this.outboundLeft === false) {
      this.x -= this.drawingSpeed;
    } else if (this.drawingRight && this.outboundRight === false) {
      this.x += this.drawingSpeed;
    }
  },

  // Draw vertical
  drawVertical: function () {
    if (this.drawingUp && this.outboundTop === false) {
      this.y -= this.drawingSpeed;
    } else if (this.drawingDown && this.outboundBot === false) {
      this.y += this.drawingSpeed;
    }
  },
};

function setup() {
  createCanvas(800, 600);
  background("#B8181E");

  // Draw Area
  stroke("#871E24");
  strokeWeight(6);
  fill("#F5F5F5");
  rect(drawAreaX, drawAreaY, drawAreaW, drawAreaH, 10);
  knobs(0, 0);
  knobs(692, 0);

  // Text instruction
  textStyle("Poppins");
  textStyle(BOLD);
  textSize(14);
  fill("#F5AAAA");
  text(
    "Instruction: Click anywhere on the canvas to mark your starting point.",
    120,
    527
  );
  textStyle(NORMAL);
  text("W - Draw Up", 120, 554);
  text("S - Draw Down", 120, 581);
  text("← - Draw Left", 289, 554);
  text("→ - Draw Right", 289, 581);
  text("Delete / Backspace - Clear canvas", 458, 554);
}

function draw() {
  sketch.drawLine();
}

// Draw knobs
function knobs(knobX, knobY) {
  noStroke();
  fill("#871E24");
  circle(knobX + 58, knobY + 546, 84);
  fill("#AEA6B2");
  circle(knobX + 54, knobY + 542, 84);
  fill("#E8E6F2");
  circle(knobX + 54, knobY + 542, 68);
  fill("#EEEDF2");
  circle(knobX + 54, knobY + 542, 8);
}

// Mouse press to mark starting point
function mousePressed() {
  sketch.x = mouseX;
  sketch.y = mouseY;

  if (
    mouseX > drawAreaX &&
    mouseY > drawAreaY &&
    mouseX < drawAreaX + drawAreaW &&
    mouseY < drawAreaY + drawAreaH
  ) {
    sketch.drawing = true;
    strokeWeight(2.5);
    point(mouseX, mouseY);
  } else {
    sketch.drawing = false;
  }
}

// Key press defined
function keyPressed() {
  // Clears canvas
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background("#B8181E");

    // Draw Area
    stroke("#871E24");
    strokeWeight(6);
    fill("#F5F5F5");
    rect(drawAreaX, drawAreaY, drawAreaW, drawAreaH, 10);
    knobs(0, 0);
    knobs(692, 0);

    // Begin instruction
    textStyle("Poppins");
    textStyle(BOLD);
    textSize(14);
    fill("#F5AAAA");
    text(
      "Instruction: Click anywhere on the canvas to mark your starting point.",
      120,
      527
    );
    textStyle(NORMAL);
    text("W - Draw Up", 120, 554);
    text("S - Draw Down", 120, 581);
    text("← - Draw Left", 289, 554);
    text("→ - Draw Right", 289, 581);
    text("Delete / Backspace - Clear canvas", 458, 554);

    sketch.drawing = false;
  }

  if (key === "w") {
    sketch.drawingUp = true;
  } else if (key === "s") {
    sketch.drawingDown = true;
  } else if (keyCode === LEFT_ARROW) {
    sketch.drawingLeft = true;
  } else if (keyCode === RIGHT_ARROW) {
    sketch.drawingRight = true;
  }
}

// Key release boolean
function keyReleased() {
  if (key === "w") {
    sketch.drawingUp = false;
  } else if (key === "s") {
    sketch.drawingDown = false;
  } else if (keyCode === LEFT_ARROW) {
    sketch.drawingLeft = false;
  } else if (keyCode === RIGHT_ARROW) {
    sketch.drawingRight = false;
  }
}
