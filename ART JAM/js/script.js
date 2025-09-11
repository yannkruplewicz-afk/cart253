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
 * sets the bqckground 
*/
function draw() {
    background("#2D302E");

     DrawFrame();

}



function DrawFrame() {
    //frame
    push ();
    noFill();
    stroke("grey");
    strokeWeight(20);
    rect(50, 50, 1100, 700);
    pop ();


    push ();
    noFill();
    stroke("white");
    strokeWeight(10);
    rect(50, 50, 1100, 700);
    pop ();
   
    // core of the frame
    push ();
    fill("white");
    noStroke();
    strokeWeight(2);
    rect(600, 400, 700, 500);
    pop ();
    
    //head
    push ();
    fill("#17E6C0");
    noStroke();
    strokeWeight(2);
    ellipse(600, 400, 1110, 700);

    pop ();
   
   
    
}