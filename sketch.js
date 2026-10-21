let beat, analyzer;

function preload() {
  beat = loadSound('beat.mp3');
}

function setup() {
  createCanvas(600, 400);
  
  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);
}

function mousePressed() {
  if (beat.isPlaying()) {
    beat.stop();
  } else {
    beat.loop();
  }
}

function draw() {
  background(20, 24, 38); 

  let rms = 0;
  if (analyzer.getLevel()) {
    rms = analyzer.getLevel();
  }

  // 
  let r = map(rms, 0, 0.3, 100, 255);
  let g = map(rms, 0, 0.3, 50, 200);
  let b = map(rms, 0, 0.3, 255, 150);

  // 
  noFill();
  stroke(r, g, b, 180);
  strokeWeight(3);
  ellipse(mouseX, mouseY, 40 + rms * 400, 40 + rms * 400);

  // 
  fill(r, g, b);
  noStroke();
  ellipse(mouseX, mouseY, 15 + rms * 180, 15 + rms * 180);

  // 
  fill(255);
  ellipse(mouseX, mouseY, 5, 5);
}