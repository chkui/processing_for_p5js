const totalRays = 100, radius = 100, angleStep = 360.0 / totalRays;


function setup() {
    createCanvas(600, 400);
    background(220);
    noLoop();
}

var xoff = 0.0;

function draw() {
    translate(300, 200)
    beginShape()
    for (let i = 0; i < totalRays; i++) {
        let endX = sin(radians(i * angleStep)) * radius;
        let endY = cos(radians(i * angleStep)) * radius;
        vertex(endX, endY)
        endShape();
    }
}