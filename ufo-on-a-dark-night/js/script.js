/**
 * UFO on a Dark Night
 * Pippin Barr
 * 
 * A UFO. On a dark night. It just sits there?
 */

"use strict";

// Our UFO
let ufo = {
    // Position
    x: 200,
    y: 375,
    // Dimensions
    width: 150,
    height: 50,
    // Fill colour (greyscale)
    fill: 255
};

// Shade to fill the sky (background)
let skyShade = 0;

let bug = {
    x: 0,
    y: 200,
    size: 10
};

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
 * Displays a UFO
*/
function draw() {

    skyShade = skyShade + 1;
    // Display the sky
    background(skyShade);

    ufo.x = ufo.x + 0.5;
    ufo.y = ufo.y - 3;
    ufo.height = ufo.height - 0.2;
    ufo.width = ufo.width - 0.2;
    ufo.fill = ufo.fill * 0.97;

    // Draw the UFO based on its properties
    push();
    fill(ufo.fill);
    noStroke();
    ellipse(ufo.x, ufo.y, ufo.width, ufo.height);
    pop();



    // Add a random number between 1 and 5 to the big's position
    // to make it move jerkily
    bug.x += random(1, 5);
    ellipse(bug.x, bug.y, bug.size);
}