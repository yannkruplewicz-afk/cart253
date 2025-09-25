/**
 * Conditionals challenge
 * Yann Kruplewicz
 *
 *This is the beggining of the conditionals challenge !
 */

const puck = {
    x: 200,
    y: 200,
    size: 100,
    fill: "#ff0000", // red to start
    fills: {
        noOverlap: "#ff0000", // red for no overlap
        overlap: "#00ff00" // green for overlap
    }
};

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
};

/**
 * Create the canvas
 */

function setup() {
    createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
    background("#aaaaaa");

    // Move user circle
    moveUser();

    // Draw the user and puck
    drawUser();
    drawPuck();
    movePuck()
    drawTarget()

}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
}

function movePuck() {

    // Check overlap

    // Calculate distance between circles' centres
    const d = dist(user.x, user.y, puck.x, puck.y);
    const overlap = (d < puck.size / 2 + user.size / 2);
    // Check if that distance is smaller than their two radii, 
    // because if it is, they are overlapping by the amazing
    // power of geometry!

    // Set fill based on whether they overlap
    if (overlap) {
        puck.fill = puck.fills.overlap;
    }
    else {
        puck.fill = puck.fills.noOverlap

    }


}

function drawTarget() {
    push();
    fill(target.fills.NO.big)
    ellipse(target.x, target.y, target.size);
    fill(target.fills.NO.small)
    ellipse(target.x, target.y, target.size / 2);
    pop();

    const d = dist(target.x, target.y, puck.x, puck.y);
    const overlap = (d < puck.size / 2 + target.size / 2);
    // Check if that distance is smaller than their two radii, 
    // because if it is, they are overlapping




}

let target = {
    x: 150,
    y: 50,
    size: 50,
    fills: {
        NO: {
            small: "#ff0000", // red for no overlap
            big: "#fff" // green for overlap
        }
        //NO: {
        // small: "#0000ff", // red for no overlap
        //big: "#00ff00" // green for overlap
    }
}

if (overlap) {
    target.fills = target.fills.overlap;
}
else {
    target.fills = target.fills.noOverlap

}
