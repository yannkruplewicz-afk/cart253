/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(1200, 800);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(lightblue);
    drawThumb;;

}

function drawThumb(x, y, size) {
    stroke(0);
    fill(255, 224, 189);
    ellipse(x, y, size * 0.6, size); // Thumb base

    // Thumb nail
    fill(255, 204, 204);
    arc(x, y - size * 0.2, size * 0.4, size * 0.3, PI, 0, CHORD);

    // Thumb crease
    noFill();
    arc(x, y + size * 0.1, size * 0.5, size * 0.2, 0, PI);
}