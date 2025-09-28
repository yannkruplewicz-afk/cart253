let frame;
let wrinles;

function setup() {
    createCanvas(400, 400);

    frame = { x: width / 2, y: height / 2, size: 150 };
    wrinles = {
        fills: {
            normal: color(200), // default color
            old: color(100)     // pressed color
        }
    };
}

function draw() {
    background(220);

    // calculate distance between mouse and frame center
    const distance = dist(mouseX, mouseY, frame.x, frame.y);
    const mouseIsOverlapping = (distance < frame.size / 2);

    // while holding mouse down
    if (mouseIsOverlapping && mouseIsPressed) {
        wrinles.fills.normal = wrinles.fills.old;
    } else {
        wrinles.fills.normal = color(200); // reset to default
    }

    // draw frame (circle)
    fill(255);
    ellipse(frame.x, frame.y, frame.size);

    // draw wrinles
    fill(wrinles.fills.normal);
    ellipse(frame.x, frame.y, frame.size * 0.6);
}

// optional: trigger once on click instead of "while holding"
function mousePressed() {
    const distance = dist(mouseX, mouseY, frame.x, frame.y);
    if (distance < frame.size / 2) {
        wrinles.fills.normal = wrinles.fills.old;
    }
}
