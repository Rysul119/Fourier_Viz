let time = 0
// to store the y values of the approximations
let curve = []
// to scale the cirlce radius
let scale = 100
// range for the slider
let range = 100
let slider;

function setup() {
    createCanvas(1000, 400);
    // a slider ranging from 1 to 100, staring from 2
    slider = createSlider(1, 100, 2);
}
  
function draw() {
    //black background
    background(0);

    translate(200, 200);
    let x = 0;
    let y = 0;
    for(let i = 1; i<slider.value(); i++){
        let radius = scale * (2/(Math.pow(-1, i) * i * PI)); // for approximating sawtooth wave
        // flags for keeping the (x, y) coordinates of the previous iteration for the center of the current circle
        let prevx = x;
        let prevy = y;

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2); // draw circle
        // update x and y coordinates to approximate the sawtooth wave using Fourier Series
        x += radius * cos(i * time);
        y += radius * sin(i * time); 
        
        stroke(255);
        line(prevx, prevy, x ,y); //connecting the center with the update x and y
    }
    // storing the last y at the beginning of curve
    curve.unshift(y);
    
    translate(200, 0); // translating in x
    // connecting a line between the (last x (with an offset), y) and (0, y)
    line(x-200, y, 0, y);

    fill(255);
    ellipse(0, y, 5); // a dot to indicate the updated y

    // to create the whole approximated curve
    beginShape();
    noFill();
    for (let i = 0; i < curve.length; i++){
        vertex(i, curve[i]); 
    }
    endShape();
    
    // to clear the array 
    if(curve.length > 500){
        curve.pop();
    }
    
    // updating the time/angle of cosine and sine
    time -= 0.05;
}