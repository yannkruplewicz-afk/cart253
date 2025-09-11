/**
 * Instructions function calls
 * Yann Kruplewicz
 * 
 * Instructions function calls by Pipin Barr on the 11th of september of 2025
*/
"use strict";


function setup() {
    createCanvas(400, 400);
}


/**

*/
function draw() {
    background(255, 100, 100);
    rect    (200,80,240,320);

    push ();
    fill (0, 255, 0);
    stroke (120);
    ellipse (100, 100, 80, 80);
    pop  ();

    push ();
    fill (black);
    noStroke (120);
    ellipse (50, 50, 40, 40);
    pop  ();
}