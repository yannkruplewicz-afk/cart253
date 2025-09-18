/**
 * Art Jam Project
 * Yann Kruplewicz
 * 
 * Self portrait with JavaScript for Art Jam Project, beggining date: 2025-11-09
 */

"use strict";

/**
 * creates a canvas
*/
function setup() {
    createCanvas(1200, 800);
}


/**
 * sets the background 
*/
function draw() {
    background("#2D302E");

    DrawFrame();

    clip(frameMask, { invert: false });

    //head of frame
    push();
    fill("#17E6C0");
    noStroke();
    strokeWeight(2);
    ellipse(600, 400, 1110, 700);

    pop();

    DrawHead();


}

function frameMask() {
    rect(100, 100, width - 200, height - 200);
}


function DrawFrame() {
    //frame
    push();
    noFill();
    stroke("grey");
    strokeWeight(20);
    rect(50, 50, 1100, 700);
    pop();


    push();
    noFill();
    stroke("white");
    strokeWeight(10);
    rect(50, 50, 1100, 700);
    pop();

    // core of the frame

}
function DrawHead() {
    //ears
    push();
    fill("#FCDCDC");
    noStroke();
    ellipse(240, 400, 170, 220);
    ellipse(990, 380, 90, 200);
    pop();

    //head and neck
    push();
    fill("#FCDCDC");
    noStroke();
    strokeWeight(2);
    ellipse(600, 400, 760, 900);
    ellipse(560, 600, 600, 1200);
    ellipse(625, 700, 600, 1200);
    pop();

    //hair
    push();
    fill("#2a1f1fff");
    noStroke();
    ellipse(600, 150, 700, 400);
    ellipse(300, 250, 200, 300);
    ellipse(900, 250, 200, 300);
    pop();

}
