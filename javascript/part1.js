let screentime;
let drawing = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");

  //no animation / interaction chart
  

  fetch("./json/screentime.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    screentime = data.screentime;
    drawing = true;
    //using no Loop? you can just call your function once the data is loaded
   
  
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
    
    let rWidth = width/(screentime.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, screentime.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.amount, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    noStroke(); 
    fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 

    fill(0); 
    textSize(20);
    textAlign(CENTER, TOP); 
    text(item.app, rX+rWidth/2-1, rY+10);
    text('avarage screen time in a week', windowWidth/2, 100);
  }  

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }