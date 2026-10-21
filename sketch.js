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
  background(10, 15, 25);

  let rms = 0;
  if (analyzer.getLevel()) {
    rms = analyzer.getLevel();
  }

  noFill();
  strokeWeight(2);

  // 绘制跨越屏幕的波浪线，高度受鼠标 mouseY 和音量同时控制
  beginShape();
  for (let x = 0; x < width; x += 15) {
    // 使用 noise 计算平滑的波动效果
    let y = mouseY + sin(x * 0.02 + frameCount * 0.1) * (rms * 250);
    
    let r = map(x, 0, width, 50, 255);
    let g = map(rms, 0, 0.3, 100, 255);
    stroke(r, g, 220);
    
    vertex(x, y);
  }
  endShape();

  // 鼠标位置点缀高亮圆点
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 10 + rms * 100, 10 + rms * 100);
}
