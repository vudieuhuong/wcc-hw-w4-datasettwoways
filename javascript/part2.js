let screentime;
let drawing = false;
const X_AXIS = 2;
let b1, b2, c1, c2;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");

  fetch("./json/screentime.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    screentime = data.screentime;
    drawing = true;

  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });
}

function draw() {
  background(220);
  if(drawing)
    drawChart();
}

function drawChart(){
  // Compute maximum amount (for normalization)
  let maxval = 0; 

  for (let i = 0; i < screentime.length; i++) {
    if (screentime[i].amount > maxval) {
      maxval = screentime[i].amount;
    }
  }

  let spacing = 5;//spacing between the bars
  // Display chart
  for (let i=0; i<screentime.length; i++) {

    let item = screentime[i];
    
    let rWidth = windowWidth/(screentime.length+.5); 
    let rX = map(i, 0, screentime.length, rWidth/2, windowWidth);
    let rY = windowHeight/2; 
    let rHeight = 0-map(item.amount, 0, maxval, 0, windowHeight-(rWidth*2)); 
 
    
    // Define colors
    c1 = color(screentime[i].color);
    c2 = color(screentime[i].color+1);

    // set background
    setGradient(rX-rWidth/2, 0, rWidth, windowHeight, c2, c1, X_AXIS);

    // fill(item.color);
    fill(255);
    ellipse(rX, rY, rWidth, rHeight); 

    fill(0); 
    textSize(20);
    textAlign(CENTER, TOP); 
    noStroke();
    text(item.app, rX, rY);
  } 
}
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }