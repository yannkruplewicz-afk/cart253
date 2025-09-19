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
    createCanvas(1200, 1000);
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
    fill("#22451D");
    noStroke();
    strokeWeight(2);
    rect(50, 50, 1100, 1000);
    pop();


    DrawHead();
    DrawHair();


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
    rect(50, 50, 1100, 900);
    pop();


    push();
    noFill();
    stroke("white");
    strokeWeight(10);
    rect(50, 50, 1100, 900);
    pop();

    // core of the frame

}
function DrawHead() {
    // draws the head step by step with different layers to create a 3D effect
    //ears

    push();
    fill("#FCDCDC");
    noStroke();
    translate(-435, 0); // Move the origin to the ellipse center
    rotate(radians(-6));
    strokeWeight(2);
    rect(600, 400, 30, 600);
    pop();

    push();
    fill("#881e1eff");
    noStroke();
    translate(100, -180); // Move the origin to the ellipse center
    rotate(radians(12));
    ellipse(990, 380, 90, 200);
    pop();


    push();
    fill("#FCDCDC");
    noStroke();
    translate(240, 400); // Move the origin to the ellipse center
    rotate(radians(-7)); // Rotate the left hair to have a good perspective
    ellipse(0, 0, 190, 240); // Draw ellipse at the new origin
    pop();

    //head and neck
    push();
    fill("#FCDCDC");
    noStroke();
    strokeWeight(2);

    ellipse(560, 600, 600, 800);
    ellipse(625, 700, 600, 1200);
    fill("#fcdcdc");
    translate(-450, 0); // Move the origin to the ellipse center
    rotate(radians(-7));
    rect(625, 700, 600, 1200);
    pop();


    //jaw

    push();
    fill("#2c0b06ff");
    translate(50, 7); // Move the origin to the ellipse center
    rotate(radians(7)); // Rotate 
    noStroke();
    ellipse(600, 430, 700, 500);
    pop();


    push();
    fill("#fcdcdc");
    translate(49, 43); // Move the origin to the ellipse center
    rotate(radians(-14)); // Rotate 
    noStroke();
    ellipse(550, 730, 370, 170);
    pop();


    push();
    fill("#fcdcdc");
    translate(-50, 50); // develops center of jaw
    rotate(radians(-4)); // Rotate 
    noStroke();
    ellipse(650, 700, 200, 50);
    pop();

    push(); // develops center of jaw
    fill("#fcdcdc");
    noStroke();
    ellipse(600, 300, 800, 850);
    pop();

    push();   // develops right side of the jaw
    fill("#fcdcdc");
    noStroke();
    translate(430, 1110);
    rotate(radians(-78));
    rect(600, 300, 190, 90);
    pop();

    push();
    fill("#fcdcdc");
    translate(93, -237); // Move the origin to the ellipse center
    rotate(radians(27)); // Rotate 
    noStroke();
    ellipse(760, 530, 400, 270);
    pop();
}

function DrawHair() {
    //hair
    push();

    pop();

}

