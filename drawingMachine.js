let time = 0;
// to store the y values of the approximations
let x = [];
let y = [];
let path = [];
let fourierX;
let fourierY;
// to scale the cirlce radius
let scale = 60;

function setup() {
    createCanvas(500, 400);
    // a slider ranging from 1 to 100, staring from 2
    // assign the X and Y values
    const skip = 10;
    for(let i = 0; i < tracedCoordinates.length; i+=skip){
        x.push(tracedCoordinates[i].x);
        y.push(tracedCoordinates[i].y);
    }
    fourierX = DFT(x);
    fourierY = DFT(y);
}

function drawCycles(x, y, rotation, f){
    for(let i = 0; i < f.length; i++){
        let prevx = x; 
        let prevy = y;

        let radius = f[i].amplitude/10;
        let phase = f[i].phase;

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2);
        x += radius * cos(i * time + phase + rotation);
        y += radius * sin(i * time + phase + rotation);

        stroke(255);
        line(prevx, prevy, x ,y);
    }
    return createVector(x, y);
}

function draw() {
    //black background
    background(0);

    // define the center coordinates of both circles. Then call two drawCircles for x and y separately.
    // use the output coordinate object to connect the lines.
    let centerX = 200;
    let centerY = 200;
    let offset = 100;

    let fx = drawCycles(centerX+offset, 100, 0, fourierX);
    let fy = drawCycles(100, centerY, PI/2, fourierY);

    let pathCoord = createVector(fx.x, fy.y);
    
    // storing the last y at the beginning of curve
    path.unshift(pathCoord);
    
   
    // connecting a line between the (last x (with an offset), y) and (0, y) << repeat for both x and y
    line(fx.x, fx.y, pathCoord.x, pathCoord.y);
    line(fy.x, fy.y, pathCoord.x, pathCoord.y);

    // fill(255);
    // ellipse(0, y, 5); // a dot to indicate the updated y
    
    // to create the whole approximated curve
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++){
        vertex(path[i].x, path[i].y); 
    }
    endShape();

    const dt = 2 * PI / fourierX.length;
    // updating the time/angle of cosine and sine
    time += dt;

    // to clear the array 
    if(time > 2 * PI){
        time = 0;
        path = [];
    }
    
    
}